import { NextResponse } from "next/server";
import { registrationSchema } from "@/lib/registration-schema";
import { createRegistration } from "@/lib/supabase";

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

    const { data, error } = await createRegistration(parsed.data);

    if (error) {
      return NextResponse.json(
        {
          message:
            "Chưa thể lưu đăng ký. Vui lòng kiểm tra cấu hình Supabase hoặc thử lại sau."
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Đăng ký thành công.",
      registration: data
    });
  } catch {
    return NextResponse.json(
      { message: "Có lỗi xảy ra khi xử lý đăng ký." },
      { status: 500 }
    );
  }
}
