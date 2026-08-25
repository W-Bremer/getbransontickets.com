import { NextResponse } from "next/server";
import {
  OFFICE_COOKIE,
  OFFICE_COOKIE_MAX_AGE,
  isValidOfficePassword,
  officeConfigured,
  officeToken,
} from "@/lib/office-auth";

export async function POST(req: Request) {
  if (!officeConfigured()) {
    return NextResponse.json(
      { error: "Office sign-in is not set up on this deployment" },
      { status: 503 }
    );
  }

  let body: { password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  if (!isValidOfficePassword(body.password)) {
    // Uniform delay keeps guessing slow without a rate-limit store.
    await new Promise((r) => setTimeout(r, 750));
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(OFFICE_COOKIE, officeToken()!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: OFFICE_COOKIE_MAX_AGE,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(OFFICE_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
