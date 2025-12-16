import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

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
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

export const couponColumns = (
  handleUpdateBtn: (item: Coupon) => void,
  handleDeleteItem: (id: number) => void
): ColumnDef<Coupon>[] => {
  return [
    // Select
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    // ID
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
    },

    // Code
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
    },

    // Discount
    {
      id: "discount",
      header: "Discount",
      cell: ({ row }) => {
        const c = row.original;
        if (c.discountType === "percentage") {
          return `${c.discountValue}%`;
        }
        if (c.discountType === "fixed_amount") {
          return `$${c.discountValue}`;
        }
        return "Free Shipping";
      },
    },

    // Usage
    {
      id: "usage",
      header: "Usage",
      cell: ({ row }) => {
        const c = row.original;
        return `${c.usageCount ?? 0}/${c.usageLimit}`;
      },
    },

    // Status
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
    },

    // Date range
    {
      id: "duration",
      header: "Duration",
      cell: ({ row }) => {
        const c = row.original;
        return (
          <div className="text-xs">
            <div>{new Date(c.startDate).toLocaleDateString()}</div>
            <div>{new Date(c.endDate).toLocaleDateString()}</div>
          </div>
        );
      },
    },

    // Actions
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(String(item.id))}
              >
                Copy ID
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
