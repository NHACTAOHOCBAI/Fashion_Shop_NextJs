
import CreateDepartmentSchema from "@/app/admin/departments/create-department/create-department-schema"
import { useCreateDepartment } from "@/hooks/queries/useDepartment"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const useLocalCreateDepartment = (closeDialog: () => void) => {
    const { mutate: createItem, isPending } = useCreateDepartment()
    const form = useForm<z.infer<typeof CreateDepartmentSchema>>({
        resolver: zodResolver(CreateDepartmentSchema),
        defaultValues: { image: [] }
    })
    function onSubmit(values: z.infer<typeof CreateDepartmentSchema>) {
        createItem({
            name: values.name,
            description: values.description,
            image: values.image && values.image[0]
        }, {
            onSuccess: () => {
                toast.success("Department has been created", {
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
export default useLocalCreateDepartment