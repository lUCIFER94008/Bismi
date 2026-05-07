import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { name, email, password, adminPasscode } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Check for admin role
    let role = "user";
    if (adminPasscode && adminPasscode === process.env.ADMIN_SECRET) {
      role = "admin";
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = await signToken({
      userId: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });


    const response = NextResponse.json(
      { message: "User registered successfully", user: { name, email, role }, token },
      { status: 201 }
    );

    // Set cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
