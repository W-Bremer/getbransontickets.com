import QRCode from "qrcode";

export const QR_DARK = "#13264D";
export const QR_LIGHT = "#FFFFFF";

/**
 * Error correction H tolerates ~30% obstruction, which is what lets us drop a
 * badge over the middle without breaking the scan.
 */
const BASE_OPTIONS = {
  errorCorrectionLevel: "H" as const,
  margin: 2,
  color: { dark: QR_DARK, light: QR_LIGHT },
};

export async function qrSvg(value: string): Promise<string> {
  return QRCode.toString(value, { ...BASE_OPTIONS, type: "svg" });
}

export async function qrPngBuffer(value: string, width = 1200): Promise<Buffer> {
  return QRCode.toBuffer(value, { ...BASE_OPTIONS, type: "png", width });
}

/**
 * Overlays a Tix Branson star badge on the center of a QR SVG. The badge covers
 * roughly 16% of the width, well inside the H-level correction budget.
 */
export async function brandedQrSvg(value: string): Promise<string> {
  const svg = await qrSvg(value);
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1];
  if (!viewBox) return svg;

  const [, , w, h] = viewBox.split(/\s+/).map(Number);
  if (!w || !h) return svg;

  const size = w * 0.17;
  const cx = w / 2;
  const cy = h / 2;
  const half = size / 2;
  const starR = size * 0.3;

  const badge = `
  <g>
    <rect x="${cx - half}" y="${cy - half}" width="${size}" height="${size}" rx="${size * 0.18}" fill="${QR_LIGHT}"/>
    <rect x="${cx - half + size * 0.06}" y="${cy - half + size * 0.06}" width="${size * 0.88}" height="${size * 0.88}" rx="${size * 0.14}" fill="${QR_DARK}"/>
    <path d="${starPath(cx, cy, starR, starR * 0.42)}" fill="#C8102E"/>
  </g>`;

  return svg.replace("</svg>", `${badge}</svg>`);
}

/** Five-pointed star centered at (cx, cy). */
function starPath(cx: number, cy: number, outer: number, inner: number): string {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    points.push(`${(cx + r * Math.cos(angle)).toFixed(3)},${(cy + r * Math.sin(angle)).toFixed(3)}`);
  }
  return `M${points.join("L")}Z`;
}
