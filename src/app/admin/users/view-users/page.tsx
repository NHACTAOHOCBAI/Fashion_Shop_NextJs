"use client"
import React from "react"
import { UserTable } from "./users-table"
import { UpdateUserDialog } from "@/app/admin/users/update-user/update-user-dialog"

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
    return (
        <div className="container mx-auto py-10">
            <UserTable
                openUpdateDialog={openUpdateDialog}
            />
            <UpdateUserDialog
                setOpen={setOpenUpdate}
                open={openUpdate}
                updatedUser={updatedUser}
                unChooseUpdatedUser={closeUpdateDialog}
            />
        </div>
    )
}