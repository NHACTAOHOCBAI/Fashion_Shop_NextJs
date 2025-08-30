'use client'

import { CreateUserForm } from "@/app/admin/users/create-user/create-user-form"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import React from "react"

export function CreateUserDialog() {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 flex ml-2"
                >
                    <Plus />
                    Add User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
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
