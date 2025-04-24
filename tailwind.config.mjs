/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mainRed: 'rgb(160, 0, 0, 0.8)',
        footerBg: 'rgb(252,118,2, 0.52)',
        footerIconBg: 'rgb(255,255,255, 0.46)',
        balanceBg: 'rgb(0, 0, 0, 0.7)',
        taskBg: 'rgb(2, 116, 116, 0.08)',
        taskBg2: 'rgb(116, 2, 65, 0.08)',
        boxBg: 'rgb(0, 0, 0, 0.41)',
        mainBoxBg: 'rgb(0, 0, 0, 0.6)',
        borderBlack: 'rgb(0, 0, 0, 0.3)',
      },
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.5)', // 작은 섀도우
        DEFAULT: '2px 2px 4px rgba(0, 0, 0, 0.5)', // 기본 섀도우
        lg: '3px 3px 6px rgba(0, 0, 0, 0.7)', // 큰 섀도우
      },
      fontFamily: {
        appleNeo: ["var(--font-appleSd-gothic)", "sans-serif"],
        lilita: ['var(--font-lilita-one)', 'sans-serif'],
      },
      fontSize: {
        'dynamic-5xl': 'clamp(2.7rem, 5vw, 4rem)', // 최소 1.5rem, 최대 3rem
      },
      screens: {
        'xs': { 'max': '345px' }, // 345px 이하일 때 적용
      },
      backgroundImage: {
        'multi-gradient': 'linear-gradient(to bottom, rgba(245,193,80,0.5), rgba(222,133,161,0.5), rgba(126,104,231,0.5), rgba(126,143,244,0.5), rgba(87,178,251,0.5))',
      },
      letterSpacing: {
        'tighter-3': '-0.075em', // -3%는 상대적인 값이므로 em 단위로 변환
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '1px 1px rgba(0, 0, 0)',
        },
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          textShadow: '1.5px 5px rgba(0, 0, 0)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
        '.text-stroke': {
          '-webkit-text-stroke': '1.6px black',
          'text-stroke': '1.6px black', // 비표준 속성, 호환성 고려
        },
        '.text-stroke-mini': {
          '-webkit-text-stroke': '0.2px black',
          'text-stroke': '0.2px black', // 비표준 속성, 호환성 고려
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
