
import { productColumns } from "@/app/admin/products/view-products/product-columns"
import { useDeleteProduct, useProducts } from "@/hooks/queries/useProduct"
import useTable from "@/hooks/useTable"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { RowModel } from "@tanstack/react-table"
import React, { useCallback } from "react"
import { toast } from "sonner"

const useProduct = () => {
    const [openCreate, setOpenCreate] = React.useState(false)
    const [openUpdate, setOpenUpdate] = React.useState(false)
    const [updatedProduct, setUpdatedProduct] = React.useState<Product>()
    const [openDelete, setOpenDelete] = React.useState(false)
    const [deletedProducts, setDeletedProducts] = React.useState<number[]>([])
    const { mutate: deleteProduct } = useDeleteProduct()

    const openCreateDialog = () => {
        setOpenCreate(true)
    }
    const openUpdateDialog = (product: Product) => {
        setOpenUpdate(true)
        setUpdatedProduct(product)
    }
    const closeUpdateDialog = () => {
        setOpenUpdate(false)
        setUpdatedProduct(undefined)
    }
    const openDeleteDialog = (data: RowModel<Product>) => {
        const products = data.rows.map((row) => {
            return row.original.id
        })
        setDeletedProducts(products)
        setOpenDelete(true)
    }
    const handleDeleteProduct = useCallback((id: number) => {
        deleteProduct({ id: id }, {
            onSuccess: () => {
                toast.success("Product has been deleted", {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
            onError: (error) => {
                toast.error(`Ohh!!! ${error.message}`, {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
        },)
    }, [deleteProduct])
    const columns = productColumns(handleDeleteProduct, openUpdateDialog)
    const { table, filter, setFilter, setPagination, isFetching } = useTable<Product>({
        use: useProducts,
        columns: columns,
    })
    return {
        table, filter, setFilter, setPagination, isFetching, columns,
        openUpdate, updatedProduct, closeUpdateDialog, setOpenUpdate,
        openCreate, openCreateDialog, setOpenCreate,
        openDelete, deletedProducts, openDeleteDialog, setOpenDelete
    }
}
export default useProduct