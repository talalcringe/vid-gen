"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import Link from "next/link";
import { ArrowRight, Video } from "lucide-react";
import { ApiKeyInput } from "@/components/api-key-input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApiKeyDialog } from "@/components/api-key-dialog";

export default function Home() {
  const [showApiDialog, setShowApiDialog] = useState(false);
  const [targetPath, setTargetPath] = useState("/");
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent, path: string) => {
    const hasApiKey =
      typeof window !== "undefined"
        ? localStorage.getItem("geminiApiKey")
        : false;
    if (hasApiKey) {
      router.push(path);
    } else {
      e.preventDefault();
      setTargetPath(path);
      setShowApiDialog(true);
    }
  };

  const handleUseMockData = () => {
    router.push(targetPath);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 dark:from-background dark:to-secondary/30">
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            Veo3 AI Video Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate stunning marketing and real estate videos with Google
            Gemini&apos;s Veo3 technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full border-purple-500/20 bg-black/40 backdrop-blur-sm hover:border-purple-500/50 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-purple-400" />
                  Marketing Video Generator
                </CardTitle>
                <CardDescription>
                  Create engaging marketing videos for Suplimax energy drink
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Generate customized marketing videos by specifying product
                  features, tone, target audience, and style.
                </p>
              </CardContent>
              <CardFooter>
                <div
                  className="w-full"
                  onClick={(e) => handleCardClick(e, "/marketing")}
                >
                  <Button className="w-full group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-full border-pink-500/20 bg-black/40 backdrop-blur-sm hover:border-pink-500/50 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-pink-400" />
                  Real Estate Video Tour
                </CardTitle>
                <CardDescription>
                  Create virtual property tours for luxury real estate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Generate immersive property tour videos with different styles
                  based on the provided Beverly Hills listing.
                </p>
              </CardContent>
              <CardFooter>
                <div
                  className="w-full"
                  onClick={(e) => handleCardClick(e, "/real-estate")}
                >
                  <Button className="w-full group bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* API Key Input */}
        <div className="mt-8">
          <ApiKeyInput />
          <ApiKeyDialog
            open={showApiDialog}
            onOpenChange={setShowApiDialog}
            onContinue={() => {
              // Focus the API key input when user clicks "Enter API Key"
              const input = document.getElementById("api-key-input");
              if (input) {
                input.scrollIntoView({ behavior: "smooth", block: "center" });
                input.focus();
              }
            }}
            onCancel={handleUseMockData}
            targetPath={targetPath}
          />
        </div>
      </main>
    </div>
  );
}
