"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "@/components/table/data-table-pagination"
import { DataTableViewOptions } from "@/components/table/data-table-view-options"
import CustomTable from "@/components/table/custom-table"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { ColumnDef, RowModel, Table } from "@tanstack/react-table"

interface CategoryTableProps {
    openDeleteDialog: (data: RowModel<Category>) => void
    openCreateDialog: () => void,
    filter: string,
    setFilter: (value: string) => void
    isFetching: boolean,
    setPagination: React.Dispatch<React.SetStateAction<{
        pageIndex: number;
        pageSize: number;
    }>>
    table: Table<Category>,
    columns: ColumnDef<Category>[]
}
export function CategoryTable({ openCreateDialog, columns, filter, isFetching, setFilter, setPagination, table, openDeleteDialog }: CategoryTableProps) {
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
                <div className="flex items-center ml-auto">
                    {
                        table.getFilteredSelectedRowModel().rows.length > 0
                        &&
                        <Button
                            variant="destructive"
                            size="sm"
                            className="h-8 flex  ml-2"
                            onClick={() => openDeleteDialog(table.getFilteredSelectedRowModel())}
                        >
                            <Trash2 />
                            Delete
                        </Button>
                    }
                    <DataTableViewOptions table={table} />
                    <Button
                        onClick={openCreateDialog}
                        variant="outline"
                        size="sm"
                        className="h-8 flex ml-2"
                    >
                        <Plus />
                        Add Category
                    </Button>
                </div>
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