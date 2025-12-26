// app/admin/stocks/in/stock-in-schema.ts
import z from "zod";

export const StockItemSchema = z.object({
  variantId: z.number(),
  quantity: z.number().min(1),
});

const StockInSchema = z.object({
  productId: z.number("Product is required"),
  note: z.string().optional(),
  items: z.array(StockItemSchema).min(1, "No stock item added"),
});

export default StockInSchema;
