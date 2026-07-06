import { NextResponse } from "next/server";
import { registrationSchema } from "@/lib/registration-schema";

const GAS_URL = process.env.GOOGLE_APPS_SCRIPT_URL ?? "";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = registrationSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Thông tin đăng ký chưa hợp lệ.",
          errors: parsed.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    if (!GAS_URL) {
      return NextResponse.json(
        {
          message:
            "Hệ thống chưa được cấu hình. Vui lòng liên hệ BTC để hỗ trợ."
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
      console.error("[register] GAS error:", gasResponse.status, text);
      return NextResponse.json(
        {
          message:
            "Chưa thể lưu đăng ký. Vui lòng thử lại sau hoặc liên hệ BTC."
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: "Đăng ký thành công." });
  } catch (err) {
    console.error("[register] Unexpected error:", err);
    return NextResponse.json(
      { message: "Có lỗi xảy ra khi xử lý đăng ký." },
      { status: 500 }
    );
  }
}
