import {
  BadgeCheck,
  Building2,
  CalendarDays,
  Crown,
  FileText,
  Landmark,
  Medal,
  Mic,
  Rocket,
  School,
  ShieldCheck,
  Trophy,
  Users
} from "lucide-react";

export const navItems = [
  { label: "Trang chủ", href: "#trang-chu" },
  { label: "Thông tin cuộc thi", href: "#thong-tin-cuoc-thi" },
  { label: "Về chúng tôi", href: "#ve-chung-toi" },
  { label: "Hành trình", href: "#hanh-trinh" }
];

export const eventDetails = [
  { label: "Mở đơn 2026", icon: CalendarDays },
  { label: "Sinh viên toàn quốc", icon: School },
  { label: "Đồng hành cùng MSB", icon: Landmark }
];

export const stats = [
  { value: 5000, suffix: "+", label: "Thí sinh", icon: Users },
  { value: 50, suffix: "+", label: "Trường đại học", icon: School },
  { value: 200, suffix: "+", label: "Mentors & Experts", icon: BadgeCheck },
  { value: 10, suffix: "+", label: "Mùa tổ chức", icon: Trophy }
];

export const journey = [
  {
    title: "Mở đơn",
    description: "Cổng đăng ký dự thi mở cho sinh viên toàn quốc với hồ sơ học thuật và định hướng nghề nghiệp.",
    icon: FileText
  },
  {
    title: "Vòng hồ sơ",
    description: "BTC đánh giá năng lực nền tảng, động lực tham gia và mức độ phù hợp với chủ đề ngân hàng số.",
    icon: ShieldCheck
  },
  {
    title: "Vòng chuyên môn",
    description: "Thí sinh xử lý tình huống tài chính, phân tích dữ liệu và đề xuất giải pháp fintech.",
    icon: Building2
  },
  {
    title: "Vòng bán kết",
    description: "Các đội trình bày chiến lược trước mentor, chuyên gia ngân hàng và hội đồng phản biện.",
    icon: Rocket
  },
  {
    title: "Vòng chung kết",
    description: "Sân khấu tranh tài cuối cùng, panel chuyên gia và lễ vinh danh The Banker 2026.",
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

export const sponsorTiers = [
  {
    tier: "Diamond Sponsor",
    logos: ["MSB", "FBN Future Bankers"]
  },
  {
    tier: "Gold Sponsor",
    logos: ["VNPay", "MoMo", "FinTech Lab"]
  },
  {
    tier: "Silver Sponsor",
    logos: ["Open Banking Hub", "Digital Trust", "CloudPay"]
  },
  {
    tier: "Media Partners",
    logos: ["YBOX", "Brands Vietnam", "FTU Times", "Youth Banking"]
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
    answer: "Bạn có thể điền thông tin cá nhân và tên nhóm nếu đã có đội thi. Nếu chưa có đội, BTC có thể hỗ trợ hướng dẫn ở các vòng sau tùy thể lệ chính thức."
  },
  {
    question: "Cần chuẩn bị minh chứng gì?",
    answer: "Bạn nên chuẩn bị link minh chứng học tập, chứng chỉ tiếng Anh, chứng chỉ chuyên môn, giải thưởng hoặc portfolio liên quan để hồ sơ được đánh giá đầy đủ hơn."
  }
];
