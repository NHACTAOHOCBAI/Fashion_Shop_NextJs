import { userColumns } from "@/app/admin/users/view-users/user-columns"
import { useDeleteUser, useUsers } from "@/hooks/queries/useUser"
import useTable from "@/hooks/useTable"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { RowModel } from "@tanstack/react-table"
import React, { useCallback } from "react"
import { toast } from "sonner"

const useUser = () => {
    const [openCreate, setOpenCreate] = React.useState(false)
    const openCreateDialog = () => {
        setOpenCreate(true)
    }
    const [openUpdate, setOpenUpdate] = React.useState(false)
    const [updatedUser, setUpdatedUser] = React.useState<User>()
    const openUpdateDialog = (user: User) => {
        setOpenUpdate(true)
        setUpdatedUser(user)
    }
    const closeUpdateDialog = () => {
        setOpenUpdate(false)
        setUpdatedUser(undefined)
    }
    const [openDelete, setOpenDelete] = React.useState(false)
    const [deletedUsers, setDeletedUsers] = React.useState<number[]>([])
    const openDeleteDialog = (data: RowModel<User>) => {
        const users = data.rows.map((row) => {
            return row.original.id
        })
        console.log(users)
        setDeletedUsers(users)
        setOpenDelete(true)
    }
    const { mutate: deleteUser } = useDeleteUser()
    const handleDeleteUser = useCallback((id: number) => {
        deleteUser({ id: id }, {
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
    }, [deleteUser])
    const columns = userColumns(handleDeleteUser, openUpdateDialog)
    const { table, filter, setFilter, setPagination, isFetching } = useTable<User>({
        use: useUsers,
        columns: columns,
    })
    return {
        table, filter, setFilter, setPagination, isFetching, columns,
        openUpdate, updatedUser, closeUpdateDialog, setOpenUpdate,
        openCreate, openCreateDialog, setOpenCreate,
        openDelete, deletedUsers, openDeleteDialog, setOpenDelete
    }
}
export default useUser