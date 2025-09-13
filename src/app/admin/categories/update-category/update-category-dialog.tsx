'use client'

import useLocalUpdateCategory from "@/app/admin/categories/update-category/hooks/use-local-update-category"
import { ImageUpload } from "@/components/image-upload/image-upload"
import { DialogSkeleton } from "@/components/skeleton/dialog-skeleton"
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
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Placeholder } from "@/constants/placeholder.num"
import { SelectValue } from "@radix-ui/react-select"
import React from "react"

interface UpdateCategoryDialogProps {
    open: boolean,
    setOpen: (value: boolean) => void,
    updatedCategory: Category | undefined,
    unChooseUpdatedCategory: () => void
}
export function UpdateCategoryDialog({ open, unChooseUpdatedCategory, updatedCategory, setOpen }: UpdateCategoryDialogProps) {
    const { form, isImageLoading, isPending, onSubmit, handleCancel, categorySelections } = useLocalUpdateCategory(updatedCategory, unChooseUpdatedCategory)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md  max-h-[98vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Update Category</DialogTitle>
                    <DialogDescription>
                        Enter information of user below to update user to table.
                    </DialogDescription>
                </DialogHeader>
                {isImageLoading
                    ? <DialogSkeleton />
                    : <Form {...form} >
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
                            <FormField
                                disabled={isPending}
                                control={form.control}
                                name="parentId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Parent</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value !== undefined && field.value !== null ? String(field.value) : undefined}
                                                onValueChange={(value) => field.onChange(Number(value))}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder={Placeholder.CategoryParent} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        categorySelections?.map((option) => {
                                                            return <SelectItem key={option?.value} value={String(option?.value) || ""}>{option?.label}</SelectItem>
                                                        })
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-3">
                                <Button onLoading={isPending} type="submit" className="w-full">
                                    Update
                                </Button>
                                <Button disabled={isPending} type="button" onClick={handleCancel} variant={"outline"} className="w-full">
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Form>
                }
            </DialogContent>
        </Dialog>
    )
}
