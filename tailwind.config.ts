import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        banker: {
          orange: "#FF6B00",
          amber: "#FF8C1A",
          light: "#FFD8B5",
          navy: "#0B1F3A",
          gold: "#D9A441",
          cream: "#FFF8F1",
          ink: "#10233D"
        }
      },
      boxShadow: {
        glow: "0 0 32px rgba(255, 107, 0, 0.28)",
        premium: "0 24px 80px rgba(11, 31, 58, 0.14)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(0, -18px, 0) rotate(3deg)" }
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(255, 107, 0, 0)" },
          "50%": { boxShadow: "0 0 44px rgba(255, 107, 0, 0.32)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        gradient: "gradientShift 14s ease infinite",
        marquee: "marquee 28s linear infinite",
        pulseGlow: "pulseGlow 3.6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
