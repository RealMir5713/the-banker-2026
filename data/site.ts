import {
  Building2,
  CalendarDays,
  Crown,
  FileText,
  Landmark,
  Medal,
  Mic,
  School,
  ShieldCheck,
  Trophy,
  Users
} from "lucide-react";

export const navItems = [
  { label: "Trang chủ", href: "#trang-chu" },
  { label: "Thông tin cuộc thi", href: "#thong-tin-cuoc-thi" },
  { label: "Về chúng tôi", href: "#ve-chung-toi" },
  { label: "Hành trình", href: "#hanh-trinh" },
  { label: "Webinar", href: "/webinar" }
];

export const eventDetails = [
  { label: "Mở đơn 2026", icon: CalendarDays },
  { label: "Sinh viên toàn quốc", icon: School },
  { label: "Đồng hành cùng MSB", icon: Landmark }
];

export const stats = [
  { value: 6000, suffix: "+", label: "Lượt đăng ký từ 2024", icon: Users },
  { value: 80, suffix: "+", label: "Trường đại học", icon: School },
  { value: 5, suffix: "", label: "Mùa tổ chức", icon: Trophy }
];

export const journey = [
  {
    title: "Vòng 1",
    date: "06/07 - 26/07",
    subtitle: "Khởi động & đăng ký",
    description: "Hoàn thiện hồ sơ và bước vào hành trình chinh phục The Banker 2026.",
    icon: FileText
  },
  {
    title: "Vòng 2",
    date: "28/07 - 09/08",
    subtitle: "Kiến thức ngân hàng",
    description: "Thử thách nền tảng tài chính, ngân hàng, dữ liệu và chuyển đổi số.",
    icon: ShieldCheck
  },
  {
    title: "Vòng 3",
    date: "12/08 - 20/08",
    subtitle: "Giải quyết tình huống",
    description: "Phân tích bài toán thực tế và phát triển giải pháp ngân hàng hiện đại.",
    icon: Building2
  },
  {
    title: "Vòng 4",
    date: "23/08 - 13/09",
    subtitle: "Tăng tốc & tranh tài",
    description: "Hoàn thiện chiến lược và thuyết trình trước hội đồng chuyên môn.",
    icon: Crown
  }
];

export const agenda = [
  { time: "01", title: "Đăng ký dự thi", description: "Hoàn tất hồ sơ cá nhân, học tập, chứng chỉ và thông tin đội thi." },
  { time: "02", title: "Xác nhận hồ sơ", description: "BTC rà soát thông tin, gửi email xác nhận và hướng dẫn bước tiếp theo." },
  { time: "03", title: "Vòng kiến thức", description: "Thí sinh kiểm tra nền tảng tài chính, ngân hàng, dữ liệu và chuyển đổi số." },
  { time: "04", title: "Mentoring", description: "Các đội nổi bật được đồng hành bởi mentor, chuyên gia ngân hàng và fintech." },
  { time: "05", title: "Chung kết", description: "Những đội xuất sắc nhất trình bày giải pháp trước hội đồng chuyên môn." }
];

export const speakers = [
  {
    name: "Nguyễn Minh Anh",
    position: "Giám đốc Chuyển đổi số",
    company: "MSB",
    initials: "MA",
    icon: Mic
  },
  {
    name: "Trần Quang Huy",
    position: "Head of Digital Banking",
    company: "Fintech Vietnam",
    initials: "QH",
    icon: Medal
  },
  {
    name: "Lê Hoàng Phương",
    position: "Investment & Strategy Lead",
    company: "Venture Studio",
    initials: "HP",
    icon: Building2
  },
  {
    name: "Phạm Bảo Ngọc",
    position: "Senior Risk Advisor",
    company: "Banking Academy",
    initials: "BN",
    icon: ShieldCheck
  }
];

export type SponsorLogo = {
  name: string;
  src: string;
};

