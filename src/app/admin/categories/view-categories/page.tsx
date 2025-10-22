"use client";
import { categoryColumns } from "@/app/admin/categories/view-categories/category-columns";
import CrudTable from "@/components/crud_table/crud-table";
import { Button } from "@/components/ui/button";
import {
  useCategories,
  useDeleteCategories,
  useDeleteCategory,
} from "@/hooks/queries/useCategory";
import { formatDateTimeWithAt } from "@/lib/formatDate";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Categories() {
  const router = useRouter();
  const { mutate: deleteItem } = useDeleteCategory();
  const handleUpdateBtn = (item: Category) => {
    router.push(`/admin/categories/update-category`);
    localStorage.setItem("updatedCategory", JSON.stringify(item));
  };
  const handleDeleteItem = (id: number) => {
    deleteItem(
      { id: id },
      {
        onSuccess: () => {
          toast.success("Category has been deleted", {
            description: formatDateTimeWithAt(new Date()),
          });
        },
        onError: (error) => {
          toast.error(`Ohh!!! ${error.message}`, {
            description: formatDateTimeWithAt(new Date()),
          });
        },
      }
    );
  };
  const handleViewItem = (item: Category) => {
    router.push(`/admin/categories/view-category/${item.id}`);
  };
  return (
    <>
      <CrudTable<Category>
        columns={categoryColumns(
          handleUpdateBtn,
          handleDeleteItem,
          handleViewItem
        )}
        useQuery={useCategories}
        useDelete={useDeleteCategories}
        filterPlaceholder="Filter category name..."
      >
        <Button
          onClick={() => router.push(`/admin/categories/create-category`)}
          variant="outline"
          size="sm"
          className="h-8 flex ml-2"
        >
          <Plus />
          Add Category
        </Button>
      </CrudTable>
    </>
  );
}
