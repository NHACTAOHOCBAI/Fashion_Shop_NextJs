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
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const postColumns = (
  handleDeleteItem: (id: number) => void,
  handleViewDetail: (item: Post) => void
): ColumnDef<Post>[] => {
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
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
    },
    {
      accessorKey: "content",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Content" />
      ),
    },
    {
      id: "author",
      header: "Author",
      cell: ({ row }) => row.original.user?.fullName || "Unknown",
    },
    {
      accessorKey: "totalLikes",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Likes" />
      ),
    },
    {
      accessorKey: "totalComments",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total comments" />
      ),
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
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleViewDetail(item)}>
                View Detail
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:text-red-500"
                onClick={() => handleDeleteItem(item.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
