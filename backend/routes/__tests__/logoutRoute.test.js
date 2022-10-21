import request from "supertest";
import User from "../../models/User.js";

const baseUrl = "http://localhost:3000";

describe(`GET ${baseUrl}/logout`, () => {
  afterAll(async () => {
    const user = await User.findOne({ where: { name: "User" } });

    if (user) {
      await User.destroy({ where: { name: "User" } });
    }
  });

  it("Logging out and remove the cookie", async () => {
    const data = {
      name: "User",
      email: "user@email.com",
      password: "12345678",
      confirmPassword: "12345678",
    };

    await request(baseUrl).post("/register").send(data);

    const status = 200;
    const res = await request(baseUrl).get("/logout");
   
    const resStatus = res.status;
    const resData = res._body;
    const cookies = res.header["set-cookie"][0].includes("authCookie=;");

    expect(resStatus).toBe(status);
    expect(resData.auth).toBeFalsy();
    expect(cookies).toBeTruthy();
  });
});
