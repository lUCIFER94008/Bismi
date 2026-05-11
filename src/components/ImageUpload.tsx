"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Loader2, Plus } from "lucide-react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (value.length + acceptedFiles.length > 10) {
      toast.error("Maximum 10 images allowed");
      return;
    }

    for (const file of acceptedFiles) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 10MB)`);
        return;
      }
    }

    setLoading(true);

    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) throw new Error("Upload failed");
        
        const data = await response.json();
        
        return data.secure_url;
      });

      const urls = await Promise.all(uploadPromises);
      onChange([...value, ...urls]);
      toast.success(`${urls.length} image(s) uploaded`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Some images failed to upload");
    } finally {
      setLoading(false);
    }
  }, [value, onChange]);

  const removeImage = (urlToRemove: string) => {
    onChange(value.filter(url => url !== urlToRemove));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    maxFiles: 10 - value.length,
    disabled: loading,
  });

  return (
    <div className="w-full space-y-6">
      {/* Image Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <AnimatePresence>
          {value.map((url, index) => (
            <motion.div
              key={url}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative group aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5"
            >
              <Image
                src={url}
                alt={`Product ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="p-2 bg-red-500 rounded-full text-white hover:scale-110 transition-transform"
                >
                  <X size={16} />
                </button>
              </div>
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-luxury-gold text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Main
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Upload Trigger */}
        {value.length < 10 && (
          <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all ${
                isDragActive
                  ? "border-luxury-gold bg-luxury-gold/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin text-luxury-gold" size={32} />
              ) : (
                <>
                  <Plus className="text-[#6B7280]" size={32} />
                  <span className="text-[10px] uppercase font-bold text-[#6B7280] text-center">
                    Add Images ({value.length}/10)
                  </span>
                </>
              )}
            </motion.div>
          </div>
        )}
      </div>

      {/* Large Dropzone if empty */}
      {value.length === 0 && (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`relative h-64 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${
              isDragActive
                ? "border-luxury-gold bg-luxury-gold/10"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <Upload className="text-[#6B7280] mb-4" size={48} />
            <h3 className="text-xl font-bold mb-2 text-[#111111] italic">Upload Product Gallery</h3>
            <p className="text-[#555555] text-sm">Drag & drop up to 10 images here</p>
            <p className="text-[#6B7280] text-[10px] mt-4 uppercase tracking-widest font-bold">JPG, PNG, WEBP • MAX 10MB EACH</p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
