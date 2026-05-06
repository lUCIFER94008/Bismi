"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Loader2, Image as ImageIcon, CheckCircle2 } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        onChange(data.secure_url);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    disabled: loading,
  });

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {value ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative group aspect-video rounded-2xl overflow-hidden border border-white/20 bg-white/5"
          >
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
               <div className="bg-green-500/20 backdrop-blur-md p-2 rounded-full border border-green-500/50">
                  <CheckCircle2 className="text-green-500" size={24} />
               </div>
               <button
                type="button"
                onClick={() => onChange("")}
                className="bg-red-500/20 backdrop-blur-md p-2 rounded-full border border-red-500/50 hover:bg-red-500 hover:text-white transition-all"
              >
                <X size={24} />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
               <span className="text-xs bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-white">
                 Image Uploaded Successfully
               </span>
            </div>
          </motion.div>
        ) : (
          <div {...getRootProps()}>
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`relative group cursor-pointer aspect-video rounded-2xl border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-6 overflow-hidden ${
                isDragActive
                  ? "border-luxury-gold bg-luxury-gold/5 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                  : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(255,0,255,0.1)]"
              }`}
            >
              <input {...getInputProps()} />
              
              {/* Animated Glow Border */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse-slow" />
              </div>

              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="animate-spin text-luxury-gold" size={40} />
                  <p className="text-sm font-medium text-gray-400">Uploading to Cloudinary...</p>
                  <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
                     <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="w-full h-full bg-gradient-to-r from-transparent via-luxury-gold to-transparent" 
                     />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-luxury-gold/50 transition-all duration-300">
                     <Upload className={`text-gray-500 transition-colors duration-300 ${isDragActive ? "text-luxury-gold" : "group-hover:text-white"}`} size={32} />
                  </div>
                  <h3 className="text-lg font-bold mb-1">
                    {isDragActive ? "Drop the image here" : "Upload Product Image"}
                  </h3>
                  <p className="text-sm text-gray-500 max-w-[200px]">
                    Drag and drop or click to browse. (Max 5MB)
                  </p>
                  
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-xs text-red-400 bg-red-400/10 px-3 py-1.5 rounded-lg border border-red-400/20"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>
              )}

              {/* Decorative Icon */}
              <div className="absolute top-4 right-4 text-white/5 group-hover:text-white/10 transition-colors">
                 <ImageIcon size={64} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;
