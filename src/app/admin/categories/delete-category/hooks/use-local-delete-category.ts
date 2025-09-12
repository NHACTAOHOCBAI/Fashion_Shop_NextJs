import { useDeleteCategories } from "@/hooks/queries/useCategory"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { Table } from "@tanstack/react-table"
import { toast } from "sonner"

const useLocalDeleteCategory = (deletedCategories: number[], table: Table<Category>) => {
    const { mutate: deleteCategories } = useDeleteCategories()
    const handleDeleteCategories = () => {
        deleteCategories({
            ids: deletedCategories
        }, {
            onSuccess: () => {
                handleCancel()
                toast.success("Categories has been deleted", {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
            onError: (error) => {
                toast.error(`Ohh!!! ${error.message}`, {
                    description: formatDateTimeWithAt(new Date()),
                })
            }
        })
    }
    const handleCancel = () => {
        table.resetRowSelection()
    }
    return {
        handleDeleteCategories
    }
}
export default useLocalDeleteCategory