"use client";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
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
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import convertAlias from "@/lib/convertAlias";
import { shorthandFormatDateTime } from "@/lib/formatDate";
export const categoryColumns = (
  handleUpdateBtn: (item: Category) => void,
  handleDeleteItem: (id: number) => void,
  handleViewItem: (item: Category) => void
): ColumnDef<Category>[] => {
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
      accessorKey: "Image",
      cell: ({ row }) => {
        const category = row.original;
        return (
          <Avatar>
            <AvatarImage className="object-cover" src={category.imageUrl} />
            <AvatarFallback>{convertAlias(category.name)}</AvatarFallback>
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

    // ✅ Department
    {
      accessorKey: "department",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Department" />
      ),
      cell: ({ row }) => <span>{row.original.department.name}</span>,
    },

    // ✅ Trạng thái
    {
      accessorKey: "isActive",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const active = row.original.isActive;
        return (
          <Badge variant={active ? "outline" : "secondary"}>
            {active ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => {
        const createdAt = row.original.createdAt;
        return shorthandFormatDateTime(new Date(createdAt));
      },
    },
    // ✅ Hành động
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
              <DropdownMenuItem onClick={() => handleViewItem(item)}>
                View Category
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleUpdateBtn(item)}>
                Update Category
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:text-red-500"
                onClick={() => handleDeleteItem(item.id)}
              >
                Delete Category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
