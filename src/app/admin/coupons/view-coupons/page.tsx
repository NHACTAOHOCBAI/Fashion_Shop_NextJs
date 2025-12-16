"use client";

import React from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import CrudTable from "@/components/crud_table/crud-table";
import { Button } from "@/components/ui/button";
import { formatDateTimeWithAt } from "@/lib/formatDate";

import {
  useCoupons,
  useDeleteCoupon,
  useDeleteCoupons,
} from "@/hooks/queries/useCoupon";
import { couponColumns } from "@/app/admin/coupons/view-coupons/coupon-columns";
import { CreateCouponDialog } from "@/app/admin/coupons/create-coupon/create-coupon-dialog";

export default function Coupons() {
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [updatedItem, setUpdatedItem] = React.useState<Coupon>();

  const { mutate: deleteItem } = useDeleteCoupon();

  const handleUpdateBtn = (item: Coupon) => {
    setUpdatedItem(item);
    setOpenUpdate(true);
  };

  const handleDeleteItem = (id: number) => {
    deleteItem(
      { id },
      {
        onSuccess: () => {
          toast.success("Coupon has been deleted", {
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
      <CrudTable<Coupon>
        columns={couponColumns(handleUpdateBtn, handleDeleteItem)}
        useQuery={useCoupons}
        useDelete={useDeleteCoupons}
        filterPlaceholder="Filter coupon code..."
      >
        <Button
          onClick={() => setOpenCreate(true)}
          variant="outline"
          size="sm"
          className="h-8 flex ml-2"
        >
          <Plus />
          Add Coupon
        </Button>
      </CrudTable>

      <CreateCouponDialog open={openCreate} setOpen={setOpenCreate} />

      {/* <UpdateCouponDialog
        open={openUpdate}
        setOpen={setOpenUpdate}
        updatedItem={updatedItem}
        setUpdatedItem={setUpdatedItem}
      />  */}
    </>
  );
}
