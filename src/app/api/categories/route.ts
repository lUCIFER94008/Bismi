import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { CATEGORIES } from "@/constants/categories";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const withCounts = searchParams.get("withCounts") === "true";

    // Get all categories from the Category collection
    const definedCategories = await Category.find().sort({ name: 1 }).lean();
    
    // Get unique categories from products to ensure we don't miss anything
    const productCategories = await Product.distinct("category");
    
    // Merge them to ensure all used categories are represented
    const allCategoryNames = new Set([
      ...CATEGORIES.map(c => c.name),
      ...definedCategories.map((c: any) => c.name),
      ...productCategories
    ]);

    const finalCategories = await Promise.all(
      Array.from(allCategoryNames).map(async (name: string) => {
        const defined = definedCategories.find((c: any) => c.name === name);
        const staticCat = CATEGORIES.find(c => c.name === name);
        const count = withCounts ? await Product.countDocuments({ category: name }) : 0;
        return {
          _id: defined?._id || name,
          name,
          icon: defined?.icon || staticCat?.icon || "🎁",
          count
        };
      })
    );

    // Sort by name
    finalCategories.sort((a, b) => a.name.localeCompare(b.name));

    if (withCounts) {
      const totalCount = await Product.countDocuments({});
      return NextResponse.json({ 
        categories: finalCategories,
        totalCount 
      }, { status: 200 });
    }

    return NextResponse.json(finalCategories, { status: 200 });
  } catch (error) {
    console.error("Fetch categories error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
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
    const { name, icon } = body;

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    await connectDB();
    
    // Check if category already exists
    const existing = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
    if (existing) {
      return NextResponse.json({ error: "Category already exists" }, { status: 400 });
    }

    const category = await Category.create({ name, icon: icon || "🎁" });
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error("Category creation error:", error);
    return NextResponse.json({ error: error.message || "Failed to create category" }, { status: 500 });
  }
}
