'use client'

import { UpdateCategoryForm } from "@/app/admin/categories/update-category/update-category-form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import React from "react"

interface UpdateCategoryDialogProps {
    open: boolean,
    setOpen: (value: boolean) => void,
    updatedCategory: Category | undefined,
    unChooseUpdatedCategory: () => void
}
export function UpdateCategoryDialog({ open, unChooseUpdatedCategory, updatedCategory, setOpen }: UpdateCategoryDialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md  max-h-[98vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Update Category</DialogTitle>
                    <DialogDescription>
                        Enter information of user below to update user to table.
                    </DialogDescription>
                </DialogHeader>
                <UpdateCategoryForm
                    updatedCategory={updatedCategory}
                    closeDialog={() => unChooseUpdatedCategory()} />
            </DialogContent>
        </Dialog>
    )
}
