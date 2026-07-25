import { brandedQrSvg, qrSvg } from "@/lib/qr";

interface QrCodeProps {
  value: string;
  className?: string;
  /** Adds the Tix Branson star badge in the center. */
  branded?: boolean;
}

/** Server-rendered QR code (SVG, no client JS). */
export async function QrCode({ value, className, branded = true }: QrCodeProps) {
  const svg = branded ? await brandedQrSvg(value) : await qrSvg(value);

  return (
    <div
      className={className}
      role="img"
      aria-label={`QR code linking to ${value}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
