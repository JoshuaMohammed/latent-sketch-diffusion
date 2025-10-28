import { useCallback, useState } from "react";
import { DrawingCanvas } from "@/components/DrawingCanvas";
import { ImageUpload } from "@/components/ImageUpload";
import { ImagePreview } from "@/components/ImagePreview";
import { GenerateButton } from "@/components/GenerateButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sparkles, Palette, Upload } from "lucide-react";
import { Download } from "lucide-react";

const Index = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"draw" | "upload">("draw");

  const handleImageChange = useCallback((imageData: string | null) => {
    setCurrentImage(imageData);
  }, []);


const handleGenerate = async (): Promise<string> => {
  if (!currentImage) {
    throw new Error("No image to generate from");
  }

  try {
    const response = await fetch("https://4a7fa5403155.ngrok-free.app/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: currentImage }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();

    const generated = data.generated_image;
    setGeneratedImage(generated);

    return generated;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};


  const clearAll = () => {
    setCurrentImage(null);
    setGeneratedImage(null);
  };


const downloadResult = () => {
    const link = document.createElement('a');
    link.download = 'ai-generated-image.png';
    link.href = generatedImage;
    link.click();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="ai-gradient p-2 rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-ai-gradient-from to-ai-gradient-to bg-clip-text text-transparent">
                  Sketch Vision AI
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Draw your sketches or upload an image, then watch AI transform it into something realistic.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Input Section */}
          <Card className="p-6">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "draw" | "upload")}>
              <div className="flex justify-between items-center mb-6">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="draw" className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Draw
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload
                  </TabsTrigger>
                </TabsList>
                
                <Button variant="outline" onClick={clearAll}>
                  Clear All
                </Button>
              </div>

              <TabsContent value="draw">
                <DrawingCanvas onImageChange={handleImageChange} />
              </TabsContent>

              <TabsContent value="upload">
                <ImageUpload 
                  onImageChange={handleImageChange} 
                  currentImage={currentImage}
                />
              </TabsContent>
            </Tabs>
          </Card>

          {/* Preview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ImagePreview
              imageData={currentImage}
              title="Your Input"
              placeholder="Draw something or upload an image to see the preview"
            />
            
            <ImagePreview
              imageData={generatedImage}
              title="AI Generated Result"
              placeholder="Generated image will appear here after processing"
            />
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={downloadResult}
              className="flex items-center gap-2"
              disabled={!generatedImage}
            >
              <Download className="h-4 w-4" />
              Download Result
            </Button>
          </div>

          {/* Generate Button */}
          <div className="py-6">
            <GenerateButton
              onGenerate={handleGenerate}
              disabled={!currentImage}
            />
          </div>

          {/* Instructions */}
          <Card className="p-6 bg-muted/30">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-card-foreground">
                How it works
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <div className="ai-gradient w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                    1
                  </div>
                  <p>Create a sketch using the drawing canvas or upload an existing image</p>
                </div>
                <div className="space-y-2">
                  <div className="ai-gradient w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                    2
                  </div>
                  <p>Click the Generate button to send your image to our AI model</p>
                </div>
                <div className="space-y-2">
                  <div className="ai-gradient w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                    3
                  </div>
                  <p>Watch as AI transforms your sketch into a realistic image</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
