"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/image-upload/image-upload";
import { Placeholder } from "@/constants/placeholder.num";

import useLocalUpdateProduct from "../use-local-update-product";

export default function UpdateProduct() {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const productId = Number(id);

  const [step, setStep] = useState<"info" | "variants">("info");

  const {
    form,
    onSubmit,
    fields,
    append,
    remove,
    attributes,
    setSelectedCategory,
    isPending,
    categorySelections,
    brandSelections,
  } = useLocalUpdateProduct(productId);

  if (!categorySelections || !brandSelections || attributes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Product</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs value={step} onValueChange={(v) => setStep(v as any)}>
              <TabsList className="mb-6">
                <TabsTrigger value="info">Step 1: Info</TabsTrigger>
                <TabsTrigger value="variants">Step 2: Variants</TabsTrigger>
              </TabsList>

              {/* ---------- STEP 1 ---------- */}
              <TabsContent value="info">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <ImageUpload
                        field={field}
                        label="Upload Product Images"
                        numOfImage={5}
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={Placeholder.CategoryName}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          value={field.value ? String(field.value) : undefined}
                          onValueChange={(v) => {
                            field.onChange(Number(v));
                            setSelectedCategory(Number(v));
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categorySelections.map((opt) => (
                              <SelectItem
                                key={opt.value}
                                value={String(opt.value)}
                              >
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="brandId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <Select
                          value={field.value ? String(field.value) : undefined}
                          onValueChange={(v) => field.onChange(Number(v))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Brand" />
                          </SelectTrigger>
                          <SelectContent>
                            {brandSelections.map((opt) => (
                              <SelectItem
                                key={opt.value}
                                value={String(opt.value)}
                              >
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={Placeholder.CategoryDescription}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end mt-6">
                  <Button
                    type="button"
                    onClick={async () => {
                      const ok = await form.trigger([
                        "images",
                        "name",
                        "price",
                        "categoryId",
                        "brandId",
                      ]);
                      if (ok) setStep("variants");
                    }}
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>

              {/* ---------- STEP 2 ---------- */}
              <TabsContent value="variants">
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <Card key={field.id}>
                      <CardHeader>
                        <CardTitle>{`Variant ${index + 1}`}</CardTitle>
                        <CardAction>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => remove(index)}
                          >
                            <X />
                          </Button>
                        </CardAction>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`variants.${index}.image`}
                          render={({ field }) => (
                            <ImageUpload
                              field={field}
                              label="Variant Image"
                              numOfImage={1}
                            />
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`variants.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  value={field.value ?? ""}
                                  onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                  }
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        {attributes.map((attr) => (
                          <FormField
                            key={attr.attributeName}
                            control={form.control}
                            name={`variants.${index}.attributes`}
                            render={({ field }) => {
                              // tìm valueId đang được chọn cho nhóm attribute này
                              const selected = field.value?.find((v: any) =>
                                attr.values.some((val) => val.id === v.valueId)
                              )?.valueId;

                              return (
                                <FormItem>
                                  <FormLabel>{attr.attributeName}</FormLabel>
                                  <FormControl>
                                    <Select
                                      value={
                                        selected ? String(selected) : undefined
                                      }
                                      onValueChange={(v) => {
                                        // giữ lại các attribute khác
                                        const others =
                                          field.value?.filter(
                                            (a: any) =>
                                              !attr.values.some(
                                                (val) => val.id === a.valueId
                                              )
                                          ) || [];

                                        field.onChange([
                                          ...others,
                                          {
                                            valueId: Number(v),
                                          },
                                        ]);
                                      }}
                                    >
                                      <SelectTrigger>
                                        <SelectValue
                                          placeholder={`Select ${attr.attributeName}`}
                                        />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {attr.values.map((val) => (
                                          <SelectItem
                                            key={val.id}
                                            value={String(val.id)}
                                          >
                                            {val.value}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </CardContent>
                    </Card>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      append({ quantity: 1, attributes: [], image: [] })
                    }
                  >
                    + Add Variant
                  </Button>
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep("info")}
                  >
                    Previous
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    Update Product
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
