'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { ChevronsUpDown } from "lucide-react"
import { useState } from "react"

const Filters = () => {
    const filterFields = [
        {
            attributeName: "Size",
            values: [
                { id: 1, value: "L" },
                { id: 2, value: "M" },
                { id: 3, value: "XL" },
                { id: 4, value: "XXL" }
            ]
        },
        {
            attributeName: "Color",
            values: [
                { id: 5, value: "Green" },
                { id: 6, value: "Blue" },
                { id: 7, value: "Red" }
            ]
        }
    ]

    // State lưu tất cả giá trị được chọn: { Size: string[], Color: string[] }
    const [selectedValues, setSelectedValues] = useState<Record<string, string[]>>({})

    const handleToggle = (attrName: string, val: string) => {
        setSelectedValues(prev => {
            const current = prev[attrName] || []
            const isChecked = current.includes(val)
            return {
                ...prev,
                [attrName]: isChecked
                    ? current.filter(v => v !== val)
                    : [...current, val]
            }
        })
    }

    return (
        <div className="space-y-4">
            {filterFields.map((field) =>
                <FilterItem
                    key={field.attributeName}
                    item={field}
                    selected={selectedValues[field.attributeName] || []}
                    onToggle={handleToggle}
                />
            )}

            {/* Bạn có thể log ra để test */}
            <pre className="mt-4 bg-gray-100 p-2 text-sm">
                {JSON.stringify(selectedValues, null, 2)}
            </pre>
        </div>
    )
}

interface filterItemProps {
    item: {
        attributeName: string;
        values: {
            id: number;
            value: string;
        }[];
    };
    selected: string[];
    onToggle: (attrName: string, val: string) => void;
}

const FilterItem = ({ item, selected, onToggle }: filterItemProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="flex flex-col gap-2 bg-[#F6F7F8] p-[10px] rounded"
        >
            <div className="flex items-center justify-between gap-4 px-4">
                <h4 className="text-sm font-semibold">
                    {item.attributeName}
                </h4>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                        <ChevronsUpDown />
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="flex flex-col gap-2 px-4">
                {item.values.map((value) => {
                    const id = `${item.attributeName}-${value.id}`
                    const isChecked = selected.includes(value.value)
                    return (
                        <div key={id} className="flex items-center gap-3">
                            <Checkbox
                                id={id}
                                checked={isChecked}
                                onCheckedChange={() =>
                                    onToggle(item.attributeName, value.value)
                                }
                            />
                            <Label
                                className="text-[#6B6565]"
                                htmlFor={id}
                            >
                                {value.value}
                            </Label>
                        </div>
                    )
                })}
            </CollapsibleContent>
        </Collapsible>
    )
}
export default Filters