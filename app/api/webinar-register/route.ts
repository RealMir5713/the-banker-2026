import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createWebinarRegistration,
  getSupabaseServiceClient
} from "@/lib/supabase";
import {
  webinarRegistrationSubmissionSchema,
  type WebinarProofFile
} from "@/lib/webinar-registration-schema";

export const runtime = "nodejs";

const bucketName = "webinar-proofs";
const cleanupSchema = z.object({
  registration_id: z.string().uuid()
});

async function listGroupFiles(
  registrationId: string,
  group: "post" | "fanpage"
) {
  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    return { paths: [] as string[], error: new Error("Missing Supabase config") };
  }

  const folder = `${registrationId}/${group}`;
  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(folder, { limit: 100 });

  return {
    paths: (data ?? []).map((file) => `${folder}/${file.name}`),
    error
  };
}

async function removeRegistrationFiles(registrationId: string) {
  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    return;
  }

  const [post, fanpage] = await Promise.all([
    listGroupFiles(registrationId, "post"),
    listGroupFiles(registrationId, "fanpage")
  ]);
  const paths = [...post.paths, ...fanpage.paths];

  if (paths.length > 0) {
    await supabase.storage.from(bucketName).remove(paths);
  }
}

async function verifyGroup(
  registrationId: string,
  group: "post" | "fanpage",
  submittedFiles: WebinarProofFile[]
) {
  const expectedPrefix = `${registrationId}/${group}/`;
  if (submittedFiles.some((file) => !file.path.startsWith(expectedPrefix))) {
    return false;
  }

  const { paths, error } = await listGroupFiles(registrationId, group);
  if (error) {
    throw error;
  }

  const storedPaths = new Set(paths);
  return submittedFiles.every((file) => storedPaths.has(file.path));
}

export async function POST(request: Request) {
  const supabase = getSupabaseServiceClient();

  if (!supabase) {
    return NextResponse.json(
      {
        message:
          "Form chưa được kết nối Supabase. Vui lòng cấu hình URL và service-role key."
      },
      { status: 503 }
    );
  }

  let registrationId = "";

  try {
    const parsed = webinarRegistrationSubmissionSchema.safeParse(
      await request.json()
    );

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Thông tin đăng ký webinar chưa hợp lệ.",
          errors: parsed.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    registrationId = parsed.data.registration_id;
    const [postFilesAreValid, fanpageFilesAreValid] = await Promise.all([
      verifyGroup(
        registrationId,
        "post",
        parsed.data.proof_post_files
      ),
      verifyGroup(
        registrationId,
        "fanpage",
        parsed.data.proof_fanpage_files
      )
    ]);

    if (!postFilesAreValid || !fanpageFilesAreValid) {
      await removeRegistrationFiles(registrationId);
      return NextResponse.json(
        {
          message:
            "Ảnh minh chứng chưa tải lên đầy đủ. Vui lòng chọn lại ảnh và thử lại."
        },
        { status: 400 }
      );
    }

    const {
      registration_id: _registrationId,
      proof_post_files,
      proof_fanpage_files,
      ...registration
    } = parsed.data;
    const { data, error } = await createWebinarRegistration(
      {
        ...registration,
        proof_post_files,
        proof_fanpage_files
      },
      registrationId
    );

    if (error) {
      throw error;
    }

    // Forward to Google Sheets via Apps Script (best-effort, non-blocking)
    const webinarGasUrl = process.env.WEBINAR_GOOGLE_APPS_SCRIPT_URL;
    if (webinarGasUrl) {
      try {
        // Build public URLs from the verified Supabase paths
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
        const buildPublicUrl = (path: string) =>
          `${supabaseUrl}/storage/v1/object/public/webinar-proofs/${path}`;

        const gasPayload = {
          full_name:          registration.full_name,
          phone:              registration.phone,
          email:              registration.email,
          facebook_url:       registration.facebook_url,
          university:         registration.university,
          year:               registration.year,
          student_id:         registration.student_id,
          class_info:         registration.class_info,
          speaker_question:   registration.speaker_question,
          organizer_message:  registration.organizer_message,
          proof_post_urls:    proof_post_files.map((f) => buildPublicUrl(f.path)),
          proof_fanpage_urls: proof_fanpage_files.map((f) => buildPublicUrl(f.path))
        };

        await fetch(webinarGasUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(gasPayload)
        });
      } catch (gasErr) {
        // GAS failure should not block the user's successful registration
        console.error("[webinar-register] GAS forwarding failed:", gasErr);
      }
    }

    return NextResponse.json({
      message: "Đăng ký webinar thành công.",
      registration: data
    });
  } catch (error) {
    if (registrationId) {
      await removeRegistrationFiles(registrationId);
    }

    console.error("Webinar registration failed:", error);

    return NextResponse.json(
      {
        message:
          "Chưa thể lưu đăng ký. Vui lòng kiểm tra cấu hình Supabase và thử lại."
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const parsed = cleanupSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Mã đăng ký không hợp lệ." },
        { status: 400 }
      );
    }

    await removeRegistrationFiles(parsed.data.registration_id);
    return NextResponse.json({ message: "Đã dọn ảnh tải lên chưa hoàn tất." });
  } catch {
    return NextResponse.json(
      { message: "Không thể dọn ảnh tải lên." },
      { status: 500 }
    );
  }
}
