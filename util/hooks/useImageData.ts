import useSWR from "swr";
import fetcher from "../api/fetcher";
import type { iImageData } from "../../types";

function useImageData() {
  const { data, error } = useSWR("planetary/apod", (url) => fetcher(url, 10));
  return {
    data: data as iImageData[],
    isLoading: !error && !data,
    isError: error,
  };
}
export default useImageData;
