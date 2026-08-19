"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeView({ url }: { url: string }) {
  return (
    <div className="size-[100px]">
      <QRCodeCanvas
        value={url}
        size={100}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
      />
    </div>
  );
}
