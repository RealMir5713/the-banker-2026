import { NextResponse } from "next/server";
import { webinarRegistrationSchema } from "@/lib/webinar-registration-schema";
import { z } from "zod";

const fileSchema = z.object({
  base64: z.string(),
  mimeType: z.string(),
  filename: z.string()
});

const webinarSubmissionSchema = webinarRegistrationSchema.extend({
  proof_post_images: z.array(fileSchema).min(1).max(5),
  proof_fanpage_images: z.array(fileSchema).min(1).max(5)
});

const GAS_URL = process.env.WEBINAR_GOOGLE_APPS_SCRIPT_URL ?? "";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = webinarSubmissionSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Thông tin đăng ký webinar chưa hợp lệ.",
          errors: parsed.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    if (!GAS_URL) {
      return NextResponse.json(
        {
          message: "Hệ thống chưa được cấu hình. Vui lòng liên hệ BTC để hỗ trợ."
        },
        { status: 503 }
      );
    }

    const gasResponse = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data)
    });

    if (!gasResponse.ok) {
      const text = await gasResponse.text().catch(() => "");
      console.error("[webinar-register] GAS error:", gasResponse.status, text);
      return NextResponse.json(
        {
          message: "Chưa thể lưu đăng ký. Vui lòng thử lại sau hoặc liên hệ BTC."
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: "Đăng ký webinar thành công." });
  } catch (err) {
    console.error("[webinar-register] Unexpected error:", err);
    return NextResponse.json(
      { message: "Có lỗi xảy ra khi xử lý đăng ký." },
      { status: 500 }
    );
  }
}
