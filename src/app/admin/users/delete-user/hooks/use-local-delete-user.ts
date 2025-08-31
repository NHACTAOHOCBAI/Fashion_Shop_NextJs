import { useDeleteUsers } from "@/hooks/queries/useUser"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { Table } from "@tanstack/react-table"
import { toast } from "sonner"

const useLocalDeleteUser = (deletedUsers: number[], table: Table<User>) => {
    const { mutate: deleteUsers } = useDeleteUsers()
    const handleDeleteUsers = () => {
        deleteUsers({
            ids: deletedUsers
        }, {
            onSuccess: () => {
                handleCancel()
                toast.success("Users has been deleted", {
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
        handleDeleteUsers
    }
}
export default useLocalDeleteUser