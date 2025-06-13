import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Veo3 - AI Video Generator",
  description: "Generate marketing and real estate videos with Google Gemini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background text-foreground antialiased`}
      >
        {children}
        <div className="fixed top-4 right-4 z-50">
          <Toaster 
            position="top-right"
            theme="dark"
            closeButton
            toastOptions={{
              className: '!bg-black/20 backdrop-blur-lg border border-white/10 [&>button]:!text-white [&>button]:hover:!bg-black/30 [&>button]:!top-2 [&>button]:!right-2 [&>button]:!bg-black/20 [&>button]:!rounded-full [&>button]:!size-6 [&>button_svg]:!size-4',
              classNames: {
                toast: 'group [&>div]:!bg-transparent',
                title: '!text-white',
                description: '!text-white/80',
                error: '!bg-red-500/20',
                success: '!bg-green-500/20',
                info: '!bg-blue-500/20',
              },
            }}
          />
        </div>
      </body>
    </html>
  );
}
