/* eslint-disable @typescript-eslint/no-unused-vars */
import CreateProductSchema from "@/app/admin/products/create-product/create-product-schema"
import { useBrandSelections } from "@/hooks/queries/useBrand"
import { useCategorySelections } from "@/hooks/queries/useCategory"
import { useCreateProduct } from "@/hooks/queries/useProduct"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const useLocalCreateProduct = () => {
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
            price: undefined,
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
    return {
        form, onSubmit, isPending, categorySelections, brandSelections, handleCancel, fields, remove, append
    }
}
export default useLocalCreateProduct