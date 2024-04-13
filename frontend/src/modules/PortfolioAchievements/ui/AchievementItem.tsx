import { IAchievement } from "@/modules/PortfolioAchievements/types/achievement.ts";
import img1 from "@/assets/achievement1.png";
import img2 from "@/assets/achievement2.png";
import img3 from "@/assets/achievement3.png";
const AchievementItem = ({ name,date_start,date_finish,link,place,id }: IAchievement) => {
  return (
    <a href={link ? "" : ""} className="bg-gray-100 rounded-xl py-6 px-4 flex gap-6 items-center hover:scale-110 transition-all">
      <img
        src={id % 3 == 0 ? img1 : id % 2 == 0 ? img2 : img3}
        alt=""
        className="w-32 h-32"
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-400 text-sm">{place}</p>
        <span className="text-gray-400 text-sm">{date_start} - {date_finish}</span>
      </div>
    </a>
  );
};

export default AchievementItem;
