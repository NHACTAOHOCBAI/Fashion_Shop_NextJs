import CreateUserSchema from "@/app/admin/users/create-user/create-user-schema"
import { useCreateUser } from "@/hooks/queries/useUser"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const useLocalCreateUser = (closeDialog: () => void) => {
    const { mutate: createItem, isPending } = useCreateUser()
    const form = useForm<z.infer<typeof CreateUserSchema>>({
        resolver: zodResolver(CreateUserSchema),
        defaultValues: { fullName: "", email: "", password: "", role: undefined, avatar: [] }
    })
    function onSubmit(values: z.infer<typeof CreateUserSchema>) {
        createItem({
            email: values.email,
            fullName: values.fullName,
            password: values.password,
            role: values.role,
            image: values.avatar && values.avatar[0]
        }, {
            onSuccess: () => {
                toast.success("User has been created", {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
            onError: (error) => {
                toast.error(`Ohh!!! ${error.message}`, {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
            onSettled: () => {
                handleCancel()
            }
        })
    }
    const handleCancel = () => {
        closeDialog()
        form.reset()
    }
    return {
        form,
        onSubmit,
        isPending,
        handleCancel
    }
}
export default useLocalCreateUser