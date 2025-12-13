import { cn } from "@/utils/cn";

export function Input({ label, error, prefix, required, suffix, className = "", type = "text", ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={label} className="text-sm font-medium text-current">
          {label} {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div
        className={cn(
          "flex items-center rounded-lg border px-3 py-2 bg-white focus-within:border-primary transition-all",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
      >
        {prefix && <span className="mr-2 text-gray-500 text-sm">{prefix}</span>}

        <input id={label} className="w-full outline-none text-sm" type={type} {...props} />

        {suffix && <span className="ml-2 text-gray-500 text-sm">{suffix}</span>}
      </div>

      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
