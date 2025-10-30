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
import { shorthandFormatDateTime } from "@/lib/formatDate";
import { MoreHorizontal } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

export const couponColumns = (
  handleUpdateBtn: (item: Coupon) => void,
  handleDeleteItem: (id: number) => void
): ColumnDef<Coupon>[] => {
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
      accessorKey: "code",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
    },
    {
      accessorKey: "discountValue",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Discount" />
      ),
      cell: ({ row }) => `${row.original.discountValue}%`,
    },
    {
      accessorKey: "minOrderAmount",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Min Order" />
      ),
      cell: ({ row }) => `$${row.original.minOrderAmount}`,
    },
    {
      accessorKey: "usageLimit",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Usage Limit" />
      ),
    },
    {
      accessorKey: "usageLimitPerUser",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Per User" />
      ),
    },
    {
      accessorKey: "updatedAt",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Updated" />
      ),
      cell: ({ row }) =>
        shorthandFormatDateTime(new Date(row.original.updatedAt)),
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
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(String(item.code))}
              >
                Copy Code
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleUpdateBtn(item)}>
                Update Coupon
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:text-red-500"
                onClick={() => handleDeleteItem(item.id)}
              >
                Delete Coupon
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
