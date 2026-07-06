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
  ExternalLink,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Ticket
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

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 64]);

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
      id="trang-chu"
    >
      <img
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/images/hero-background.png"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,248,241,0.97)_0%,rgba(255,248,241,0.84)_38%,rgba(255,248,241,0.12)_67%,rgba(255,248,241,0.02)_100%)]" />
      <img
        alt=""
        className="pointer-events-none absolute inset-x-0 bottom-[-13%] z-[2] h-[48%] w-full object-contain object-bottom opacity-65"
        src="/images/rock-foreground.png"
      />
      <motion.div
        className="section-shell relative z-10 grid min-h-[calc(100svh-6rem)] gap-8 py-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-center"
        style={{ y }}
      >
        <div className="relative max-w-5xl">
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
          <motion.img
            alt="The Banker 2026"
            animate={{ y: [0, -7, 0], rotate: [-5, -2, -5] }}
            className="absolute right-0 top-0 w-24 drop-shadow-[0_12px_18px_rgba(96,28,6,0.24)] sm:w-32 lg:hidden"
            src="/images/year-2026.png"
            transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="font-banker-display mt-7 whitespace-nowrap text-[clamp(2.85rem,12vw,7.1rem)] font-normal uppercase leading-none tracking-normal text-[#a92c13] [text-shadow:0_3px_0_#4b170b,0_10px_30px_rgba(121,35,10,0.28)] lg:text-[clamp(4rem,8.4vw,7.1rem)]"
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.08, duration: 0.7 }}
          >
            THE BANKER
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 max-w-2xl text-balance text-xl font-bold leading-8 text-banker-navy md:text-2xl"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.16, duration: 0.68 }}
          >
            “Kiến tạo Ngân hàng Mở”
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 inline-flex rounded-full border border-banker-orange/25 bg-white/[0.82] px-5 py-3 text-base font-black uppercase tracking-[0.22em] text-banker-orange shadow-glow backdrop-blur-xl"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.24, duration: 0.68 }}
          >
            Mở đơn đăng ký dự thi
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.32, duration: 0.68 }}
          >
            {eventDetails
              .filter((detail) => detail.label !== "Đồng hành cùng MSB")
              .map((detail) => {
                const Icon = detail.icon;
                return (
                  <div
                    className="flex items-center gap-2 rounded-full border border-white/70 bg-white/[0.82] px-4 py-3 text-sm font-bold text-banker-navy shadow-sm backdrop-blur-xl"
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
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative hidden min-h-[500px] lg:block"
          initial={{ opacity: 0, y: 24 }}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          <motion.img
            alt="The Banker 2026"
            animate={{ y: [0, -10, 0], rotate: [-5, -2, -5] }}
            className="absolute right-2 top-[12%] w-52 drop-shadow-[0_18px_25px_rgba(96,28,6,0.3)]"
            src="/images/year-2026.png"
            transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
          />
          <div className="absolute bottom-[18%] right-0 flex items-center gap-4 rounded-[8px] border border-white/70 bg-white/[0.84] p-4 shadow-premium backdrop-blur-xl">
            <span className="rounded-full bg-banker-navy px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
              Đồng hành cùng
            </span>
            <img
              alt="MSB logo"
              className="h-9 w-28 object-contain"
              src="/images/msb-logo.png"
            />
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
        <div className="grid gap-4 md:grid-cols-3">
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
    <section className="relative overflow-hidden py-24" id="hanh-trinh">
      <img
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/images/mountain-background.png"
      />
      <div className="absolute inset-0 bg-white/[0.68]" />
      <div className="section-shell relative z-10">
        <SectionTitle
          description="Bốn vòng thi liên tiếp, từ hoàn thiện hồ sơ tới phát triển và bảo vệ giải pháp ngân hàng hiện đại."
          eyebrow="Roadmap"
          title="Hành trình cuộc thi"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <Reveal delay={index * 0.09} key={stage.title}>
                <div className="round-panel group h-full transition duration-300 hover:-translate-y-2">
                  <div className="round-panel-shell h-full">
                    <div className="round-panel-inner">
                      <Icon className="mx-auto mb-3 h-6 w-6 text-[#ffd39a]" />
                      <h3 className="text-2xl font-black uppercase">
                        {stage.title}
                      </h3>
                      <p className="mt-1 text-lg font-bold text-[#ffe0b8]">
                        {stage.date}
                      </p>
                      <p className="mt-4 text-sm font-black uppercase tracking-[0.08em]">
                        {stage.subtitle}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/[0.82]">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
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
        <div className="flex flex-wrap items-start justify-center gap-x-12 gap-y-16">
          {sponsorTiers.map((tier, index) => (
            <Reveal delay={index * 0.05} key={tier.tier}>
              <div className="flex flex-col items-center">
                <h3 className="mb-6 text-[15px] font-black text-banker-navy text-center uppercase tracking-[0.15em]">
                  {tier.tier}
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                  {tier.logos.map((logo, logoIndex) => {
                    const ImageEl = (
                      <img
                        alt={logo.name}
                        className={cn(
                          "h-12 w-auto max-w-[12rem] object-contain mix-blend-multiply sm:h-14",
                          logo.name === "MSB" ? "h-14 sm:h-16" : "",
                          logo.name === "SAPP" ? "h-14 sm:h-16 scale-125" : "",
                          logo.name === "Tingee" ? "h-14 sm:h-16 scale-125" : "",
                          logo.name === "FBF" ? "h-16 sm:h-20" : ""
                        )}
                        src={logo.src}
                      />
                    );

                    return (
                      <div
                        className="flex items-center justify-center transition hover:scale-105"
                        key={`${logo.name}-${logoIndex}`}
                      >
                        {logo.href ? (
                          <a href={logo.href} target="_blank" rel="noopener noreferrer" className="block">
                            {ImageEl}
                          </a>
                        ) : (
                          ImageEl
                        )}
                      </div>
                    );
                  })}
                </div>
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
        <div className="text-center mb-10">
          <h2 className="text-[28px] md:text-4xl font-black uppercase text-banker-navy tracking-wide">
            Đăng ký dự thi<br/>
            The Banker 2026
          </h2>
        </div>
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
              <a className="flex items-center gap-3 hover:text-white" href="tel:0342955344">
                <Phone className="h-4 w-4 text-banker-light" />
                0342 955 344
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
              {[
                {
                  label: "Facebook Group",
                  href: "https://www.facebook.com/groups/1803549783273975/"
                }
              ].map((item) => (
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-bold text-white/76 transition hover:border-banker-orange/60 hover:text-white"
                  href={item.href}
                  key={item.label}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                >
                  <Globe2 className="h-4 w-4 text-banker-light" />
                  {item.label}
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
          © 2026 The Banker. All rights reserved. | Made by{" "}
          <a
            href="https://www.facebook.com/viet.phan.694890/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition underline underline-offset-4 decoration-white/20"
          >
            Viet Phan
          </a>
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

      <SponsorsSection />
      <RegistrationSection />
      <FAQSection />
      <SiteFooter />
    </main>
  );
}
