import { ArrowUpDown } from "lucide-react";

export type SortOption = "price-asc" | "price-desc" | "date-asc" | "date-desc";

interface SortControlsProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortControls({ value, onChange }: SortControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-5 h-5 text-gray-600" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
      >
        <option value="date-desc">Date: Newest First</option>
        <option value="date-asc">Date: Oldest First</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}
