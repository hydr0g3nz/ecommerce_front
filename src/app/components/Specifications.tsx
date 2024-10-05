import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Trash2, PlusCircle } from "lucide-react";

interface SpecificationsProps {
  specifications: { [key: string]: string };
  onChange: (key: string, value: string) => void;
  onAdd: () => void;
  onRemove: (key: string) => void;
}

const Specifications: React.FC<SpecificationsProps> = ({
  specifications,
  onChange,
  onAdd,
  onRemove,
}) => {
  return (
    <>
      <CardHeader>
        <h2 className="text-xl font-semibold">Specifications</h2>
      </CardHeader>
      <CardContent>
        {Object.entries(specifications).map(([key, value], index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <Input
              placeholder="Key"
              value={key}
              onChange={(e) => {
                const newKey = e.target.value;
                onChange(newKey, value);
                onRemove(key);
              }}
            />
            <Input
              placeholder="Value"
              value={value}
              onChange={(e) => onChange(key, e.target.value)}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => onRemove(key)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button type="button" variant="outline" onClick={onAdd}>
          <PlusCircle className="h-4 w-4 mr-2" /> Add Specification
        </Button>
      </CardFooter>
    </>
  );
};

export default Specifications;