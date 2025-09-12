"use client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import convertAlias from "@/lib/convertAlias"

export const categoryColumns = (handleDeleteCategory: (id: number) => void, handleUpdate: (category: Category) => void): ColumnDef<Category>[] => {
    return [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="ID" />
            ),
        },
        {
            accessorKey: "Image",
            cell: ({ row }) => {
                const category = row.original
                return (
                    <Avatar className="rounded-lg">
                        <AvatarImage src={category.imageUrl} />
                        <AvatarFallback className="rounded-lg">{convertAlias(category.name)}</AvatarFallback>
                    </Avatar>
                )
            },
        },
        {
            accessorKey: "name",
            enableSorting: false,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
        },
        {
            accessorKey: "parentId",
            enableSorting: false,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Parent" />
            ),
        },
        {
            accessorKey: "description",
            enableSorting: false,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Description" />
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const category = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(String(category.id))}
                            >
                                Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleUpdate(category)}>Update Category</DropdownMenuItem>
                            <DropdownMenuItem className="focus:text-red-500" onClick={() => handleDeleteCategory(category.id)}>
                                Delete Category
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
}
