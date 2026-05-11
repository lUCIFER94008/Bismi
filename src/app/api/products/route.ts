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

    const query: any = {};
    if (category && category !== "All") {
      // Use a more flexible regex to allow matching "Diecast" with "Diecast Cars" etc.
      query.category = { $regex: new RegExp(category, "i") };
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ];
    }

    // Sort by newest first
    const products = await Product.find(query).sort({ createdAt: -1 }).lean();
    
    return NextResponse.json(products, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
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
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Access denied. Admin only." }, { status: 403 });
    }

    const body = await req.json();
    const { name, price, category, description, images } = body;

    if (!name || !price || !category || !description || !images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ error: "All fields are required and must have at least one image" }, { status: 400 });
    }

    await connectDB();
    const product = await Product.create({
      name,
      price: Number(price),
      category,
      description,
      images,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("Product creation error:", error);
    return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 500 });
  }
}

