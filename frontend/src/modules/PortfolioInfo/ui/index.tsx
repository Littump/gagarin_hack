import user from "@/assets/user.png";
import { IUser } from "@/modules/PortfolioInfo/types/userInfo.ts";
import ResultChart from "@/ui/ResultChart.tsx";
import { useGetPortfolioInfo } from "@/modules/PortfolioInfo/api/useGetPortfolioInfo.ts";
import { useGetResult } from "@/modules/PortfolioInfo/api/useGetResult.ts";
const PortfolioInfo = () => {
  const { data, isPending } = useGetPortfolioInfo();
  const { data: result_data, isPending: result_pending } = useGetResult();
  const userInfo: IUser = {
    img: user,
    name: data?.data.first_name + " " + data?.data.last_name,
    email: data?.data.email,
    result: result_data?.data[result_data?.data.length - 1].percentage,
  };
  if (isPending) return <div>Загрузка...</div>;
  return (
    <div className="flex gap-10">
      <div className="w-2/3 bg-violet-100 rounded-xl py-10 px-20 flex gap-20 items-center">
        <img src={userInfo.img} alt="" className="w-44 h-44" />
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">{userInfo.name}</h2>
          <p>{userInfo.email}</p>
        </div>
      </div>{" "}
      <div className="w-1/3 bg-gray-100 rounded-xl flex items-center">
        {result_pending ? (
          <div className="loading"></div>
        ) : (
          <ResultChart
            width={250}
            result={userInfo.result ? userInfo.result : 0}
          />
        )}
        <h2 className="font-semibold text-lg">Мой прогресс</h2>
      </div>
    </div>
  );
};

export default PortfolioInfo;
