"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useScroll,
  useTransform
} from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  ChevronDown,
  CreditCard,
  Database,
  ExternalLink,
  Globe2,
  Mail,
  MapPin,
  Phone,
  QrCode,
  Smartphone,
  Sparkles,
  Ticket,
  Wallet
} from "lucide-react";
import { RegistrationForm } from "@/components/RegistrationForm";
import { SiteHeader } from "@/components/SiteHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  agenda,
  eventDetails,
  faqItems,
  journey,
  speakers,
  sponsorTiers,
  stats
} from "@/data/site";
import { cn } from "@/lib/utils";

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
      initial={{ opacity: 0, y: 34 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center"
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={cn(
        "mx-auto mb-12 max-w-3xl",
        align === "center" ? "text-center" : "mx-0 text-left"
      )}
    >
      {eyebrow ? (
        <Badge className={align === "center" ? "justify-center" : ""}>
          <Sparkles className="h-3.5 w-3.5" />
          {eyebrow}
        </Badge>
      ) : null}
      <h2 className="mt-5 text-balance text-4xl font-black tracking-normal text-banker-navy md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-banker-navy/68 md:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

function AnimatedCounter({
  value,
  suffix
}: {
  value: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) {
      return;
    }

    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setCount(Math.round(latest))
    });

    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString("vi-VN")}
      {suffix}
    </span>
  );
}

