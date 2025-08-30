"use client"
import React from "react"
import { UserTable } from "./users-table"
import { UpdateUserDialog } from "@/app/admin/users/update-user/update-user-dialog"
import { CreateUserDialog } from "@/app/admin/users/create-user/create-user-dialog"
import useUpdateUser from "@/app/admin/users/update-user/hooks/use-update-user"
import useCreateUser from "@/app/admin/users/create-user/hooks/use-create-user"

export default function Users() {
    const { closeUpdateDialog, openUpdate, openUpdateDialog, updatedUser, setOpenUpdate } = useUpdateUser()
    const { openCreate, openCreateDialog, setOpenCreate } = useCreateUser()
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