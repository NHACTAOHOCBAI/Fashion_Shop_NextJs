"use client"
import DeleteProductDialog from "@/app/admin/products/delete-product/delete-user-dialog"
import useProduct from "@/app/admin/products/view-products/hooks/use-product"
import { ProductTable } from "@/app/admin/products/view-products/products-table"
import React from "react"


export default function Products() {
    const {
        filter, isFetching, setFilter, setPagination, table, columns,
        closeUpdateDialog, openUpdate, updatedProduct, setOpenUpdate,
        openCreate, openCreateDialog, setOpenCreate,
        openDelete, deletedProducts, openDeleteDialog, setOpenDelete
    } = useProduct()
    return (
        <div className="container mx-auto py-10  ">
            <ProductTable
                columns={columns}
                filter={filter}
                isFetching={isFetching}
                openCreateDialog={openCreateDialog}
                openDeleteDialog={openDeleteDialog}
                setFilter={setFilter}
                setPagination={setPagination}
                table={table}
            />
            <DeleteProductDialog
                table={table}
                deletedProducts={deletedProducts}
                open={openDelete}
                setOpen={setOpenDelete}
            />
        </div>
    )
}