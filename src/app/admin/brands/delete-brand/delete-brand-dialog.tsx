
import useLocalDeleteBrand from "@/app/admin/brands/delete-brand/hooks/use-local-delete-brand"
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

interface DeleteBrandDialogProps {
    open: boolean,
    setOpen: (value: boolean) => void,
    deletedBrands: number[],
    table: Table<Brand>
}
const DeleteBrandDialog = ({ deletedBrands, open, setOpen, table }: DeleteBrandDialogProps) => {
    const { handleDeleteBrands } = useLocalDeleteBrand(deletedBrands, table)
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        brands and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteBrands()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default DeleteBrandDialog
