"use client"
import React from "react"
import { BrandTable } from "@/app/admin/brands/view-brands/brands-table"
import useBrand from "@/app/admin/brands/view-brands/hooks/use-brand"
import { CreateBrandDialog } from "@/app/admin/brands/create-brands/create-brand-dialog"
import { UpdateBrandDialog } from "@/app/admin/brands/update-brands/update-brand-dialog"
import DeleteBrandDialog from "@/app/admin/brands/delete-brand/delete-brand-dialog"

export default function Users() {
    const {
        filter, isFetching, setFilter, setPagination, table, columns,
        closeUpdateDialog, openUpdate, updatedBrand, setOpenUpdate,
        openCreate, openCreateDialog, setOpenCreate,
        openDelete, openDeleteDialog, setOpenDelete, deletedBrands
    } = useBrand()
    return (
        <div className="container mx-auto py-10  ">
            <BrandTable
                columns={columns}
                filter={filter}
                isFetching={isFetching}
                openCreateDialog={openCreateDialog}
                openDeleteDialog={openDeleteDialog}
                setFilter={setFilter}
                setPagination={setPagination}
                table={table}
            />
            <CreateBrandDialog
                open={openCreate}
                setOpen={setOpenCreate}
            />
            <UpdateBrandDialog
                setOpen={setOpenUpdate}
                open={openUpdate}
                updatedBrand={updatedBrand}
                unChooseUpdatedBrand={closeUpdateDialog}
            />
            <DeleteBrandDialog
                table={table}
                deletedBrands={deletedBrands}
                open={openDelete}
                setOpen={setOpenDelete}
            />
        </div>
    )
}