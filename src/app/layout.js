
import "./globals.css";
import ClientOnlyWrapper from "./components/clientOnlyWarpper";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Sage Union",
  description: "SAGU_WepApp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-black flex min-h-dvh justify-center m-0 p-0 ${inter.className}`} >
        <div className=" w-full h-screen max-w-[500px] max-h-[1080px] bg-multi-gradient relative flex flex-col justify-between overflow-scroll"
          >
            {children}
          <Analytics />
          <SpeedInsights />
          <ClientOnlyWrapper />
        </div>
      </body>
    </html>
  );
}
