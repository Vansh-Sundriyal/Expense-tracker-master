export default function EmptyState() {
  return (
    <div className="bg-white rounded-lg shadow p-10 text-center">

      <lord-icon
        src="https://cdn.lordicon.com/yfxqzclt.json"
        trigger="loop"
        delay="1500"
        style={{
          width: "120px",
          height: "120px",
        }}
      />

      <h2 className="text-xl font-semibold mt-4">
        No Expenses Found
      </h2>

      <p className="text-gray-500 mt-2">
        Add your first expense to get started
      </p>

    </div>
  );
}