"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Database,
  ExternalLink,
  Facebook,
  Landmark,
  Menu,
  MessageCircle,
  Network,
  Radio,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";
import { WebinarRegistrationForm } from "@/components/WebinarRegistrationForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const facebookGroupUrl = "https://www.facebook.com/groups/1803549783273975/";

const webinarFacts = [
  { label: "14/07/2026", icon: CalendarDays },
  { label: "19:00 - 21:00", icon: Clock3 },
  { label: "Webinar trực tuyến", icon: Radio }
];

const outcomes = [
  {
    title: "Hiểu đúng Open Banking",
    description:
      "Nắm bản chất mô hình, vai trò của chia sẻ dữ liệu và cách hệ sinh thái tài chính mở vận hành.",
    icon: Network
  },
  {
    title: "Góc nhìn thực tiễn Việt Nam",
    description:
      "Khám phá hành lang pháp lý, mức độ triển khai và những điểm chạm Open Banking nổi bật.",
    icon: Landmark
  },
  {
    title: "Tư duy xây dựng giải pháp",
    description:
      "Hình thành nền tảng để phát triển ý tưởng trước khi bước vào bốn vòng thi chính thức.",
    icon: Database
  },
  {
    title: "Định hướng nghề nghiệp",
    description:
      "Nhận diện cơ hội việc làm và những năng lực cần chuẩn bị trong ngân hàng số và fintech.",
    icon: BriefcaseBusiness
  }
];

const agenda = [
  {
    time: "19:00 - 19:20",
    duration: "20 phút",
    title: "Khai mạc & giới thiệu"
  },
  {
    time: "19:20 - 19:50",
    duration: "30 phút",
    title: "From Data Sharing to Open Banking"
  },
  {
    time: "19:50 - 20:00",
    duration: "10 phút",
    title: "Giải lao"
  },
  {
    time: "20:00 - 20:30",
    duration: "30 phút",
    title: "Stepping into Open Banking"
  },
  {
    time: "20:30 - 20:50",
    duration: "20 phút",
    title: "Q&A cùng diễn giả"
  },
  {
    time: "20:50 - 21:00",
    duration: "10 phút",
    title: "Bế mạc & check-out"
  }
];

const faqItems = [
  {
    question: "Webinar dành cho ai?",
    answer:
      "Chương trình dành cho sinh viên quan tâm tới Open Banking, ngân hàng số, API, dữ liệu, bảo mật và cuộc thi The Banker 2026."
  },
  {
    question: "Tham dự webinar có mất phí không?",
    answer:
      "Không. Sinh viên chỉ cần hoàn tất biểu mẫu đăng ký và theo dõi email xác nhận từ Ban tổ chức."
  },
  {
    question: "Tôi không học tại FTU có thể tham dự không?",
    answer:
      "Có. Webinar hướng tới sinh viên trên toàn quốc và được tổ chức theo hình thức trực tuyến."
  },
  {
    question: "Webinar có bắt buộc nếu muốn thi The Banker 2026 không?",
    answer:
      "Webinar là bước đệm kiến thức quan trọng trước cuộc thi. Thể lệ chính thức của cuộc thi sẽ được Ban tổ chức công bố riêng."
  }
];

