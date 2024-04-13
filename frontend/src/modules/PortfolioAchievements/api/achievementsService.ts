import axios from "axios";
import API_URL from "@/config/api.ts";
import { AddAchievementDto } from "@/modules/PortfolioAchievements/types/addAchievement.dto.ts";
import { IAchievement } from "@/modules/PortfolioAchievements/types/achievement.ts";

class achievementsService {
  async addAchievement(body: AddAchievementDto) {
    return axios.post(`${API_URL}achievements/`, body, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async getAchievements() {
    return axios.get<IAchievement[]>(`${API_URL}achievements/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
}

export default new achievementsService();
