import { useState } from "react";
import { Button } from "./ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface GenerateButtonProps {
  onGenerate: () => Promise<string>;
  disabled: boolean;
}

export const GenerateButton = ({ onGenerate, disabled }: GenerateButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      await onGenerate();
      toast.success("Image generated successfully!");
    } catch (error) {
      toast.error("Failed to generate image. Please try again.");
      console.error("Generation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Button
        onClick={handleGenerate}
        disabled={disabled || isLoading}
        className="ai-gradient text-white font-semibold px-8 py-6 text-lg rounded-xl transition-smooth hover:shadow-ai-glow transform hover:scale-105 disabled:transform-none disabled:hover:shadow-none"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Generate AI Image
          </>
        )}
      </Button>
    </div>
  );
};