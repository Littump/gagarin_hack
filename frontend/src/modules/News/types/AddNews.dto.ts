import { kindEnglish } from "@/modules/News/types/INewsItem.ts";
import img from "@/assets/achievement3.png";
export interface AddNewsDto {
  name: string;
  description: string;
  date_start: string;
  date_finish: string;
  place: string;
  points: number;
  link: string;
  avatar: typeof img;
  kind: kindEnglish;
}
