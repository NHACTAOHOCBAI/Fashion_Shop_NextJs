import useLocalDeleteCategory from "@/app/admin/categories/delete-category/hooks/use-local-delete-category"
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

interface DeleteCategoryDialogProps {
    open: boolean,
    setOpen: (value: boolean) => void,
    deletedCategories: number[],
    table: Table<Category>
}
const DeleteCategoryDialog = ({ deletedCategories, open, setOpen, table }: DeleteCategoryDialogProps) => {
    const { handleDeleteCategories } = useLocalDeleteCategory(deletedCategories, table)
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        categories and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteCategories()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default DeleteCategoryDialog
