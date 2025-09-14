
import useLocalDeleteProduct from "@/app/admin/products/delete-product/hooks/use-local-delete-product"
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

interface DeleteProductDialog {
    open: boolean,
    setOpen: (value: boolean) => void,
    deletedProducts: number[],
    table: Table<Product>
}
const DeleteProductDialog = ({ deletedProducts, open, setOpen, table }: DeleteProductDialog) => {
    const { handleDeleteProducts } = useLocalDeleteProduct(deletedProducts, table)
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        produts and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteProducts()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default DeleteProductDialog
