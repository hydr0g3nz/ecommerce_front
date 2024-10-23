import React from "react";
import { Product } from "@/types/product";
import { useProductForm } from "@/hooks/useProductForm";
import BasicInfo from "@/components/BasicInfo";
import Specifications from "@/components/Specifications";
import Variations from "@/components/Variations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
interface ProductFormProps {
  product: Product;
  onSubmit: (product: Product) => void;
  mode: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  mode,
}) => {
  const {
    formData,
    handleInputChange,
    handleSpecificationChange,
    handleVariationChange,
    addVariation,
    removeVariation,
    addSpecification,
    removeSpecification,
    beforeUploadProduct,
    removeImage,
    handleDeleteProduct,
  } = useProductForm(product);
const [open, setOpen] = React.useState(false);
const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("before", formData);
    let updatedProduct = await beforeUploadProduct();
    console.log("after", updatedProduct);
    onSubmit(updatedProduct);
    // setFormData((prev) => ({ ...prev, ...updatedProduct }));
  };
  const handleDelete = () => {
    setOpen(false);
    handleDeleteProduct();
    router.push('/list')
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <BasicInfo product={formData} onChange={handleInputChange} />
      </Card>
      <Card>
        <Specifications
          specifications={formData.specifications}
          onChange={handleSpecificationChange}
          onAdd={addSpecification}
          onRemove={removeSpecification}
        />
      </Card>
      <Card>
        <Variations
          variations={formData.variations}
          onChange={handleVariationChange}
          onAdd={addVariation}
          onRemove={removeVariation}
          onRemoveImage={removeImage}
        />
      </Card>
      <div className="flex gap-4">
        <Button type="submit" className="w-1/2">
          {mode === "add" ? "Create Product" : "Update Product"}
        </Button>
        <Button
              type="button"
              onClick={() =>
                setOpen(true)
              }
              className="w-1/2 bg-red-500 hover:bg-red-600"
            >
              Delete Product
            </Button>
        <AlertDialog open={open}>
          {/* <AlertDialogTrigger asChild>
           
          </AlertDialogTrigger> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </form>
  );
};

export default ProductForm;
