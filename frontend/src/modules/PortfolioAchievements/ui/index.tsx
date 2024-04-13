import AddAchievement from "@/modules/PortfolioAchievements/ui/AddAchievement.tsx";
import AchievementItem from "@/modules/PortfolioAchievements/ui/AchievementItem.tsx";
import {useGetAchievements} from "@/modules/PortfolioAchievements/api/useGetAchievements.ts";

const Achievements = () => {
  const {data,isPending} = useGetAchievements();
  if(isPending) return "загрузка..."
  return (
    <div className="mt-12">
      <div className="flex gap-4 items-center mb-12">
        <h1 className="text-2xl font-semibold">Все достижения</h1>
        <AddAchievement />
      </div>
      <div className="grid grid-cols-3 gap-10">
        {data?.data.map((el) => (
          <AchievementItem {...el} key={el.name + el.id} />
        ))}
      </div>
    </div>
  );
};

export default Achievements;
