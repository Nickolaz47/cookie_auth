import request from "supertest";
import User from "../../models/User.js";

const baseUrl = "http://localhost:3000";

describe(`GET ${baseUrl}/:id/info`, () => {
  const registerData = {
    name: "User",
    email: "user@email.com",
    password: "12345678",
    confirmPassword: "12345678",
  };

  const loginData = {
    email: registerData.email,
    password: registerData.password,
  };

  beforeAll(async () => {
    const user = await User.findOne({ where: { email: registerData.email } });

    if (user) {
      await User.destroy({ where: { email: user.email } });
    }

    await request(baseUrl).post("/register").send(registerData);
  });

  afterAll(async () => {
    const user = await User.findOne({ where: { email: registerData.email } });

    if (user) {
      await User.destroy({ where: { email: user.email } });
    }
  });

  it("Trying get data without cookie", async () => {
    const { _body: user } = await request(baseUrl)
      .post("/login")
      .send(loginData);

    const status = 401;
    const res = await request(baseUrl).get(`/${user.id}/info`).send();

    const resStatus = res.status;
    const userData = res._body;

    expect(resStatus).toBe(status);
    expect(userData.errors[0]).toBe("Acesso negado!");
  });

  it("Trying get data with invalid cookie", async () => {
    const mockToken =
      "authCookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIxMjM0NTY3ODkifQ.bosHfiVNC1O13aHnZOvqp-LCuRw2_4G5DNd61Ixh_Tc";

    const { header, _body: user } = await request(baseUrl)
      .post("/login")
      .send(loginData);
    const cookieParameters = header["set-cookie"][0].split(";").slice(1);
    const mockCookie = [[mockToken, ...cookieParameters].join(";")];

    const status = 400;
    const res = await request(baseUrl)
      .get(`/${user.id}/info`)
      .set("Cookie", [...mockCookie])
      .send();

    const resStatus = res.status;
    const userData = res._body;

    expect(resStatus).toBe(status);
    expect(userData.errors[0]).toBe("Token inválido!");
  });

  it("Getting data from user", async () => {
    const { header, _body: user } = await request(baseUrl)
      .post("/login")
      .send(loginData);

    const status = 200;
    const res = await request(baseUrl)
      .get(`/${user.id}/info`)
      .set("Cookie", [...header["set-cookie"]])
      .send();

    const resStatus = res.status;
    const userData = res._body;

    expect(resStatus).toBe(status);
    expect(userData).toHaveProperty(
      "id",
      "name",
      "email",
      "createdAt",
      "updatedAt"
    );
  });
});
