import axios from "axios";
import API_URL from "@/config/api.ts";

class botService {
  async getAnswer(q: string) {
    return axios.post<{ text: string }>(
      `${API_URL}qa/question/`,
      {
        text: q,
      },
      {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      },
    );
  }
}

export default new botService();
