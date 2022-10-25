import request from "supertest";
import User from "../../models/User.js";

const baseUrl = "http://localhost:3000";

describe(`GET ${baseUrl}/logout`, () => {
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

  beforeAll(async () => {
    await deleteUser();

    await request(baseUrl).post("/register").send(registerData);
  });

  afterAll(async () => {
    await deleteUser();
  });

  it("Logging out and remove the cookie", async () => {
    const status = 200;
    const res = await request(baseUrl).get("/logout");

    const resStatus = res.status;
    const resData = res._body;
    const accessCookie =
      res.header["set-cookie"][0].includes("authAccessCookie=;");
    const refreshCookie = res.header["set-cookie"][1].includes(
      "authRefreshCookie=;"
    );

    expect(resStatus).toBe(status);
    expect(resData.auth).toBeFalsy();
    expect(accessCookie).toBeTruthy();
    expect(refreshCookie).toBeTruthy();
  });
});
