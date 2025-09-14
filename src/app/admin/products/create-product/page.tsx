/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import CreateProductSchema from "@/app/admin/products/create-product/create-product-schema"
import { ImageUpload } from "@/components/image-upload/image-upload"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Placeholder } from "@/constants/placeholder.num"
import { useBrandSelections } from "@/hooks/queries/useBrand"
import { useCategorySelections } from "@/hooks/queries/useCategory"
import { useCreateProduct } from "@/hooks/queries/useProduct"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const CreateProduct = () => {
    const { mutate: createProduct, isPending } = useCreateProduct()
    const { data: categoryData } = useCategorySelections()
    const { data: brandData } = useBrandSelections()

    const categorySelections = categoryData?.map((category) => ({
        value: category.id,
        label: category.name,
    }))
    const brandSelections = brandData?.map((brand) => ({
        value: brand.id,
        label: brand.name,
    }))

    type CreateProductFormType = z.infer<typeof CreateProductSchema>;

    const form = useForm<CreateProductFormType>({
        resolver: zodResolver(CreateProductSchema),
        defaultValues: {
            brandId: 0,
            categoryId: 0,
            description: "",
            image: [],
            name: "",
            price: 0,
            variants: []
        }
    })

    const { fields, append, remove } = useFieldArray<CreateProductFormType>({
        control: form.control,
        name: "variants",
    })

    function onSubmit(values: z.infer<typeof CreateProductSchema>) {
        const variants = values.variants.map(({ image, ...rest }) => rest)

        const variantImages = values.variants.map((variant) => variant.image[0])
        createProduct({
            brandId: values.brandId,
            categoryId: values.categoryId,
            images: values.image,
            name: values.name,
            price: values.price,
            variants: variants,
            description: values.description,
            variantImages: variantImages,
        }, {
            onSuccess: () => {
                toast.success("Category has been updated", {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
            onError: (error) => {
                toast.error(`Ohh!!! ${error.message}`, {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
            onSettled: () => {
                handleCancel()
            }
        })
    }

    const handleCancel = () => {
        form.reset()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Product</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        {/* Image Upload */}
                        <div className="flex gap-[10px]">
                            <div className="flex-[2]  space-y-2">
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <ImageUpload field={field} label="Upload Images" numOfImage={5} />
                                    )}
                                />

                                {/* Name */}
                                <FormField
                                    disabled={isPending}
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder={Placeholder.CategoryName} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Price */}
                                <FormField
                                    disabled={isPending}
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    value={field.value ?? ""}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Category */}
                                <FormField
                                    disabled={isPending}
                                    control={form.control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={
                                                        field.value !== undefined && field.value !== null
                                                            ? String(field.value)
                                                            : undefined
                                                    }
                                                    onValueChange={(value) => field.onChange(Number(value))}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder={Placeholder.CategoryParent} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categorySelections?.map((option) => (
                                                            <SelectItem
                                                                key={option?.value}
                                                                value={String(option?.value) || ""}
                                                            >
                                                                {option?.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Brand */}
                                <FormField
                                    disabled={isPending}
                                    control={form.control}
                                    name="brandId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Brand</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={
                                                        field.value !== undefined && field.value !== null
                                                            ? String(field.value)
                                                            : undefined
                                                    }
                                                    onValueChange={(value) => field.onChange(Number(value))}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder={Placeholder.CategoryParent} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {brandSelections?.map((option) => (
                                                            <SelectItem
                                                                key={option?.value}
                                                                value={String(option?.value) || ""}
                                                            >
                                                                {option?.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Description */}
                                <FormField
                                    disabled={isPending}
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
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Variants */}
                            <div className="flex-[1] space-y-2">
                                <FormLabel>Variants</FormLabel>
                                {fields.map((field, index) => (
                                    <Card key={field.id}>
                                        <CardHeader>
                                            <CardTitle>{`Variant ${index + 1}`}</CardTitle>
                                            <CardAction>  <Button
                                                type="button"
                                                variant="destructive"
                                                onClick={() => remove(index)}
                                            >
                                                Remove
                                            </Button></CardAction>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <FormField
                                                control={form.control}
                                                name={`variants.${index}.image`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Variant Image</FormLabel>
                                                        <FormControl>
                                                            <ImageUpload field={field} numOfImage={1} />
                                                        </FormControl>
                                                        {/* <FormMessage /> */}
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`variants.${index}.size`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Size</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Size" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`variants.${index}.color`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Color</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Color" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`variants.${index}.quantity`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Price</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                value={field.value ?? ""}
                                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`variants.${index}.price`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Price</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                value={field.value ?? ""}
                                                                onChange={(e) => field.onChange(Number(e.target.value))}
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
                                    onClick={() => append({ size: "", color: "", quantity: 0, price: 0, image: [] })}
                                >
                                    + Add Variant
                                </Button>
                            </div>

                        </div>
                        {/* Actions */}
                        <div className="flex flex-col gap-3 mt-6">
                            <Button onLoading={isPending} type="submit" className="w-full">
                                Create
                            </Button>
                            <Button
                                disabled={isPending}
                                type="button"
                                onClick={handleCancel}
                                variant={"outline"}
                                className="w-full"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default CreateProduct
