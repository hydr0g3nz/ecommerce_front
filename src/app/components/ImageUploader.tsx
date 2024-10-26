import React, { useEffect, useState, useRef } from "react";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Upload } from "lucide-react";
import { Variation } from "@/types/product";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";

type ImageUploaderProps = {
  varIdx: number;
  variant: Variation;
  onChange: (
    index: number,
    field: keyof Variation,
    value: string | number | Blob[] | string[]
  ) => void;
  onRemoveImage: (varIdx: number, imgIdx: number) => void;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  varIdx,
  variant,
  onChange,
  onRemoveImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [crop, setCrop] = useState<Crop>();
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize images and blobs in useEffect
  useEffect(() => {
    if (!variant.images) {
      onChange(varIdx, "images", []);
    }
    if (!variant.blobs) {
      onChange(varIdx, "blobs", []);
    }
  }, [varIdx, variant, onChange]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setCropDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCropComplete = async () => {
    if (!imageRef.current || !crop) return;

    try {
      const croppedBlob = await cropImage(imageRef.current, crop as PixelCrop);
      const newBlobs = [...(variant.blobs || []), croppedBlob];
      onChange(varIdx, "blobs", newBlobs);
      setCropDialogOpen(false);
      setSelectedImage(null);
      setCrop(undefined);
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  const handleDialogClose = () => {
    setCropDialogOpen(false);
    setSelectedImage(null);
    setCrop(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const cropImage = (
    image: HTMLImageElement,
    pixelCrop: PixelCrop
  ): Promise<Blob> => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(
        image,
        pixelCrop.x * scaleX,
        pixelCrop.y * scaleY,
        pixelCrop.width * scaleX,
        pixelCrop.height * scaleY,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
    }

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const handleRemoveImage = (index: number, type: "images" | "blobs") => {
    const currentArray = variant[type] || [];
    const newArray = currentArray.filter((_, i) => i !== index);
    if (type === "images") {
      onChange(varIdx, type, newArray as string[]);
      onRemoveImage(varIdx, index);
    } else if (type === "blobs") {
      onChange(varIdx, type, newArray as Blob[]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {variant.images?.map((image, imgIdx) => (
          <div key={`image-${varIdx}-${imgIdx}`} className="relative">
            <NextImage
              src={`http://127.0.0.1:8080/api/v1/images/products/${image}`}
              alt={`Product image ${imgIdx + 1}`}
              width={200}
              height={250}
              className="object-cover rounded"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => handleRemoveImage(imgIdx, "images")}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {variant.blobs?.map((blob, blobIdx) => (
          <div key={`blob-${varIdx}-${blobIdx}`} className="relative">
            <NextImage
              src={URL.createObjectURL(blob)}
              alt={`Product image ${blobIdx + 1}`}
              width={200}
              height={250}
              className="object-cover rounded"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => handleRemoveImage(blobIdx, "blobs")}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <label className="cursor-pointer">
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            ref={fileInputRef}
          />
          <div className="flex items-center gap-2 text-blue-500">
            <Upload className="h-4 w-4" />
            <span>Upload Image for Variation {varIdx}</span>
          </div>
        </label>
      </div>

      <Dialog open={cropDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crop Image for Variation {varIdx}</DialogTitle>
            <DialogDescription>
              Adjust the crop area to select the portion of the image you want
              to use
            </DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                aspect={4 / 5}
              >
                <Image
                  src={selectedImage}
                  ref={imageRef}
                  alt="Crop preview"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto", maxHeight: "70vh" }}
                />
              </ReactCrop>
              <Button
                onClick={handleCropComplete}
                disabled={!crop}
                className="w-full"
              >
                Confirm Crop
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUploader;