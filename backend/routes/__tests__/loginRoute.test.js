import request from "supertest";
import User from "../../models/User.js";

const baseUrl = "http://localhost:3000";

describe(`POST ${baseUrl}/login`, () => {
  beforeAll(async () => {
    const data = {
      name: "User",
      email: "user@email.com",
      password: "12345678",
      confirmPassword: "12345678",
    };

    await request(baseUrl).post("/register").send(data);
  });

  afterAll(async () => {
    const user = await User.findOne({ where: { name: "User" } });

    if (user) {
      await User.destroy({ where: { name: "User" } });
    }
  });

  it("Checking status and errors when send an empty object", async () => {
    const data = {};
    const status = 422;
    const res = await request(baseUrl).post("/login").send(data);

    const resStatus = res.status;
    const resData = res._body;
    const cookies = res.header["set-cookie"];

    expect(resStatus).toBe(status);
    expect(resData.errors.length).toBe(2);
    expect(cookies).toBeFalsy();
  });

  it("Checking errors and status when email is wrong", async () => {
    const data = {email: "user@email.com.br", password: "12345678"};
    const status = 401;
    const res = await request(baseUrl).post("/login").send(data);

    const resStatus = res.status;
    const resData = res._body;
    const cookies = res.header["set-cookie"];

    expect(resStatus).toBe(status);
    expect(resData.errors[0]).toBe("Credenciais inválidas!");
    expect(cookies).toBeFalsy();
  });

  it("Checking errors and status when password is wrong", async () => {
    const data = {email: "user@email.com", password: "123456"};
    const status = 401;
    const res = await request(baseUrl).post("/login").send(data);

    const resStatus = res.status;
    const resData = res._body;
    const cookies = res.header["set-cookie"];

    expect(resStatus).toBe(status);
    expect(resData.errors[0]).toBe("Credenciais inválidas!");
    expect(cookies).toBeFalsy();
  });

  it("Logging in and getting the cookie", async () => {
    const data = {email: "user@email.com", password: "12345678"};
    const status = 200;
    const res = await request(baseUrl).post("/login").send(data);

    const resStatus = res.status;
    const resData = res._body;
    const cookies = res.header["set-cookie"][0].includes("authCookie")

    expect(resStatus).toBe(status);
    expect(resData.id.length).toBe(36)
    expect(cookies).toBeTruthy();
  });
});
