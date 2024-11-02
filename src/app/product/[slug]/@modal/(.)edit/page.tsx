"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { useProduct } from "@/hooks/useProduct";
import ProductForm from "@/components/ProductForm";
import ImageUploader from "@/components/ImageUploader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditProduct from "@/components/EditProduct";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
const EditProductModal: React.FC = () => {
  const [editDialog, setEditDialog] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split("/")[2];
  const { role, authloading } = useAuth();
  useEffect(() => {
    if (!authloading) {
      if (!role) {
        router.replace('/login');
      }
    }
  }, [role, authloading]);
  if (authloading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }
  const onClose = () => {
    setEditDialog(!editDialog);
    router.back();
    // router.refresh();
  };
  return (
    <Dialog open={editDialog} onOpenChange={onClose}>
      <DialogTrigger />
      <DialogContent style={{maxWidth: "70vw"}}>
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">Edit Product</DialogTitle>
        </DialogHeader>
        <ScrollArea style={{ height: "80vh" }}>
          <div className="m-4">
            <EditProduct handleModalClose={onClose} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
