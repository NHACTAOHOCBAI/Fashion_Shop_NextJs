'use client'

import useLocalCreateDepartment from "@/app/admin/departments/create-department/use-local-create-department"
import { ImageUpload } from "@/components/image-upload/image-upload"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Placeholder } from "@/constants/placeholder.num"
import React from "react"

interface CreateDepartmentDialogProps {
    open: boolean,
    setOpen: (value: boolean) => void,
}
export function CreateDepartmentDialog({ open, setOpen }: CreateDepartmentDialogProps) {
    const { form, handleCancel, isPending, onSubmit } = useLocalCreateDepartment(() => setOpen(false))
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="sm:max-w-md max-h-[98vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Department</DialogTitle>
                    <DialogDescription>
                        Enter information of item below to add item to table.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <ImageUpload field={field} label="Upload Images" numOfImage={1} />
                            )}
                        />
                        <FormField
                            disabled={isPending}
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder={Placeholder.CategoryName} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            disabled={isPending}
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder={Placeholder.CategoryDescription} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-3">
                            <Button onLoading={isPending} type="submit" className="w-full">
                                Create
                            </Button>
                            <Button disabled={isPending} type="button" onClick={handleCancel} variant={"outline"} className="w-full">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
