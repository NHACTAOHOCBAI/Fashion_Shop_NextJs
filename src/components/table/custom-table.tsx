import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, flexRender } from "@tanstack/react-table"
import { Loader } from "lucide-react"

interface CustomTableProps<TData> {
    table: import("@tanstack/table-core").Table<TData>,
    columns: ColumnDef<TData>[],
    onLoading?: boolean
}
const CustomTable = <TData,>({ table, columns, onLoading = false }: CustomTableProps<TData>) => {
    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {
                    onLoading ? <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            <div className="flex justify-center items-center gap-2">
                                <Loader className="h-5 w-5 animate-spin" />
                                Loading...
                            </div>
                        </TableCell>
                    </TableRow>
                        :
                        table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )

                }
            </TableBody>
        </Table>
    )
}
export default CustomTable