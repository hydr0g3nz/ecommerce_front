import React, { useState, useRef } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
interface ImageCropDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: string | null;
  onComplete: (croppedImageBlob: Blob) => void;
}

const ImageCropDialog: React.FC<ImageCropDialogProps> = ({ open, onOpenChange, image, onComplete }) => {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleCropComplete = async () => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageBlob = await cropImage(imageRef.current, crop as PixelCrop);
      onComplete(croppedImageBlob);
    }
  };

  const cropImage = (image: HTMLImageElement, pixelCrop: PixelCrop): Promise<Blob> => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        {image && (
          <>
            <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={4 / 5}>
              <Image
                src={image}
                ref={imageRef}
                alt="Crop me"
                width={500}
                height={500}
              />
            </ReactCrop>
            <Button onClick={handleCropComplete}>Confirm Crop</Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropDialog;