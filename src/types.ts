// define the shape of the API data that we receive
export interface iImageData {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  thumbnail_url: string;
  copyright?: string;
}
