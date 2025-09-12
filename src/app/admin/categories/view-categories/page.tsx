"use client"
import React from "react"
import useCategory from "@/app/admin/categories/view-categories/hooks/use-category"
import { CategoryTable } from "@/app/admin/categories/view-categories/users-table"
import { CreateCategoryDialog } from "@/app/admin/categories/create-category/create-category-dialog"
import DeleteCategoryDialog from "@/app/admin/categories/delete-category/delete-category-dialog"
import { UpdateCategoryDialog } from "@/app/admin/categories/update-category/update-category-dialog"

export default function Users() {
    const {
        filter, isFetching, setFilter, setPagination, table, columns,
        closeUpdateDialog, openUpdate, updatedCategory, setOpenUpdate,
        openCreate, openCreateDialog, setOpenCreate,
        openDelete, openDeleteDialog, setOpenDelete, deletedCategories
    } = useCategory()
    return (
        <div className="container mx-auto py-10  ">
            <CategoryTable
                columns={columns}
                filter={filter}
                isFetching={isFetching}
                openCreateDialog={openCreateDialog}
                openDeleteDialog={openDeleteDialog}
                setFilter={setFilter}
                setPagination={setPagination}
                table={table}
            />
            <DeleteCategoryDialog
                table={table}
                deletedCategories={deletedCategories}
                open={openDelete}
                setOpen={setOpenDelete}
            />
            <UpdateCategoryDialog
                setOpen={setOpenUpdate}
                open={openUpdate}
                updatedCategory={updatedCategory}
                unChooseUpdatedCategory={closeUpdateDialog}
            />
            <CreateCategoryDialog
                open={openCreate}
                setOpen={setOpenCreate}
            />
        </div>
    )
}