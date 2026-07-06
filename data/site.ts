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

export interface SponsorLogo {
  name: string;
  src: string;
  href?: string;
};

export const sponsorTiers: Array<{ tier: string; logos: SponsorLogo[] }> = [
  {
    tier: "Đơn vị tổ chức",
    logos: [
      { name: "FTU", src: "/images/sponsors/ftu.png", href: "https://ftu.edu.vn/" },
      { name: "Đoàn TNCS HCM", src: "/images/sponsors/doan_red.png", href: "https://doanthanhnien.vn/" },
      { name: "FBN", src: "/images/sponsors/fbn.png", href: "https://www.facebook.com/fbn.ftu/" }
    ]
  },
  {
    tier: "Nhà tài trợ Kim Cương",
    logos: [{ name: "MSB", src: "/images/msb-logo.png", href: "https://www.msb.com.vn/" }]
  },
  {
    tier: "Nhà tài trợ Đồng",
    logos: [{ name: "SAPP", src: "/images/sponsors/sapp.png", href: "https://sapp.edu.vn/" }]
  },
  {
    tier: "Nhà tài trợ Hiện vật",
    logos: [
      { name: "Hemera", src: "/images/sponsors/hemera_black.png", href: "https://www.facebook.com/HemeraMedia" },
      { name: "86 HSK", src: "/images/sponsors/86hsk.jpg", href: "https://tiengtrung86hsk.com/" },
      { name: "UniWrite", src: "/images/sponsors/uniwrite.png", href: "https://www.facebook.com/unitutoreasywrite/" },
      { name: "10 Education", src: "/images/sponsors/ten_education.png", href: "https://www.facebook.com/10education/" },
      { name: "ToCoToCo", src: "/images/sponsors/tocotoco.png", href: "https://tocotocotea.com/" },
      { name: "Onemore", src: "/images/sponsors/onemore_3.png", href: "https://www.facebook.com/profile.php?id=61589440192403" },
      { name: "Edu2Review", src: "/images/sponsors/edu2review_new.png", href: "https://edu2review.com/" },
      { name: "Eduwing Global", src: "/images/sponsors/edu2review_2.png", href: "https://eduwingglobal.com/" }
    ]
  },
  {
    tier: "Bảo trợ chuyên môn",
    logos: [
      { name: "MSB", src: "/images/msb-logo.png", href: "https://www.msb.com.vn/" },
      { name: "MCNA", src: "/images/sponsors/mcna.png", href: "https://mcna.vn/" },
      { name: "Tingee", src: "/images/sponsors/tingee_new.png", href: "https://tingee.vn/" },
      { name: "FiinGroup", src: "/images/sponsors/fiingroup.png", href: "https://fiingroup.vn/" },
      { name: "FBF", src: "/images/sponsors/fbf-full.png", href: "http://fbf.ftu.edu.vn/" }
    ]
  },
  {
    tier: "Bảo trợ truyền thông",
    logos: [
      { name: "MSB", src: "/images/msb-logo.png", href: "https://www.msb.com.vn/" },
      { name: "Edu2Review", src: "/images/sponsors/edu2review_new.png", href: "https://edu2review.com/" },
      { name: "Eduwing Global", src: "/images/sponsors/edu2review_2.png", href: "https://eduwing.vn/" },
      { name: "Advertising Vietnam", src: "/images/sponsors/ad_vietnam.png", href: "https://advertisingvietnam.com" }
    ]
  },
  {
    tier: "Đối tác Đồng hành",
    logos: [
      { name: "MCNA", src: "/images/sponsors/mcna.png", href: "https://mcna.vn/" },
      { name: "TWINGS", src: "/images/sponsors/twings_new.png", href: "https://www.twings.edu.vn" }
    ]
  },
  {
    tier: "Đối tác Truyền thông",
    logos: [
      { name: "IBC", src: "/images/sponsors/ibc.png", href: "https://www.facebook.com/clbkinhdoanhquocte.ibcftu" },
      { name: "MCNA", src: "/images/sponsors/mcna.png", href: "https://mcna.vn/" },
      { name: "ECOM CLUB", src: "/images/sponsors/ecom.png", href: "https://www.facebook.com/Ecom.Ftu" },
      { name: "YRC", src: "/images/sponsors/yrc.png", href: "https://www.facebook.com/svnckh.yrc" },
      { name: "QEC", src: "/images/sponsors/qec.jpg", href: "https://www.facebook.com/qec.ftu" },
      { name: "REC", src: "/images/sponsors/rec.png", href: "https://www.facebook.com/FTU.REC" }
    ]
  },
  {
    tier: "Tài trợ Nền tảng",
    logos: [{ name: "Tingee", src: "/images/sponsors/tingee_new.png", href: "https://tingee.vn/" }]
  },
  {
    tier: "Bảo trợ Hình ảnh",
    logos: [{ name: "FPC", src: "/images/sponsors/fpc.png", href: "https://www.facebook.com/ftuphotography" }]
  }
];

