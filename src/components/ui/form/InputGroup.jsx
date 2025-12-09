export function InputGroup({
  children,
  cols = {
    default: 1,
    md: 2,
  },
}) {
  const merged = {
    default: 1,
    md: 2,
    ...cols, // 使用者傳進來的會覆蓋 default
  };

  return <div className={`grid grid-cols-${merged.default} md:grid-cols-${merged.md} gap-4 my-2`}>{children}</div>;
}
