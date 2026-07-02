import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-banker-orange">
              The Banker 2026
            </p>
            <h1 className="mt-3 text-4xl font-black text-banker-navy md:text-5xl">
              Admin Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-banker-navy/64">
              Quản lý hồ sơ đăng ký dự thi, tìm kiếm dữ liệu, xem thống kê
              nhanh và xuất CSV phục vụ xét duyệt.
            </p>
          </div>
          <a
            className="inline-flex h-11 items-center justify-center rounded-full border border-banker-orange/20 bg-white/70 px-5 text-sm font-bold text-banker-navy shadow-sm transition hover:border-banker-orange hover:bg-white"
            href="/"
          >
            Về trang chủ
          </a>
        </div>
        <AdminDashboard />
      </div>
    </main>
  );
}
