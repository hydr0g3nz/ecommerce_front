"use client";

import React, { useEffect, useState } from "react";
import { usePathname,useRouter } from "next/navigation";
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
const EditProductModal: React.FC = () => {
  const [editDialog, setEditDialog] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split("/")[2];
  useEffect(() => {
    console.log("edit product modal",id);
  },[])
  const onClose = () => {
    setEditDialog(!editDialog);
    router.back();
    // router.refresh();
 }
  return (
    <Dialog open={editDialog} onOpenChange={onClose}>
      <DialogTrigger />
      <DialogContent className=" w-[90%]">
        <DialogClose/>
        <ScrollArea className="h-[calc(100vh-80px)]">
          <EditProduct  handleModalClose={onClose}/>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;