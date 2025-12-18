// components/product-select.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  products: Product[];
  value?: number;
  onChange: (value: number) => void;
}

export default function ProductSelect({ products, value, onChange }: Props) {
  return (
    <Select
      value={value?.toString()}
      onValueChange={(v) => onChange(Number(v))}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select product" />
      </SelectTrigger>
      <SelectContent>
        {products.map((p) => (
          <SelectItem key={p.id} value={p.id.toString()}>
            {p.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
