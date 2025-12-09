import { Controller } from "react-hook-form";
import ReactSelect from "react-select";

export function Select({ name, label, control, rules = {}, options = [], isSearchable, placeholder = "Select..." }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label + 必填星號 */}
      <label className="font-medium text-sm">
        {label}
        {rules?.required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <ReactSelect
              {...field}
              options={options}
              value={options.find((opt) => opt.value === field.value)} // 從 value 反推 option
              // 下拉選單的 onChange
              onChange={(val) => {
                field.onChange(val.value);
                // console.log("選擇了:", val.value);
              }}
              isSearchable={isSearchable}
              placeholder={placeholder}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: error ? "red" : "#d1d5dc",
                }),
              }}
            />

            {/* Error Message */}
            {error && <p className="text-red-500 text-xs mt-1">{error.message || "This field is required"}</p>}
          </>
        )}
      />
    </div>
  );
}
