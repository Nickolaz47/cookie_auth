import request from "supertest";
import User from "../../models/User.js";
import Token from "../../models/Token.js";

const baseUrl = "http://localhost:3000";

describe(`GET ${baseUrl}/logout`, () => {
  const registerData = {
    name: "User",
    email: "user@email.com",
    password: "12345678",
    confirmPassword: "12345678",
  };

  const deleteTokens = async () => {
    const user = await User.findOne({ where: { email: registerData.email } });

    if (user) {
      const tokens = await Token.findAll({ where: { UserId: user.id } });
      tokens.forEach(async (token) => {
        await token.destroy();
      });
    }
  };

  const deleteUser = async () => {
    const user = await User.findOne({ where: { email: registerData.email } });

    if (user) {
      await User.destroy({ where: { email: user.email } });
    }
  };

  afterAll(async () => {
    await deleteTokens();
    await deleteUser();
  });

  it("Logging out and remove the cookie", async () => {
    const { header } = await request(baseUrl)
      .post("/register")
      .send(registerData);
    const cookies = header["set-cookie"];

    const status = 200;
    const res = await request(baseUrl)
      .get("/logout")
      .set("Cookie", [...cookies])
      .send();

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
