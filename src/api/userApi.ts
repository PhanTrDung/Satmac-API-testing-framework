import request from "supertest";
import { API_PATH } from "../utils/constants";

const devUrl = process.env.DEV_URL || "http://localhost:3000";

const userApi = {
  getProfile: async (access_token: string): Promise<any> => {
    const response = await request(devUrl)
      .get(API_PATH.PROFILE)
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json");

    return response;
  },

  updateProfile: async (
    access_token: string,
    profileData: {
      name?: string;
      phone?: string;
      email?: string;
      avatar?: string;
    }
  ): Promise<any> => {
    const req = request(devUrl)
      .put(API_PATH.PROFILE)
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "multipart/form-data");

    if (profileData.name) req.field("name", profileData.name);
    if (profileData.phone) req.field("phone", profileData.phone);
    if (profileData.email) req.field("email", profileData.email);
    if (profileData.avatar) req.attach("avatar", profileData.avatar);

    const response = await req;
    return response;
  },

  changePassword: async (
    access_token: string,
    currPassword: string,
    newPassword: string
  ): Promise<any> => {
    const response = await request(devUrl)
      .put(API_PATH.CHANGE_PASSWORD)
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json")
      .send({
        currPassword,
        newPassword,
      });

    return response;
  },

  getUsers: async (
    access_token: string,
    query: {
      limit?: number;
      page?: number;
      name?: string;
      phone?: string;
      email?: string;
    } = {}
  ): Promise<any> => {
    const response = await request(devUrl)
      .get(API_PATH.GET_USERS)
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json")
      .query(query);

    return response;
  },

  createUser: async (
    access_token: string,
    userData: {
      name: string;
      phone: string;
      email: string;
      password: string;
      role: string;
      activity: boolean;
    }
  ): Promise<any> => {
    const response = await request(devUrl)
      .post(API_PATH.CREATE_USER)
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application.json")
      .send(userData);

    return response;
  },

  updateUser: async (
    access_token: string,
    userId: string,
    userData: {
      name?: string;
      phone?: string;
      email?: string;
      password?: string;
      role?: string;
      activity?: boolean;
    }
  ): Promise<any> => {
    const req = request(devUrl)
      .put(API_PATH.UPDATE_USER.replace("{id}", userId))
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json")
      .send(userData);

    const response = await req;
    return response;
  },

  deleteUser: async (access_token: string, userId: string): Promise<any> => {
    const response = await request(devUrl)
      .delete(API_PATH.DELETE_USER.replace("{$id}", userId))
      .set("Authorization", `Bearer ${access_token}`)
      .set("Content-Type", "application/json");
    return response;
  },
};
export default userApi;
