import useLocalDeleteUser from "@/app/admin/users/delete-user/hooks/use-local-delete-user"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Table } from "@tanstack/react-table"

interface DeleteUserDialog {
    open: boolean,
    setOpen: (value: boolean) => void,
    deletedUsers: number[],
    table: Table<User>
}
const DeleteUserDialog = ({ deletedUsers, open, setOpen, table }: DeleteUserDialog) => {
    const { handleDeleteUsers } = useLocalDeleteUser(deletedUsers, table)
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteUsers()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default DeleteUserDialog
