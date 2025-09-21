
import { useDeleteBrands } from "@/hooks/queries/useBrand"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { Table } from "@tanstack/react-table"
import { toast } from "sonner"

const useLocalDeleteBrand = (deletedBrands: number[], table: Table<Brand>) => {
    const { mutate: deleteBrands } = useDeleteBrands()
    const handleDeleteBrands = () => {
        deleteBrands({
            ids: deletedBrands
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
        handleDeleteBrands
    }
}
export default useLocalDeleteBrand