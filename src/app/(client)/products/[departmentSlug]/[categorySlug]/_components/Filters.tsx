'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import convertAttributeCategories from "@/lib/convertAttributeCategories"
import { formatMoney } from "@/lib/formatMoney"
import { ChevronsUpDown } from "lucide-react"
import { useState } from "react"

interface FiltersProps {
    attributeCategories: AttributeCategory[]
    onFilterChange: (filters: {
        selectedValues: Record<string, number[]>
        priceRange: [number, number]
    }) => void
}

const Filters = ({ attributeCategories, onFilterChange }: FiltersProps) => {
    const [range, setRange] = useState<[number, number]>([0, 100]);
    const [selectedValues, setSelectedValues] = useState<Record<string, number[]>>({});
    const filterFields = convertAttributeCategories(attributeCategories);

    const handleToggle = (attrName: string, val: number) => {
        setSelectedValues((prev) => {
            const current = prev[attrName] || [];
            const isChecked = current.includes(val);

            // Tạo bản sao mới, giữ lại toàn bộ previous
            const newValues = {
                ...prev,
                [attrName]: isChecked
                    ? current.filter((v) => v !== val) // bỏ nếu bỏ chọn
                    : [...current, val], // thêm nếu chọn mới
            };

            // Gọi callback filterChange sau khi có newValues
            onFilterChange({
                selectedValues: newValues,
                priceRange: range,
            });
            return newValues;
        });
    };


    const handlePriceChange = (value: [number, number]) => {
        setRange(value)
        onFilterChange({ selectedValues, priceRange: value })
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

            <div className="flex flex-col gap-2 bg-[#F6F7F8] p-[10px] rounded">
                <div className="flex items-center justify-between gap-4 px-4">
                    <h4 className="text-sm font-semibold">PRICES</h4>
                    <span className="text-sm text-gray-600">
                        {formatMoney(range[0])} – {formatMoney(range[1])}
                    </span>
                </div>
                <Slider
                    className="w-[90%] mx-auto mt-[10px]"
                    defaultValue={[0, 100]}
                    max={100}
                    step={1}
                    onValueChange={handlePriceChange}
                />
            </div>
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
    selected: number[];
    onToggle: (attrName: string, val: number) => void;
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
                    {item.attributeName.toUpperCase()}
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
                    const isChecked = selected.includes(value.id)
                    return (
                        <div key={id} className="flex items-center gap-3">
                            <Checkbox
                                id={id}
                                checked={isChecked}
                                onCheckedChange={() =>
                                    onToggle(item.attributeName, value.id)
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