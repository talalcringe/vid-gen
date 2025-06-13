"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Download } from "lucide-react"
import { generateMarketingVideo } from "@/lib/actions"
import { VideoPlayer } from "@/components/video-player"

export default function MarketingPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    productName: "Suplimax",
    features: "Boosts energy, Enhances focus, Contains vitamins and minerals, Zero sugar",
    tone: "energetic",
    audience: "young adults",
    style: "dynamic",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      // In a real application, this would call the actual API
      // For demo purposes, we'll simulate a delay and use a placeholder video
      const result = await generateMarketingVideo(formData)
      setVideoUrl(result.videoUrl)
    } catch (error) {
      console.error("Error generating video:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
          Marketing Video Generator
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Create engaging marketing videos for Suplimax energy drink with AI
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-purple-500/20 bg-background/40 dark:bg-black/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Video Configuration</CardTitle>
              <CardDescription>Customize your marketing video for Suplimax energy drink</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="marketingForm" onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="bg-background/50"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Key Product Features</Label>
                  <Textarea
                    id="features"
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    className="bg-background/50 min-h-[100px]"
                    placeholder="Enter key features separated by commas"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <Select
                    name="tone"
                    value={formData.tone}
                    onValueChange={(value) => handleSelectChange("tone", value)}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="energetic">Energetic</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="fun">Fun</SelectItem>
                      <SelectItem value="serious">Serious</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select
                    name="audience"
                    value={formData.audience}
                    onValueChange={(value) => handleSelectChange("audience", value)}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select target audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="young adults">Young Adults</SelectItem>
                      <SelectItem value="professionals">Professionals</SelectItem>
                      <SelectItem value="athletes">Athletes</SelectItem>
                      <SelectItem value="students">Students</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">Video Style</Label>
                  <Select
                    name="style"
                    value={formData.style}
                    onValueChange={(value) => handleSelectChange("style", value)}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select video style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dynamic">Dynamic</SelectItem>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                      <SelectItem value="futuristic">Futuristic</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="cinematic">Cinematic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                form="marketingForm"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Video...
                  </>
                ) : (
                  "Generate Marketing Video"
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
          <Card className="border-pink-500/20 bg-background/40 dark:bg-black/40 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle>Video Preview</CardTitle>
              <CardDescription>Your generated marketing video will appear here</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">Generating your video...</p>
                </div>
              ) : videoUrl ? (
                <VideoPlayer videoUrl={videoUrl} />
              ) : (
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-muted rounded-lg p-6">
                  <p className="text-muted-foreground text-center">
                    Configure your video settings and click &quot;Generate Marketing Video&quot; to create your video
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-secondary hover:bg-secondary/80"
                disabled={!videoUrl}
                onClick={() => videoUrl && window.open(videoUrl, "_blank")}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Video
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
