import axios from "axios";
const fetcher = async (url: string, count: number) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/${url}`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      start_date: "2021-09-01",
      end_date: "2022-01-17",
    },
  });
  return res.data;
};
export default fetcher;
