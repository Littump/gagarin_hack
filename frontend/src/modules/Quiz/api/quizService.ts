import axios from "axios";
import API_URL from "@/config/api.ts";
import { ITest } from "@/modules/Quiz/types/quizTypes.ts";

class problemsService {
  async getQuestions() {
    return axios.get<ITest>(`${API_URL}tests/1`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async setResult(percentage: number) {
    return axios.post<ITest>(
      `${API_URL}results/`,
      {
        is_complete: true,
        test: 1,
        percentage,
      },
      {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      },
    );
  }
}

export default new problemsService();
