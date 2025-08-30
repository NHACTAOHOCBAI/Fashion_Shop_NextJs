import { UseQueryResult } from "@tanstack/react-query";
import { ColumnDef, getCoreRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table"
import React from "react"

interface UseTableProps<T> {
    use: (params: QueryParams) => UseQueryResult<{
        pagination: {
            total: number;
            page: number;
            limit: number;
        };
        data: T[];
    }, Error>
    columns: ColumnDef<T>[]
}
const useTable = <T>({ use, columns }: UseTableProps<T>) => {
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 2,
    })
    const [filter, setFilter] = React.useState("")
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const { data, isFetching } = use({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: filter,
        sortBy: sorting[0]?.id,            // ✅ cột đang sort
        sortOrder: sorting[0]?.desc ? "DESC" : "ASC", // ✅ hướng sort
    })
    const totalPages = React.useMemo(() => Math.ceil((data?.pagination.total ?? 0) / pagination.pageSize), [pagination, data])
    const table = useReactTable({
        data: data?.data || [],
        columns,
        pageCount: totalPages,
        getCoreRowModel: getCoreRowModel(),

        manualPagination: true,
        onPaginationChange: setPagination,

        manualSorting: true,
        onSortingChange: setSorting,

        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            columnVisibility,
            rowSelection,
            pagination,
            sorting
        },
    })
    return {
        table,
        filter,
        setFilter,
        setPagination,
        isFetching
    }
}
export default useTable