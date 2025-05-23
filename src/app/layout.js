
import "./globals.css";
import ClientOnlyWrapper from "./components/clientOnlyWarpper";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Lilita_One } from '@next/font/google';
import { HammerProvider } from "./context/hammerContext";
import { GemProvider } from "./context/gemContext";

// Lilita One 폰트 설정
const lilitaOne = Lilita_One({
  weight: '400', // Lilita One은 단일 웨이트(400)만 지원
  subsets: ['latin'], // 필요한 서브셋 지정
  variable: '--font-lilita-one', // Tailwind에서 사용할 CSS 변수
});

export const metadata = {
  title: "MineD",
  description: "MineD_WepApp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-black flex min-h-dvh justify-center m-0 p-0 ${lilitaOne.variable}`} >
        <div className=" font-lilita w-full h-screen max-w-[500px]  pb-[54px] relative flex flex-col justify-between overflow-scroll bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(/image/md_bg.png)` }}
        >
          <GemProvider>
            <HammerProvider>
              {children}
              <Analytics />
              <SpeedInsights />
              <ClientOnlyWrapper />
            </HammerProvider>
          </GemProvider>
        </div>
      </body>
    </html>
  );
}
