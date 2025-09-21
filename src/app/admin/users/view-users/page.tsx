'use client'
import { CreateUserDialog } from "@/app/admin/users/create-user/create-user-dialog"
import { UpdateUserDialog } from "@/app/admin/users/update-user/update-user-dialog"
import { userColumns } from "@/app/admin/users/view-users/user-columns"
import CrudTable from "@/components/crud_table/crud-table"
import { Button } from "@/components/ui/button"
import { useUsers, useDeleteUsers, useDeleteUser } from "@/hooks/queries/useUser"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { Plus } from "lucide-react"
import React from "react"
import { toast } from "sonner"

export default function Users() {
    const [openUpdate, setOpenUpdate] = React.useState(false)
    const [updatedItem, setUpdatedItem] = React.useState<User>()
    const [openCreate, setOpenCreate] = React.useState(false)
    const { mutate: deleteItem } = useDeleteUser()
    const handleUpdateBtn = (item: User) => {
        setOpenUpdate(true)
        setUpdatedItem(item)
    }
    const handleDeleteItem = (id: number) => {
        deleteItem({ id: id }, {
            onSuccess: () => {
                toast.success("User has been deleted", {
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
            <CrudTable<User>
                columns={userColumns(handleUpdateBtn, handleDeleteItem)}
                useQuery={useUsers}
                useDelete={useDeleteUsers}
                filterPlaceholder="Filter emails..."
            >
                <Button
                    onClick={() => setOpenCreate(true)}
                    variant="outline"
                    size="sm"
                    className="h-8 flex ml-2"
                >
                    <Plus />
                    Add User
                </Button>
            </CrudTable>
            <CreateUserDialog
                open={openCreate}
                setOpen={setOpenCreate}
            />
            <UpdateUserDialog
                setOpen={setOpenUpdate}
                open={openUpdate}
                updatedItem={updatedItem}
                setUpdatedItem={setUpdatedItem}
            />
        </>
    )
}
