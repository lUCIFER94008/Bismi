import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    return NextResponse.json({ user: payload }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
