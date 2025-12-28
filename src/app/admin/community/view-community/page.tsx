"use client";

import { postColumns } from "./post-columns";
import CrudTable from "@/components/crud_table/crud-table";
import { Button } from "@/components/ui/button";
import {
  usePosts,
  useDeleteByAdmin,
  useDeleteManyByAdmin,
} from "@/hooks/queries/usePost";
import { formatDateTimeWithAt } from "@/lib/formatDate";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Posts() {
  const router = useRouter();
  const { mutate: deleteItem } = useDeleteByAdmin();

  const handleViewDetail = (item: Post) => {
    router.push(`/admin/community/detail-community/${item.id}`);
    localStorage.setItem("detailPost", JSON.stringify(item));
  };

  const handleDeleteItem = (id: number) => {
    deleteItem(id, {
      onSuccess: () => {
        toast.success("Post deleted", {
          description: formatDateTimeWithAt(new Date()),
        });
      },
      onError: (error: any) => {
        toast.error(`Error: ${error.message}`);
      },
    });
  };

  return (
    <CrudTable<Post>
      columns={postColumns(handleDeleteItem, handleViewDetail)}
      useQuery={usePosts}
      useDelete={useDeleteManyByAdmin as any}
      filterPlaceholder="Filter post content..."
    ></CrudTable>
  );
}
