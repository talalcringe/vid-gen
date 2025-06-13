"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Key } from "lucide-react";
import { ApiKeyDialog } from "./api-key-dialog";

export function ApiKeyInput() {
  const [apiKey, setApiKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("geminiApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      localStorage.setItem("geminiApiKey", apiKey);
      toast.success("API key saved successfully");
    } catch (error) {
      console.error("Failed to save API key:", error);
      toast.error("Failed to save API key");
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const hasApiKey = localStorage.getItem("geminiApiKey");
    if (!hasApiKey) {
      e.preventDefault();
      setShowDialog(true);
    }
  };

  // Handle continue from dialog
  const handleContinue = () => {
    // Focus the API key input when user clicks "Enter API Key"
    const input = document.getElementById("api-key-input");
    if (input) {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
      input.focus();
    }
  };

  const handleCancel = () => {
    // Focus the API key input when user clicks "Enter API Key"
    const input = document.getElementById("api-key-input");
    if (input) {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
      input.focus();
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-6 rounded-lg border border-pink-500/20 bg-black/40 backdrop-blur-sm">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-pink-400" />
            <h3 className="text-lg font-semibold text-white">Gemini API Key</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              id="api-key-input"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="flex-1 bg-black/30 border-pink-500/30 text-white placeholder:text-gray-400 focus:border-pink-500/50 focus:ring-pink-500/30"
            />
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white transition-all"
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
          <p className="text-xs text-gray-400">
            Your API key is stored locally in your browser and used only for API
            calls
          </p>
        </div>
      </div>

      <ApiKeyDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onContinue={handleContinue}
        onCancel={handleCancel}
      />
    </>
  );
}
