"use client"
import React from "react"
import { UserTable } from "./users-table"
import { UpdateUserDialog } from "@/app/admin/users/update-user/update-user-dialog"
import { CreateUserDialog } from "@/app/admin/users/create-user/create-user-dialog"

export default function DemoPage() {
    const [openUpdate, setOpenUpdate] = React.useState(false)
    const [updatedUser, setUpdatedUser] = React.useState<User>()
    const openUpdateDialog = (user: User) => {
        setOpenUpdate(true)
        setUpdatedUser(user)
    }
    const closeUpdateDialog = () => {
        setOpenUpdate(false)
        setUpdatedUser(undefined)
    }

    const [openCreate, setOpenCreate] = React.useState(false)
    const openCreateDialog = () => {
        setOpenCreate(true)
    }
    return (
        <div className="container mx-auto py-10">
            <UserTable
                openUpdateDialog={openUpdateDialog}
                openCreateDialog={openCreateDialog}
            />
            <UpdateUserDialog
                setOpen={setOpenUpdate}
                open={openUpdate}
                updatedUser={updatedUser}
                unChooseUpdatedUser={closeUpdateDialog}
            />
            <CreateUserDialog
                open={openCreate}
                setOpen={setOpenCreate}
            />
        </div>
    )
}