'use client'

import { CreateCategoryForm } from "@/app/admin/categories/create-category/create-category-form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import React from "react"

interface CreateCategoryDialogProps {
    open: boolean,
    setOpen: (value: boolean) => void,
}
export function CreateCategoryDialog({ open, setOpen }: CreateCategoryDialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="sm:max-w-md max-h-[98vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogDescription>
                        Enter information of category below to add category to table.
                    </DialogDescription>
                </DialogHeader>
                <CreateCategoryForm closeDialog={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}
