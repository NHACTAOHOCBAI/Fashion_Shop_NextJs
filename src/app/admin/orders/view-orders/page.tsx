'use client'

import { UpdateOrderDialog } from "@/app/admin/orders/update-order/update-order-dialog"
import { orderColumns } from "@/app/admin/orders/view-orders/order-columns"
import CrudTable from "@/components/crud_table/crud-table"
import { Button } from "@/components/ui/button"
import { useOrders, useDeleteOrder, useDeleteOrders } from "@/hooks/queries/useOrder"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { Plus } from "lucide-react"
import React from "react"
import { toast } from "sonner"

export default function Orders() {
    const [openUpdate, setOpenUpdate] = React.useState(false)
    const [updatedItem, setUpdatedItem] = React.useState<Order>()
    const [openCreate, setOpenCreate] = React.useState(false)

    const { mutate: deleteItem } = useDeleteOrder()

    const handleUpdateBtn = (item: Order) => {
        setOpenUpdate(true)
        setUpdatedItem(item)
    }

    const handleDeleteItem = (id: number) => {
        deleteItem(
            id,
            {
                onSuccess: () => {
                    toast.success("Order has been cancelled", {
                        description: formatDateTimeWithAt(new Date()),
                    })
                },
                onError: (error) => {
                    toast.error(`Ohh!!! ${error.message}`, {
                        description: formatDateTimeWithAt(new Date()),
                    })
                },
            }
        )
    }

    return (
        <>
            <CrudTable<Order>
                columns={orderColumns(handleUpdateBtn, handleDeleteItem)}
                useQuery={useOrders}
                useDelete={useDeleteOrders}
                filterPlaceholder="Filter order recipient name..."
            >
                <Button
                    onClick={() => setOpenCreate(true)}
                    variant="outline"
                    size="sm"
                    className="h-8 flex ml-2"
                >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Order
                </Button>
            </CrudTable>

            {/* <CreateOrderDialog open={openCreate} setOpen={setOpenCreate} /> */}

            <UpdateOrderDialog
                setOpen={setOpenUpdate}
                open={openUpdate}
                updatedItem={updatedItem}
                setUpdatedItem={setUpdatedItem}
            />
        </>
    )
}
