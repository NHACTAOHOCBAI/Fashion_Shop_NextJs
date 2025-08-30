'use client'

import { UpdateUserForm } from "@/app/admin/users/update-user/update-user-form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import React from "react"

interface UpdateUserDialog {
    open: boolean,
    setOpen: (value: boolean) => void,
    updatedUser: User | undefined,
    unChooseUpdatedUser: () => void
}
export function UpdateUserDialog({ open, unChooseUpdatedUser, updatedUser, setOpen }: UpdateUserDialog) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Update User</DialogTitle>
                    <DialogDescription>
                        Enter information of user below to update user to table.
                    </DialogDescription>
                </DialogHeader>
                <UpdateUserForm
                    updatedUser={updatedUser}
                    closeDialog={() => unChooseUpdatedUser()} />
            </DialogContent>
        </Dialog>
    )
}
