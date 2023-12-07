import {
    LOGIN_ENDPOINT,
    REFRESH_ENDPOINT,
    REGISTER_ENDPOINT,
    API_URL,
  } from "./auth.constants";
  
  import request from "./api.request";

  class ChildService {
    constructor() {
        this.registerChild = this.registerChild.bind(this)
    }

    async registerChild(childData) {
    // async registerChild(accessToken, childData) {
        try {
            const response = await request({
                url: API_URL + 'children/registerchild',
                method: 'POST',
                data: childData,
                // headers: {
                //     'Content-Type': 'application/json',
                //     Authorization: `Bearer ${accessToken}`,
                // },
            });
            if (response && response.data) {
                return response.data;
            } else {
                console.error('Invalid response:', response);
                throw new Error('Invalid response from the server');
            }
        } catch (error) {
            console.error('Error registering child:', error);
            throw error
        }
    }
  }

export default new ChildService();