import axios from "axios";
const fetcher = async (url: string, count: number) => {
  console.log(process.env.NEXT_PUBLIC_API_HOST);
  console.log(process.env.NEXT_PUBLIC_API_KEY);
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/${url}`, {
    params: { api_key: process.env.NEXT_PUBLIC_API_KEY, count, thumbs: true },
  });
  return res.data;
};
export default fetcher;
