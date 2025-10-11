import { useFormData } from "@/context/FormContext";
import { useRouter } from "next/router";

export default function Traveller() {
  const { formData, setFormData } = useFormData();
  const router = useRouter();

  return (
    <div>
      <h2>Traveller - Step 2</h2>
      <p>Welcome, {formData.name}</p>
      <button onClick={() => router.push("/form/tour-overview")}>Back</button>
      <button onClick={() => router.push("/form/summary")}>Next</button>
    </div>
  );
}
