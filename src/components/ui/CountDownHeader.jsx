import { useFormContext } from "@/context/FormContext";

export default function CountdownHeader() {
  const { formatted, isActive } = useFormContext();
  if (isActive) return <div className="fixed z-20 top-0 left-0 py-2 px-2 w-full text-center bg-red-500 text-white">{formatted}</div>;
  return null;
}
