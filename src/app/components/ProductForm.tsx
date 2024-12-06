import React from "react";
import { Product } from "@/types/product";
import { useProductForm } from "@/hooks/useProductForm";
import BasicInfo from "@/components/BasicInfo";
import Specifications from "@/components/Specifications";
import Variations from "@/components/Variations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Category } from "@/types/category";
interface ProductFormProps {
  product: Product;
  categories: Category[];
  onSubmit: (product: Product) => void;
  mode: string;
  handleModalClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  categories,
  onSubmit,
  mode,
  handleModalClose,
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
    isLoading,
  } = useProductForm(product);

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedProduct = await beforeUploadProduct();
    onSubmit(updatedProduct);
    handleModalClose()
  };

  const handleDelete = () => {
    setDeleteDialogOpen(false);
    handleDeleteProduct();
    handleModalClose();
  };
  if (isLoading.delete || isLoading.imageDelete || isLoading.upload || isLoading.imageUpload) {
    return <div>Loading...</div>;
  }
  return (
    <form  className="space-y-6">
      <Card>
        <BasicInfo product={formData} categories={categories} onChange={handleInputChange} />
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
        <Button  type="button" onClick={() => setUpdateDialogOpen(true)} className="w-1/2">
          {mode === "add" ? "Create Product" : "Update Product"}
        </Button>
        <Button
          type="button"
          onClick={() => setDeleteDialogOpen(true)}
          className="w-1/2 bg-red-500 hover:bg-red-600"
        >
          Delete Product
        </Button>
    </div>
        {/* Update Confirmation Dialog */}
        <AlertDialog open={updateDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm {mode === "add" ? "Creation" : "Update"}</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to {mode === "add" ? "create" : "update"} this product? 
                Please review all information before confirming.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setUpdateDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction 
              onClick={handleSubmit}
               type="submit"
               >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                product and remove all associated data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </form>
  );
};

export default ProductForm;