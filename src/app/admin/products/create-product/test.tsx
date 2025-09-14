/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";


const itemSchema = z.object({
    name: z.string().optional(),
});

const schema = z.object({
    items: z.array(itemSchema),
});

type FormValues = z.infer<typeof schema>;

function ItemForm({
    control,
    index,
    remove,
}: {
    control: any;
    index: number;
    remove: (index: number) => void;
}) {

    return (
        <Card className="p-4 relative space-y-3">
            <div className="flex justify-between items-center">
                <h3 className="font-medium">Item {index + 1}</h3>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Name */}
            <FormField
                control={control}
                name={`items.${index}.name`}
                render={({ field }) => (
                    <FormItem>
                        <label className="text-sm">Name:</label>
                        <FormControl>
                            <Input placeholder="Enter name" {...field} />
                        </FormControl>
                    </FormItem>
                )}
            />
        </Card>
    );
}

export default function NestedDynamicForm() {
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { items: [{ name: "" }] },
    });

    const { control, handleSubmit } = form;

    const {
        fields: items,
        append: appendItem,
        remove: removeItem,
    } = useFieldArray({
        control,
        name: "items",
    });

    const onSubmit = (values: FormValues) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 p-4 border rounded-lg"
            >
                {items.map((item, index) => (
                    <ItemForm
                        key={item.id}
                        control={control}
                        index={index}
                        remove={removeItem}
                    />
                ))}

                <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => appendItem({ name: "" })}
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>


                <Button type="submit" className="bg-blue-500 text-white">
                    Submit
                </Button>
            </form>
        </Form>
    );
}
