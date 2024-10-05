import React from "react";
import { Variation } from "@/types/product";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

interface VariationsProps {
  variations: Variation[];
  onChange: (index: number, field: keyof Variation, value: string | number) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const Variations: React.FC<VariationsProps> = ({
  variations,
  onChange,
  onAdd,
  onRemove,
}) => {
  return (
    <>
      <CardHeader>
        <h2 className="text-xl font-semibold">Variations</h2>
      </CardHeader>
      <CardContent>
        {variations.map((variation, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`sku-${index}`}>SKU</Label>
                <Input
                  id={`sku-${index}`}
                  value={variation.sku}
                  onChange={(e) =>
                    onChange(index, "sku", e.target.value)
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
                    onChange(index, "stock", parseInt(e.target.value))
                  }
                />
              </div>
              <div>
                <Label htmlFor={`size-${index}`}>Size</Label>
                <Input
                  id={`size-${index}`}
                  value={variation.size}
                  onChange={(e) =>
                    onChange(index, "size", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor={`color-${index}`}>Color</Label>
                <Input
                  id={`color-${index}`}
                  value={variation.color}
                  onChange={(e) =>
                    onChange(index, "color", e.target.value)
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
                    onChange(index, "price", parseFloat(e.target.value))
                  }
                />
              </div>
            </div>
            <Button
              type="button"
              variant="destructive"
              className="mt-2"
              onClick={() => onRemove(index)}
            >
              Remove Variation
            </Button>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button type="button" variant="outline" onClick={onAdd}>
          <PlusCircle className="h-4 w-4 mr-2" /> Add Variation
        </Button>
      </CardFooter>
    </>
  );
};

export default Variations;