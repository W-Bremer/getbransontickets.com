import QRCode from "qrcode";

interface QrCodeProps {
  value: string;
  className?: string;
}

/** Server-rendered QR code (SVG, no client JS). */
export async function QrCode({ value, className }: QrCodeProps) {
  const svg = await QRCode.toString(value, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 1,
    color: { dark: "#13264D", light: "#FFFFFF" },
  });

  return (
    <div
      className={className}
      role="img"
      aria-label={`QR code linking to ${value}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
