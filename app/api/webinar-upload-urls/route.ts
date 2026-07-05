import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";

const bucketName = "webinar-proofs";

const uploadFileSchema = z.object({
  name: z.string().trim().min(1).max(255),
  size: z.number().int().positive().max(5 * 1024 * 1024),
  type: z.string().startsWith("image/")
});

const uploadRequestSchema = z.object({
  post: z.array(uploadFileSchema).min(1).max(5),
  fanpage: z.array(uploadFileSchema).min(1).max(5)
});

function fileExtension(name: string, mimeType: string) {
  const originalExtension = name
    .split(".")
    .pop()
    ?.toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  if (originalExtension) {
    return originalExtension;
  }

  return mimeType.split("/").pop()?.replace(/[^a-z0-9]/g, "") || "jpg";
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

  try {
    const parsed = uploadRequestSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Danh sách ảnh minh chứng chưa hợp lệ." },
        { status: 400 }
      );
    }

    const registrationId = randomUUID();

    const createGroup = async (
      files: z.infer<typeof uploadFileSchema>[],
      group: "post" | "fanpage"
    ) => {
      const uploads = [];

      for (const file of files) {
        const path = `${registrationId}/${group}/${randomUUID()}.${fileExtension(file.name, file.type)}`;
        const { data, error } = await supabase.storage
          .from(bucketName)
          .createSignedUploadUrl(path);

        if (error) {
          throw error;
        }

        uploads.push({
          path: data.path,
          signed_url: data.signedUrl
        });
      }

      return uploads;
    };

    return NextResponse.json({
      registration_id: registrationId,
      uploads: {
        post: await createGroup(parsed.data.post, "post"),
        fanpage: await createGroup(parsed.data.fanpage, "fanpage")
      }
    });
  } catch (error) {
    console.error("Could not create webinar upload URLs:", error);

    return NextResponse.json(
      {
        message:
          "Chưa thể chuẩn bị khu vực tải ảnh. Vui lòng kiểm tra cấu hình Supabase."
      },
      { status: 500 }
    );
  }
}
