import img from "@/assets/achievement1.png";
export interface AddServiceDto {
  name: string;
  description: string;
  link: string;
  image?: typeof img;
}
