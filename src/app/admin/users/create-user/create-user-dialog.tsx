'use client'

import { CreateUserForm } from "@/app/admin/users/create-user/create-user-form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import React from "react"

interface CreateUserDialogProps {
    open: boolean,
    setOpen: (value: boolean) => void,
}
export function CreateUserDialog({ open, setOpen }: CreateUserDialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="sm:max-w-md max-h-[98vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogDescription>
                        Enter information of user below to add user to table.
                    </DialogDescription>
                </DialogHeader>
                <CreateUserForm closeDialog={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}
