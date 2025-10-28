"use client";

import { productColumns } from "@/app/admin/products/view-products/product-columns";
import CrudTable from "@/components/crud_table/crud-table";
import { Button } from "@/components/ui/button";
import {
  useDeleteProduct,
  useDeleteProducts,
  useProducts,
} from "@/hooks/queries/useProduct";
import { formatDateTimeWithAt } from "@/lib/formatDate";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Products() {
  const router = useRouter();
  const { mutate: deleteItem } = useDeleteProduct();
  const handleViewDetail = (item: Product) => {
    router.push(`/admin/products/detail-product`);
    localStorage.setItem("detailProduct", JSON.stringify(item));
  };
  const handleUpdateBtn = (item: Product) => {
    router.push(`/admin/products/update-product`);
    localStorage.setItem("updatedProduct", JSON.stringify(item));
  };
  const handleDeleteItem = (id: number) => {
    deleteItem(
      { id: id },
      {
        onSuccess: () => {
          toast.success("Product has been deleted", {
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
  return (
    <>
      <CrudTable<Product>
        columns={productColumns(
          handleUpdateBtn,
          handleDeleteItem,
          handleViewDetail
        )}
        useQuery={useProducts}
        useDelete={useDeleteProducts}
        filterPlaceholder="Filter product name..."
      >
        <Button
          onClick={() => router.push("/admin/products/create-product")}
          variant="outline"
          size="sm"
          className="h-8 flex ml-2"
        >
          <Plus />
          Add Product
        </Button>
        <Button>Test Notification</Button>
      </CrudTable>
    </>
  );
}
