"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "@/components/table/data-table-pagination"
import { DataTableViewOptions } from "@/components/table/data-table-view-options"
import CustomTable from "@/components/table/custom-table"
import useUser from "@/app/admin/users/view-users/hooks/use-user"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface UserTableProps {
    openUpdateDialog: (user: User) => void
    openCreateDialog: () => void
}
export function UserTable({ openUpdateDialog, openCreateDialog }: UserTableProps) {
    const { filter, isFetching, setFilter, setPagination, table, columns } = useUser(openUpdateDialog)
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