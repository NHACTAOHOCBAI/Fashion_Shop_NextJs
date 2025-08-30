import React from "react"

const useUpdateUser = () => {
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
    return {
        openUpdate, updatedUser, openUpdateDialog, closeUpdateDialog, setOpenUpdate
    }
}
export default useUpdateUser