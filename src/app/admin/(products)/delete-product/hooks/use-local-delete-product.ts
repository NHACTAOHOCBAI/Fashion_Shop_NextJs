
import { useDeleteProducts } from "@/hooks/queries/useProduct"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { Table } from "@tanstack/react-table"
import { toast } from "sonner"

const useLocalDeleteProduct = (deletedProducts: number[], table: Table<Product>) => {
    const { mutate: deleteProducts } = useDeleteProducts()
    const handleDeleteProducts = () => {
        deleteProducts({
            ids: deletedProducts
        }, {
            onSuccess: () => {
                handleCancel()
                toast.success("Products has been deleted", {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
            onError: (error) => {
                toast.error(`${error.message}`, {
                    description: formatDateTimeWithAt(new Date()),
                })
            }
        })
    }
    const handleCancel = () => {
        table.resetRowSelection()
    }
    return {
        handleDeleteProducts
    }
}
export default useLocalDeleteProduct