import { useFormData } from "@/context/FormContext";
import { useRouter } from "next/router";

export default function Summary() {
  const { formData, setFormData } = useFormData();
  const router = useRouter();

  return (
    <div>
      <h2>Summary - Step 3</h2>
      <input
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <button onClick={() => router.push("/form/traveller")}>Back</button>
      <button onClick={() => router.push("/form/payment")}>Next</button>
    </div>
  );
}
