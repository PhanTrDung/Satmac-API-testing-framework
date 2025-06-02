import request from "supertest";

import { API_PATH } from "../src/utils/constants";
import path from "path";
import {
  getAdminAccessToken,
  getOperatorAccessToken,
  getUserAccessToken,
} from "../src/utils/auth.helper";

const avatar_path = path.join(__dirname, "../images/avatar.jpg");

let guest_token: string, admin_token: string, operator_token: string;
const devUrl = process.env.DEV_URL || "http://localhost:3000";

beforeAll(async () => {
  guest_token = await getUserAccessToken();
  admin_token = await getAdminAccessToken();
  operator_token = await getOperatorAccessToken();
});

describe("Get profile successfully", () => {
  it("Get guest profile successfully", async () => {
    const response = await request(devUrl)
      .get(API_PATH.PROFILE)
      .set("Authorization", `Bearer ${guest_token}`)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
  });

  it("Get admin profile successfully", async () => {
    const response = await request(devUrl)
      .get(API_PATH.PROFILE)
      .set("Authorization", `Bearer ${admin_token}`)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
  });

  it("Get operator profile successfully", async () => {
    const response = await request(devUrl)
      .get(API_PATH.PROFILE)
      .set("Authorization", `Bearer ${operator_token}`)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
  });
});

describe("Update profile successfully", () => {
  it("Update guest profile successfully", async () => {
    const response = await request(devUrl)
      .put(API_PATH.PROFILE)
      .set("Authorization", `Bearer ${guest_token}`)
      .attach("avatar", avatar_path)
      .set("Content-Type", "multipart/form-data");

    expect(response.status).toBe(200);
  });

  it("Update admin profile successfully", async () => {
    const response = await request(devUrl)
      .put(API_PATH.PROFILE)
      .set("Authorization", `Bearer ${admin_token}`)
      .attach("avatar", avatar_path)
      .set("Content-Type", "multipart/form-data");

    expect(response.status).toBe(200);
  });

  it("Update operator profile successfully", async () => {
    const response = await request(devUrl)
      .put(API_PATH.PROFILE)
      .set("Authorization", `Bearer ${operator_token}`)
      .attach("avatar", avatar_path)
      .set("Content-Type", "multipart/form-data");

    expect(response.status).toBe(200);
  });
});
