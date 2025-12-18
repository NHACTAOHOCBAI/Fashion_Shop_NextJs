// app/admin/stocks/in/variant-stock-table.tsx
"use client";

import { Input } from "@/components/ui/input";
import { StockVariant } from "@/services/product.service";
import { useFormContext } from "react-hook-form";

interface Props {
  variants: StockVariant[];
}

export default function VariantStockTable({ variants }: Props) {
  const { setValue, watch } = useFormContext();
  const items = watch("items") || [];

  const handleChange = (variantId: number, quantity: number) => {
    const index = items.findIndex((i: any) => i.variantId === variantId);

    if (quantity <= 0) {
      if (index >= 0) {
        const newItems = [...items];
        newItems.splice(index, 1);
        setValue("items", newItems);
      }
      return;
    }

    if (index >= 0) {
      items[index].quantity = quantity;
      setValue("items", [...items]);
    } else {
      setValue("items", [...items, { variantId, quantity }]);
    }
  };

  return (
    <div className="border rounded-md">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-2 text-left">Variant</th>
            <th className="p-2 text-right">In stock</th>
            <th className="p-2 text-right">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((v) => (
            <tr key={v.variantId} className="border-t">
              <td className="p-2">
                <div className="font-medium">{v.attributesText}</div>
                <div className="text-xs text-muted-foreground">
                  {v.attributesDetail.join(" • ")}
                </div>
              </td>
              <td className="p-2 text-right">{v.remaining}</td>
              <td className="p-2 text-right">
                <Input
                  type="number"
                  min={0}
                  defaultValue={0}
                  onChange={(e) =>
                    handleChange(v.variantId, Number(e.target.value))
                  }
                  className="w-24 ml-auto"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
