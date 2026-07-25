import { NextResponse } from "next/server";
import { getPartnerByRefCode } from "@/data/partners";
import { siteConfig } from "@/lib/config";
import { brandedQrSvg, qrPngBuffer } from "@/lib/qr";

/**
 * Downloadable partner QR artwork.
 *   /api/qr/STAY01          -> branded SVG (vector, best for printers)
 *   /api/qr/STAY01?f=png    -> 1200px PNG
 * Use code "passport" for the generic, unattributed Passport code.
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("f") === "png" ? "png" : "svg";

  const isGeneric = code.toLowerCase() === "passport";
  const partner = isGeneric ? undefined : getPartnerByRefCode(code);

  if (!isGeneric && !partner) {
    return NextResponse.json({ error: "Unknown partner code" }, { status: 404 });
  }

  const target = partner
    ? `${siteConfig.url}/p/${partner.refCode}`
    : `${siteConfig.url}/passport`;
  const filename = partner
    ? `branson-passport-${partner.slug}-${partner.refCode}`
    : "branson-passport";

  const headers: Record<string, string> = {
    "Cache-Control": "public, max-age=86400, s-maxage=604800",
    "Content-Disposition": `attachment; filename="${filename}.${format}"`,
  };

  try {
    if (format === "png") {
      const png = await qrPngBuffer(target);
      return new NextResponse(new Uint8Array(png), {
        headers: { ...headers, "Content-Type": "image/png" },
      });
    }

    const svg = await brandedQrSvg(target);
    return new NextResponse(svg, {
      headers: { ...headers, "Content-Type": "image/svg+xml" },
    });
  } catch (err) {
    console.error("qr generation failed:", { code, format, err });
    return NextResponse.json({ error: "Could not generate QR code" }, { status: 500 });
  }
}
