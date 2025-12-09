import { useCallback, useEffect, useState } from "react";

/**
 * Get these params from tourPkgDetails.tourDepList
 * @param {string|number} idBase
 * @param {string|number} idCompany
 */
export default function useTourDepDetail({ idBase, idCompany, enabled = true }) {
  const [tourDepDetail, setTourDepDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTourDepDetail = async () => {
    if (!enabled || (!idBase && !idCompany)) return; // 沒有 ID 就不發請求
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        idTourDep: idBase,
        idCompany: idCompany,
      });

      let url = `/api/tourdepdetail?${params.toString()}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      if (data.error) {
        setError(data.error);
        return;
      }

      setTourDepDetail(data.tourDep);
    } catch (err) {
      // 將所有錯誤都轉成字串並存到 state
      setError(err.message || "Something went wrong");
      console.error("Failed to fetch tour package detail:", err);
    } finally {
      setLoading(false);
    }
  };
  // 自動在 tourPkgId 改變時抓取
  useEffect(() => {
    getTourDepDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idBase, idCompany, enabled]);

  return { tourDepDetail, loading, error, refetch: getTourDepDetail };
}
