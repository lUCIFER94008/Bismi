import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let query: any = {};
    if (category && category !== "All") {
      query.category = category;
    }
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { name, price, category, description, image } = await req.json();

    if (!name || !price || !category || !description || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();
    const product = await Product.create({
      name,
      price,
      category,
      description,
      image,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
