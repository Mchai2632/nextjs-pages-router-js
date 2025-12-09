export function DatePicker({ label, error, required, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <input
        type="date"
        className={`
          rounded-lg border px-3 py-2 bg-white text-sm
          focus:border-primary-dark outline-none
          ${error ? "border-red-500" : "border-gray-300"}
          ${className}
        `}
        {...props}
      />

      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
