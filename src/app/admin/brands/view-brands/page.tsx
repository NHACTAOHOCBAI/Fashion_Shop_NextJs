'use client'
import { CreateBrandDialog } from "@/app/admin/brands/create-brand/create-brand-dialog"
import { UpdateBrandDialog } from "@/app/admin/brands/update-brand/update-brand-dialog"
import { brandColumns } from "@/app/admin/brands/view-brands/user-columns"
import CrudTable from "@/components/crud_table/crud-table"
import { Button } from "@/components/ui/button"
import { useBrands, useDeleteBrands } from "@/hooks/queries/useBrand"
import { useDeleteUser } from "@/hooks/queries/useUser"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { Plus } from "lucide-react"
import React from "react"
import { toast } from "sonner"

export default function Brands() {
    const [openUpdate, setOpenUpdate] = React.useState(false)
    const [updatedItem, setUpdatedItem] = React.useState<Brand>()
    const [openCreate, setOpenCreate] = React.useState(false)
    const { mutate: deleteItem } = useDeleteUser()
    const handleUpdateBtn = (item: Brand) => {
        setOpenUpdate(true)
        setUpdatedItem(item)
    }
    const handleDeleteItem = (id: number) => {
        deleteItem({ id: id }, {
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
    }
    return (
        <>
            <CrudTable<Brand>
                columns={brandColumns(handleUpdateBtn, handleDeleteItem)}
                useQuery={useBrands}
                useDelete={useDeleteBrands}
                filterPlaceholder="Filter brand name..."
            >
                <Button
                    onClick={() => setOpenCreate(true)}
                    variant="outline"
                    size="sm"
                    className="h-8 flex ml-2"
                >
                    <Plus />
                    Add Brand
                </Button>
            </CrudTable>
            <CreateBrandDialog
                open={openCreate}
                setOpen={setOpenCreate}
            />
            <UpdateBrandDialog
                setOpen={setOpenUpdate}
                open={openUpdate}
                updatedItem={updatedItem}
                setUpdatedItem={setUpdatedItem}
            />
        </>
    )
}
