"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Loader2, Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";
import axios from "axios";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    console.log("Image selection started:", file.name);
    setLoading(true);
    setError("");
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Uploading to /api/upload...");
      const res = await axios.post("/api/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 100));
          setProgress(percentCompleted);
          console.log(`Upload progress: ${percentCompleted}%`);
        },
      });

      if (res.data.success) {
        console.log("Upload successful! URL:", res.data.url);
        onChange(res.data.url);
      } else {
        console.error("Upload failed message:", res.data.message);
        setError(res.data.message || "Upload failed");
      }
    } catch (err: any) {
      console.error("Axios upload error:", err);
      setError(err.response?.data?.message || "Network error. Please check your connection.");
    } finally {
      setLoading(false);
      setProgress(0);
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
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative group aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-[0_0_50px_rgba(255,0,255,0.12)]"
          >
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-contain p-4"
            />
            
            {/* Success Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
               <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-green-500/20 backdrop-blur-md p-3 rounded-full border border-green-500/50"
               >
                  <CheckCircle2 className="text-green-500" size={28} />
               </motion.div>
               
               <button
                type="button"
                onClick={() => onChange("")}
                className="bg-red-500/20 backdrop-blur-md p-3 rounded-full border border-red-500/50 hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"
              >
                <X size={28} />
              </button>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex justify-center">
               <span className="text-xs bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white font-medium flex items-center gap-2">
                 <CheckCircle2 size={14} className="text-green-400" /> Image Ready for Product
               </span>
            </div>
          </motion.div>
        ) : (
          <div {...getRootProps()}>
            <motion.div
              key="upload-box"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.01 }}
              className={`relative group cursor-pointer aspect-video rounded-3xl border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-8 overflow-hidden ${
                isDragActive
                  ? "border-luxury-gold bg-luxury-gold/10 shadow-[0_0_60px_rgba(212,175,55,0.2)]"
                  : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 shadow-[0_0_50px_rgba(255,0,255,0.08)]"
              }`}
            >
              <input {...getInputProps()} />
              
              {/* Neon Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-luxury-gold/5" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-luxury-gold/20 blur-2xl opacity-30" />
              </div>

              {loading ? (
                <div className="flex flex-col items-center gap-6 relative z-10">
                  <div className="relative">
                    <Loader2 className="animate-spin text-luxury-gold" size={56} />
                    <div className="absolute inset-0 blur-xl bg-luxury-gold/20 animate-pulse" />
                  </div>
                  
                  <div className="space-y-3 text-center">
                    <p className="text-lg font-bold text-white tracking-tight">Uploading to Cloud...</p>
                    <div className="w-64 h-2 bg-white/5 rounded-full border border-white/10 overflow-hidden p-[2px]">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-purple-500 to-luxury-gold rounded-full" 
                       />
                    </div>
                    <p className="text-sm text-luxury-gold font-mono">{progress}%</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center relative z-10">
                  <motion.div 
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-luxury-gold/50 group-hover:bg-white/10 transition-all duration-500"
                  >
                     <Upload className={`transition-colors duration-500 ${isDragActive ? "text-luxury-gold" : "text-gray-400 group-hover:text-white"}`} size={36} />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-2 tracking-tight">
                    {isDragActive ? "Release to Upload" : "Upload Product Image"}
                  </h3>
                  <p className="text-gray-500 max-w-[280px] leading-relaxed">
                    Drag and drop your high-quality product photo here or <span className="text-luxury-gold font-bold">browse</span>
                  </p>
                  
                  <div className="mt-8 flex items-center gap-6 opacity-40">
                     <div className="flex flex-col items-center gap-1">
                        <ImageIcon size={20} />
                        <span className="text-[10px] uppercase tracking-widest font-bold">JPG/PNG</span>
                     </div>
                     <div className="w-px h-8 bg-white/20" />
                     <div className="flex flex-col items-center gap-1">
                        <CheckCircle2 size={20} />
                        <span className="text-[10px] uppercase tracking-widest font-bold">5MB Max</span>
                     </div>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 flex items-center gap-2 text-sm text-red-400 bg-red-400/10 px-5 py-3 rounded-2xl border border-red-400/20 shadow-lg shadow-red-950/20"
                    >
                      <AlertCircle size={18} />
                      {error}
                    </motion.div>
                  )}
                </div>
              )}

              {/* Decorative Background Icon */}
              <div className="absolute -bottom-10 -right-10 text-white/[0.02] group-hover:text-white/[0.05] transition-colors -rotate-12 pointer-events-none">
                 <ImageIcon size={240} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;