function Reveal({
  children,
  className,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <Reveal className="mb-12">
      <Badge
        className={cn(
          light && "border-white/20 bg-white/10 text-banker-light"
        )}
      >
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </Badge>
      <h2
        className={cn(
          "mt-5 max-w-3xl text-balance text-4xl font-black md:text-5xl",
          light ? "text-white" : "text-banker-navy"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-3xl text-base leading-8 md:text-lg",
            light ? "text-white/[0.72]" : "text-banker-navy/[0.68]"
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

function WebinarHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToRegister = () => {
    document
      .querySelector("#dang-ky-webinar")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: "Tổng quan", href: "#tong-quan" },
    { label: "Nội dung", href: "#noi-dung" },
    { label: "Lịch trình", href: "#lich-trinh" },
    { label: "Cuộc thi", href: "/" }
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/[0.9] shadow-[0_12px_36px_rgba(11,31,58,0.06)] backdrop-blur-2xl">
      <nav className="section-shell flex h-20 items-center justify-between">
        <a className="flex items-center gap-3" href="/webinar">
          <img
            alt="The Banker logo"
            className="h-12 w-8 object-contain"
            src="/images/the-banker-key-visual.png"
          />
          <span className="leading-tight">
            <span className="block text-sm font-black tracking-[0.2em] text-banker-navy">
              THE BANKER
            </span>
            <span className="block text-xs font-bold text-banker-orange">
              Webinar 2026
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              className="rounded-full px-4 py-2 text-sm font-bold text-banker-navy/[0.76] transition hover:bg-banker-light/35 hover:text-banker-orange"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            aria-label="Facebook Group The Banker 2026"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-[0_10px_28px_rgba(24,119,242,0.24)] transition hover:-translate-y-0.5"
            href={facebookGroupUrl}
            rel="noreferrer"
            target="_blank"
            title="Facebook Group The Banker 2026"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <Button onClick={scrollToRegister}>Đăng ký webinar</Button>
        </div>

        <button
          aria-label="Mở menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white text-banker-navy shadow-sm lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-banker-orange/10 bg-white px-4 py-4 shadow-premium lg:hidden">
          <div className="mx-auto flex max-w-xl flex-col gap-2">
            {links.map((link) => (
              <a
                className="rounded-[8px] px-4 py-3 text-sm font-bold text-banker-navy hover:bg-banker-light/35"
                href={link.href}
                key={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#1877F2] px-5 text-sm font-bold text-white"
              href={facebookGroupUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Facebook className="h-4 w-4" />
              Facebook Group
            </a>
            <a
              className="inline-flex h-11 items-center justify-center rounded-full bg-banker-orange px-5 text-sm font-bold text-white"
              href="#dang-ky-webinar"
              onClick={() => setIsOpen(false)}
            >
              Đăng ký webinar
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      <img
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/images/hero-background.png"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,248,241,0.98)_0%,rgba(255,248,241,0.88)_47%,rgba(255,248,241,0.18)_75%,rgba(255,248,241,0.03)_100%)]" />
      <div className="section-shell relative z-10 grid min-h-[calc(100svh-6rem)] gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-3xl">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <Badge>
              <Radio className="h-3.5 w-3.5" />
              Webinar Kick-off The Banker 2026
            </Badge>
          </motion.div>
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="mt-7 text-balance text-5xl font-black leading-[0.98] text-banker-navy sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 28 }}
            transition={{ delay: 0.08, duration: 0.7 }}
          >
            OPEN BANKING
            <span className="mt-3 block text-[0.48em] leading-tight text-banker-orange">
              Kiến tạo hệ sinh thái mở
            </span>
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-2xl text-base font-medium leading-8 text-banker-navy/[0.72] md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.16, duration: 0.65 }}
          >
            Buổi chia sẻ trực tuyến từ Trường Đại học Ngoại thương, mở ra góc
            nhìn toàn diện về dữ liệu, API và tương lai của hệ sinh thái tài
            chính mở.
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.24, duration: 0.65 }}
          >
            {webinarFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div
                  className="flex items-center gap-2 rounded-full border border-white/80 bg-white/[0.86] px-4 py-3 text-sm font-bold text-banker-navy shadow-sm backdrop-blur-xl"
                  key={fact.label}
                >
                  <Icon className="h-4 w-4 text-banker-orange" />
                  {fact.label}
                </div>
              );
            })}
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.32, duration: 0.65 }}
          >
            <Button
              onClick={() =>
                document
                  .querySelector("#dang-ky-webinar")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              size="lg"
            >
              Đăng ký xem trực tiếp
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              onClick={() =>
                document
                  .querySelector("#noi-dung")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              size="lg"
              variant="secondary"
            >
              Xem nội dung
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="relative mx-auto w-full max-w-md lg:ml-auto"
          initial={{ opacity: 0, x: 32 }}
          transition={{ delay: 0.22, duration: 0.75 }}
        >
          <div className="glass-border rounded-[8px] border border-white/75 bg-white/[0.82] p-6 shadow-premium backdrop-blur-2xl md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-banker-orange">
                  Live Webinar
                </p>
                <p className="mt-2 text-3xl font-black text-banker-navy">
                  14.07.2026
                </p>
              </div>
              <motion.img
                alt="2026"
                animate={{ rotate: [-4, 0, -4] }}
                className="w-28"
                src="/images/year-2026.png"
                transition={{ duration: 5, repeat: Infinity }}
              />
            </div>
            <div className="mt-8 space-y-3">
              <div className="flex items-center justify-between border-b border-banker-orange/10 pb-3">
                <span className="text-sm font-bold text-banker-navy/[0.6]">
                  Thời gian
                </span>
                <span className="font-black text-banker-navy">
                  19:00 - 21:00
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-banker-orange/10 pb-3">
                <span className="text-sm font-bold text-banker-navy/[0.6]">
                  Hình thức
                </span>
                <span className="font-black text-banker-navy">Trực tuyến</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function OverviewSection() {
  return (
    <section className="py-24" id="tong-quan">
      <div className="section-shell">
        <SectionHeading
          description="Open Banking không chỉ là một xu hướng công nghệ. Đây là nền tảng kết nối ngân hàng, fintech và doanh nghiệp để cùng tạo ra những dịch vụ tài chính tốt hơn cho người dùng."
          eyebrow="Tổng quan"
          title="Bước vào kỷ nguyên tài chính mở"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((outcome, index) => {
            const Icon = outcome.icon;
            return (
              <Reveal delay={index * 0.07} key={outcome.title}>
                <div className="h-full border-t-2 border-banker-orange bg-white/[0.5] px-1 py-6">
                  <Icon className="h-8 w-8 text-banker-orange" />
                  <h3 className="mt-5 text-xl font-black text-banker-navy">
                    {outcome.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-banker-navy/[0.66]">
                    {outcome.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContentSection() {
  return (
    <section className="relative overflow-hidden py-24" id="noi-dung">
      <img
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/images/mountain-background.png"
      />
      <div className="absolute inset-0 bg-white/[0.78]" />
      <div className="section-shell relative z-10">
        <SectionHeading
          description="Hai phần nội dung đi từ nền tảng chia sẻ dữ liệu tới bối cảnh pháp lý, triển khai và cơ hội nghề nghiệp tại Việt Nam."
          eyebrow="Nội dung chuyên môn"
          title="Từ Data Sharing tới Open Banking"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[8px] border border-banker-orange/15 bg-white/[0.84] p-6 shadow-premium backdrop-blur-xl md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-banker-orange">
                Phần 1 · 30 phút
              </p>
              <h3 className="mt-4 text-2xl font-black text-banker-navy">
                From Data Sharing to Open Banking
              </h3>
              <ul className="mt-6 space-y-4">
                {[
                  "Từ chia sẻ dữ liệu đến chia sẻ giá trị",
                  "Sự hình thành và phát triển của Open Banking",
                  "Mối quan hệ giữa ngân hàng, fintech/SaaS và khách hàng",
                  "Cân bằng bảo mật dữ liệu và trải nghiệm thanh toán nhanh"
                ].map((item) => (
                  <li
                    className="flex items-start gap-3 text-sm leading-7 text-banker-navy/[0.7]"
                    key={item}
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-banker-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-[8px] border border-banker-orange/15 bg-banker-navy p-6 text-white shadow-premium md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-banker-light">
                Phần 2 · 30 phút
              </p>
              <h3 className="mt-4 text-2xl font-black">
                Stepping into Open Banking
              </h3>
              <ul className="mt-6 space-y-4">
                {[
                  "Hành lang pháp lý và các bước chuẩn hóa tại Việt Nam",
                  "Thực trạng triển khai và những điểm chạm nổi bật",
                  "So sánh với các thị trường phát triển",
                  "Cơ hội việc làm và năng lực cần chuẩn bị"
                ].map((item) => (
                  <li
                    className="flex items-start gap-3 text-sm leading-7 text-white/[0.76]"
                    key={item}
                  >
                    <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-banker-light" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AgendaSection() {
  return (
    <section className="py-24" id="lich-trinh">
      <div className="section-shell">
        <SectionHeading
          description="Hai giờ nội dung cô đọng, có thời gian trao đổi trực tiếp để người tham dự đặt câu hỏi cùng diễn giả."
          eyebrow="Agenda"
          title="Lịch trình webinar"
        />
        <div className="border-y border-banker-orange/15">
          {agenda.map((item, index) => (
            <Reveal delay={index * 0.05} key={item.time}>
              <div className="grid gap-3 border-b border-banker-orange/10 px-2 py-5 last:border-b-0 md:grid-cols-[180px_110px_1fr] md:items-center">
                <p className="font-black text-banker-orange">{item.time}</p>
                <p className="text-sm font-bold text-banker-navy/[0.52]">
                  {item.duration}
                </p>
                <h3 className="text-lg font-black text-banker-navy">
                  {item.title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompetitionBridge() {
  return (
    <section className="relative overflow-hidden bg-banker-navy py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_30%,rgba(255,107,0,0.34),transparent_28rem)]" />
      <div className="section-shell relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <Reveal>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-banker-light">
            Bước tiếp theo
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black md:text-5xl">
            Từ kiến thức webinar tới bài toán thực chiến
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/[0.72]">
            Webinar là bước đệm chính thức trước cuộc thi The Banker 2026,
            nơi sinh viên phát triển ý tưởng và giải pháp cho hệ sinh thái tài
            chính tương lai.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <a
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-banker-orange px-7 text-base font-bold text-white shadow-glow transition hover:-translate-y-0.5"
            href="/"
          >
            Xem trang cuộc thi
            <ExternalLink className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function RegistrationSection() {
  return (
    <section className="relative overflow-hidden py-24" id="dang-ky-webinar">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,107,0,0.17),transparent_30rem),radial-gradient(circle_at_82%_70%,rgba(217,164,65,0.15),transparent_28rem)]" />
      <div className="section-shell relative z-10">
        <SectionHeading
          description="Hoàn tất thông tin để Ban tổ chức xác nhận chỗ và gửi hướng dẫn truy cập webinar."
          eyebrow="Registration"
          title="Đăng ký xem webinar trực tiếp"
        />
        <Reveal>
          <div className="glass-border rounded-[8px] border border-white/75 bg-white/[0.72] p-5 shadow-premium backdrop-blur-2xl md:p-8">
            <WebinarRegistrationForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24">
      <div className="section-shell max-w-4xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Câu hỏi thường gặp"
        />
        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const open = openIndex === index;
            return (
              <div
                className="overflow-hidden rounded-[8px] border border-banker-orange/10 bg-white/[0.72] shadow-sm"
                key={item.question}
              >
                <button
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left text-base font-black text-banker-navy"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                >
                  {item.question}
                  <MessageCircle
                    className={cn(
                      "h-5 w-5 shrink-0 text-banker-orange transition",
                      open && "rotate-12"
                    )}
                  />
                </button>
                {open ? (
                  <motion.p
                    animate={{ opacity: 1, height: "auto" }}
                    className="px-5 pb-5 text-sm leading-7 text-banker-navy/[0.68]"
                    initial={{ opacity: 0, height: 0 }}
                  >
                    {item.answer}
                  </motion.p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WebinarFooter() {
  return (
    <footer className="bg-banker-navy py-12 text-white">
      <div className="section-shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em]">
            The Banker 2026
          </p>
          <p className="mt-2 text-sm text-white/[0.62]">
            Câu lạc bộ Nhà Ngân hàng Tương lai FBN - FTU
          </p>
          <p className="mt-4 text-xs text-white/[0.48]">
            © 2026 The Banker. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-bold text-white transition hover:border-[#1877F2] hover:bg-[#1877F2]"
            href={facebookGroupUrl}
            rel="noreferrer"
            target="_blank"
          >
            <Facebook className="h-4 w-4" />
            Facebook Group
          </a>
          <a
            className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-bold text-white transition hover:border-banker-orange hover:bg-banker-orange"
            href="/"
          >
            Trang cuộc thi
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export function WebinarPage() {
  return (
    <main>
      <WebinarHeader />
      <HeroSection />
      <OverviewSection />
      <ContentSection />
      <AgendaSection />
      <CompetitionBridge />
      <RegistrationSection />
      <FaqSection />
      <WebinarFooter />
    </main>
  );
}
