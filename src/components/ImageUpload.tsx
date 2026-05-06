"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Loader2, Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadPercent, setUploadPercent] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    console.log("Frontend: Image upload started for:", file.name);
    setLoading(true);
    setError("");
    setUploadPercent(10); // Start progress

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Frontend: Sending POST request to /api/upload");
      setUploadPercent(30);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      setUploadPercent(70);
      const data = await response.json();
      console.log("Frontend: Cloudinary response received:", data);

      if (data.success) {
        console.log("Frontend: Upload SUCCESS! URL:", data.url);
        onChange(data.url);
        setUploadPercent(100);
      } else {
        console.error("Frontend: Upload failed message:", data.message);
        setError(data.message || "Upload failed");
      }
    } catch (err: any) {
      console.error("Frontend: API failure:", err);
      setError("Connection failed. Please check your network.");
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
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative group aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-[0_0_50px_rgba(212,175,55,0.1)]"
          >
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-contain p-2"
            />
            
            {/* Hover Controls */}
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
               <span className="text-[10px] uppercase tracking-[0.2em] bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-luxury-gold font-black flex items-center gap-2">
                 <CheckCircle2 size={12} className="text-green-500" /> Upload Complete
               </span>
            </div>
          </motion.div>
        ) : (
          <div {...getRootProps()}>
            <motion.div
              key="upload-trigger"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.005 }}
              className={`relative group cursor-pointer aspect-video rounded-3xl border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-8 overflow-hidden ${
                isDragActive
                  ? "border-luxury-gold bg-luxury-gold/10 shadow-[0_0_60px_rgba(212,175,55,0.2)]"
                  : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 shadow-[0_0_50px_rgba(255,0,255,0.05)]"
              }`}
            >
              <input {...getInputProps()} />
              
              {/* Glass Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-luxury-gold/10" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-luxury-gold/20 blur-3xl opacity-20" />
              </div>

              {loading ? (
                <div className="flex flex-col items-center gap-6 relative z-10">
                  <div className="relative">
                    <Loader2 className="animate-spin text-luxury-gold" size={64} />
                    <div className="absolute inset-0 blur-2xl bg-luxury-gold/40 animate-pulse" />
                  </div>
                  
                  <div className="space-y-3 text-center">
                    <p className="text-xl font-bold text-white tracking-tighter uppercase italic">Processing</p>
                    <div className="w-56 h-1 bg-white/5 rounded-full border border-white/10 overflow-hidden relative">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadPercent}%` }}
                        className="absolute inset-0 bg-gradient-to-r from-luxury-gold to-white" 
                       />
                    </div>
                    <p className="text-[10px] text-luxury-gold font-black uppercase tracking-widest">{uploadPercent}%</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center relative z-10">
                  <motion.div 
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-luxury-gold/50 group-hover:bg-white/10 transition-all duration-500 shadow-2xl"
                  >
                     <Upload className={`transition-colors duration-500 ${isDragActive ? "text-luxury-gold" : "text-gray-500 group-hover:text-white"}`} size={40} />
                  </motion.div>
                  
                  <h3 className="text-2xl font-black mb-2 tracking-tight uppercase italic text-white/90">
                    {isDragActive ? "Release File" : "Upload Product"}
                  </h3>
                  <p className="text-gray-500 max-w-[280px] leading-relaxed text-sm font-medium">
                    Drag and drop your premium photo here or <span className="text-luxury-gold underline underline-offset-4 decoration-luxury-gold/30">click to browse</span>
                  </p>
                  
                  <div className="mt-8 flex items-center gap-6 opacity-30">
                     <div className="flex flex-col items-center gap-1">
                        <ImageIcon size={20} />
                        <span className="text-[9px] uppercase tracking-widest font-black">JPG / PNG</span>
                     </div>
                     <div className="w-px h-8 bg-white/20" />
                     <div className="flex flex-col items-center gap-1">
                        <CheckCircle2 size={20} />
                        <span className="text-[9px] uppercase tracking-widest font-black">5MB Limit</span>
                     </div>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 flex items-center gap-3 text-sm text-red-400 bg-red-400/10 px-6 py-3 rounded-2xl border border-red-400/20 shadow-2xl shadow-red-950/20"
                    >
                      <AlertCircle size={20} />
                      <span className="font-bold">{error}</span>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Background Art */}
              <div className="absolute -bottom-16 -left-16 text-white/[0.01] group-hover:text-white/[0.03] transition-colors -rotate-12 pointer-events-none">
                 <ImageIcon size={320} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;
