/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import CustomTable from "@/components/table/custom-table";
import { DataTablePagination } from "@/components/table/data-table-pagination";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useTable from "@/hooks/useTable";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import type { RowModel, ColumnDef } from "@tanstack/react-table";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface CrudTableProps<T extends { id: number }> {
  columns: ColumnDef<T>[];
  useQuery: (params: QueryParams) => UseQueryResult<
    {
      pagination: {
        total: number;
        page: number;
        limit: number;
      };
      data: T[];
    },
    Error
  >;
  useDelete?: () => UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    {
      ids: number[];
    },
    unknown
  >;
  filterPlaceholder?: string;
  children?: React.ReactNode;
}

export default function CrudTable<T extends { id: number }>({
  columns,
  useQuery,
  useDelete,
  filterPlaceholder = "Filter...",
  children,
}: CrudTableProps<T>) {
  const deleteMutation = useDelete?.();

  const deleteItems = deleteMutation?.mutate;

  const [openDelete, setOpenDelete] = React.useState(false);
  const [deletedItems, setDeletedItems] = React.useState<number[]>([]);
  const { table, isFetching, filter, setFilter, setPagination } = useTable<T>({
    use: useQuery,
    columns,
  });

  const openDeleteDialog = (data: RowModel<T>) => {
    const items = data.rows.map((row) => row.original.id);
    setDeletedItems(items);
    setOpenDelete(true);
  };

  const handleDelete = () => {
    if (deleteItems) {
      deleteItems(
        { ids: deletedItems },
        {
          onSuccess: () => {
            table.resetRowSelection();
            setOpenDelete(false);
            toast.success("Items have been deleted");
          },
          onError: (error) => toast.error(`Ohh!!! ${error.message}`),
        }
      );
    }
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder={filterPlaceholder}
          className="max-w-sm"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
        />
        <div className="flex items-center ml-auto">
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              className="h-8 flex ml-2"
              onClick={() =>
                openDeleteDialog(table.getFilteredSelectedRowModel())
              }
            >
              <Trash2 />
              Delete
            </Button>
          )}
          <DataTableViewOptions table={table} />
          {children}
        </div>
      </div>

      <div>
        <div className="overflow-hidden rounded-md border">
          <CustomTable onLoading={isFetching} columns={columns} table={table} />
        </div>
        <div className="space-x-2 py-4">
          <DataTablePagination table={table} />
        </div>
      </div>
      {useDelete && (
        <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. It will permanently delete the
                selected items.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
