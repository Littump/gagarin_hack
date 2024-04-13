import axios from "axios";
import API_URL from "@/config/api.ts";
import { AddProblemDto } from "@/modules/PortfolioProblems/types/addProblem.dto.ts";
import { IProblem } from "@/modules/PortfolioProblems/types/problems.ts";

class problemsService {
  async addProblem(body: AddProblemDto) {
    return axios.post(`${API_URL}pointups/`, body, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async deleteProblem(id: number) {
    return axios.delete(`${API_URL}pointups/${id}/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async getProblems() {
    return axios.get<IProblem[]>(`${API_URL}pointups/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
}

export default new problemsService();
