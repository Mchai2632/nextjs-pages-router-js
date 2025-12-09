export function Radio({ label, className = "", ...props }) {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input type="radio" className="accent-primary-dark" {...props} />
      <span className="text-sm">{label}</span>
    </label>
  );
}
