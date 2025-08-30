"use client"

import React, { useCallback } from "react"
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "@/components/table/data-table-pagination"
import { DataTableViewOptions } from "@/components/table/data-table-view-options"
import CustomTable from "@/components/table/custom-table"
import { useDeleteUser, useUsers } from "@/hooks/queries/useUser"
import useTable from "@/hooks/useTable"
import { userColumns } from "@/app/admin/users/view-users/user-columns"
import { CreateUserDialog } from "@/app/admin/users/create-user/create-user-dialog"
import { UpdateUserDialog } from "@/app/admin/users/update-user/update-user-dialog"

export function UserTable() {
    const [openUpdate, setOpenUpdate] = React.useState(false)
    const [updatedUser, setUpdatedUser] = React.useState<User>()
    const chooseUpdatedUser = (user: User) => {
        setOpenUpdate(true)
        setUpdatedUser(user)
    }
    const unChooseUpdatedUser = () => {
        setOpenUpdate(false)
        setUpdatedUser(undefined)
    }
    const { mutate: deleteUser } = useDeleteUser()
    const handleDeleteUser = useCallback((id: number) => {
        deleteUser({ id: id }, {
            onSuccess: () => {
                console.log("success")
            },
            onError: (error) => {
                console.log(error)
            },
        },)
    }, [deleteUser])
    const columns = userColumns(handleDeleteUser, chooseUpdatedUser)
    const { table, filter, setFilter, setPagination } = useTable<User>({
        use: useUsers,
        columns: columns,
    })
    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter emails..."
                    className="max-w-sm"
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value)
                        setPagination((prev) => ({ ...prev, pageIndex: 0 }))
                    }}
                />
                <DataTableViewOptions table={table} />
                <CreateUserDialog />
                <UpdateUserDialog
                    setOpen={setOpenUpdate}
                    open={openUpdate}
                    updatedUser={updatedUser}
                    unChooseUpdatedUser={unChooseUpdatedUser}
                />
            </div>
            <div className="overflow-hidden rounded-md border">
                <CustomTable columns={columns} table={table} />
            </div>
            <div className="space-x-2 py-4">
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}