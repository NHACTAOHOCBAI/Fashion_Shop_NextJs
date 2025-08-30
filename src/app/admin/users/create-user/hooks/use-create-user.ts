import React from "react"

const useCreateUser = () => {
    const [openCreate, setOpenCreate] = React.useState(false)
    const openCreateDialog = () => {
        setOpenCreate(true)
    }
    return {
        openCreate, openCreateDialog, setOpenCreate
    }
}
export default useCreateUser