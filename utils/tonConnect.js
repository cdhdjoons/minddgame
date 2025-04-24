"use client"; // 클라이언트에서만 실행하도록 설정

import { TonConnect } from "@tonconnect/sdk";

let tonConnect = null;

export const getTonConnectInstance = () => {
  if (!tonConnect) {
    tonConnect = new TonConnect({
      manifestUrl: "https://sagugame.vercel.app/tonconnect-manifest.json",
    });
  }
  return tonConnect;
};


