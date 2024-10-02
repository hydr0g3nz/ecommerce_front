"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Trash2, PlusCircle, Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Variation {
  sku: string;
  stock: number;
  size: string;
  color: string;
  price: number;
}

interface Product {
  product_id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  variations: Variation[];
  specifications: { [key: string]: string };
  review_ids: string[];
  rating: number;
  images: string[];
}

const EditProductPage: React.FC = () => {
  const router = useRouter();
  const id = usePathname().split("/")[1];
  const [product, setProduct] = useState<Product>({
    product_id: "",
    name: "",
    description: "",
    brand: "",
    category: "",
    variations: [],
    specifications: {},
    review_ids: [],
    rating: 0,
    images: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 80,
    height: 80,
    x: 0,
    y: 0,
    // aspectRatio: 4 / 5,
  });

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8080/api/v1/product/${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      const newState: Product = {
        product_id: data.product_id ?? "",
        name: data.name ?? "",
        description: data.description ?? "",
        brand: data.brand ?? "",
        category: data.category ?? "",
        variations: data.variations ?? [],
        specifications: data.specifications ?? {},
        review_ids: data.review_ids ?? [],
        rating: data.rating ?? 0,
        images: data.images ?? [],
      };
      setProduct(newState);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
//upload image
const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    "http://127.0.0.1:8080/api/v1/product/image",
    {
      method: "POST",
      body: formData,
    }
  );
  if (response.ok) {
    const data = await response.json();
    setProduct((prev) => ({ ...prev, images: [...prev.images, data.filename] }));
  } else {
    console.error("Failed to upload image:", response.status, response.statusText);
  }
}
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecificationChange = (key: string, value: string) => {
    setProduct((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, [key]: value },
    }));
  };
  const handleCropComplete = useCallback(
    (croppedArea: File, croppedAreaPixels: any) => {
      // Here you would typically send the cropped image data to your server
      // For this example, we'll just add the original image to the product
      // setProduct((prev) => ({
      //   ...prev,
      //   images: [...prev.images, selectedImage as string],
      // }));
      // file = ;
      uploadImage(croppedArea);
      setCropDialogOpen(false);
      setSelectedImage(null);
    },
    []
    // [selectedImage]
  );

  const removeImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
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
  const handleVariationChange = (
    index: number,
    field: keyof Variation,
    value: string | number
  ) => {
    setProduct((prev) => {
      const newVariations = [...prev.variations];
      newVariations[index] = { ...newVariations[index], [field]: value };
      return { ...prev, variations: newVariations };
    });
  };

  const addVariation = () => {
    setProduct((prev) => ({
      ...prev,
      variations: [
        ...prev.variations,
        { sku: "", stock: 0, size: "", color: "", price: 0 },
      ],
    }));
  };

  const removeVariation = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      variations: prev.variations.filter((_, i) => i !== index),
    }));
  };

  const addSpecification = () => {
    setProduct((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, "": "" },
    }));
  };

  const removeSpecification = (key: string) => {
    setProduct((prev) => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      return { ...prev, specifications: newSpecs };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/v1/product/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      alert("Product updated successfully");
      router.push("/list");
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product. Please try again.");
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto mt-8 p-4 space-y-6"
    >
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Images</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={ "http://127.0.0.1:8080/api/v1/images/products/" + image}
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
        </CardContent>
        <CardFooter>
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
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Basic Information</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={product.category}
              onChange={handleInputChange}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Specifications</h2>
        </CardHeader>
        <CardContent>
          {Object.entries(product.specifications).map(([key, value], index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                placeholder="Key"
                value={key}
                onChange={(e) => {
                  const newKey = e.target.value;
                  setProduct((prev) => {
                    const newSpecs = { ...prev.specifications };
                    delete newSpecs[key];
                    newSpecs[newKey] = value;
                    return { ...prev, specifications: newSpecs };
                  });
                }}
              />
              <Input
                placeholder="Value"
                value={value}
                onChange={(e) => handleSpecificationChange(key, e.target.value)}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeSpecification(key)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button type="button" variant="outline" onClick={addSpecification}>
            <PlusCircle className="h-4 w-4 mr-2" /> Add Specification
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Variations</h2>
        </CardHeader>
        <CardContent>
          {product.variations.map((variation, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`sku-${index}`}>SKU</Label>
                  <Input
                    id={`sku-${index}`}
                    value={variation.sku}
                    onChange={(e) =>
                      handleVariationChange(index, "sku", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`stock-${index}`}>Stock</Label>
                  <Input
                    id={`stock-${index}`}
                    type="number"
                    value={variation.stock}
                    onChange={(e) =>
                      handleVariationChange(
                        index,
                        "stock",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`size-${index}`}>Size</Label>
                  <Input
                    id={`size-${index}`}
                    value={variation.size}
                    onChange={(e) =>
                      handleVariationChange(index, "size", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`color-${index}`}>Color</Label>
                  <Input
                    id={`color-${index}`}
                    value={variation.color}
                    onChange={(e) =>
                      handleVariationChange(index, "color", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`price-${index}`}>Price</Label>
                  <Input
                    id={`price-${index}`}
                    type="number"
                    value={variation.price}
                    onChange={(e) =>
                      handleVariationChange(
                        index,
                        "price",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="destructive"
                className="mt-2"
                onClick={() => removeVariation(index)}
              >
                Remove Variation
              </Button>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button type="button" variant="outline" onClick={addVariation}>
            <PlusCircle className="h-4 w-4 mr-2" /> Add Variation
          </Button>
        </CardFooter>
      </Card>

      <Button type="submit" className="w-full">
        Update Product
      </Button>
      <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={4 / 5}>
              <Image src={selectedImage} width={200} height={250}  alt="Crop me" />
            </ReactCrop>
          )}
          <Button onClick={() => handleCropComplete(crop, null)}>
            Confirm Crop
          </Button>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default EditProductPage;
