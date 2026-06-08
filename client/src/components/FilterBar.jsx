export default function FilterBar({
  selectedCategory,
  setSelectedCategory,
  selectedRange,
  setSelectedRange,
  onExport,
}) {
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Dates</option>
          <option value="thisMonth">This Month</option>
          <option value="previousMonth">Previous Month</option>
          <option value="last6Months">Last 6 Months</option>
          <option value="thisYear">This Year</option>
          <option value="previousYear">Previous Year</option>
        </select>

        <button
          onClick={onExport}
          className="
    bg-green-600
    text-white
    px-4
    py-2
    rounded
    md:ml-auto
    hover:bg-green-700
  "
        >
          Export CSV
        </button>
      </div>
    </div>
  );
}
