import path from "path";
import {
  getAdminAccessToken,
  getOperatorAccessToken,
  getUserAccessToken,
} from "../src/utils/auth.helper";
import userApi from "../src/api/userApi";

const avatar_path = path.join(__dirname, "../images/avatar.jpg");
const devUrl = process.env.DEV_URL || "http://localhost:3000";

let guest_token: string, admin_token: string, operator_token: string;
let randomMail = `randomMail${Math.floor(Math.random() * 1000)}@gr.la`;

beforeAll(async () => {
  guest_token = await getUserAccessToken();
  admin_token = await getAdminAccessToken();
  operator_token = await getOperatorAccessToken();
});

describe("GET ALL USERS", () => {
  it("Guest get all users successfully", async () => {
    const response = await userApi.getUsers(guest_token);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({});
  });

  it("Admin get all users successfully", async () => {
    const response = await userApi.getUsers(admin_token);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({});
  });

  it("Operator get all users successfully", async () => {
    const response = await userApi.getUsers(operator_token);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({});
  });
});
//prettier-ignore
type InvalidLoginCase = {
  name: any; phone: any; email: any; password: any; role: any; activity: any; case: string;
};

describe("CREATE USER: Validation error", () => {
  //prettier-ignore
  const invalidLoginCase: InvalidLoginCase[] = [
    {case: "Integer name",name: 123,phone: "0909123001",password: "abc123",email: randomMail,role: "guest",activity: true},
    {case: "Integer phone",name: "user",phone: 9909123001,password: "abc123",email: randomMail,role: "guest",activity: true},
    {case: "Integer email",name: "user",phone: "0909123001",password: "abc123",email: 123,role: "guest",activity: true},
    {case: "Integer password",name: "user",phone: "0909123001",password: 123,email: randomMail,role: "guest",activity: true},
    {case: "Integer role",name: "user",phone: "0909123001",password: "abc123",email: randomMail,role: 123,activity: true},
    {case: "Integer activity",name: "user",phone: "0909123001",password: "abc123",email: randomMail,role: "guest",activity: 123},
    {case: "String activity",name: "user",phone: "0909123001",password: "abc123",email: randomMail,role: "guest",activity: "false"},
  ];

  test.each(invalidLoginCase)(
    "Fail to create user with $case",
    async ({ name, phone, password, email, role, activity }) => {
      const response = await userApi.createUser(operator_token, {
        name: name,
        phone: phone,
        email: email,
        password: password,
        role: role,
        activity: activity,
      });

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({});
    }
  );
});

describe("CREATE USER: Permission", () => {
  it("Admin create user successfully", async () => {
    const response = await userApi.createUser(admin_token, {
      name: "User 1",
      phone: "0909123001",
      email: "user1@grr.la",
      password: "abc123",
      role: "guest",
      activity: true,
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({});
  });

  it("Operator create user successfully", async () => {
    const response = await userApi.createUser(operator_token, {
      name: "User 2",
      phone: "0909123002",
      email: "user2@grr.la",
      password: "abc123",
      role: "guest",
      activity: true,
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({});
  });

  it("Guest can not create user", async () => {
    const response = await userApi.createUser(guest_token, {
      name: "User 3",
      phone: "0909123003",
      email: "user3@grr.la",
      password: "abc123",
      role: "guest",
      activity: true,
    });

    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({});
  });

  describe("CREATE USER: BUSINESS LOGIC", () => {
    it("Can not create user with existing email", async () => {
      const response = await userApi.createUser(admin_token, {
        name: "User 4",
        phone: "0909123004",
        email: "user1@grr.la",
        password: "abc123",
        role: "guest",
        activity: true,
      });

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({});
    });

    it("Can not create user with existing phone", async () => {
      const response = await userApi.createUser(admin_token, {
        name: "User 5",
        phone: "0909123001",
        email: "user5@grr.la",
        password: "abc123",
        role: "guest",
        activity: true,
      });

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({});
    });

    it("Can not create user with invalid role", async () => {
      const response = await userApi.createUser(admin_token, {
        name: "User 6",
        phone: "0909123006",
        email: "user6@grr.la",
        password: "abc123",
        role: "role",
        activity: true,
      });

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({});
    });
  });
});
