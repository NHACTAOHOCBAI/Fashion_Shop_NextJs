
import { categoryColumns } from "@/app/admin/categories/view-categories/user-columns"
import { useCategories, useDeleteCategory } from "@/hooks/queries/useCategory"
import useTable from "@/hooks/useTable"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { RowModel } from "@tanstack/react-table"
import React, { useCallback } from "react"
import { toast } from "sonner"

const useCategory = () => {
    const [openCreate, setOpenCreate] = React.useState(false)
    const openCreateDialog = () => {
        setOpenCreate(true)
    }
    const [openUpdate, setOpenUpdate] = React.useState(false)
    const [updatedCategory, setUpdatedCategory] = React.useState<Category>()
    const openUpdateDialog = (Category: Category) => {
        setOpenUpdate(true)
        setUpdatedCategory(Category)
    }
    const closeUpdateDialog = () => {
        setOpenUpdate(false)
        setUpdatedCategory(undefined)
    }
    const [openDelete, setOpenDelete] = React.useState(false)
    const [deletedCategories, setDeletedCategorys] = React.useState<number[]>([])
    const openDeleteDialog = (data: RowModel<Category>) => {
        const Categorys = data.rows.map((row) => {
            return row.original.id
        })
        setDeletedCategorys(Categorys)
        setOpenDelete(true)
    }
    const { mutate: deleteCategory } = useDeleteCategory()
    const handleDeleteCategory = useCallback((id: number) => {
        deleteCategory({ id: id }, {
            onSuccess: () => {
                toast.success("Category has been deleted", {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
            onError: (error) => {
                toast.error(`Ohh!!! ${error.message}`, {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
        },)
    }, [deleteCategory])
    const columns = categoryColumns(handleDeleteCategory, openUpdateDialog)
    const { table, filter, setFilter, setPagination, isFetching } = useTable<Category>({
        use: useCategories,
        columns: columns,
    })
    return {
        table, filter, setFilter, setPagination, isFetching, columns,
        openUpdate, updatedCategory, closeUpdateDialog, setOpenUpdate,
        openCreate, openCreateDialog, setOpenCreate,
        openDelete, deletedCategories, openDeleteDialog, setOpenDelete
    }
}
export default useCategory