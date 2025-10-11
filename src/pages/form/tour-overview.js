import { useFormData } from "@/context/FormContext";
import { useRouter } from "next/router";

export default function TourOverview() {
  const { formData, setFormData } = useFormData();
  const router = useRouter();

  return (
    <div>
      <h2>Tour Overview - Step 1</h2>
      <input
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <button onClick={() => router.push("/form/traveller")}>Next</button>
    </div>
  );
}
