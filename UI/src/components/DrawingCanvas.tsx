import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, PencilBrush } from "fabric";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Pen, Eraser, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawingCanvasProps {
  onImageChange: (imageData: string | null) => void;
}

export const DrawingCanvas = ({ onImageChange }: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeTool, setActiveTool] = useState<"pen" | "eraser">("pen");


  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 512,
      height: 512,
      backgroundColor: "#ffffff"
    });

    // Enable drawing mode and explicitly create the brush
    canvas.isDrawingMode = true;
    
    // Explicitly create and assign the PencilBrush
    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush.color = "#000000";
    canvas.freeDrawingBrush.width = 3;

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [onImageChange]);

useEffect(() => {
  if (!fabricCanvas) return;

  const handlePathCreated = () => {
    if (!fabricCanvas) return;

    const imageData = fabricCanvas.toDataURL({ format: 'png', multiplier: 1 });
    onImageChange(imageData);
  };

  fabricCanvas.on("path:created", handlePathCreated);

  return () => {
    fabricCanvas.off("path:created", handlePathCreated);
  };
}, [fabricCanvas]);


useEffect(() => {
    if (!fabricCanvas) return;
    
    if (!fabricCanvas.freeDrawingBrush) {
      
      fabricCanvas.freeDrawingBrush = new PencilBrush(fabricCanvas);
    }

    if (activeTool === "pen") {
      fabricCanvas.freeDrawingBrush.color = "#000000";
      fabricCanvas.freeDrawingBrush.width = 3;
    } else {
      // Eraser mode - use white color with larger width
      fabricCanvas.freeDrawingBrush.color = "#ffffff";
      fabricCanvas.freeDrawingBrush.width = 20;
    }
  }, [activeTool, fabricCanvas]);

const handleToolChange = (tool: "pen" | "eraser") => {
    setActiveTool(tool);
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    onImageChange(null);
  };


  return (
    <Card className="p-6 bg-card border border-canvas-border canvas-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-card-foreground">Drawing Canvas</h3>
          <div className="flex gap-2">
              <div className="toolbar flex items-center gap-4">
        <Button
          variant={activeTool === "pen" ? "default" : "outline"}
          size="lg"
          onClick={() => handleToolChange("pen")}
          className={'tool-button ${activeTool === "pen" ? "active" : ""}'}
        >
          <Pen className="w-5 h-5 mr-2" />
          Pen
        </Button>
        
        <Button
          variant={activeTool === "eraser" ? "default" : "outline"}
          size="lg"
          onClick={() => handleToolChange("eraser")}
          className={'tool-button ${activeTool === "eraser" ? "active" : ""}'}
        >
          <Eraser className="w-5 h-5 mr-2" />
          Eraser
        </Button>

        <div className="w-px h-8 bg-border mx-2" />
        
        <Button
          variant="outline"
          size="lg"
          onClick={handleClear}
          className="tool-button">
          <RotateCcw className="w-5 h-5 mr-2" />
          Clear
        </Button>
      </div>

          </div>
        </div>
        
        <div className="flex justify-center">
          <div 
            className="border-2 border-canvas-border rounded-lg bg-canvas-bg canvas-shadow"
            style={{ 
              display: 'inline-block',
              lineHeight: 0,
              userSelect: 'none',
              touchAction: 'none'
            }}
          >
            <canvas 
              ref={canvasRef} 
              className="rounded-lg block"
              style={{ 
                cursor: 'crosshair',
                touchAction: 'none'
              }}
            />
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground text-center">
          Use your mouse or touch to draw on the canvas above
        </p>
      </div>
    </Card>
  );
};