export const faqItems = [
  {
    question: "Ai đủ điều kiện tham gia cuộc thi?",
    answer: "Là sinh viên đang theo học tại các trường Đại học, Cao đẳng trên toàn quốc hoặc người đã tốt nghiệp không quá 1 năm có đam mê trong lĩnh vực Kinh tế, Tài chính, Công nghệ thông tin, Dữ liệu."
  },
  {
    question: "Có được đăng ký cá nhân không hay bắt buộc theo đội?",
    answer: "Có thể đăng ký theo cả 2 hình thức cá nhân và đội. Đối với thí sinh đăng ký theo hình thức cá nhân: thực hiện bài test đánh giá kiến thức vòng 1 vào 25/07/2026. Những thí sinh đủ điều kiện sẽ được ghép đội thi sau đó. Đối với thí sinh đăng ký theo hình thức đội: thực hiện bài test vào 26/07/2026."
  },
  {
    question: "BTC có tổ chức training/mentoring không?",
    answer: "Có. Trước các vòng 2, 3, sẽ có các buổi training để các thí sinh bước vào vòng thi một cách tự tin nhất. Đặc biệt, 4 đội thi xuất sắc nhất khi bước vào vòng chung kết sẽ được mentor để hoàn thành sản phẩm. Ngoài ra, ở vòng 2 và 3, các thí sinh sẽ có cơ hội tham gia Banking tour và Banking talk để nghe các chuyên gia từ MSB chia sẻ trực tiếp."
  },
  {
    question: "Nếu gặp lỗi khi đăng ký thì phải làm gì?",
    answer: "Thí sinh có thể liên hệ bộ phận kỹ thuật để được tư vấn qua số điện thoại: 0342955344."
  },
  {
    question: "Thí sinh có thể tự tìm, tự tạo và đăng ký đội mình chọn không?",
    answer: "Có. Thí sinh có thể đăng ký trước theo hình thức 1 đội gồm 3-4 người theo quy định của cuộc thi. Cả đội cần chọn ra 1 đội trưởng để thay mặt đội đăng ký tham gia."
  },
  {
    question: "Những thí sinh không có kiến thức về mặt kỹ thuật, design các sơ đồ API có khả năng tham gia hay không?",
    answer: "Có. Chỉ cần bạn có đam mê trong các lĩnh vực tài chính, công nghệ nói chung và Open Banking nói riêng thì hoàn toàn phù hợp và có thể đăng ký tham gia cuộc thi. Ngoài ra, các thí sinh còn được tham gia các buổi training để phát triển về kỹ năng và kiến thức để chuẩn bị thật tốt cho bài thi của mình."
  },
  {
    question: "Đội thi cần đáp ứng những yêu cầu gì về cơ cấu và vai trò của các thành viên?",
    answer: "Đội thi yêu cầu phải có tối thiểu 3 thành viên, tối đa 4 thành viên. Tất cả các thành viên phải đáp ứng đầy đủ điều kiện tham gia cuộc thi và chỉ tham gia vào 1 đội. Ngoài ra, đội phải chọn ra 1 đội trưởng để trao đổi thông tin với BTC."
  }
];
