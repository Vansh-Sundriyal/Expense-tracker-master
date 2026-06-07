import React from 'react'

export default function FilterBar({
  selectedRange,
  setSelectedRange,
}) {
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <select
        value={selectedRange}
        onChange={(e) =>
          setSelectedRange(e.target.value)
        }
        className="border p-2"
      >
        <option value="all">All</option>
        <option value="thisMonth">
          This Month
        </option>
        <option value="previousMonth">
          Previous Month
        </option>
        <option value="last6Months">
          Last 6 Months
        </option>
        <option value="thisYear">
          This Year
        </option>
        <option value="previousYear">
          Previous Year
        </option>
      </select>
    </div>
  );
}