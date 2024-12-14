"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import EditProduct from "@/components/EditProduct";

const EditProductModal: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split("/")[2];
  
  // Remove auth check from component level
  const { role } = useAuth();

  const handleClose = () => {
    router.push('/products'); // Navigate directly to products page instead of using router.back()
  };

  // Don't render anything if no id
  if (!id) {
    router.push('/products');
    return null;
  }
  if (role != "admin"){
    router.back()
  }
  return (
    <Dialog defaultOpen onOpenChange={handleClose}>
      <DialogContent className="max-w-[70vw]">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">Edit Product</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80vh]">
          <div className="m-4">
            <EditProduct  handleModalClose={handleClose} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;