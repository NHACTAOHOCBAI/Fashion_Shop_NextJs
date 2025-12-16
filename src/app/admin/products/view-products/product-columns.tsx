import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import convertAlias from "@/lib/convertAlias";
import { shorthandFormatDateTime } from "@/lib/formatDate";
import { formatMoney } from "@/lib/formatMoney";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const productColumns = (
  handleUpdateBtn: (item: Product) => void,
  handleDeleteItem: (id: number) => void,
  handleViewDetail: (item: Product) => void
): ColumnDef<Product>[] => {
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
        const product = row.original;
        return (
          <Avatar>
            <AvatarImage src={product.images[0].imageUrl} />
            <AvatarFallback>{convertAlias(product.name)}</AvatarFallback>
          </Avatar>
        );
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
      accessorKey: "Category",
      cell: ({ row }) => {
        const product = row.original;
        return product.category.name;
      },
    },
    {
      accessorKey: "Brand",
      cell: ({ row }) => {
        const product = row.original;
        return product.brand.name;
      },
    },
    {
      accessorKey: "Price",
      cell: ({ row }) => {
        const product = row.original;
        return formatMoney(Number(product.price));
      },
    },
    {
      accessorKey: "description",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Updated At" />
      ),
      cell: ({ row }) => {
        const updatedAt = row.original.updatedAt;
        return shorthandFormatDateTime(new Date(updatedAt));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
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
              <DropdownMenuItem onClick={() => handleViewDetail(item)}>
                Detail Product
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleUpdateBtn(item)}>
                Update Product
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:text-red-500"
                onClick={() => handleDeleteItem(item.id)}
              >
                Delete Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
