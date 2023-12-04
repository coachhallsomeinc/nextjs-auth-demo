import {
  LOGIN_ENDPOINT,
  REFRESH_ENDPOINT,
  REGISTER_ENDPOINT,
  API_URL,
} from "./auth.constants";

import request from "./api.request";

class CalendarService {
  constructor() {
    this.getUserData = this.getUserData.bind(this);
  }

  async getUserData(user_id) {
    try {
      const response = await request({
        url: API_URL + GETUSER_ENDPOINT + "/" + user_id,
        method: "POST",
      });

      if (response) {
        return response;
      }
    } catch (error) {
      return error.response;
    }
  }
}

export default new CalendarService();
