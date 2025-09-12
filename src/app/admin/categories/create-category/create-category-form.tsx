"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Placeholder } from "@/constants/placeholder.num"
import { ImageUpload } from "@/components/image-upload/image-upload"
import useLocalCreateCategory from "@/app/admin/categories/create-category/hooks/use-local-create-category"
import { Textarea } from "@/components/ui/textarea"
interface CreateCategoryFormProps {
    closeDialog: () => void
}
export function CreateCategoryForm({ closeDialog }: CreateCategoryFormProps) {
    const { form, handleCancel, isPending, onSubmit } = useLocalCreateCategory(closeDialog)
    return (
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
                <FormField
                    disabled={isPending}
                    control={form.control}
                    name="parentId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Parent</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={value => field.onChange(value)}
                                    defaultValue={field.value !== undefined ? String(field.value) : undefined}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={Placeholder.CategoryParent} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Summer</SelectItem>
                                        <SelectItem value="2">Spring</SelectItem>
                                        <SelectItem value="3">Autumn</SelectItem>
                                    </SelectContent>
                                </Select>
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
    )
}