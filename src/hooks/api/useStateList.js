import { useEffect, useState } from "react";

export default function useStateList() {
  const [stateList, setStateList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStateList = async () => {
    setLoading(true);
    try {
      const url = `/api/getstatelist`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        console.log("useStateList:", data);
        setStateList(data.stateList);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      console.log("There was an error", error);
    }
  };

  useEffect(() => {
    fetchStateList();
  }, []);

  return { stateList, loading, error, refetch: fetchStateList };
}
