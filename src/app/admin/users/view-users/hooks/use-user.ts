import { userColumns } from "@/app/admin/users/view-users/user-columns"
import { useDeleteUser, useUsers } from "@/hooks/queries/useUser"
import useTable from "@/hooks/useTable"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { useCallback } from "react"
import { toast } from "sonner"

const useUser = (openUpdateDialog: (user: User) => void) => {
    const { mutate: deleteUser } = useDeleteUser()
    const handleDeleteUser = useCallback((id: number) => {
        deleteUser({ id: id }, {
            onSuccess: () => {
                toast.success("User has been deleted", {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
            onError: (error) => {
                toast.error(`Ohh!!! ${error.message}`, {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
        },)
    }, [deleteUser])
    const columns = userColumns(handleDeleteUser, openUpdateDialog)
    const { table, filter, setFilter, setPagination, isFetching } = useTable<User>({
        use: useUsers,
        columns: columns,
    })
    return {
        table, filter, setFilter, setPagination, isFetching, columns
    }
}
export default useUser