import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEW BISMI GIFT HOUSE | Luxury Gifts & Toys",
  description: "Explore the exclusive collection of luxury gifts, boutique toys, and curated diecast models at Kochi's most trusted gift house.",
  icons: {
    icon: "https://res.cloudinary.com/dpmpefw2p/image/upload/v1777816907/ChatGPT_Image_May_2_2026_10_10_10_PM_tmkr5c.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimatedBackground />
        {children}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#000",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
            },
          }}
        />
      </body>
    </html>
  );
}
