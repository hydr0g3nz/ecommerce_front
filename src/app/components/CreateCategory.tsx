import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useRouter ,usePathname} from "next/navigation";
const CreateCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentId: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();
  const path = usePathname();
  // Sample parent categories - in real app, fetch from API
  const parentCategories = [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Clothing" },
    { id: "3", name: "Books" },
  ];

  const validateForm = () => {
    const newErrors = {
      name: "",
      description: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.description;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      parentId: value,
    }));
  };

const createCategoryApi = async (categoryData: {
  name: string;
  description: string;
  product_ids: string[];
}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  const createdCategory = await response.json();
  return createdCategory;
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      try {
        await createCategoryApi({
          name: formData.name,
          description: formData.description,
          product_ids: [],
        });
      } catch (err) {
        setApiError("Failed to create category. Please try again.");
        console.error("Error creating category:", err);
      }

      // Reset form after successful submission
      setFormData({
        name: "",
        description: "",
        parentId: "",
      });


    } catch (err) {
        setApiError("Failed to create category. Please try again.");
        console.error("Error creating category:", err);
    } finally {
        setIsLoading(false);
       
        router.back();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Category</CardTitle>
      </CardHeader>
      <CardContent>
        {apiError && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Category Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter category description"
              className={`h-32 ${errors.description ? "border-red-500" : ""}`}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* <div className="space-y-2">
            <label className="text-sm font-medium">
              Parent Category (Optional)
            </label>
            <Select 
              value={formData.parentId}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select parent category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None (Top Level Category)</SelectItem>
                {parentCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">
              Select a parent category if this is a subcategory
            </p>
          </div> */}

          <Button type="button" className="w-full" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Category"
            )}
          </Button>
      </CardContent>
    </Card>
  );
};

export default CreateCategory;
