import { INewsItem } from "@/modules/News/types/INewsItem.ts";
import axios from "axios";
import API_URL from "@/config/api.ts";
import { AddNewsDto } from "@/modules/News/types/AddNews.dto.ts";

class newsService {
  async addNews(body: AddNewsDto) {
    const form_data = new FormData();
    form_data.append("avatar", body.avatar, body.avatar.path);
    form_data.append("name", body.name);
    form_data.append("link", body.link);
    form_data.append("place", body.place);
    form_data.append("points", body.points.toString());
    form_data.append("date_start", body.date_start);
    form_data.append("date_finish", body.date_finish);
    form_data.append("kind", body.kind);
    form_data.append("description", body.description);
    return axios.post(`${API_URL}events/`, form_data);
  }
  async getNews() {
    return axios.get<INewsItem[]>(`${API_URL}events/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async getPriorityNews() {
    return axios.get<INewsItem[]>(`${API_URL}events/priority_list/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
}

export default new newsService();
