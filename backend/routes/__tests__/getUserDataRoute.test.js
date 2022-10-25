import request from "supertest";
import User from "../../models/User.js";
import Token from "../../models/Token.js";
import { generateRefreshToken } from "../../auth/token.js";

const baseUrl = "http://localhost:3000";

describe(`GET ${baseUrl}/users/:id`, () => {
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

  beforeAll(async () => {
    await request(baseUrl).post("/register").send(registerData);
  });

  afterAll(async () => {
    await deleteTokens();
    await deleteUser();
  });

  it("Trying get data without cookie", async () => {
    const { _body: user } = await request(baseUrl)
      .post("/login")
      .send(loginData);

    const status = 401;
    const res = await request(baseUrl).get(`/users/${user.id}`).send();

    const resStatus = res.status;
    const userData = res._body;

    expect(resStatus).toBe(status);
    expect(userData.errors[0]).toBe("Acesso negado!");
  });

  it("Trying get data with invalid access cookie and no refresh cookie", async () => {
    const mockAccessToken =
      "authAccessCookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIxMjM0NTY3ODkifQ.bosHfiVNC1O13aHnZOvqp-LCuRw2_4G5DNd61Ixh_Tc";

    const { header, _body: user } = await request(baseUrl)
      .post("/login")
      .send(loginData);
    const cookieParameters = header["set-cookie"][0].split(";").slice(1);
    const mockAccessCookie = [[mockAccessToken, ...cookieParameters].join(";")];

    const status = 401;
    const res = await request(baseUrl)
      .get(`/users/${user.id}`)
      .set("Cookie", [...mockAccessCookie])
      .send();

    const resStatus = res.status;
    const userData = res._body;

    expect(resStatus).toBe(status);
    expect(userData.errors[0]).toBe("Acesso negado!");
  });

  it("Trying get data with invalid access and refresh cookies", async () => {
    const mockAccessToken =
      "authAccessCookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIxMjM0NTY3ODkifQ.bosHfiVNC1O13aHnZOvqp-LCuRw2_4G5DNd61Ixh_Tc";
    const mockRefreshToken =
      "authRefreshCookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA5ODc2NTQzMjF9.6yabEpxebHdzne0ePk9vCZa83IgXuvhLmCyK5DcwsJE";

    const { header, _body: user } = await request(baseUrl)
      .post("/login")
      .send(loginData);

    const accessCookieParameters = header["set-cookie"][0].split(";").slice(1);
    const refreshCookieParameters = header["set-cookie"][1].split(";").slice(1);

    const mockAccessCookie = [
      [mockAccessToken, ...accessCookieParameters].join(";"),
    ];
    const mockRefreshCookie = [
      [mockRefreshToken, ...refreshCookieParameters].join(";"),
    ];

    const status = 403;
    const res = await request(baseUrl)
      .get(`/users/${user.id}`)
      .set("Cookie", [...mockAccessCookie, ...mockRefreshCookie])
      .send();

    const resStatus = res.status;
    const userData = res._body;

    expect(resStatus).toBe(status);
    expect(userData.errors[0]).toBe("Token inválido!");
  });

  it("Trying get data with invalid access cookie and valid refresh cookie", async () => {
    const mockAccessToken =
      "authAccessCookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIxMjM0NTY3ODkifQ.bosHfiVNC1O13aHnZOvqp-LCuRw2_4G5DNd61Ixh_Tc";

    const { header, _body: user } = await request(baseUrl)
      .post("/login")
      .send(loginData);

    const accessCookieParameters = header["set-cookie"][0].split(";").slice(1);
    const refreshCookie = header["set-cookie"][1];

    const mockAccessCookie = [
      [mockAccessToken, ...accessCookieParameters].join(";"),
    ];

    const status = 200;
    const res = await request(baseUrl)
      .get(`/users/${user.id}`)
      .set("Cookie", [...mockAccessCookie, refreshCookie])
      .send();

    const accessCookie =
      res.header["set-cookie"][0].includes("authAccessCookie");
    const resStatus = res.status;
    const userData = res._body;

    expect(resStatus).toBe(status);
    expect(accessCookie).toBeTruthy();
    expect(userData).toHaveProperty(
      "id",
      "name",
      "email",
      "createdAt",
      "updatedAt"
    );
  });

  it("Trying get data with invalid access cookie and valid refresh cookie that are not in Db", async () => {
    const mockAccessToken =
      "authAccessCookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIxMjM0NTY3ODkifQ.bosHfiVNC1O13aHnZOvqp-LCuRw2_4G5DNd61Ixh_Tc";

    const { header, _body: user } = await request(baseUrl)
      .post("/login")
      .send(loginData);

    const accessCookieParameters = header["set-cookie"][0].split(";").slice(1);
    const refreshCookieParameters = header["set-cookie"][1].split(";").slice(1);

    const mockAccessCookie = [
      [mockAccessToken, ...accessCookieParameters].join(";"),
    ];

    const refreshTokenOutDb = `authRefreshCookie=${generateRefreshToken({
      id: "1110987654321",
    })}`;
    const refreshCookieOutDb = [
      [refreshTokenOutDb, ...refreshCookieParameters].join(";"),
    ];

    const status = 403;
    const res = await request(baseUrl)
      .get(`/users/${user.id}`)
      .set("Cookie", [...mockAccessCookie, ...refreshCookieOutDb])
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
      .get(`/users/${user.id}`)
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
