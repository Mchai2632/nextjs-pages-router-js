import { useEffect, useState } from "react";

export default function useCountryList() {
  const [countryList, setCountryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCountryList = async () => {
    setLoading(true);
    try {
      const url = `/api/getcountrylist`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        console.log("useCountryList:", data);
        setCountryList(data.countryList);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      console.log("There was an error", error);
    }
  };

  useEffect(() => {
    fetchCountryList();
  }, []);

  return { countryList, loading, error, refetch: fetchCountryList };
}
