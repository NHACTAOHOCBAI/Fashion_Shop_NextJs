"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useParams } from "next/navigation";

import UpdateCategorySchema from "@/app/admin/categories/update-category/update-category-schema";

import { ImageUpload } from "@/components/image-upload/image-upload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useDepartmentSelections } from "@/hooks/queries/useDepartment";
import { useAttributeSelections } from "@/hooks/queries/useAttribute";
import {
  useGetCategoryById,
  useUpdateCategory,
} from "@/hooks/queries/useCategory";

import { toast } from "sonner";
import { formatDateTimeWithAt } from "@/lib/formatDate";

/* ========= Component ========= */

export default function UpdateCategory() {
  const { id } = useParams<{ id: string }>();

  const { mutate: updateItem, isPending } = useUpdateCategory();
  const { data: category } = useGetCategoryById(Number(id)) as {
    data: Category;
  };

  const form = useForm<z.infer<typeof UpdateCategorySchema>>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      departmentId: "",
      image: [],
      attributes: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "attributes",
  });

  const { data: departmentData } = useDepartmentSelections();
  const { data: attributeData } = useAttributeSelections();

  const usedAttributeIds = form.watch("attributes")?.map((a) => a.attributeId);

  /* ===== Fill data ===== */
  const initializeImage = async (images: string[]): Promise<File[]> => {
    const files = await Promise.all(
      images.map(async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();

        const file = new File([blob], "image", { type: blob.type });
        (file as any).preview = image; // 👈 để ImageUpload dùng

        return file;
      })
    );

    return files;
  };
  useEffect(() => {
    if (!category) return;

    const load = async () => {
      const groupedAttributes = Object.values(
        category.attributeCategories.reduce((acc: any, cur) => {
          const attrId = cur.attribute.id;
          if (!acc[attrId]) acc[attrId] = { attributeId: attrId, values: [] };
          acc[attrId].values.push(cur.value);
          return acc;
        }, {})
      );

      const imageFiles = category.imageUrl
        ? await initializeImage([category.imageUrl])
        : [];

      form.reset({
        name: category.name,
        description: category.description,
        departmentId: String(category.department.id),
        image: imageFiles,
        attributes: groupedAttributes as any,
      });

      replace(groupedAttributes as any);
    };

    load();
  }, [category]);

  /* ===== Submit ===== */

  function onSubmit(values: z.infer<typeof UpdateCategorySchema>) {
    const attributes = values?.attributes?.flatMap((attr) =>
      attr.values.map((v) => ({
        attributeId: attr.attributeId,
        value: v,
      }))
    );

    updateItem(
      {
        id: category.id,
        data: {
          name: values.name,
          image: values.image[0],
          departmentId: Number(values.departmentId),
          description: values.description,
          attributes: attributes || [],
        },
      },
      {
        onSuccess: () =>
          toast.success("Category updated", {
            description: formatDateTimeWithAt(new Date()),
          }),
        onError: (e) =>
          toast.error(e.message, {
            description: formatDateTimeWithAt(new Date()),
          }),
      }
    );
  }

  /* ===== UI ===== */

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Update Category</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Image */}
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <ImageUpload
                  field={field}
                  numOfImage={1}
                  label="Upload Image"
                />
              )}
            />

            {/* Name + Department */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="departmentId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isPending}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departmentData?.map((d) => (
                            <SelectItem key={d.id} value={String(d.id)}>
                              {d.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Attributes */}
            <div className="space-y-4">
              <FormLabel>Attributes</FormLabel>

              <div className="grid grid-cols-2 gap-4">
                {fields.map((f, index) => (
                  <Card key={f.id}>
                    <CardHeader className="flex justify-between flex-row">
                      <CardTitle className="text-base">
                        Attribute {index + 1}
                      </CardTitle>
                      <CardAction>
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </CardAction>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <FormField
                        name={`attributes.${index}.attributeId`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Attribute</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value ? String(field.value) : ""}
                                onValueChange={(v) => field.onChange(Number(v))}
                                disabled={isPending}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select attribute" />
                                </SelectTrigger>
                                <SelectContent>
                                  {attributeData?.map((a) => (
                                    <SelectItem
                                      key={a.id}
                                      value={String(a.id)}
                                      disabled={usedAttributeIds?.includes(
                                        a.id
                                      )}
                                    >
                                      {a.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        name={`attributes.${index}.values`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Values</FormLabel>
                            <div className="flex flex-wrap items-center gap-2 border rounded-md p-2 min-h-[44px]">
                              {field.value?.map((v, i) => (
                                <span
                                  key={i}
                                  className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded text-sm"
                                >
                                  {v}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      field.onChange(
                                        field.value.filter(
                                          (_, idx) => idx !== i
                                        )
                                      )
                                    }
                                    className="text-gray-500 hover:text-red-500"
                                  >
                                    ✕
                                  </button>
                                </span>
                              ))}
                              <input
                                type="text"
                                placeholder="Add value..."
                                className="flex-1 min-w-[120px] border-none outline-none text-sm"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    const value = e.currentTarget.value.trim();
                                    if (!value) return;
                                    if (!field.value?.includes(value)) {
                                      field.onChange([
                                        ...(field.value || []),
                                        value,
                                      ]);
                                    }
                                    e.currentTarget.value = "";
                                  }
                                }}
                                disabled={isPending}
                              />
                            </div>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button
                type="button"
                variant="ghost"
                className="w-full border border-dashed text-gray-500 hover:text-black"
                onClick={() => append({ attributeId: 0, values: [] })}
                disabled={isPending}
              >
                + Add Attribute
              </Button>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="submit" onLoading={isPending}>
                Update
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
