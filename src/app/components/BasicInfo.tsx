import React from "react";
import { Product } from "@/types/product";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader } from "@/components/ui/card";

interface BasicInfoProps {
  product: Product;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ product, onChange }) => {
  return (
    <>
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
            onChange={onChange}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={product.description}
            onChange={onChange}
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            name="brand"
            value={product.brand}
            onChange={onChange}
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            value={product.category}
            onChange={onChange}
          />
        </div>
      </CardContent>
    </>
  );
};

export default BasicInfo;