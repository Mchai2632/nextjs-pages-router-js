import { useEffect, useState } from "react";

export default function useEcRelationship() {
  const [ecRelationshipList, setEcRelationshipList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEcRelationshipList = async () => {
    setLoading(true);
    try {
      const url = `/api/getEcRelationship`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        console.log("useEcRelationship:", data);
        setEcRelationshipList(data.ecRelationshipList);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      console.log("There was an error", error);
    }
  };

  useEffect(() => {
    fetchEcRelationshipList();
  }, []);

  return { ecRelationshipList, loading, error, refetch: fetchEcRelationshipList };
}
