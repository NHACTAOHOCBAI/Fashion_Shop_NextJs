import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import type { ColumnDef } from "@tanstack/react-table";
import convertAlias from "@/lib/convertAlias";
import { Eye } from "lucide-react";

/* ===================== COLUMNS ===================== */

export const stockColumns = (): ColumnDef<Stock>[] => {
  return [
    // ================= ID =================
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
    },

    // ================= TYPE =================
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => {
        const type = row.original.type;
        return (
          <Badge variant={type === "IN" ? "default" : "destructive"}>
            {type}
          </Badge>
        );
      },
    },

    // ================= QUANTITY =================
    {
      id: "quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quantity" />
      ),
      cell: ({ row }) => {
        const { items, type } = row.original;
        const total = items.reduce((a, item) => a + item.quantity, 0);
        return (
          <div
            className={
              type === "IN"
                ? "text-green-600 font-medium"
                : "text-red-600 font-medium"
            }
          >
            {type === "IN" ? `+${total}` : `-${total}`}
          </div>
        );
      },
    },

    // ================= NOTE =================
    {
      accessorKey: "note",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Note" />
      ),
      cell: ({ row }) => (
        <span className="line-clamp-2 text-sm">{row.original.note || "-"}</span>
      ),
    },

    // ================= CREATED BY =================
    {
      id: "createdBy",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created By" />
      ),
      cell: ({ row }) => {
        const user = row.original.createdBy;
        return (
          <span className="text-sm">
            {user?.fullName || user?.email || "-"}
          </span>
        );
      },
    },

    // ================= CREATED AT =================
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) =>
        dayjs(row.original.createdAt).format("DD/MM/YYYY HH:mm"),
    },

    // ================= ACTIONS =================
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const stock = row.original;

        const handleViewDetail = () => {
          window.location.href = `/admin/stocks/detail-stock/${stock.id}`;
        };

        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleViewDetail}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            View Detail
          </Button>
        );
      },
    },
  ];
};
