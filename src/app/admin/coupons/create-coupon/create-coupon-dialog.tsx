"use client";

import { useEffect, useState } from "react";
import useLocalCreateCoupon from "./use-local-create-coupon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts } from "@/hooks/queries/useProduct";
import { useCategories } from "@/hooks/queries/useCategory";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const MOCK_PRODUCTS = [
  { id: 1, name: "Product A" },
  { id: 2, name: "Product B" },
];
const MOCK_CATEGORIES = [
  { id: 1, name: "Category X" },
  { id: 2, name: "Category Y" },
];

export function CreateCouponDialog({ open, setOpen }: Props) {
  const { data: productsData } = useProducts({});
  const { data: categoriesData } = useCategories({});
  const products = productsData?.data;
  const categories = categoriesData?.data;
  const { form, handleCancel, isPending, onSubmit } = useLocalCreateCoupon(() =>
    setOpen(false)
  );

  const allTargets = [
    { label: "All Products", targetType: "all" as const, targetId: undefined },
    ...MOCK_PRODUCTS.map((p) => ({
      label: p.name,
      targetType: "product" as const,
      targetId: p.id,
    })),
    ...MOCK_CATEGORIES.map((c) => ({
      label: c.name,
      targetType: "category" as const,
      targetId: c.id,
    })),
  ];

  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      const init =
        form
          .getValues("targets")
          ?.map((t) => t.targetId?.toString() || t.targetType) || [];
      setSelectedTargets(init);
    }
  }, [open, form]);

  const handleFormSubmit = () => {
    const targets = selectedTargets.map((v) => {
      if (v === "all") return { targetType: "all" };

      const [type, id] = v.split("-");
      return {
        targetType: type as "product" | "category",
        targetId: Number(id),
      };
    });

    form.handleSubmit((values) =>
      onSubmit({
        ...values,
        discountValue:
          values.discountType === "free_shipping"
            ? undefined
            : values.discountValue,
        targets: targets as any,
      })
    )();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md max-h-[98vh] overflow-y-auto">
        <DialogHeader>
          <h6>Add Coupon</h6>
          <DialogDescription>Enter coupon information below.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}
          >
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="discountType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Type</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed_amount">Fixed Amount</SelectItem>
                      <SelectItem value="free_shipping">
                        Free Shipping
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {form.watch("discountType") !== "free_shipping" && (
              <FormField
                name="discountValue"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <FormField
              name="minOrderAmount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Order Amount</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="usageLimit"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usage Limit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="usageLimitPerUser"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usage Limit Per User</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="startDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="endDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Targets */}
            <FormItem>
              <FormLabel>Targets</FormLabel>

              {/* All */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTargets.includes("all")}
                  onChange={(e) =>
                    setSelectedTargets(e.target.checked ? ["all"] : [])
                  }
                />
                <span>All products</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                {/* Products */}
                <div>
                  <p className="font-medium mb-1">Products</p>
                  <div className="space-y-1 max-h-40 overflow-y-auto border rounded p-2">
                    {products?.map((p) => {
                      const key = `product-${p.id}`;
                      return (
                        <label
                          key={key}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            disabled={selectedTargets.includes("all")}
                            checked={selectedTargets.includes(key)}
                            onChange={(e) =>
                              setSelectedTargets((prev) => {
                                const filtered = prev.filter(
                                  (v) => v !== "all"
                                );
                                return e.target.checked
                                  ? [...filtered, key]
                                  : filtered.filter((v) => v !== key);
                              })
                            }
                          />
                          {p.name}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <p className="font-medium mb-1">Categories</p>
                  <div className="space-y-1 max-h-40 overflow-y-auto border rounded p-2">
                    {categories?.map((c) => {
                      const key = `category-${c.id}`;
                      return (
                        <label
                          key={key}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            disabled={selectedTargets.includes("all")}
                            checked={selectedTargets.includes(key)}
                            onChange={(e) =>
                              setSelectedTargets((prev) => {
                                const filtered = prev.filter(
                                  (v) => v !== "all"
                                );
                                return e.target.checked
                                  ? [...filtered, key]
                                  : filtered.filter((v) => v !== key);
                              })
                            }
                          />
                          {c.name}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </FormItem>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating..." : "Create Coupon"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
