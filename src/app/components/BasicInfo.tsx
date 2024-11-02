import React from "react";
import { Product } from "@/types/product";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Category } from "@/types/category";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert } from "./ui/alert";
import CreateCategoryForm from "./CreateCategory";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
interface BasicInfoProps {
  product: Product;
  categories: Category[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({
  product,
  categories,
  onChange,
}) => {
  const [newCategory, setNewCategory] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const handleCategoryChange = (selectedCategory: string) => {
    const simulatedEvent: React.ChangeEvent<HTMLTextAreaElement> = {
      target: {
        value: selectedCategory,
        name: "category",
        id: "textarea-id",
        // Required properties from HTMLElement
        nodeName: "textarea",
        nodeType: 1,
        ownerDocument: document,
        // Add other required properties as needed
      } as HTMLTextAreaElement,
      // Required event properties
      type: "change",
      currentTarget: document.createElement("textarea"),
      bubbles: true,
      cancelable: true,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: true,
      nativeEvent: new Event("change"),
      isDefaultPrevented: () => false,
      isPropagationStopped: () => false,
      persist: () => {},
      preventDefault: () => {},
      stopPropagation: () => {},
      timeStamp: Date.now(),
    };
    onChange(simulatedEvent);
  };

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
          <Select
            onValueChange={handleCategoryChange}
            defaultValue={product.category}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(
                (category, i) =>
                  category.name && (
                    <SelectItem
                      key={category.category_id + i}
                      value={category.name}
                    >
                      {category.name}
                    </SelectItem>
                  )
              )}
              <SelectItem value="add-category" key={"add-category"}>
                <div className="flex items-center gap-2">
                  <PlusCircle className="w-3 h-3" />
                  <p>Add Category</p>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-[350px] space-y-2"
          >
            <div className="flex items-center justify-between space-x-4 px-4">
              <CollapsibleTrigger asChild>
                <Button  size="sm" className="mt-2">
                  Add Category
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2 w-full">
              <CreateCategoryForm />
            </CollapsibleContent>
          </Collapsible>
          <div className="flex items-center gap-2">
            {/* <Input
              id="add-category"
              name="add-category"
              value={newCategory}
              onChange={onChange}
              placeholder="Add new category"
            />
            <Button
              type="button"
              onClick={() => {
                if (newCategory) {
                  setNewCategory("x");
                }
              }}
            >
              Add
            </Button> */}
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default BasicInfo;
