'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useUpdateAddress } from "@/hooks/queries/useAddress"
import { toast } from "sonner"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import CreateAddressSchema from "@/app/(client)/my-account/addresses/create-address/create-address-schema"
import { useCallback, useEffect } from "react"

type CreateAddressSchema = z.infer<typeof CreateAddressSchema>

interface UpdateAddressFormProps {
    open: boolean
    setOpen: (value: boolean) => void
    address: Address | null
}

const provinceValues = ["Đà Nẵng", "Hà Nội", "TP. Hồ Chí Minh", "Huế"] as const
type Province = typeof provinceValues[number]

const provinces = [
    { label: "Đà Nẵng", value: "Đà Nẵng" },
    { label: "Hà Nội", value: "Hà Nội" },
    { label: "TP. Hồ Chí Minh", value: "TP. Hồ Chí Minh" },
    { label: "Huế", value: "Huế" },
]

const districts: Record<Province, string[]> = {
    "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Sơn Trà"],
    "Hà Nội": ["Hoàn Kiếm", "Ba Đình", "Cầu Giấy"],
    "TP. Hồ Chí Minh": ["Quận 1", "Quận 3", "Tân Bình"],
    "Huế": ["TP. Huế", "Hương Thủy", "Phong Điền"],
}

const communes: { [key: string]: string[] } = {
    "Hải Châu": ["Phường Bình Hiên", "Phường Hòa Thuận"],
    "Thanh Khê": ["Phường Thạc Gián", "Phường Tân Chính"],
    "Hoàn Kiếm": ["Phường Hàng Bài", "Phường Tràng Tiền"],
    "Quận 1": ["Phường Bến Nghé", "Phường Nguyễn Thái Bình"],
    "TP. Huế": ["Phường Phú Hội", "Phường Thuận Hòa"],
}

const UpdateAddressForm = ({ open, setOpen, address }: UpdateAddressFormProps) => {
    const form = useForm<CreateAddressSchema>({
        resolver: zodResolver(CreateAddressSchema),
        defaultValues: address ?? {
            detailAddress: "",
            recipientName: "",
            recipientPhone: "",
            province: "",
            district: "",
            commune: "",
            type: "home",
            isDefault: false,
        },
    })

    const selectedProvince = form.watch("province") as Province
    const selectedDistrict = form.watch("district")
    const { mutate: updateAddress } = useUpdateAddress()

    const handleCancel = () => {
        setOpen(false)
        form.reset()
    }

    const onSubmit = (values: CreateAddressSchema) => {
        if (!address) return
        updateAddress(
            { id: address.id, data: values },
            {
                onSuccess: () => {
                    toast.success("Address updated successfully", {
                        description: formatDateTimeWithAt(new Date()),
                    })
                },
                onError: (error) => {
                    toast.error(`Error: ${error.message}`, {
                        description: formatDateTimeWithAt(new Date()),
                    })
                },
                onSettled: () => handleCancel(),
            }
        )
    }

    const resetForm = useCallback(() => {
        if (address) {
            form.reset(address)
        }
    }, [address, form])

    useEffect(() => {
        resetForm()
    }, [resetForm])
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Address</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Recipient Name */}
                        <FormField
                            control={form.control}
                            name="recipientName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Recipient Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Phone */}
                        <FormField
                            control={form.control}
                            name="recipientPhone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Recipient Phone</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Province */}
                        <FormField
                            control={form.control}
                            name="province"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Province</FormLabel>
                                    <Select
                                        onValueChange={(val) => {
                                            field.onChange(val)
                                            form.setValue("district", "")
                                            form.setValue("commune", "")
                                        }}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select province" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {provinces.map((p) => (
                                                <SelectItem key={p.value} value={p.value}>
                                                    {p.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* District */}
                        <FormField
                            control={form.control}
                            name="district"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>District</FormLabel>
                                    <Select
                                        onValueChange={(val) => {
                                            field.onChange(val)
                                            form.setValue("commune", "")
                                        }}
                                        value={field.value}
                                        disabled={!selectedProvince}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select district" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {selectedProvince &&
                                                districts[selectedProvince]?.map((d) => (
                                                    <SelectItem key={d} value={d}>
                                                        {d}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Commune */}
                        <FormField
                            control={form.control}
                            name="commune"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Commune</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        disabled={!selectedDistrict}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select commune" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {selectedDistrict &&
                                                communes[selectedDistrict]?.map((c) => (
                                                    <SelectItem key={c} value={c}>
                                                        {c}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Detail Address */}
                        <FormField
                            control={form.control}
                            name="detailAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Detail Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Type */}
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address Type</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="home">Home</SelectItem>
                                            <SelectItem value="office">Office</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Default Switch */}
                        <FormField
                            control={form.control}
                            name="isDefault"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between">
                                    <FormLabel>Set as default</FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Update Address
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateAddressForm
