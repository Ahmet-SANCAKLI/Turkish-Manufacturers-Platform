import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin/rfqs");

  if (!isValidAdminPassword(password)) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url));
  }

  const redirectTarget = next.startsWith("/") ? next : "/admin/rfqs";
  const response = NextResponse.redirect(new URL(redirectTarget, request.url));
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "1",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
