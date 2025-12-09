import { useLoadingContext } from "@/context/LoadingContext";

export default function useLoading() {
  const { show, hide } = useLoadingContext();
  return { show, hide };
}
