import { getCurrentDateTimeCode } from "@/pages/api/payment/createBill";
import { useEffect, useState } from "react";

export default function useToyyibPayConfig() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getToyyibPayConfig = async () => {
    setLoading(true);
    setError(null);
    try {
      const datetime = getCurrentDateTimeCode();
      const params = new URLSearchParams({
        date: datetime,
      });
      let url = `/api/toyyibpayConfigList?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();

      setData(data);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch ToyyibPayConfigList:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getToyyibPayConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, refetch: getToyyibPayConfig };
}
