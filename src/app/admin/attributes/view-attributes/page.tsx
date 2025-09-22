'use client'

import { CreateAttributeDialog } from "@/app/admin/attributes/create-attribute/create-attribute-dialog"
import { UpdateAttributeDialog } from "@/app/admin/attributes/update-attribute/update-attribute-dialog"
import { attributeColumns } from "@/app/admin/attributes/view-attributes/attribute-columns"
import CrudTable from "@/components/crud_table/crud-table"
import { Button } from "@/components/ui/button"
import { useAttributes, useDeleteAttribute, useDeleteAttributes } from "@/hooks/queries/useAttribute"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { Plus } from "lucide-react"
import React from "react"
import { toast } from "sonner"

export default function Attributes() {
    const [openUpdate, setOpenUpdate] = React.useState(false)
    const [updatedItem, setUpdatedItem] = React.useState<Attribute>()
    const [openCreate, setOpenCreate] = React.useState(false)
    const { mutate: deleteItem } = useDeleteAttribute()
    const handleUpdateBtn = (item: Attribute) => {
        setOpenUpdate(true)
        setUpdatedItem(item)
    }
    const handleDeleteItem = (id: number) => {
        deleteItem({ id: id }, {
            onSuccess: () => {
                toast.success("Attribute has been deleted", {
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
            <CrudTable<Attribute>
                columns={attributeColumns(handleUpdateBtn, handleDeleteItem)}
                useQuery={useAttributes}
                useDelete={useDeleteAttributes}
                filterPlaceholder="Filter attribute name..."
            >
                <Button
                    onClick={() => setOpenCreate(true)}
                    variant="outline"
                    size="sm"
                    className="h-8 flex ml-2"
                >
                    <Plus />
                    Add Attribute
                </Button>
            </CrudTable>
            <CreateAttributeDialog
                open={openCreate}
                setOpen={setOpenCreate}
            />
            <UpdateAttributeDialog
                setOpen={setOpenUpdate}
                open={openUpdate}
                updatedItem={updatedItem}
                setUpdatedItem={setUpdatedItem}
            />
        </>
    )
}
