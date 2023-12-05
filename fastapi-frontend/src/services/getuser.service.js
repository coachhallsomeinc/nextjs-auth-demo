import {
  LOGIN_ENDPOINT,
  REFRESH_ENDPOINT,
  REGISTER_ENDPOINT,
  API_URL,
  GETUSER_ENDPOINT,
} from "./auth.constants";

import request from "./api.request";

class GetUserService {
  constructor() {
    this.getUserData = this.getUserData.bind(this);
  }

  async getUserData(user_id, bearer) {
    if (user_id != undefined) {
      try {
        const response = await request({
          url: API_URL + GETUSER_ENDPOINT + "/" + user_id,
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + bearer,
          },
        });

        if (response && response.data) {
          return response;
        } else {
          console.error("Invalid response:", response);
          throw new Error("Invalid response from the server");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    }
  }
}

export default new GetUserService();
