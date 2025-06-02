import dotenv from "dotenv";
dotenv.config();

import { test, describe, expect } from "@jest/globals";
import authApi from "../src/api/authApi";
import request from "supertest";

let randomNumber = Math.floor(Math.random() * 1000);
const userEmail = process.env.USER_EMAIL || "email";
const userPassword = process.env.USER_PASSWORD || "password";
const blockedEmail = process.env.BLOCKED_USER_EMAIL || "email";
const blockedPassword = process.env.BLOCKED_USER_PASSWORD || "password";
const adminEmail = process.env.ADMIN_EMAIL || "email";
const adminPassword = process.env.ADMIN_PASSWORD || "password";
const operatorEmail = process.env.OPERATOR_EMAIL || "email";
const operatorPassword = process.env.OPERATOR_EMAIL || "password";

//TODO: Delete before final
///========= CHECK =======///
test.only("CHECK", async () => {
  const response = await request("https://api.restful-api.dev")
    .get("/objects")
    .set("Content-Type", "application/json");

  expect(response.status).toBe(200);
  expect(
    response.body.some(
      (item: { id: string; name: string; data: string }) =>
        item.id === "2" &&
        item.name === "Apple iPhone 12 Mini, 256GB, Blue" &&
        item.data === null
    )
  ).toBe(true);
});
test.only("Log in as user", async () => {
  const a = true;

  expect(a).toBe(true);
});
test.only("Log in as admin", async () => {
  const a = true;

  expect(a).toBe(true);
});
test.only("Log in as operator", async () => {
  const a = true;

  expect(a).toBe(false);
});
///=================///

describe("Sign in successfully", () => {
  it("Sign in user successfully", async () => {
    const response = await authApi.login(userEmail, userPassword);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({});
  });

  it("Sign in admin successfully", async () => {
    const response = await authApi.login(adminEmail, adminPassword);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({});
  });

  it("Sign in operator successfully", async () => {
    const response = await authApi.login(operatorEmail, operatorPassword);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({});
  });
});

describe("Sign in fail", () => {
  it("Sign in with non-existing username", async () => {
    const response = await authApi.login("non-existing-username", userPassword);

    expect(response.status).toBe(400);
  });

  it("Sign in with wrong password", async () => {
    const response = await authApi.login(userEmail, "wrong-password");

    expect(response.status).toBe(400);
  });

  it("Sign in with empty username", async () => {
    const response = await authApi.login("", userPassword);

    expect(response.status).toBe(400);
  });

  it("Sign in with capital username", async () => {
    const response = await authApi.login(
      userEmail?.toUpperCase(),
      userPassword
    );

    expect(response.status).toBe(200);
  });

  it("Sign in with empty password", async () => {
    const response = await authApi.login(userEmail, "");

    expect(response.status).toBe(400);
  });

  it("Sign in with capital password", async () => {
    const response = await authApi.login(
      userEmail,
      userPassword?.toUpperCase()
    );

    expect(response.status).toBe(400);
  });

  it("Sign in with with blocked user", async () => {
    const response = await authApi.login(blockedEmail, blockedPassword);

    expect(response.status).toBe(400);
  });
});
