import React, { useState } from "react";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Upload } from "lucide-react";
import ImageCropDialog from "@/components/ImageCropDialog";

interface ImageUploaderProps {
  images: string[];
  onUpdate: (images: Blob[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, onUpdate }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);

  const removeImage = (index: number) => {
    onUpdate(images.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setCropDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async (croppedImageBlob: Blob) => {
  

    setCropDialogOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <NextImage
              src={`http://127.0.0.1:8080/api/v1/images/products/${image}`}
              alt={`Product image ${index + 1}`}
              width={200}
              height={250}
              className="object-cover rounded"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => removeImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <label htmlFor="image-upload" className="cursor-pointer">
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <div className="flex items-center space-x-2 text-blue-500">
          <Upload className="h-4 w-4" />
          <span>Upload Image</span>
        </div>
      </label>
      <ImageCropDialog
        open={cropDialogOpen}
        onOpenChange={setCropDialogOpen}
        image={selectedImage}
        onComplete={handleCropComplete}
      />
    </>
  );
};

export default ImageUploader;