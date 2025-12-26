// app/admin/stocks/in/stock-in-form.tsx
"use client";

import VariantStockTable from "./variant-stock-table";
import useStockIn from "./use-stock-in";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ProductSelect from "@/app/admin/stocks/in/product-select";

export default function StockInForm() {
  const { form, products, variants, isLoading, onSubmit } = useStockIn();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* PRODUCT */}
        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              <FormControl>
                <ProductSelect
                  products={products}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* VARIANTS */}
        {variants.length > 0 && <VariantStockTable variants={variants} />}

        {/* NOTE */}
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Optional note..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          Create Stock In
        </Button>
      </form>
    </Form>
  );
}
