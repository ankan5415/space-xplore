import axios from "axios";
import type { iImageData } from "../../types";
import moment from "moment";
interface iImageDataProps {
  count: number;
  skip: number;
}
const getImageData = async ({ count, skip }: iImageDataProps) => {
  const formatString = "YYYY-MM-DD";
  const end_date = moment().subtract(skip, "days");
  const start_date = moment().subtract(count - 1 + skip, "days");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/planetary/apod`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          start_date: start_date.format(formatString),
          end_date: end_date.format(formatString),
        },
      }
    );
    return res.data as iImageData[];
  } catch (error: any) {
    throw new Error(error);
  }
};
export default getImageData;
