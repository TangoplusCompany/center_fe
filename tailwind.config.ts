import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 이제 className="font-bebas"로 사용할 수 있습니다.
        bebas: ['"Bebas Neue"', 'sans-serif'], 
      },
      // 💡 HSL 매핑 싹 지우고 직관적인 HEX 코드로 대입
      colors: {
        background: "#FFFFFF",
        foreground: "#0F172A",
        
        // 위험/경고 상태 컬러 (기존 HEX 기반)
        danger: '#FF4A4A',
        'danger-foreground': '#FFFFFF',
        'danger-background': '#FFEAEA',
        dangerDeep: "#953442",
        warning: '#FFA73A',
        'warning-foreground': '#FFFFFF',
        warningDeep: "#CC7B1C",

        sub100: "#F8F8F8",
        sub150: "#F5F5F5",
        sub200: "#EDEDED",
        sub300: "#DCDCDC",
        sub400: "#BBBBBB",
        sub600: "#7E7E7E",
        sub700: "#454545",
        sub750: "#7A828A",
        sub800: "#1D1D1D",
        
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0F172A",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#0F172A",
        },
        primary: {
          DEFAULT: "#F5F5F5",
          foreground: "#555555",
        },
        secondary: {
          DEFAULT: "#454545",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "#707070",
        },

        
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        border: "#E2E8F0",
        input: "#E2E8F0",
        ring: "#2563EB",
        
        mainBlue: {
          100: "#F1F5F9",
          300: "#5B93FF",
          600: "#2563EB",
          800: "#1E40AF",
          900: "#000F48"
        },
        
        chartLegendActive: {
          DEFAULT: "#2563EB",
          foreground: "#FFFFFF"
        }
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;