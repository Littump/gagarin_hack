import PortfolioInfo from "@/modules/PortfolioInfo";
import Achievements from "@/modules/PortfolioAchievements";
import Problems from "@/modules/PortfolioProblems";
import Bot from "@/modules/bot";

function PortfolioPage() {
  return (
    <>
      <PortfolioInfo />
      <Achievements />
      <Problems />
      <Bot />
    </>
  );
}

export default PortfolioPage;
