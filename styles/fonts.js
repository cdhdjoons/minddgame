import localFont from "next/font/local";

// 특정 페이지에서만 사용할 Franklin Gothic 폰트

export const appleNeo = localFont({
  src: "../public/fonts/AppleSDGothicNeoM.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-appleSd-gothic",
});