function HeroScene() {
  const floatingItems = [
    {
      icon: CreditCard,
      className: "left-[6%] top-[22%] h-28 w-44 rotate-[-12deg]",
      label: "AI Card",
      delay: 0
    },
    {
      icon: Wallet,
      className: "right-[9%] top-[18%] h-32 w-32 rotate-[10deg]",
      label: "Wallet",
      delay: 0.5
    },
    {
      icon: Database,
      className: "left-[12%] bottom-[18%] h-24 w-24 rotate-[14deg]",
      label: "Data",
      delay: 0.8
    },
    {
      icon: Smartphone,
      className: "right-[18%] bottom-[16%] h-40 w-24 rotate-[-8deg]",
      label: "Mobile",
      delay: 1.1
    },
    {
      icon: QrCode,
      className: "left-[50%] top-[16%] hidden h-24 w-24 rotate-[8deg] md:flex",
      label: "QR",
      delay: 1.4
    }
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-banker-orange/12 blur-3xl" />
      <div className="absolute left-[8%] top-[18%] h-24 w-24 rounded-full bg-banker-gold/25 blur-2xl" />
      <div className="absolute bottom-[14%] right-[18%] h-28 w-28 rounded-full bg-banker-light/70 blur-2xl" />

      <motion.div
        animate={{ rotate: 360 }}
        className="absolute left-1/2 top-[52%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-banker-orange/14"
        transition={{ duration: 34, ease: "linear", repeat: Infinity }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        className="absolute left-1/2 top-[52%] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-banker-gold/18"
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      />
      <motion.img
        alt=""
        animate={{ y: [0, -16, 0], rotate: [0, 3, 0] }}
        className="absolute left-[45%] top-[31%] hidden h-44 w-28 object-contain opacity-95 drop-shadow-2xl md:block"
        src="/images/the-banker-key-visual.png"
        transition={{ duration: 6.2, ease: "easeInOut", repeat: Infinity }}
      />

      {floatingItems.map((item) => {
        const Icon = item.icon;
        return (
          <motion.div
            animate={{ y: [0, -18, 0], rotate: [0, 3, 0] }}
            className={cn(
              "absolute hidden items-center justify-center rounded-[8px] border border-white/70 bg-white/50 shadow-premium backdrop-blur-xl sm:flex",
              item.className
            )}
            key={item.label}
            transition={{
              duration: 5.8,
              delay: item.delay,
              ease: "easeInOut",
              repeat: Infinity
            }}
          >
            <div className="absolute inset-0 rounded-[8px] bg-gradient-to-br from-white/70 via-banker-light/45 to-banker-orange/12" />
            <Icon className="relative h-10 w-10 text-banker-orange drop-shadow" />
          </motion.div>
        );
      })}
    </div>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 80]);

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
      id="trang-chu"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#fff8f1_0%,#fff1e3_28%,#ffd8b5_58%,#ffffff_100%)] bg-[length:220%_220%] animate-gradient" />
      <HeroScene />
      <motion.div
        className="section-shell relative z-10 grid gap-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
        style={{ y }}
      >
        <div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.65 }}
          >
            <Badge>
              <Sparkles className="h-3.5 w-3.5" />
              The Banker 2026
            </Badge>
          </motion.div>
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 max-w-4xl text-[clamp(3.6rem,10.8vw,8rem)] font-black uppercase leading-[0.88] tracking-normal text-banker-navy"
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.08, duration: 0.7 }}
          >
            THE
            <span className="block bg-gradient-to-r from-banker-orange via-banker-amber to-banker-gold bg-clip-text text-transparent">
              BANKER
            </span>
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-2xl text-balance text-xl font-bold leading-8 text-banker-navy md:text-2xl"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.16, duration: 0.68 }}
          >
            “Tái định hình tương lai ngân hàng số”
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 inline-flex rounded-full border border-banker-orange/25 bg-white/74 px-5 py-3 text-base font-black uppercase tracking-[0.22em] text-banker-orange shadow-glow backdrop-blur-xl"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.24, duration: 0.68 }}
          >
            Mở đơn đăng ký dự thi
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.32, duration: 0.68 }}
          >
            {eventDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <div
                  className="flex items-center gap-2 rounded-full border border-white/70 bg-white/72 px-4 py-3 text-sm font-bold text-banker-navy shadow-sm backdrop-blur-xl"
                  key={detail.label}
                >
                  <Icon className="h-4 w-4 text-banker-orange" />
                  {detail.label}
                </div>
              );
            })}
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-7 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.4, duration: 0.68 }}
          >
            <Button
              onClick={() =>
                document
                  .querySelector("#dang-ky")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              size="lg"
            >
              Đăng ký dự thi
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              onClick={() =>
                document
                  .querySelector("#thong-tin-cuoc-thi")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              size="lg"
              variant="secondary"
            >
              Xem thể lệ
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="relative min-h-[390px] lg:min-h-[500px]"
          initial={{ opacity: 0, x: 40 }}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          <div className="absolute inset-x-8 bottom-10 top-4 rotate-3 rounded-[8px] bg-banker-orange/20 blur-2xl" />
          <div className="glass-border relative mx-auto flex min-h-[420px] max-w-[400px] flex-col justify-between rounded-[8px] border border-white/70 bg-white/54 p-6 shadow-premium backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-banker-navy px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
                MSB Partner
              </span>
              <img
                alt="MSB logo"
                className="h-8 w-28 object-contain"
                src="/images/msb-logo.png"
              />
            </div>
            <div className="py-10">
              <div className="mx-auto flex h-48 w-28 rotate-[-8deg] flex-col rounded-[28px] border border-banker-navy/10 bg-banker-navy p-3 shadow-premium">
                <div className="mx-auto mb-5 h-1.5 w-10 rounded-full bg-white/30" />
                <div className="flex flex-1 flex-col justify-between rounded-[20px] bg-gradient-to-br from-banker-orange via-banker-amber to-banker-gold p-4 text-white">
                  <Smartphone className="h-7 w-7" />
                  <div>
                    <p className="text-xs font-bold opacity-80">Digital Banking</p>
                    <p className="text-2xl font-black">2026</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Open API", "AI Scoring", "eKYC", "Data Trust"].map((item) => (
                <div
                  className="rounded-[8px] border border-white/75 bg-white/70 px-4 py-3 text-sm font-black text-banker-navy shadow-sm"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutVisual() {
  return (
    <Reveal className="relative min-h-[520px]">
      <div className="absolute inset-8 rounded-full bg-banker-orange/12 blur-3xl" />
      <div className="glass-border absolute left-3 top-10 w-[78%] rounded-[8px] bg-white/70 p-5 shadow-premium backdrop-blur-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-banker-orange">
              The Banker OS
            </p>
            <p className="mt-1 text-lg font-black text-banker-navy">
              Digital banking case hub
            </p>
          </div>
          <BrainCircuit className="h-8 w-8 text-banker-orange" />
        </div>
        <div className="space-y-3">
          {[74, 92, 61].map((width, index) => (
            <div className="h-3 rounded-full bg-banker-light/65" key={width}>
              <motion.div
                className="h-3 rounded-full bg-gradient-to-r from-banker-orange to-banker-gold"
                initial={{ width: 0 }}
                transition={{ delay: 0.25 + index * 0.16, duration: 1.1 }}
                viewport={{ once: true }}
                whileInView={{ width: `${width}%` }}
              />
            </div>
          ))}
        </div>
      </div>
      <motion.div
        animate={{ y: [0, -14, 0] }}
        className="glass-border absolute bottom-10 right-2 w-[70%] rounded-[8px] bg-banker-navy p-5 text-white shadow-premium"
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-banker-orange">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white/65">Transformation score</p>
            <p className="text-3xl font-black">98.6</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs font-bold text-white/70">
          <span className="rounded-[8px] bg-white/10 py-2">AI</span>
          <span className="rounded-[8px] bg-white/10 py-2">API</span>
          <span className="rounded-[8px] bg-white/10 py-2">CX</span>
        </div>
      </motion.div>
      <motion.div
        animate={{ rotate: [0, 6, 0], y: [0, 12, 0] }}
        className="absolute right-10 top-4 flex h-24 w-24 items-center justify-center rounded-[8px] border border-white/80 bg-white/74 text-banker-orange shadow-premium backdrop-blur-xl"
        transition={{ duration: 6.5, ease: "easeInOut", repeat: Infinity }}
      >
        <CreditCard className="h-10 w-10" />
      </motion.div>
    </Reveal>
  );
}

function AboutSection() {
  return (
    <section className="py-24" id="ve-chung-toi">
      <div className="section-shell grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionTitle
            align="left"
            description="Một sân chơi học thuật nơi sinh viên tiếp cận tài chính - ngân hàng bằng tư duy dữ liệu, công nghệ và chiến lược kinh doanh hiện đại."
            eyebrow="Về chúng tôi"
            title="Về The Banker"
          />
          <Reveal className="space-y-5 text-base leading-8 text-banker-navy/72" delay={0.12}>
            <p>
              The Banker là cuộc thi chuyên môn về tài chính - ngân hàng do CLB
              Nhà Ngân hàng Tương Lai FBN, Trường Đại học Ngoại thương tổ chức.
              Qua nhiều mùa, chương trình đã trở thành một điểm hẹn học thuật
              uy tín cho sinh viên yêu thích ngành ngân hàng trên phạm vi toàn
              quốc.
            </p>
            <p>
              Với sự đồng hành của MSB, The Banker 2026 đặt trọng tâm vào
              chuyển đổi số ngân hàng: trải nghiệm khách hàng, dữ liệu, bảo mật,
              AI, open banking và những mô hình kinh doanh mới đang thay đổi
              cách thế hệ trẻ tương tác với tài chính.
            </p>
            <div className="grid gap-3 pt-3 sm:grid-cols-2">
              {["National student competition", "MSB partnership", "Digital transformation focus", "Future-ready banking talents"].map((item) => (
                <div
                  className="flex items-center gap-3 rounded-[8px] border border-banker-orange/12 bg-white/65 px-4 py-3 font-bold text-banker-navy shadow-sm backdrop-blur"
                  key={item}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-banker-orange shadow-glow" />
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <AboutVisual />
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-20" id="thong-tin-cuoc-thi">
      <div className="section-shell">
        <SectionTitle
          description="Những con số cho thấy quy mô, chất lượng chuyên môn và sức lan tỏa của hành trình The Banker."
          eyebrow="Competition Statistics"
          title="Dấu ấn cuộc thi"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Reveal delay={index * 0.08} key={stat.label}>
                <Card className="group h-full p-6 transition hover:-translate-y-2 hover:border-banker-orange/30 hover:shadow-glow">
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-[8px] bg-banker-orange/10 text-banker-orange transition group-hover:bg-banker-orange group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-4xl font-black text-banker-navy">
                    <AnimatedCounter suffix={stat.suffix} value={stat.value} />
                  </p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-banker-navy/54">
                    {stat.label}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section className="py-24" id="hanh-trinh">
      <div className="section-shell">
        <SectionTitle
          description="Từ hồ sơ đăng ký tới sân khấu chung kết, mỗi vòng thi được thiết kế để thử thách tư duy ngân hàng hiện đại."
          eyebrow="Roadmap"
          title="Hành trình cuộc thi"
        />
        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-banker-orange/20 md:left-0 md:right-0 md:top-12 md:block md:h-px md:w-full" />
          <div className="grid gap-5 md:grid-cols-5">
            {journey.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <Reveal delay={index * 0.09} key={stage.title}>
                  <div className="group relative h-full rounded-[8px] border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition hover:-translate-y-2 hover:border-banker-orange/30 hover:shadow-glow">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-banker-orange text-white shadow-glow">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.18em] text-banker-orange">
                      Chặng {index + 1}
                    </span>
                    <h3 className="mt-3 text-xl font-black text-banker-navy">
                      {stage.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-banker-navy/64">
                      {stage.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinaleSection() {
  return (
    <section className="relative overflow-hidden py-24" id="quy-trinh-du-thi">
      <div className="absolute inset-0 bg-banker-navy" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,107,0,0.42),transparent_32rem),radial-gradient(circle_at_86%_20%,rgba(217,164,65,0.28),transparent_30rem)]" />
      <div className="section-shell relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <Reveal>
            <Badge className="border-white/20 bg-white/10 text-banker-light">
              <Ticket className="h-3.5 w-3.5" />
              Competition Registration
            </Badge>
            <h2 className="mt-6 text-balance text-5xl font-black text-white md:text-6xl">
              Thông tin đăng ký dự thi
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/72">
              Hoàn tất hồ sơ để bước vào hành trình The Banker 2026, từ vòng
              sàng lọc tới các thử thách chuyên môn về tài chính, ngân hàng số
              và giải pháp fintech cùng MSB.
            </p>
            <div className="mt-8 space-y-3">
              {eventDetails.map((detail) => {
                const Icon = detail.icon;
                return (
                  <div
                    className="flex items-center gap-3 rounded-[8px] border border-white/12 bg-white/10 px-4 py-3 text-base font-bold text-white backdrop-blur-xl"
                    key={detail.label}
                  >
                    <Icon className="h-5 w-5 text-banker-light" />
                    {detail.label}
                  </div>
                );
              })}
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {agenda.map((item, index) => (
              <Reveal delay={index * 0.07} key={item.time}>
                <div className="group h-full rounded-[8px] border border-white/12 bg-white/10 p-5 text-white backdrop-blur-xl transition hover:-translate-y-2 hover:border-banker-orange/55 hover:bg-white/16">
                  <p className="text-3xl font-black text-banker-light">
                    {item.time}
                  </p>
                  <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/68">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpeakersSection() {
  return (
    <section className="py-24">
      <div className="section-shell">
        <SectionTitle
          description="Hội đồng chuyên môn đại diện cho ngân hàng, fintech, đầu tư và quản trị rủi ro."
          eyebrow="Speakers & Judges"
          title="Diễn giả và Ban giám khảo"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {speakers.map((speaker, index) => {
            const Icon = speaker.icon;
            return (
              <Reveal delay={index * 0.08} key={speaker.name}>
                <Card className="group overflow-hidden p-4 transition hover:-translate-y-2 hover:border-banker-orange/30 hover:shadow-glow">
                  <div className="relative aspect-[4/4.4] overflow-hidden rounded-[8px] bg-gradient-to-br from-banker-light via-white to-banker-orange/18">
                    <div className="absolute inset-x-8 bottom-0 h-[70%] rounded-t-full bg-gradient-to-b from-banker-orange/35 to-banker-navy/88" />
                    <div className="absolute left-1/2 top-[24%] flex h-24 w-24 -translate-x-1/2 items-center justify-center rounded-full bg-white text-3xl font-black text-banker-orange shadow-premium">
                      {speaker.initials}
                    </div>
                    <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/78 text-banker-orange backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="pt-5">
                    <h3 className="text-xl font-black text-banker-navy">
                      {speaker.name}
                    </h3>
                    <p className="mt-2 text-sm font-bold text-banker-orange">
                      {speaker.position}
                    </p>
                    <p className="mt-1 text-sm text-banker-navy/58">
                      {speaker.company}
                    </p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SponsorMarquee({ logos }: { logos: string[] }) {
  const allLogos = [...logos, ...logos, ...logos];

  return (
    <div className="hide-scrollbar overflow-hidden">
      <div className="flex min-w-max animate-marquee gap-4 py-2">
        {allLogos.map((logo, index) => (
          <div
            className="flex h-16 min-w-44 items-center justify-center rounded-[8px] border border-banker-orange/12 bg-white/74 px-6 text-center text-sm font-black text-banker-navy shadow-sm backdrop-blur-xl"
            key={`${logo}-${index}`}
          >
            {logo === "MSB" ? (
              <img
                alt="MSB logo"
                className="h-10 w-32 object-contain"
                src="/images/msb-logo.png"
              />
            ) : (
              logo
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SponsorsSection() {
  return (
    <section className="py-24">
      <div className="section-shell">
        <SectionTitle
          description="Các đối tác đồng hành giúp cuộc thi có chiều sâu chuyên môn, góc nhìn thực tiễn và nhiều cơ hội kết nối nghề nghiệp."
          eyebrow="Sponsors"
          title="Đơn vị đồng hành"
        />
        <div className="space-y-6">
          {sponsorTiers.map((tier, index) => (
            <Reveal delay={index * 0.08} key={tier.tier}>
              <div className="rounded-[8px] border border-white/70 bg-white/58 p-5 shadow-sm backdrop-blur-xl">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-banker-orange shadow-glow" />
                  <h3 className="text-lg font-black text-banker-navy">
                    {tier.tier}
                  </h3>
                </div>
                <SponsorMarquee logos={tier.logos} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RegistrationSection() {
  return (
    <section className="relative overflow-hidden py-24" id="dang-ky">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,107,0,0.18),transparent_30rem),radial-gradient(circle_at_80%_70%,rgba(217,164,65,0.14),transparent_30rem)]" />
      <div className="section-shell relative z-10">
        <SectionTitle
          description="Hoàn tất hồ sơ cá nhân, thông tin học tập và minh chứng năng lực để đăng ký dự thi The Banker 2026."
          eyebrow="Registration"
          title="Đăng ký dự thi The Banker 2026"
        />
        <Reveal>
          <div className="glass-border rounded-[8px] border border-white/70 bg-white/62 p-5 shadow-premium backdrop-blur-2xl md:p-8">
            <RegistrationForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24">
      <div className="section-shell max-w-4xl">
        <SectionTitle
          description="Các câu hỏi thường gặp trước khi bạn hoàn tất đăng ký."
          eyebrow="FAQ"
          title="Câu hỏi thường gặp"
        />
        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal delay={index * 0.05} key={item.question}>
                <div className="overflow-hidden rounded-[8px] border border-white/70 bg-white/68 shadow-sm backdrop-blur-xl">
                  <button
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left text-base font-black text-banker-navy"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    {item.question}
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-banker-orange transition",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        initial={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                      >
                        <p className="px-5 pb-5 text-sm leading-7 text-banker-navy/68">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-banker-navy py-14 text-white">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-banker-orange text-lg font-black">
                B
              </span>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em]">
                  The Banker 2026
                </p>
                <p className="text-xs font-semibold text-white/58">
                  Mở đơn đăng ký
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/62">
              Tái định hình tương lai ngân hàng số cùng thế hệ tài năng trẻ Việt
              Nam và đối tác đồng hành MSB.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-banker-light">
              CLB Nhà Ngân hàng Tương Lai (FBN)
            </h3>
            <div className="mt-5 space-y-3 text-sm text-white/68">
              <a className="flex items-center gap-3 hover:text-white" href="mailto:thebanker.fbn@gmail.com">
                <Mail className="h-4 w-4 text-banker-light" />
                thebanker.fbn@gmail.com
              </a>
              <a className="flex items-center gap-3 hover:text-white" href="tel:0353037888">
                <Phone className="h-4 w-4 text-banker-light" />
                035 303 7888
              </a>
              <span className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-banker-light" />
                Trường Đại học Ngoại thương, Hà Nội
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-banker-light">
              Kết nối
            </h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {["Facebook", "Instagram", "LinkedIn"].map((item) => (
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-bold text-white/76 transition hover:border-banker-orange/60 hover:text-white"
                  href="#trang-chu"
                  key={item}
                >
                  <Globe2 className="h-4 w-4 text-banker-light" />
                  {item}
                </a>
              ))}
            </div>
            <a
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-banker-light hover:text-white"
              href="#dang-ky"
            >
              Đăng ký dự thi
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/52">
          © 2026 The Banker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export function HomePage() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <JourneySection />
      <FinaleSection />
      <SpeakersSection />
      <SponsorsSection />
      <RegistrationSection />
      <FAQSection />
      <SiteFooter />
    </main>
  );
}
