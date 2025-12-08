"use client";
import MyTag from "@/app/client/_components/MyTag";
import NormalButton from "@/app/client/_components/NormalButton";
import AddNewAddress from "@/app/client/checkout/AddNewAddress";
import { useMyAddress, useSetDefaultAddress } from "@/hooks/queries/useAddress";
import { Building, House, PencilLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

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
      <div>
        <div className="flex">
          <div>
            <p className="text-[24px]">My Address</p>
            <p className="text-[18px] font-light mt-[11px]">
              Manage your shipping address
            </p>
          </div>
          <div className="ml-auto mr-[53px]">
            <NormalButton onClick={() => setOpenNew(true)}>
              <p className="text-[14px] text-[#40BFFF]">Add new address </p>
            </NormalButton>
          </div>
        </div>
        <div className="flex flex-col gap-[35px] mt-[60px]">
          {MyAddress?.map((address) => (
            <MyAddressItem key={address.id} address={address} />
          ))}
        </div>
      </div>
    </>
  );
};
const MyAddressItem = ({ address }: { address: Address }) => {
  const { mutate: setDefaultAddress, isPending } = useSetDefaultAddress();
  const handleSetDefault = () => {
    setDefaultAddress({ id: address.id });
  };
  const type = (
    <div>
      {address.type === "home" ? (
        <House size={16} strokeWidth={1} />
      ) : (
        <Building size={16} strokeWidth={1} />
      )}
    </div>
  );
  return (
    <div className=" flex w-full h-[120px] justify-between rounded-[10px] border-[#F6F7F8] border bg-white p-[10px]">
      <div className="h-full  flex flex-col justify-between">
        <div>
          <span>{address.recipientName}</span>
          <span className="mx-[20px]">|</span>
          <span>{address.recipientPhone}</span>
          <p>{address.detailAddress}</p>
        </div>
        <div className="w-[100px] flex gap-[10px]">
          {address.isDefault && <MyTag value={<p>Default</p>} />}
          <MyTag
            value={
              <div className="flex gap-[4px] items-center">
                {type}
                <p>{address.type}</p>
              </div>
            }
          />
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div className="flex gap-2">
          <PencilLine size={16} />
          <Trash2 size={16} />
        </div>
        {!address.isDefault && (
          <NormalButton onClick={handleSetDefault} isLoading={isPending}>
            <p className="text-[14px] text-[#FF4858]">Set Default </p>
          </NormalButton>
        )}
      </div>
    </div>
  );
};
export default MyAddress;
