import useSWR from "swr";
import fetcher from "../api/fetcher";
import type { iImageData } from "../../types";

function useImageData() {
  //TODO: Use a calendar picker to get dates instead of predefining them
  const start_date = "2021-12-01";
  const end_date = "2022-01-17";

  // Create a custom hook for stale-while-revalidate, which isn't the most useful for this type of application but it gives us an opinionated way to fetch data
  const { data, error } = useSWR("planetary/apod", (url) =>
    fetcher(url, start_date, end_date)
  );
  return {
    data: data as iImageData[],
    isLoading: !error && !data,
    isError: error,
  };
}
export default useImageData;
