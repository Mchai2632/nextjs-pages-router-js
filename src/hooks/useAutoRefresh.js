import { useEffect } from "react";
import { useRouter } from "next/router";

export function useAutoRefresh(interval = 5000) {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const timer = setInterval(() => {
      router.replace(router.asPath, undefined, { scroll: false });
    }, interval);

    return () => clearInterval(timer);
  }, [router, interval]);
}
