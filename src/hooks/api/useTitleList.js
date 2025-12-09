import { useEffect, useState } from "react";

export default function useTitleList() {
  const [titleList, setTitleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTitleList = async () => {
    setLoading(true);
    try {
      const url = `/api/getTitlelist`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        console.log("useTitleList:", data);
        setTitleList(data.titleList);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      console.log("There was an error", error);
    }
  };

  useEffect(() => {
    fetchTitleList();
  }, []);

  return { titleList, loading, error, refetch: fetchTitleList };
}
