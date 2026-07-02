import { NextResponse } from "next/server";
import { getRegistrations } from "@/lib/supabase";

export async function GET(request: Request) {
  const token = process.env.ADMIN_DASHBOARD_TOKEN;
  const authHeader = request.headers.get("authorization");
  const receivedToken = authHeader?.replace("Bearer ", "").trim();

  if (!token) {
    return NextResponse.json(
      { message: "ADMIN_DASHBOARD_TOKEN chưa được cấu hình." },
      { status: 500 }
    );
  }

  if (!receivedToken || receivedToken !== token) {
    return NextResponse.json(
      { message: "Không có quyền truy cập dashboard." },
      { status: 401 }
    );
  }

  const { data, error } = await getRegistrations();

  if (error) {
    return NextResponse.json(
      { message: "Không thể tải danh sách đăng ký." },
      { status: 500 }
    );
  }

  return NextResponse.json({ registrations: data });
}
