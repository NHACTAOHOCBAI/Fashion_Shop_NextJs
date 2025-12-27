"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { X } from "lucide-react";

import { useUpdateCategory } from "@/hooks/queries/useCategory";
import { useDepartmentSelections } from "@/hooks/queries/useDepartment";
import { useAttributeSelections } from "@/hooks/queries/useAttribute";
import { formatDateTimeWithAt } from "@/lib/formatDate";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/image-upload/image-upload";
import { Placeholder } from "@/constants/placeholder.num";
import UpdateCategorySchema from "@/app/admin/categories/update-category/update-category-schema";
import { useInitializeImage } from "@/hooks/useInitializeImage";

const UpdateCategory = () => {
  const [updatedItem, setUpdatedItem] = useState<Category>();
  const { mutate: updateCategory, isPending } = useUpdateCategory();
  const { fileArray } = useInitializeImage(updatedItem?.imageUrl);
  const form = useForm<z.infer<typeof UpdateCategorySchema>>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      image: [],
      departmentId: undefined,
      attributes: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  });

  const { data: departmentData } = useDepartmentSelections();
  const { data: attributeData } = useAttributeSelections();

  const departmentSelections = departmentData?.map((department) => ({
    value: department.id,
    label: department.name,
  }));

  const attributeSelections = attributeData?.map((attribute) => ({
    value: attribute.id,
    label: attribute.name,
  }));

  const resetForm = useCallback(async () => {
    if (updatedItem)
      form.reset({
        image: fileArray,
        name: updatedItem.name,
        description: updatedItem.description || "",
        departmentId: String(updatedItem.department?.id),
        attributes:
          updatedItem.attributeCategories?.map((ac) => ({
            attributeId: ac.attribute.id,
            values: [ac.value],
          })) || [],
      });
  }, [form, updatedItem, fileArray]);

  useEffect(() => {
    const data = localStorage.getItem("updatedCategory");
    const updatedItem: Category = JSON.parse(data || "");
    setUpdatedItem(updatedItem);
  }, []);
  const handleCancel = () => form.reset();

  function onSubmit(values: z.infer<typeof UpdateCategorySchema>) {
    const attributes = values.attributes?.flatMap((attr) =>
      attr.values.map((v: string) => ({
        attributeId: attr.attributeId,
        value: v,
      }))
    );

    updateCategory(
      {
        id: 1,
        data: {
          name: values.name,
          image: values.image[0],
          departmentId: Number(values.departmentId),
          description: values.description,
          attributes: attributes || [],
        },
      },
      {
        onSuccess: () => {
          toast.success("Category has been updated", {
            description: formatDateTimeWithAt(new Date()),
          });
        },
        onError: (error) => {
          toast.error(`Update failed: ${error.message}`, {
            description: formatDateTimeWithAt(new Date()),
          });
        },
      }
    );
  }
  useEffect(() => {
    resetForm();
  }, [resetForm]);
  return (
    <Card>
      <CardHeader>
        <h5>Update Category</h5>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-[10px]">
              {/* Left side */}
              <div className="flex-[2] space-y-2">
                {/* Image Upload */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUpload
                          field={field}
                          label="Upload Image"
                          numOfImage={1}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={Placeholder.CategoryName}
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={Placeholder.CategoryDescription}
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Department */}
                <FormField
                  control={form.control}
                  name="departmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Select disabled={isPending} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={Placeholder.CategoryParent}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {departmentSelections?.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={String(option.value)}
                              >
                                {option.label}
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

              {/* Right side (Attributes) */}
              <div className="flex-[1] space-y-2">
                <FormLabel>Attributes</FormLabel>
                {fields.map((field, index) => (
                  <Card key={field.id}>
                    <CardHeader>
                      <CardTitle>{`Attribute ${index + 1}`}</CardTitle>
                      <CardAction>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => remove(index)}
                          disabled={isPending}
                        >
                          <X />
                        </Button>
                      </CardAction>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Attribute Name */}
                      <FormField
                        control={form.control}
                        name={`attributes.${index}.attributeId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Select
                                disabled={isPending}
                                value={
                                  field.value ? String(field.value) : undefined
                                }
                                onValueChange={(value) =>
                                  field.onChange(Number(value))
                                }
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select attribute" />
                                </SelectTrigger>
                                <SelectContent>
                                  {attributeSelections?.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={String(option.value)}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Attribute Values */}
                      <FormField
                        control={form.control}
                        name={`attributes.${index}.values`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Values (comma-separated)</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="e.g., Small, Medium, Large"
                                value={
                                  field.value && Array.isArray(field.value)
                                    ? field.value.join(", ")
                                    : field.value || ""
                                }
                                onChange={(e) => field.onChange(e.target.value)}
                                onBlur={(e) => {
                                  const values = e.target.value
                                    .split(",")
                                    .map((v) => v.trim())
                                    .filter((v) => v);
                                  field.onChange(
                                    values.length > 0 ? values : [""]
                                  );
                                }}
                                disabled={isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                ))}

                <Button
                  className="w-full"
                  type="button"
                  variant="outline"
                  onClick={() => append({ attributeId: 0, values: [] })}
                  disabled={isPending}
                >
                  + Add Attribute
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <Button onLoading={isPending} type="submit">
                Update
              </Button>
              <Button
                disabled={isPending}
                type="button"
                onClick={handleCancel}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateCategory;
