import type { Metadata } from "next";
import { WebinarPage } from "@/components/WebinarPage";

export const metadata: Metadata = {
  title: "Webinar Open Banking",
  description:
    "Đăng ký webinar Open Banking: Kiến tạo hệ sinh thái mở, 19:00 - 21:00 ngày 14/07/2026.",
  alternates: {
    canonical: "/webinar"
  },
  openGraph: {
    title: "Webinar Open Banking | The Banker 2026",
    description:
      "Kiến tạo hệ sinh thái mở - webinar kick-off trước cuộc thi The Banker 2026.",
    url: "/webinar",
    type: "website"
  }
};

export default function WebinarRoute() {
  return <WebinarPage />;
}
