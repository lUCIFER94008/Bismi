import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    console.log("Upload API: Request received");
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.error("Upload API: No file provided");
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("Upload API: Starting Cloudinary stream upload...");

    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: "new_bismi_gifts",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Stream Error:", error);
            reject(error);
          } else {
            console.log("Cloudinary Upload Success:", result?.secure_url);
            resolve(result);
          }
        }
      );
      
      uploadStream.end(buffer);
    });

    return NextResponse.json(
      { success: true, url: result.secure_url },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Upload API Critical Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
