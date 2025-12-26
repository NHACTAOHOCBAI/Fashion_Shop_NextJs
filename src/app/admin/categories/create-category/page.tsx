"use client";

import CreateCategorySchema from "@/app/admin/categories/create-category/create-category-schema";
import { ImageUpload } from "@/components/image-upload/image-upload";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Placeholder } from "@/constants/placeholder.num";
import { useAttributeSelections } from "@/hooks/queries/useAttribute";
import { useCreateCategory } from "@/hooks/queries/useCategory";
import { useDepartmentSelections } from "@/hooks/queries/useDepartment";
import { formatDateTimeWithAt } from "@/lib/formatDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function CreateCategory() {
  const { mutate: createItem, isPending } = useCreateCategory();
  const form = useForm<z.infer<typeof CreateCategorySchema>>({
    resolver: zodResolver(CreateCategorySchema),
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

  function onSubmit(values: z.infer<typeof CreateCategorySchema>) {
    const attributes = values.attributes?.flatMap((attr) =>
      attr.values.map((v: string) => ({
        attributeId: attr.attributeId,
        value: v,
      }))
    );
    createItem(
      {
        name: values.name,
        image: values.image[0],
        departmentId: Number(values.departmentId),
        description: values.description,
        attributes: attributes || [],
      },
      {
        onSuccess: () => {
          toast.success("Category has been updated", {
            description: formatDateTimeWithAt(new Date()),
          });
        },
        onError: (error) => {
          toast.error(`Ohh!!! ${error.message}`, {
            description: formatDateTimeWithAt(new Date()),
          });
        },
        onSettled: () => {
          handleCancel();
        },
      }
    );
  }

  const handleCancel = () => {
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Category</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-[10px]">
              <div className="flex-[2]  space-y-2">
                {/* Image Upload */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUpload
                          field={field}
                          label="Upload Images"
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

                <FormField
                  control={form.control}
                  name="departmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isPending}
                          value={field.value}
                          onValueChange={field.onChange} // ⭐ QUAN TRỌNG
                        >
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

              {/* Variants */}
              <div className="flex-[1] space-y-2">
                <FormLabel>Attributes</FormLabel>
                {fields.map((field, index) => (
                  <Card key={field.id}>
                    <CardHeader>
                      <CardTitle>{`Attribute ${index + 1}`}</CardTitle>
                      <CardAction>
                        <Button
                          type="button"
                          variant={"ghost"}
                          onClick={() => remove(index)}
                        >
                          <X />
                        </Button>
                      </CardAction>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                                  <SelectValue
                                    placeholder={Placeholder.CategoryParent}
                                  />
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
                                onChange={(e) => field.onChange(e.target.value)} // Raw string input
                                onBlur={(e) => {
                                  const values = e.target.value
                                    .split(",")
                                    .map((v) => v.trim())
                                    .filter((v) => v);
                                  field.onChange(
                                    values.length > 0 ? values : [""]
                                  ); // Transform on blur
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
                Create
              </Button>
              <Button
                disabled={isPending}
                type="button"
                onClick={handleCancel}
                variant={"outline"}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
