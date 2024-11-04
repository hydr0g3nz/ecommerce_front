import React from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import exp from 'constants';

export type ProcessStatus = 'processing' | 'success' | 'error';

interface OrderProcessingDialogProps {
  isOpen: boolean;
  status: ProcessStatus;
  title?: string;
  message?: string;
  onOpenChange: (open: boolean) => void;
}

const OrderProcessingDialog = ({
  isOpen,
  status,
  title,
  message,
  onOpenChange
}: OrderProcessingDialogProps) => {
  const getContent = () => {
    switch (status) {
      case 'processing':
        return {
          title: title || 'Processing Order',
          message: message || 'Please wait while we process your order...',
          icon: <Loader2 className="h-8 w-8 animate-spin text-primary" />
        };
      case 'success':
        return {
          title: title || 'Order Successful',
          message: message || 'Your order has been processed successfully!',
          icon: <CheckCircle2 className="h-8 w-8 text-green-500" />
        };
      case 'error':
        return {
          title: title || 'Order Failed',
          message: message || 'There was an error processing your order. Please try again.',
          icon: <XCircle className="h-8 w-8 text-red-500" />
        };
    }
  };

  const content = getContent();

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[400px]">
        <AlertDialogHeader className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center p-2">
            {content.icon}
          </div>
          <AlertDialogTitle className="text-center">
            {content.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {content.message}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OrderProcessingDialog;