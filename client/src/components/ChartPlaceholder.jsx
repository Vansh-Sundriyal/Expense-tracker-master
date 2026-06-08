export default function ChartPlaceholder({
  selectedCategory,
}) {
  return (
    <div className="bg-white rounded-lg shadow p-8 text-center h-[350px] md:h-[450px] flex flex-col justify-center items-center">

      <lord-icon
        src="https://cdn.lordicon.com/akuwjdzh.json"
        trigger="loop"
        delay="1500"
        style={{
          width: "100px",
          height: "100px",
        }}
      />

      <h2 className="text-lg font-semibold mt-4">
        Category Selected
      </h2>

      <p className="text-gray-500 mt-2">
        Pie chart is only available when
        viewing all categories.
      </p>

      <p className="text-blue-600 font-medium mt-2">
        Current: {selectedCategory}
      </p>

    </div>
  );
}