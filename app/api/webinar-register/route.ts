import { NextResponse } from "next/server";
import { createWebinarRegistration } from "@/lib/supabase";
import { webinarRegistrationSchema } from "@/lib/webinar-registration-schema";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = webinarRegistrationSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Thông tin đăng ký webinar chưa hợp lệ.",
          errors: parsed.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const { data, error } = await createWebinarRegistration(parsed.data);

    if (error) {
      return NextResponse.json(
        {
          message:
            "Chưa thể lưu đăng ký webinar. Vui lòng kiểm tra cấu hình Supabase hoặc thử lại sau."
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Đăng ký webinar thành công.",
      registration: data
    });
  } catch {
    return NextResponse.json(
      { message: "Có lỗi xảy ra khi xử lý đăng ký webinar." },
      { status: 500 }
    );
  }
}
