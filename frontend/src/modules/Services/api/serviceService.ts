import axios from "axios";
import API_URL from "@/config/api.ts";
import { AddServiceDto } from "@/modules/Services/types/addService.dto.ts";
import { IServiceItem } from "@/modules/Services/types/ServicesTypes.ts";
class serviceService {
  async addService(body: AddServiceDto) {
    const form_data = new FormData();
    form_data.append("image", body.image, body.image.path);
    form_data.append("name", body.name);
    form_data.append("link", body.link);
    form_data.append("description", body.description);
    return axios.post(`${API_URL}services/`, form_data, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async getServices() {
    return axios.get<IServiceItem[]>(`${API_URL}services/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
}

export default new serviceService();
