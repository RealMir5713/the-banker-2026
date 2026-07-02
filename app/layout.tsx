import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://the-banker-2026.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Banker 2026 | Đăng ký dự thi",
    template: "%s | The Banker 2026"
  },
  description:
    "Website đăng ký dự thi The Banker 2026 - Tái định hình tương lai ngân hàng số.",
  keywords: [
    "The Banker 2026",
    "đăng ký dự thi The Banker",
    "ngân hàng số",
    "fintech",
    "MSB",
    "FBN FTU",
    "cuộc thi sinh viên ngân hàng"
  ],
  authors: [{ name: "CLB Nhà Ngân hàng Tương Lai FBN" }],
  creator: "CLB Nhà Ngân hàng Tương Lai FBN",
  openGraph: {
    title: "The Banker 2026 | Đăng ký dự thi",
    description:
      "Đăng ký dự thi The Banker 2026 và cùng tái định hình tương lai ngân hàng số.",
    url: siteUrl,
    siteName: "The Banker 2026",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "The Banker 2026 đăng ký dự thi"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The Banker 2026 | Đăng ký dự thi",
    description: "Tái định hình tương lai ngân hàng số.",
    images: ["/og-image.svg"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF6B00"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
