import img from "@/assets/news_item1.png";
export interface IServiceItem {
  image: typeof img;
  name: string;
  id: number;
  description: string;
  link: string;
}
