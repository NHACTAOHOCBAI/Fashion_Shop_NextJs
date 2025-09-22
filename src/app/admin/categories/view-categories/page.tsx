'use client'

import { attributeColumns } from "@/app/admin/attributes/view-attributes/attribute-columns"
import CrudTable from "@/components/crud_table/crud-table"
import { Button } from "@/components/ui/button"
import { useCategories, useDeleteCategories, useDeleteCategory } from "@/hooks/queries/useCategory"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import { toast } from "sonner"

export default function Attributes() {
    const router = useRouter()
    const { mutate: deleteItem } = useDeleteCategory()
    const handleUpdateBtn = (item: Attribute) => {
        router.push(`/admin/categories/update-category/${item.id}`)
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
                useQuery={useCategories}
                useDelete={useDeleteCategories}
                filterPlaceholder="Filter category name..."
            >
                <Button
                    onClick={() => router.push(`/admin/categories/create-category`)}
                    variant="outline"
                    size="sm"
                    className="h-8 flex ml-2"
                >
                    <Plus />
                    Add Attribute
                </Button>
            </CrudTable>
        </>
    )
}
