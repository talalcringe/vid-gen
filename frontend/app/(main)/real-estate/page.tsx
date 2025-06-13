"use client";

import type React from "react";
import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Download } from "lucide-react";
import { generateRealEstateVideo } from "@/lib/actions";
import { VideoPlayer } from "@/components/video-player";
import { toast } from "sonner";

export default function RealEstatePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoData, setVideoData] = useState<{
    url: string | null;
    isMock?: boolean;
    mockReason?: string;
  }>({ url: null });
  const [formData, setFormData] = useState({
    style: "luxury",
  });

  const propertyDetails = {
    address: "12012 Crest Ct, Beverly Hills, CA 90210",
    price: "$10,183,985",
    bedrooms: 5,
    bathrooms: 6.5,
    squareFootage: 6100,
    features:
      "Luxury estate, three-car garage, landscaped grounds, elegant entrance with grand staircase, modern design, prime Beverly Hills location",
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    const loadingToast = toast.loading('Generating your real estate video...');

    try {
      const result = await generateRealEstateVideo({
        ...propertyDetails,
        style: formData.style,
      });
      
      setVideoData({
        url: result.videoUrl,
        isMock: result.isMock,
        mockReason: result.mockReason,
      });
      
      if (result.isMock) {
        toast.warning('Using mock video: ' + result.mockReason, { id: loadingToast });
      } else {
        toast.success('Real estate video generated successfully!', { id: loadingToast });
      }
    } catch (error) {
      console.error("Error generating video:", error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate video. Please try again.';
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600 mb-4">
          Real Estate Video Tour Generator
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Create immersive property tour videos for luxury real estate
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-pink-500/20 bg-background/40 dark:bg-black/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
              <CardDescription>
                Beverly Hills luxury property information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                id="realEstateForm"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Address</Label>
                      <p className="font-medium">{propertyDetails.address}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Price</Label>
                      <p className="font-medium">{propertyDetails.price}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Bedrooms</Label>
                      <p className="font-medium">{propertyDetails.bedrooms}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Bathrooms</Label>
                      <p className="font-medium">{propertyDetails.bathrooms}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">
                        Square Footage
                      </Label>
                      <p className="font-medium">
                        {propertyDetails.squareFootage}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Features</Label>
                    <p className="font-medium">{propertyDetails.features}</p>
                  </div>

                  <div className="space-y-2 pt-4">
                    <Label htmlFor="style">Tour Style</Label>
                    <Select
                      name="style"
                      value={formData.style}
                      onValueChange={(value) =>
                        handleSelectChange("style", value)
                      }
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select tour style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="luxury">Luxury</SelectItem>
                        <SelectItem value="family-friendly">
                          Family-Friendly
                        </SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="cinematic">Cinematic</SelectItem>
                        <SelectItem value="minimalist">Minimalist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                form="realEstateForm"
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Video Tour...
                  </>
                ) : (
                  "Generate Video Tour"
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-purple-500/20 bg-background/40 dark:bg-black/40 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle>Video Preview</CardTitle>
              <CardDescription>
                Your generated property tour video will appear here
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">
                    Generating your video tour...
                  </p>
                </div>
              ) : videoData.url ? (
                <VideoPlayer 
                  videoUrl={videoData.url || ''} 
                  isMock={videoData.isMock}
                  mockReason={videoData.mockReason}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-muted rounded-lg p-6">
                  <p className="text-muted-foreground text-center">
                    Select your tour style and click &quot;Generate Video
                    Tour&quot; to create your property video
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-secondary hover:bg-secondary/80"
                disabled={!videoData.url}
                onClick={() => videoData.url && window.open(videoData.url, "_blank")}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Video
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
