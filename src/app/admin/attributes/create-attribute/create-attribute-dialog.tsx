'use client'

import useLocalCreateAttribute from "@/app/admin/attributes/create-attribute/use-local-create-attribute"
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
import { Placeholder } from "@/constants/placeholder.num"
import React from "react"

interface CreateAttributeDialogProps {
    open: boolean,
    setOpen: (value: boolean) => void,
}
export function CreateAttributeDialog({ open, setOpen }: CreateAttributeDialogProps) {
    const { form, handleCancel, isPending, onSubmit } = useLocalCreateAttribute(() => setOpen(false))
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="sm:max-w-md max-h-[98vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Attribute</DialogTitle>
                    <DialogDescription>
                        Enter information of item below to add item to table.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
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
