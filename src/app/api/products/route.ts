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

    // Sort by createdAt descending (newest first)
    const products = await Product.find(query).sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Fetch products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { name, price, category, description, images } = await req.json();

    if (!name || !price || !category || !description || !images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ error: "Missing required fields or images" }, { status: 400 });
    }

    await connectDB();
    const product = await Product.create({
      name,
      price,
      category,
      description,
      images,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
