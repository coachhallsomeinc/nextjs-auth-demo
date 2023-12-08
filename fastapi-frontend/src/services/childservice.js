import {
    LOGIN_ENDPOINT,
    REFRESH_ENDPOINT,
    REGISTER_ENDPOINT,
    API_URL,
    REGISTERNEWCHILD_ENPOINT,
    REGISTERNEWCHILDWITHCODE_ENPOINT,
    GETCHILDRENDATAFROMPIVOT_ENDPOINT,
  } from "./auth.constants";
  
  import request from "./api.request";

  class ChildService {
    constructor() {
        this.registerChild = this.registerChild.bind(this)
    }

    async registerChild(data) {
        try {
            const response = await request({
                url: API_URL + REGISTERNEWCHILD_ENPOINT,
                method: 'POST',
                data: data.data,
                headers: data.headers
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

    async registerChildWithCode(data) {
        try {
            const response = await request({
                url: API_URL + REGISTERNEWCHILDWITHCODE_ENPOINT,
                method: 'POST',
                data: data.data,
                headers: data.headers
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


    async getChildData(data) {
        try {
            const response = await request({
                url: API_URL + GETCHILDRENDATAFROMPIVOT_ENDPOINT,
                method: 'GET',
                headers: data.headers
            });
            if (response && response.data) {
                return response.data;
            } else {
                console.error('Invalid response:', response)
                throw new Error('Invalid response from the server');
            }
        } catch (error) {
            console.error('Error registering child:', error);
            throw error
        }
    }
  }

export default new ChildService();