export function Checkbox({ label, required, className = "", ...props }) {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input type="checkbox" className="accent-primary-dark" {...props} />
      <span className="text-sm">
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
    </label>
  );
}
