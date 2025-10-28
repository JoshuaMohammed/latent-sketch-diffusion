import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageChange: (imageData: string | null) => void;
  currentImage: string | null;
}

export const ImageUpload = ({ onImageChange, currentImage }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      onImageChange(imageData);
      toast.success("Image uploaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveImage = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="p-6 bg-card border border-canvas-border canvas-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-card-foreground">Upload Image</h3>
          {currentImage && (
            <Button variant="outline" size="sm" onClick={handleRemoveImage}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-smooth cursor-pointer
            ${isDragging ? 'border-primary bg-primary/5' : 'border-canvas-border'}
            ${currentImage ? 'border-solid' : ''}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={currentImage ? undefined : handleUploadClick}
        >
          {currentImage ? (
            <div className="space-y-2">
              <img
                src={currentImage}
                alt="Uploaded"
                className="w-64 h-64 object-contain mx-auto rounded-lg"
              />
              <p className="text-sm text-muted-foreground">
                Click the X button to remove this image
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
              <div className="space-y-2">
                <p className="text-base font-medium text-card-foreground">
                  Drop an image here or click to upload
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports JPG, PNG, and other image formats
                </p>
              </div>
              <Button variant="outline" onClick={handleUploadClick}>
                Choose File
              </Button>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </Card>
  );
};