import request from "supertest";
import { API_PATH } from "../utils/constants";

const devUrl = process.env.DEV_URL || "http://localhost:3000";

const authApi = {
  login: async (username: string, password = ""): Promise<any> => {
    const response = await request(devUrl)
      .post(API_PATH.LOGIN)
      .send({ username, password })
      .set("Content-Type", "application.json");

    return response;
  },

  accessToken: async (refresh_token: string): Promise<any> => {
    const basicAuth = Buffer.from("xxxx:xxxx").toString("base64");

    const response = await request(devUrl)
      .post(API_PATH.REFRESH_TOKEN)
      .set("Authorization", `Basic ${basicAuth}`)
      .set("Content-Type", "application/json")
      .send({ refresh_token });

    return response;
  },
};
export default authApi;