export const sponsorTiers: Array<{ tier: string; logos: SponsorLogo[] }> = [
  {
    tier: "Đơn vị tổ chức",
    logos: [
      { name: "FTU", src: "/images/sponsors/ftu.png" },
      { name: "Đoàn TNCS HCM", src: "/images/sponsors/doan.png" },
      { name: "FBN", src: "/images/sponsors/fbn.png" }
    ]
  },
  {
    tier: "Bảo trợ chuyên môn",
    logos: [
      { name: "MSB", src: "/images/msb-logo.png" },
      { name: "MCNA", src: "/images/sponsors/mcna.png" },
      { name: "Tingee", src: "/images/sponsors/tingee.png" },
      { name: "FiinGroup", src: "/images/sponsors/fiingroup.png" }
    ]
  },
  {
    tier: "Nhà tài trợ Kim Cương",
    logos: [{ name: "MSB", src: "/images/msb-logo.png" }]
  },
  {
    tier: "Nhà tài trợ Đồng",
    logos: [{ name: "SAPP", src: "/images/sponsors/sapp.png" }]
  },
  {
    tier: "Nhà tài trợ Hiện vật",
    logos: [
      { name: "Hemera", src: "/images/sponsors/hemera.png" },
      { name: "86 HSK", src: "/images/sponsors/eighty_six_hsk.png" },
      { name: "UniWrite", src: "/images/sponsors/uniwrite.png" },
      { name: "10 Education", src: "/images/sponsors/ten_education.png" },
      { name: "ToCoToCo", src: "/images/sponsors/tocotoco.png" },
      { name: "Onemore", src: "/images/sponsors/onemore_3.png" }
    ]
  },
  {
    tier: "Bảo trợ truyền thông",
    logos: [
      { name: "Edu2Review", src: "/images/sponsors/edu2review_1.png" },
      { name: "Eduwing Global", src: "/images/sponsors/edu2review_2.png" }
    ]
  },
  {
    tier: "Đối tác Đồng hành",
    logos: [
      { name: "MCNA", src: "/images/sponsors/mcna.png" },
      { name: "TWINGS", src: "/images/sponsors/twings.svg" }
    ]
  },
  {
    tier: "Đối tác Truyền thông",
    logos: [
      { name: "IBC", src: "/images/sponsors/ibc.png" },
      { name: "MCNA", src: "/images/sponsors/mcna.png" },
      { name: "ECOM CLUB", src: "/images/sponsors/ecom.png" },
      { name: "YRC", src: "/images/sponsors/yrc.png" },
      { name: "QEC", src: "/images/sponsors/qec.jpg" },
      { name: "REC", src: "/images/sponsors/rec.png" }
    ]
  },
  {
    tier: "Tài trợ Nền tảng",
    logos: [{ name: "Tingee", src: "/images/sponsors/tingee.png" }]
  },
  {
    tier: "Bảo trợ Hình ảnh",
    logos: [{ name: "FPC", src: "/images/sponsors/fpc.png" }]
  }
];

export const faqItems = [
  {
    question: "Cuộc thi dành cho ai?",
    answer: "The Banker 2026 mở đăng ký cho sinh viên quan tâm tới tài chính, ngân hàng, dữ liệu, fintech và chuyển đổi số trên phạm vi toàn quốc."
  },
  {
    question: "Có mất phí đăng ký dự thi không?",
    answer: "Cuộc thi không thu phí đăng ký. Thí sinh chỉ cần hoàn tất hồ sơ trên website và theo dõi email xác nhận từ BTC."
  },
  {
    question: "Đăng ký theo cá nhân hay theo nhóm?",
    answer: "Bạn có thể điền thông tin cá nhân và tên nhóm nếu đã có đội thi. Nếu chưa có đội, BTC có thể hỗ trợ hướng dẫn ghép đội ở các vòng sau tùy thể lệ chính thức."
  },
  {
    question: "Cần chuẩn bị minh chứng gì?",
    answer: "Bạn nên chuẩn bị link minh chứng hình ảnh đã like/share bài viết mở đơn đăng ký cuộc thi, cùng với CV cá nhân (đối với đăng ký cá nhân)."
  }
];
