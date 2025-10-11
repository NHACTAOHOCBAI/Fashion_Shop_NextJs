'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ICONS } from "@/constants/icon.enum"
import { Star } from "lucide-react"
import { useDeleteAddress, useMyAddress } from "@/hooks/queries/useAddress"
import CreateAddressForm from "./create-address/create-address-dialog"
import UpdateAddressForm from "@/app/(client)/my-account/addresses/update-address/update-address-dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog"
import { toast } from "sonner"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import Content from "@/app/(client)/my-account/_components/Content"

const Addressess = () => {
    const { data: addresses } = useMyAddress()
    const [openCreate, setOpenCreate] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
    const { mutate: deleteAddress } = useDeleteAddress()

    const handleDelete = (id: number) => {
        deleteAddress({
            id: id,
        }, {
            onSuccess: () => {
                toast.success("Address has been deleted", {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
            onError: (error: Error) => {
                toast.error(`Ohh!!! ${error.message}`, {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
        })
    }
    return (
        <Content title="My Addresses">
            <CreateAddressForm open={openCreate} setOpen={setOpenCreate} />
            <UpdateAddressForm
                open={openUpdate}
                setOpen={setOpenUpdate}
                address={selectedAddress}
            />

            <div className="space-y-5">
                <Button onClick={() => setOpenCreate(true)}>
                    New address
                </Button>

                {addresses?.map((address: Address) => (
                    <>
                        <div
                            key={address.id}
                            className="flex justify-between items-start border rounded-2xl p-5 shadow-sm bg-white hover:shadow-lg transition-all duration-200"
                        >
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    {address.type === "home" ? (
                                        <span className="text-blue-500">{ICONS.HOME}</span>
                                    ) : (
                                        <span className="text-green-500">{ICONS.OFFICE}</span>
                                    )}
                                    <p className="font-semibold text-gray-800">{address.recipientName}</p>
                                    {address.isDefault && (
                                        <span className="flex items-center px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700 font-medium">
                                            <Star size={14} className="mr-1 text-yellow-500" />
                                            Default
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-700">{address.recipientPhone}</p>
                                <p className="text-sm text-gray-500">{address.detailAddress}</p>
                                <p className="text-sm text-gray-500">
                                    {address.commune}, {address.district}, {address.province}
                                </p>
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-2">

                                <button
                                    className="p-2 rounded-full hover:bg-blue-50 text-blue-600 transition"
                                    title="Edit"
                                    onClick={() => {
                                        setSelectedAddress(address)
                                        setOpenUpdate(true)
                                    }}
                                >
                                    {ICONS.EDIT}
                                </button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button
                                            className="p-2 rounded-full hover:bg-red-50 text-red-600 transition"
                                            title="Delete"
                                        >
                                            {ICONS.DELETE}
                                        </button>
                                    </AlertDialogTrigger>

                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. It will permanently delete the selected items.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(address.id)}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </Content>
    )
}

export default Addressess
