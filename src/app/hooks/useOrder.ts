import { useCallback, useState } from 'react';
import axios from 'axios';

// Types
export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface OrderItem {
  product_id: string;
  sku: string;
  quantity: number;
  price: number;
  sale?: number;
}

export interface OrderRequest {
  user_id: string;
  shipping_address: Address;
  items: OrderItem[];
  status: string;
  payment_method: string;
}

export interface OrderResponse {
  order_id: string;
  status: string;
  total_price: number;
  created_at: string;
}

interface UseOrderProcessing {
  isLoading: boolean;
  error: string | null;
  submitOrder: (orderData: OrderRequest) => Promise<OrderResponse | null>;
  resetError: () => void;
}

export const useOrderProcessing = (
  apiUrl: string = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/order`
): UseOrderProcessing => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitOrder = useCallback(
    async (orderData: OrderRequest): Promise<OrderResponse | null> => {
      try {
        setIsLoading(true);
        setError(null);

        // Get the access token from localStorage or your auth management system
        const token = localStorage.getItem('accessToken');

        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.post<OrderResponse>(
          apiUrl,
          orderData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message || 
            'Failed to process order. Please try again.'
          );
        } else {
          setError('An unexpected error occurred');
        }
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [apiUrl]
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    submitOrder,
    resetError,
  };
};

// Example usage with form data
export const useOrderForm = () => {
  const [formData, setFormData] = useState<Partial<OrderRequest>>({
    shipping_address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    items: [],
    payment_method: '',
    status: 'created',
  });

  const updateShippingAddress = useCallback((field: keyof Address, value: string) => {
    setFormData(prev => ({
      ...prev,
      shipping_address: {
        ...prev.shipping_address!,
        [field]: value,
      },
    }));
  }, []);

  const addItem = useCallback((item: OrderItem) => {
    setFormData(prev => ({
      ...prev,
      items: [...(prev.items || []), item],
    }));
  }, []);

  const removeItem = useCallback((productId: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items?.filter(item => item.product_id !== productId) || [],
    }));
  }, []);

  const updatePaymentMethod = useCallback((method: string) => {
    setFormData(prev => ({
      ...prev,
      payment_method: method,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      shipping_address: {
        street: '',
        city: '',
        state: '',
        zip: '',
      },
      items: [],
      payment_method: '',
      status: 'created',
    });
  }, []);

  return {
    formData,
    updateShippingAddress,
    addItem,
    removeItem,
    updatePaymentMethod,
    resetForm,
  };
};