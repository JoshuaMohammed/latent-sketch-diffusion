import { Card } from "./ui/card";

interface ImagePreviewProps {
  imageData: string | null;
  title: string;
  placeholder?: string;
}

export const ImagePreview = ({ 
  imageData, 
  title, 
  placeholder = "No image to preview" 
}: ImagePreviewProps) => {
  return (
    <Card className="p-6 bg-card border border-canvas-border canvas-shadow">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
        
        <div className="flex justify-center">
          <div className="w-64 h-64 border-2 border-canvas-border rounded-lg bg-canvas-bg canvas-shadow flex items-center justify-center">
            {imageData ? (
              <img
                src={imageData}
                alt={title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            ) : (
              <p className="text-muted-foreground text-center px-4">
                {placeholder}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};