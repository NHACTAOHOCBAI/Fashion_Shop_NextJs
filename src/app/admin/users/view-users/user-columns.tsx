import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { Check, MoreHorizontal, X } from "lucide-react";

export const userColumns = (
  handleUpdateBtn: (item: User) => void,
  handleDeleteItem: (id: number) => void
): ColumnDef<User>[] => {
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

    // 👉 Avatar
    {
      accessorKey: "avatar",
      header: "Avatar",
      enableSorting: false,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || ""} alt={user.fullName} />
            <AvatarFallback>
              {user.fullName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        );
      },
    },

    {
      accessorKey: "fullName",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },

    {
      accessorKey: "email",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },

    // 👉 Role
    {
      accessorKey: "role",
      header: "Role",
      enableSorting: false,
      cell: ({ row }) => {
        const role = row.original.role;
        return (
          <Badge variant={role === "admin" ? "destructive" : "secondary"}>
            {role}
          </Badge>
        );
      },
    },
    {
      accessorKey: "isVerified",
      header: "Verified",
      enableSorting: false,
      cell: ({ row }) => {
        const verified = row.original.isVerified;

        return verified ? (
          <Badge className="bg-green-500 hover:bg-green-500">
            <Check className="mr-1 h-3 w-3" />
            Verified
          </Badge>
        ) : (
          <Badge variant="outline" className="text-gray-500">
            <X className="mr-1 h-3 w-3" />
            Not verified
          </Badge>
        );
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
              <DropdownMenuItem onClick={() => handleUpdateBtn(item)}>
                Update User
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:text-red-500"
                onClick={() => handleDeleteItem(item.id)}
              >
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
