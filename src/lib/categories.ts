import connectDB from "./db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { CATEGORIES } from "@/constants/categories";

export async function getDynamicCategories() {
  try {
    await connectDB();
    
    // Get defined categories from DB
    const dbCategories = await Category.find().lean();
    
    // Get unique categories actually used in products
    const productCategories = await Product.distinct("category");
    
    // Merge all unique names
    const allNames = new Set([
      ...CATEGORIES.map(c => c.name),
      ...dbCategories.map((c: any) => c.name),
      ...productCategories
    ]);
    
    const categoriesWithMeta = await Promise.all(
      Array.from(allNames).map(async (name) => {
        const dbCat = dbCategories.find((c: any) => c.name === name);
        const staticCat = CATEGORIES.find(c => c.name === name);
        const count = await Product.countDocuments({ category: name });
        
        return {
          name,
          icon: dbCat?.icon || staticCat?.icon || "🎁",
          count
        };
      })
    );
    
    // Filter out categories with 0 products if they aren't "featured" static categories
    return categoriesWithMeta
      .filter(cat => cat.count > 0 || CATEGORIES.find(c => c.name === cat.name))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error fetching dynamic categories:", error);
    return CATEGORIES.map(c => ({ ...c, count: 0 }));
  }
}
