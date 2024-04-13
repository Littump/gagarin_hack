import axios from "axios";
import API_URL from "@/config/api.ts";

interface IUserResponse {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  specialization: string;
  university_group: string;
  username: string;
}

class portfolioInfoService {
  async getMe() {
    return axios.get<IUserResponse>(`${API_URL}users/me/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async getResult() {
    return axios.get(`${API_URL}results/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
}

export default new portfolioInfoService();
