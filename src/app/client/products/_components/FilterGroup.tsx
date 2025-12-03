import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface FilterGroupProps {
  field: string;
  values: string[];
  selectedValues: string[];
  onChange: (field: string, value: string, checked: boolean) => void;
}

const FilterGroup = ({
  field,
  values,
  selectedValues,
  onChange,
}: FilterGroupProps) => {
  return (
    <div className="bg-[#F6F7F8] rounded-[10px] p-[20px]">
      <p className="font-medium mb-[8px] uppercase">{field}</p>
      <div>
        {values.map((value) => {
          return (
            <CheckboxItem
              key={value}
              value={value}
              // Kiểm tra xem giá trị có trong mảng selectedValues không
              checked={selectedValues.includes(value)}
              onChange={(checked) => onChange(field, value, checked)}
            />
          );
        })}
      </div>
    </div>
  );
};
interface CheckboxItemProps {
  value: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxItem = ({ value, checked, onChange }: CheckboxItemProps) => {
  return (
    <div className="flex justify-between items-center py-1">
      <p>{value}</p>
      <Checkbox
        checked={checked}
        onCheckedChange={(val) => onChange(val === true)}
        // Tùy chỉnh màu xanh cho Checkbox khi được chọn
        className="data-[state=checked]:bg-[#40BFFF] data-[state=checked]:border-[#40BFFF]"
      />
    </div>
  );
};
interface PriceGroupProps {
  range: [number, number];
  setRange: (range: [number, number]) => void;
}

const PriceGroup = ({ range, setRange }: PriceGroupProps) => {
  return (
    <div className="bg-[#F6F7F8] rounded-[10px] p-[20px]">
      <p className="font-medium mb-[8px] uppercase">Prices</p>

      <div className="flex justify-between mb-[15px]">
        <p>Range:</p>
        <p>
          ${range[0].toFixed(2)} - ${range[1].toFixed(2)}
        </p>
      </div>

      {/* Tùy chỉnh màu xanh cho Slider */}
      <Slider
        value={range}
        onValueChange={(v) => setRange([v[0], v[1]])}
        min={0}
        max={100}
        step={20}
      />
    </div>
  );
};
export { FilterGroup, PriceGroup };
