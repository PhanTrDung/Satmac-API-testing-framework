import dotenv from "dotenv";
dotenv.config();

import authApi from "../api/authApi";

const userEmail = process.env.USER_EMAIL || "email";
const userPassword = process.env.USER_PASSWORD || "password";
const adminEmail = process.env.ADMIN_EMAIL || "email";
const adminPassword = process.env.ADMIN_PASSWORD || "password";
const operatorEmail = process.env.OPERATOR_EMAIL || "email";
const operatorPassword = process.env.OPERATOR_EMAIL || "password";

export const getUserAccessToken = async () => {
  const response = await authApi.login(userEmail, userPassword);
  if (!response.body?.token) {
    throw new Error("Token not found in login response");
  }
  return response.body.accessToken;
};

export const getAdminAccessToken = async () => {
  const response = await authApi.login(adminEmail, adminPassword);
  if (!response.body?.token) {
    throw new Error("Token not found in login response");
  }
  return response.body.accessToken;
};

export const getOperatorAccessToken = async () => {
  const response = await authApi.login(operatorEmail, operatorPassword);
  if (!response.body?.token) {
    throw new Error("Token not found in login response");
  }
  return response.body.accessToken;
};
