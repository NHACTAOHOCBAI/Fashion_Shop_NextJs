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
): ColumnDef<Coupon>[] => [
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

  // Code
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
  },

  // Name
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => row.original.name || "—",
  },

  // Discount
  {
    id: "discount",
    header: "Discount",
    cell: ({ row }) => {
      const c = row.original;
      if (c.discountType === "percentage") {
        return `${c.discountValue ?? 0}%`;
      }
      if (c.discountType === "fixed_amount") {
        return `$${c.discountValue ?? 0}`;
      }
      return "Free Shipping";
    },
  },

  // Min order
  {
    accessorKey: "minOrderAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Min Order" />
    ),
    cell: ({ row }) => `$${row.original.minOrderAmount}`,
  },

  // Usage
  {
    id: "usage",
    header: "Usage",
    cell: ({ row }) => {
      const c = row.original;
      return `${c.usageCount ?? 0}/${c.usageLimit || "∞"}`;
    },
  },

  // Duration
  {
    id: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const c = row.original;

      const start = new Date(c.startDate).toLocaleDateString("vi-VN");
      const end = new Date(c.endDate).toLocaleDateString("vi-VN");

      return (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>{start}</span>
          <span className="mx-1">→</span>
          <span>{end}</span>
        </div>
      );
    },
  },

  // Status
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
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
