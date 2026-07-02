"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);
  const scrollToRegister = () => {
    document.querySelector("#dang-ky")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-white/60 bg-white/86 shadow-[0_16px_48px_rgba(11,31,58,0.08)] backdrop-blur-2xl"
          : "bg-white/34 backdrop-blur-xl"
      )}
    >
      <nav className="section-shell flex h-20 items-center justify-between">
        <a
          className="group flex items-center gap-3"
          href="#trang-chu"
          onClick={closeMenu}
          aria-label="The Banker 2026"
        >
          <span className="relative flex h-12 w-12 items-center justify-center rounded-[8px] bg-white shadow-glow">
            <img
              alt="The Banker logo"
              className="h-11 w-8 object-contain"
              src="/images/the-banker-key-visual.png"
            />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-black tracking-[0.22em] text-banker-navy">
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
              className="rounded-full px-4 py-2 text-sm font-bold text-banker-navy/78 transition hover:bg-white/65 hover:text-banker-orange"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button onClick={scrollToRegister}>Đăng ký dự thi</Button>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/70 text-banker-navy shadow-sm lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Mở menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-white/60 bg-white/92 px-4 py-4 shadow-premium backdrop-blur-2xl lg:hidden">
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
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-banker-orange px-5 text-sm font-bold text-white shadow-glow"
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
