import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import convertAlias from "@/lib/convertAlias"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"


export const brandColumns = (handleDeleteBrand: (id: number) => void, handleUpdate: (brand: Brand) => void): ColumnDef<Brand>[] => {
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
                const brand = row.original
                return (
                    <Avatar>
                        <AvatarImage src={brand.imageUrl} />
                        <AvatarFallback>{convertAlias(brand.name)}</AvatarFallback>
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
            accessorKey: "description",
            enableSorting: false,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Description" />
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const brand = row.original
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
                                onClick={() => navigator.clipboard.writeText(String(brand.id))}
                            >
                                Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleUpdate(brand)}>Update Brand</DropdownMenuItem>
                            <DropdownMenuItem className="focus:text-red-500" onClick={() => handleDeleteBrand(brand.id)}>
                                Delete Brand
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
}
