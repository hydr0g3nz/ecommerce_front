import React from 'react';
import { PackageSearch } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EmptyOrdersState = () => {
  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <PackageSearch className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Orders Found
        </h3>
        <p className="text-gray-500 mb-6">
          {"Looks like you haven't placed any orders yet. Start shopping to see your orders here!"}
        </p>
        <Button
          onClick={() => window.location.href = '/products'}
          className="bg-primary hover:bg-primary/90"
        >

            
          Browse Products
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyOrdersState;