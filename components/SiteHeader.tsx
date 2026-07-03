"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const FACEBOOK_GROUP_URL = "https://www.facebook.com/groups/1803549783273975/";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.24 0-1.62.77-1.62 1.56v1.89h2.76l-.44 2.91h-2.32V22c4.78-.76 8.43-4.92 8.43-9.94Z" />
    </svg>
  );
}

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnDarkSection, setIsOnDarkSection] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => {
      setIsScrolled(window.scrollY > 18);

      const darkSection = document.querySelector("#quy-trinh-du-thi");
      if (!darkSection) {
        setIsOnDarkSection(false);
        return;
      }

      const bounds = darkSection.getBoundingClientRect();
      setIsOnDarkSection(bounds.top <= 80 && bounds.bottom > 0);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);

    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);
  const scrollToRegister = () => {
    document.querySelector("#dang-ky")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isOnDarkSection
          ? "border-b border-white/20 bg-banker-navy/[0.82] shadow-[0_16px_48px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
          : isScrolled
            ? "border-b border-white/60 bg-white/[0.86] shadow-[0_16px_48px_rgba(11,31,58,0.08)] backdrop-blur-2xl"
            : "bg-white/[0.34] backdrop-blur-xl"
      )}
    >
      <nav className="section-shell flex h-20 items-center justify-between">
        <a
          aria-label="The Banker 2026"
          className="group flex items-center gap-3"
          href="#trang-chu"
          onClick={closeMenu}
        >
          <span className="relative flex h-12 w-8 items-center justify-center">
            <img
              alt="The Banker logo"
              className="h-12 w-8 object-contain drop-shadow-[0_6px_12px_rgba(255,107,0,0.2)]"
              src="/images/the-banker-key-visual.png"
            />
          </span>
          <span className="leading-tight">
            <span
              className={cn(
                "block text-sm font-black tracking-[0.22em] transition-colors",
                isOnDarkSection ? "text-white" : "text-banker-navy"
              )}
            >
              THE BANKER
            </span>
            <span className="block text-xs font-semibold text-banker-orange">
              Mở đơn 2026
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              className={cn(
                "rounded-full px-4 py-2 text-sm font-bold transition",
                isOnDarkSection
                  ? "text-white hover:bg-white/15 hover:text-banker-light"
                  : "text-banker-navy/[0.78] hover:bg-white/[0.65] hover:text-banker-orange"
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            aria-label="Tham gia Facebook Group The Banker"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition hover:scale-105",
              isOnDarkSection
                ? "border-white/25 bg-white/10 text-white hover:bg-white/20"
                : "border-white/70 bg-white/75 text-[#1877F2] hover:bg-white"
            )}
            href={FACEBOOK_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon className="h-5 w-5" />
          </a>

          <Button onClick={scrollToRegister}>Đăng ký dự thi</Button>
        </div>

        <button
          aria-label="Mở menu"
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition lg:hidden",
            isOnDarkSection
              ? "border-white/30 bg-white/10 text-white"
              : "border-white/60 bg-white/70 text-banker-navy"
          )}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-white/60 bg-white/[0.94] px-4 py-4 shadow-premium backdrop-blur-2xl lg:hidden">
          <div className="mx-auto flex max-w-xl flex-col gap-2">
            {navItems.map((item) => (
              <a
                className="rounded-[8px] px-4 py-3 text-sm font-bold text-banker-navy transition hover:bg-banker-light/35"
                href={item.href}
                key={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}

            <a
              className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#1877F2]/20 bg-white px-5 text-sm font-bold text-[#1877F2] shadow-sm"
              href={FACEBOOK_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              <FacebookIcon className="h-5 w-5" />
              Facebook Group
            </a>

            <a
              className="inline-flex h-11 items-center justify-center rounded-full bg-banker-orange px-5 text-sm font-bold text-white shadow-glow"
              href="#dang-ky"
              onClick={closeMenu}
            >
              Đăng ký dự thi
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
