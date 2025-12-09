import { useEffect, useState } from "react";

/**
 * Custom hook: 取得旅遊套票詳細資料
 * @param {string|number} idTourPkg - 套票 ID
 */
export default function useTourPkgDetail(idTourPkg) {
  const [tourPkgDetail, setTourPkgDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTourPkgDetail = async () => {
    if (!idTourPkg) return; // 沒有 ID 不請求
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ idTourPkg });

      const url = `/api/tourpkgdetail?${params.toString()}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const tourPkgDetail = data.tourPkg;

      setTourPkgDetail(tourPkgDetail);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch tour package detail:", err);
    } finally {
      setLoading(false);
    }
  };

  // 自動在 tourPkgId 改變時抓取
  useEffect(() => {
    getTourPkgDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTourPkg]);

  return { tourPkgDetail, loading, error, refetch: getTourPkgDetail };
}
