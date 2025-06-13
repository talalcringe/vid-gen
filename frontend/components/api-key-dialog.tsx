"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ApiKeyDialog({
  open,
  onOpenChange,
  onContinue,
  onCancel,
  targetPath = "/",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
  onCancel: (targetPath: string) => void;
  targetPath?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-pink-500/20 bg-black/40 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-white">API Key Not Set</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4 pt-2 text-muted-foreground">
              <div>
                You haven't set up your Gemini API key yet. Without it, you'll
                only see mock videos.
              </div>
              <div className="text-amber-400">
                To generate real videos, please enter your API key in the field
                below.
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              onCancel(targetPath);
              onOpenChange(false);
            }}
            className="flex-1 sm:flex-none border-pink-500/30 text-pink-400 hover:bg-pink-500/10 hover:text-pink-300 transition-colors"
          >
            Use Mock Data
          </Button>
          <Button
            onClick={() => {
              onContinue();
              onOpenChange(false);
            }}
            className="flex-1 sm:flex-none bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
          >
            Enter API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
