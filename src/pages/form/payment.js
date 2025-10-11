import { useFormData } from "@/context/FormContext";
import { useRouter } from "next/router";

export default function Payment() {
  const { formData, setFormData } = useFormData();
  const router = useRouter();

  return (
    <div>
      <h2>Payment - Step 4</h2>
      <input
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <button onClick={() => router.push("/form/summary")}>Back</button>
      <button onClick={() => alert("booked")}>Book</button>
    </div>
  );
}
