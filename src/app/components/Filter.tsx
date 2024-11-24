"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterIcon, X } from "lucide-react";

interface Category {
  name: string;
}

const Filter: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/category-delegate`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        const categories: Category[] = Object.entries(data.categories).map(([category, product]) => ({name: category}));
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error instanceof Error ? error.message : 'Unknown error');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const categoryParams = searchParams.get('category')?.split(',').filter(Boolean) || [];
    setSelectedCategories(categoryParams);
  }, [searchParams]);

  const handleCategoryChange = (categoryId: string, checked: boolean): void => {
    setSelectedCategories(prev => {
      const newSelected = checked 
        ? [...prev, categoryId]
        : prev.filter(id => id !== categoryId);
      updateURL(newSelected);
      return newSelected;
    });
  };

  const updateURL = (selected: string[]): void => {
    const params = new URLSearchParams(window.location.search);
    if (selected.length > 0) {
      params.set('category', selected.join(','));
    } else {
      params.delete('category');
    }
    router.push(`?${params.toString()}`);
  };

  const clearFilters = (): void => {
    setSelectedCategories([]);
    router.push(window.location.pathname);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-2 my-4">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <FilterIcon size={20} />
            Filter
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter Products</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Categories</h3>
              {selectedCategories.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-red-500 hover:text-red-600"
                >
                  Clear All
                </Button>
              )}
            </div>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center space-x-2">
                    <Checkbox
                      id={category.name}
                      checked={selectedCategories.includes(category.name)}
                      onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}
                    />
                    <label
                      htmlFor={category.name}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Active Filters Display */}
      <div className="flex flex-wrap gap-2">
        {selectedCategories.length > 0 && categories.length > 0 && 
          selectedCategories.map(categoryId => {
            const category = categories.find(c => c.name === categoryId);
            if (!category) return null;
            return (
              <Button
                key={categoryId}
                variant="secondary"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleCategoryChange(categoryId, false)}
              >
                {category.name}
                <X size={14} />
              </Button>
            );
          })
        }
      </div>
    </div>
  );
};

export default Filter;