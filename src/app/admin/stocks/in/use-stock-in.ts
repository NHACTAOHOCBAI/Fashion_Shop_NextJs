// app/admin/stocks/in/use-stock-in.ts
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StockInSchema from "./stock-in-schema";
import { useCreateStock } from "@/hooks/queries/useStock";
import { useEffect, useMemo, useState } from "react";
import {
  getProducts,
  mapProductsToStockVariants,
  StockVariant,
} from "@/services/product.service";

import { toast } from "sonner";
import { formatDateTimeWithAt } from "@/lib/formatDate";

export default function useStockIn() {
  const { mutate, isPending } = useCreateStock();

  const [products, setProducts] = useState<Product[]>([]);
  const [variants, setVariants] = useState<StockVariant[]>([]);

  const form = useForm({
    resolver: zodResolver(StockInSchema),
    defaultValues: {
      items: [],
    },
  });

  const productId = form.watch("productId");

  // 1️⃣ Fetch products ONCE
  useEffect(() => {
    getProducts({}).then((res) => {
      setProducts(res.data);
    });
  }, []);

  // 2️⃣ Map + filter variants theo productId
  useEffect(() => {
    if (!productId || products.length === 0) {
      setVariants([]);
      return;
    }

    const allVariants = mapProductsToStockVariants(products);
    const filtered = allVariants.filter((v) => v.productId === productId);

    setVariants(filtered);
    form.setValue("items", []);
  }, [productId, products]);

  const onSubmit = (values: any) => {
    mutate(
      {
        items: values.items,
        note: values.note,
      },
      {
        onSuccess: () => {
          toast.success("Stock in created", {
            description: formatDateTimeWithAt(new Date()),
          });
          form.reset();
          setVariants([]);
        },
      }
    );
  };

  return {
    form,
    products,
    variants,
    isLoading: isPending,
    onSubmit,
  };
}
