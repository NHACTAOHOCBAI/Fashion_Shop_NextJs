"use client";
import MyTag from "@/app/client/_components/MyTag";
import NormalButton from "@/app/client/_components/NormalButton";
import AddNewAddress from "@/app/client/checkout/AddNewAddress";
import UpdateAddress from "@/app/client/my-account/my-address/UpdateAddressDialog";
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
import {
  useDeleteAddress,
  useMyAddress,
  useSetDefaultAddress,
} from "@/hooks/queries/useAddress";
import {
  Building,
  House,
  PencilLine,
  Trash2,
  MapPin,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const MyAddress = () => {
  const [openNew, setOpenNew] = useState(false);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);
  const { data: MyAddress } = useMyAddress();
  return (
    <>
      <AddNewAddress open={openNew} setOpen={setOpenNew} />
      <div className="space-y-6">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-[#40BFFF]/5 to-transparent rounded-lg p-4 border border-[#40BFFF]/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#40BFFF] flex items-center justify-center shadow-sm">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h6 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                  My Addresses
                  {MyAddress && MyAddress.length > 0 && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-[#40BFFF] text-white rounded-full">
                      {MyAddress.length}
                    </span>
                  )}
                </h6>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage your shipping addresses
                </p>
              </div>
            </div>
            <Button
              onClick={() => setOpenNew(true)}
              className="bg-[#40BFFF] hover:bg-[#33A0DD] text-white h-9"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add Address
            </Button>
          </div>
        </div>

        {/* Address List */}
        <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
          {MyAddress?.map((address) => (
            <MyAddressItem key={address.id} address={address} />
          ))}
        </div>
      </div>
    </>
  );
};
const MyAddressItem = ({ address }: { address: Address }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updatedItem, setUpdatedItem] = useState<Address | null>(null);
  const handleOpenUpdate = (item: Address) => {
    setUpdatedItem(item);
    setOpenUpdate(true);
  };
  const { mutate: setDefaultAddress, isPending } = useSetDefaultAddress();
  const handleSetDefault = () => {
    setDefaultAddress({ id: address.id });
  };
  const { mutate: deleteAddress } = useDeleteAddress();
  const handleDelete = (id: number) => {
    deleteAddress(
      { id },
      {
        onSuccess: () => {
          toast.success("Address has been deleted");
        },
        onError: (error) => {
          toast.error(`Ohh!!! ${error.message}`);
        },
      }
    );
  };
  const TypeIcon = address.type === "home" ? House : Building;

  return (
    <>
      <UpdateAddress
        address={updatedItem}
        open={openUpdate}
        setOpen={setOpenUpdate}
      />
      <div className="flex w-full justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:shadow-md transition-shadow">
        <div className="flex-1 flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {address.recipientName}
              </span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {address.recipientPhone}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {address.detailAddress}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {address.isDefault && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-[#40BFFF]/10 text-[#40BFFF] border border-[#40BFFF]/20 rounded">
                Default
              </span>
            )}
            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded flex items-center gap-1">
              <TypeIcon size={12} />
              {address.type}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end ml-4">
          <div className="flex gap-2">
            <button
              onClick={() => handleOpenUpdate(address)}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-[#40BFFF] transition-colors"
            >
              <PencilLine size={16} />
            </button>
            <button
              onClick={() => setOpenDelete(true)}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
          {!address.isDefault && (
            <Button
              onClick={handleSetDefault}
              disabled={isPending}
              variant="outline"
              size="sm"
              className="border-[#40BFFF] text-[#40BFFF] hover:bg-[#40BFFF] hover:text-white transition-colors h-8"
            >
              {isPending ? "Setting..." : "Set as Default"}
            </Button>
          )}
        </div>
      </div>
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent className="w-[500px]">
          <AlertDialogHeader>
            <h6>Confirm delete?</h6>
            <AlertDialogDescription>
              This action cannot be undone. This address will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDelete(address.id);
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default MyAddress;
