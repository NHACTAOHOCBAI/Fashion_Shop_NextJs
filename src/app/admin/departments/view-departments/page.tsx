'use client'
import { CreateDepartmentDialog } from "@/app/admin/departments/create-department/create-department-dialog"
import { UpdateDepartmentDialog } from "@/app/admin/departments/update-department/update-department-dialog"
import { departmentColumns } from "@/app/admin/departments/view-departments/department-columns"
import CrudTable from "@/components/crud_table/crud-table"
import { Button } from "@/components/ui/button"
import { useDeleteDepartment, useDeleteDepartments, useDepartments } from "@/hooks/queries/useDepartment"
import { formatDateTimeWithAt } from "@/lib/formatDate"
import { Plus } from "lucide-react"
import React from "react"
import { toast } from "sonner"

export default function Departments() {
    const [openUpdate, setOpenUpdate] = React.useState(false)
    const [updatedItem, setUpdatedItem] = React.useState<Department>()
    const [openCreate, setOpenCreate] = React.useState(false)
    const { mutate: deleteItem } = useDeleteDepartment()
    const handleUpdateBtn = (item: Department) => {
        setOpenUpdate(true)
        setUpdatedItem(item)
    }
    const handleDeleteItem = (id: number) => {
        deleteItem({ id: id }, {
            onSuccess: () => {
                toast.success("Department has been deleted", {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
            onError: (error) => {
                toast.error(`Ohh!!! ${error.message}`, {
                    description: formatDateTimeWithAt(new Date()),
                })
            },
        },)
    }
    return (
        <>
            <CrudTable<Department>
                columns={departmentColumns(handleUpdateBtn, handleDeleteItem)}
                useQuery={useDepartments}
                useDelete={useDeleteDepartments}
                filterPlaceholder="Filter department name..."
            >
                <Button
                    onClick={() => setOpenCreate(true)}
                    variant="outline"
                    size="sm"
                    className="h-8 flex ml-2"
                >
                    <Plus />
                    Add Department
                </Button>
            </CrudTable>
            <CreateDepartmentDialog
                open={openCreate}
                setOpen={setOpenCreate}
            />
            <UpdateDepartmentDialog
                setOpen={setOpenUpdate}
                open={openUpdate}
                updatedItem={updatedItem}
                setUpdatedItem={setUpdatedItem}
            />
        </>
    )
}
