"use client"
import React from "react"
import { UserTable } from "./users-table"
import { UpdateUserDialog } from "@/app/admin/users/update-user/update-user-dialog"
import { CreateUserDialog } from "@/app/admin/users/create-user/create-user-dialog"
import useUser from "@/app/admin/users/view-users/hooks/use-user"
import DeleteUserDialog from "@/app/admin/users/delete-user/delete-user-dialog"

export default function Users() {
    const {
        filter, isFetching, setFilter, setPagination, table, columns,
        closeUpdateDialog, openUpdate, updatedUser, setOpenUpdate,
        openCreate, openCreateDialog, setOpenCreate,
        openDelete, deletedUsers, openDeleteDialog, setOpenDelete
    } = useUser()
    return (
        <div className="container mx-auto py-10  ">
            <UserTable
                columns={columns}
                filter={filter}
                isFetching={isFetching}
                openCreateDialog={openCreateDialog}
                openDeleteDialog={openDeleteDialog}
                setFilter={setFilter}
                setPagination={setPagination}
                table={table}
            />
            <DeleteUserDialog
                table={table}
                deletedUsers={deletedUsers}
                open={openDelete}
                setOpen={setOpenDelete}
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