import React from "react";

interface DateFilter {
  startDate: string;
  endDate: string;
}

interface DateRangeFilterProps {
  dateFilter: DateFilter;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearFilters: () => void;
  totalCount: number;
  filteredCount: number;
}

function DateRangeFilter({
  dateFilter,
  onFilterChange,
  onClearFilters,
  totalCount,
  filteredCount,
}: DateRangeFilterProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Filter by date range</h3>
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            From
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={dateFilter.startDate}
            onChange={onFilterChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            To
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={dateFilter.endDate}
            onChange={onFilterChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={onClearFilters}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Clear Filters
        </button>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        {filteredCount === 0
          ? "No PRs match these filters"
          : `Showing ${filteredCount} of ${totalCount} PRs`}
      </div>
    </div>
  );
}

export default DateRangeFilter;
export type { DateFilter };
