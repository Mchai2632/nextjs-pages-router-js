import { useEffect } from "react";

/**
 *  useBeforeUnload hook to prevent the user from leaving the page without saving changes.
 */
export default function useBeforeUnload(shouldWarn) {
  useEffect(() => {
    if (!shouldWarn) return;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // 必须设置，才能触发默认浏览器提示
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [shouldWarn]);
}
