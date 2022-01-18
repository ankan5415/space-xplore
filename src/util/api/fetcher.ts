import axios from "axios";
// fetching image data
const fetcher = async (url: string, start_date: string, end_date: string) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/${url}`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      start_date,
      end_date,
    },
  });
  return res.data;
};
export default fetcher;
