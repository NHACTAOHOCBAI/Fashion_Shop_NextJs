"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-3 group"
      >
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 uppercase text-sm tracking-wide">
          {field}
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[var(--cyan-500)] transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            {values.map((value) => (
              <CheckboxItem
                key={value}
                value={value}
                checked={selectedValues.includes(value)}
                onChange={(checked) => onChange(field, value, checked)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
interface CheckboxItemProps {
  value: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxItem = ({ value, checked, onChange }: CheckboxItemProps) => {
  return (
    <motion.label
      className={cn(
        "flex items-center justify-between py-2.5 px-3 rounded-lg cursor-pointer transition-all",
        "hover:bg-gray-50 dark:hover:bg-gray-700/50",
        checked && "bg-[var(--cyan-50)] dark:bg-[var(--cyan-900)]/30"
      )}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <span className={cn(
        "text-sm font-medium transition-colors",
        checked
          ? "text-[var(--cyan-700)] dark:text-[var(--cyan-300)]"
          : "text-gray-700 dark:text-gray-300"
      )}>
        {value}
      </span>
      <Checkbox
        checked={checked}
        onCheckedChange={(val) => onChange(val === true)}
        className="data-[state=checked]:bg-[var(--cyan-500)] data-[state=checked]:border-[var(--cyan-500)] transition-all"
      />
    </motion.label>
  );
};

interface PriceGroupProps {
  range: [number, number];
  setRange: (range: [number, number]) => void;
}

const PriceGroup = ({ range, setRange }: PriceGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-3 group"
      >
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 uppercase text-sm tracking-wide">
          Price Range
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[var(--cyan-500)] transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Range:
              </span>
              <span className="text-sm font-bold text-[var(--cyan-600)] dark:text-[var(--cyan-400)]">
                ${range[0].toFixed(2)} - ${range[1].toFixed(2)}
              </span>
            </div>

            <Slider
              value={range}
              onValueChange={(v) => setRange([v[0], v[1]])}
              min={0}
              max={100}
              step={20}
              className="mb-2"
            />

            <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
              <span>$0</span>
              <span>$100</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export { FilterGroup, PriceGroup };
