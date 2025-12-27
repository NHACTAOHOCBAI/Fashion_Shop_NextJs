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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { shorthandFormatDateTime } from "@/lib/formatDate";
import { formatMoney } from "@/lib/formatMoney";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Eye } from "lucide-react";

export const orderColumns = (
  handleUpdateBtn: (item: Order) => void,
  handleDeleteItem: (id: number) => void
): ColumnDef<Order>[] => [
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
    accessorKey: "recipientName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recipient" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "recipientPhone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    enableSorting: false,
  },
  {
    id: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    enableSorting: false,
    cell: ({ row }) => {
      const o = row.original;
      const shortAddress = `${o.detailAddress}, ${o.commune}, ${o.district}`;
      return (
        <Tooltip>
          <TooltipTrigger>
            <div className="max-w-[200px] truncate cursor-pointer">
              {shortAddress}
            </div>
          </TooltipTrigger>
          <TooltipContent>{`${shortAddress}, ${o.province}`}</TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    enableSorting: false,
    cell: ({ row }) => {
      const status = row.original.status;
      const color =
        status === "COMPLETED"
          ? "text-green-600"
          : status === "PENDING"
          ? "text-yellow-600"
          : status === "CANCELLED"
          ? "text-red-600"
          : "text-gray-600";
      return <span className={color}>{status}</span>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">
        {formatMoney(row.original.totalAmount)}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return shorthandFormatDateTime(new Date(date));
    },
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
            <DropdownMenuItem
              onClick={() =>
                (window.location.href = `/admin/orders/detail-order/${item.id}`)
              }
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              View Detail
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUpdateBtn(item)}>
              Update Order
            </DropdownMenuItem>
            <DropdownMenuItem
              className="focus:text-red-500"
              onClick={() => handleDeleteItem(item.id)}
            >
              Cancel Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
