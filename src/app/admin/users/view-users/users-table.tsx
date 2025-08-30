"use client"

import React, { useCallback } from "react"
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "@/components/table/data-table-pagination"
import { DataTableViewOptions } from "@/components/table/data-table-view-options"
import CustomTable from "@/components/table/custom-table"
import { useDeleteUser, useUsers } from "@/hooks/queries/useUser"
import useTable from "@/hooks/useTable"
import { userColumns } from "@/app/admin/users/view-users/user-columns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { formatDateTimeWithAt } from "@/lib/formatDate"

interface UserTableProps {
    openUpdateDialog: (user: User) => void
    openCreateDialog: () => void
}
export function UserTable({ openUpdateDialog, openCreateDialog }: UserTableProps) {
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
                <Button
                    onClick={openCreateDialog}
                    variant="outline"
                    size="sm"
                    className="h-8 flex ml-2"
                >
                    <Plus />
                    Add User
                </Button>
            </div>
            <div className="overflow-hidden rounded-md border">
                <CustomTable onLoading={isFetching} columns={columns} table={table} />
            </div>
            <div className="space-x-2 py-4">
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}