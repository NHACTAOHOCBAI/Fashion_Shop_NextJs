import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import convertAlias from "@/lib/convertAlias";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";

export const stockColumns = (): ColumnDef<Stock>[] => {
  return [
    // ================= ID =================
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
    },

    // ================= VARIANT =================
    {
      id: "variant",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Variant" />
      ),
      cell: ({ row }) => {
        const variant = row.original.variant;

        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={variant.imageUrl} />
              <AvatarFallback>
                {convertAlias(variant.product.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col text-sm">
              <span className="font-medium">{variant.product.name}</span>

              {/* Attributes */}
              <span className="text-muted-foreground text-xs">
                {variant.variantAttributeValues
                  ?.map(
                    (v) =>
                      `${v.attributeCategory.attribute.name}: ${v.attributeCategory.value}`
                  )
                  .join(" · ")}
              </span>
            </div>
          </div>
        );
      },
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
      accessorKey: "quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quantity" />
      ),
      cell: ({ row }) => {
        const { quantity, type } = row.original;
        return (
          <span
            className={
              type === "IN"
                ? "text-green-600 font-medium"
                : "text-red-600 font-medium"
            }
          >
            {type === "IN" ? `+${quantity}` : `-${quantity}`}
          </span>
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
  ];
};
