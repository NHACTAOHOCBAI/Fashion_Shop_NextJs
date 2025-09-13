import { brandColumns } from "@/app/admin/brands/view-brands/brand-columns"
import { useBrands, useDeleteBrand } from "@/hooks/queries/useBrand"
import useTable from "@/hooks/useTable"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { RowModel } from "@tanstack/react-table"
import React, { useCallback } from "react"
import { toast } from "sonner"

const useBrand = () => {
    const [openCreate, setOpenCreate] = React.useState(false)
    const [openUpdate, setOpenUpdate] = React.useState(false)
    const [updatedBrand, setUpdatedBrand] = React.useState<Brand>()
    const [openDelete, setOpenDelete] = React.useState(false)
    const [deletedBrands, setDeletedBrands] = React.useState<number[]>([])
    const { mutate: deleteBrand } = useDeleteBrand()

    const openCreateDialog = () => {
        setOpenCreate(true)
    }
    const openUpdateDialog = (brand: Brand) => {
        setOpenUpdate(true)
        setUpdatedBrand(brand)
    }
    const closeUpdateDialog = () => {
        setOpenUpdate(false)
        setUpdatedBrand(undefined)
    }
    const openDeleteDialog = (data: RowModel<Brand>) => {
        const brands = data.rows.map((row) => {
            return row.original.id
        })
        setDeletedBrands(brands)
        setOpenDelete(true)
    }
    const handleDeleteBrand = useCallback((id: number) => {
        deleteBrand({ id: id }, {
            onSuccess: () => {
                toast.success("Brand has been deleted", {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
            onError: (error) => {
                toast.error(`Ohh!!! ${error.message}`, {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
        },)
    }, [deleteBrand])
    const columns = brandColumns(handleDeleteBrand, openUpdateDialog)
    const { table, filter, setFilter, setPagination, isFetching } = useTable<Brand>({
        use: useBrands,
        columns: columns,
    })
    return {
        table, filter, setFilter, setPagination, isFetching, columns,
        openUpdate, updatedBrand, closeUpdateDialog, setOpenUpdate,
        openCreate, openCreateDialog, setOpenCreate,
        openDelete, deletedBrands, openDeleteDialog, setOpenDelete
    }
}
export default useBrand