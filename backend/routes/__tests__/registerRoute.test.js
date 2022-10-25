import request from "supertest";
import User from "../../models/User.js";

const baseUrl = "http://localhost:3000";

describe(`POST ${baseUrl}/register`, () => {
  const registerData = {
    name: "User",
    email: "user@email.com",
    password: "12345678",
    confirmPassword: "12345678",
  };

  const deleteUser = async () => {
    const user = await User.findOne({ where: { email: registerData.email } });

    if (user) {
      await User.destroy({ where: { email: user.email } });
    }
  };

  afterAll(async () => {
    await deleteUser();
  });

  it("Checking status and errors when send an empty object", async () => {
    const data = {};
    const status = 422;
    const res = await request(baseUrl).post("/register").send(data);

    const resStatus = res.status;
    const resData = res._body;
    const cookies = res.header["set-cookie"];

    expect(resStatus).toBe(status);
    expect(resData.errors.length).toBe(7);
    expect(cookies).toBeFalsy();
  });

  it("Checking status and error when password and confirmPassword are differents", async () => {
    const data = {
      name: "User",
      email: "user@email.com",
      password: "12345678",
      confirmPassword: "123456789",
    };
    const status = 422;
    const res = await request(baseUrl).post("/register").send(data);

    const resStatus = res.status;
    const resData = res._body;
    const cookies = res.header["set-cookie"];

    expect(resStatus).toBe(status);
    expect(resData.errors[0]).toBe("As senhas não são iguais.");
    expect(cookies).toBeFalsy();
  });

  it("Creating a user and getting the cookie", async () => {
    const status = 201;
    const res = await request(baseUrl).post("/register").send(registerData);

    const resStatus = res.status;
    const resData = res._body;
    const accessCookie =
      res.header["set-cookie"][0].includes("authAccessCookie");
    const refreshCookie =
      res.header["set-cookie"][1].includes("authRefreshCookie");

    expect(resStatus).toBe(status);
    expect(resData.id.length).toBe(36);
    expect(accessCookie).toBeTruthy();
    expect(refreshCookie).toBeTruthy();
  });

  it("Checking if email exists in db before creating a new user", async () => {
    const status = 409;
    const res = await request(baseUrl).post("/register").send(registerData);

    const resStatus = res.status;
    const resData = res._body;
    const cookies = res.header["set-cookie"];

    expect(resStatus).toBe(status);
    expect(resData.errors[0]).toBe("O e-mail já está em uso.");
    expect(cookies).toBeFalsy();
  });
});
