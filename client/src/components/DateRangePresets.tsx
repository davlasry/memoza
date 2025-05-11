import React from "react";
import type { DateFilter } from "./DateRangeFilter";

interface DateRangePresetsProps {
  onSelectPreset: (filter: DateFilter) => void;
  currentFilter: DateFilter;
}

function DateRangePresets({
  onSelectPreset,
  currentFilter,
}: DateRangePresetsProps) {
  const getFormattedDate = (date: Date): string => {
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const presets: { label: string; filter: DateFilter }[] = [
    {
      label: "Today",
      filter: {
        startDate: getFormattedDate(new Date()),
        endDate: getFormattedDate(new Date()),
      },
    },
    {
      label: "Yesterday",
      filter: (() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return {
          startDate: getFormattedDate(yesterday),
          endDate: getFormattedDate(yesterday),
        };
      })(),
    },
    {
      label: "Last 7 days",
      filter: (() => {
        const today = new Date();
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        return {
          startDate: getFormattedDate(lastWeek),
          endDate: getFormattedDate(today),
        };
      })(),
    },
    {
      label: "Last month",
      filter: (() => {
        const today = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        return {
          startDate: getFormattedDate(lastMonth),
          endDate: getFormattedDate(today),
        };
      })(),
    },
    {
      label: "Last 6 months",
      filter: (() => {
        const today = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        return {
          startDate: getFormattedDate(sixMonthsAgo),
          endDate: getFormattedDate(today),
        };
      })(),
    },
    {
      label: "Last year",
      filter: (() => {
        const today = new Date();
        const lastYear = new Date();
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        return {
          startDate: getFormattedDate(lastYear),
          endDate: getFormattedDate(today),
        };
      })(),
    },
  ];

  // Check if a preset is currently active
  const isPresetActive = (preset: DateFilter): boolean => {
    return (
      preset.startDate === currentFilter.startDate &&
      preset.endDate === currentFilter.endDate
    );
  };

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Preset Date Ranges
      </h3>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => {
          const isActive = isPresetActive(preset.filter);
          return (
            <button
              key={preset.label}
              onClick={() => onSelectPreset(preset.filter)}
              className={`px-3 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }`}
              aria-pressed={isActive}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DateRangePresets;
