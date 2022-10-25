import { generateAccessToken, generateRefreshToken } from "../token.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

describe("Generate Token function", () => {
  const accessSecret = process.env.JWT_ACCESS_SECRET;
  const refreshSecret = process.env.JWT_REFRESH_SECRET;

  it("Should generate a jwt access token with expiration time", () => {
    const data = { id: 12345678910 };

    const token = generateAccessToken(data);
    const decryptedToken = jwt.verify(token, accessSecret);

    expect(decryptedToken.id).toBe(data.id);
    expect(decryptedToken).toHaveProperty("exp");
  });

  it("Should generate a jwt refresh token", () => {
    const data = { id: 12345678910 };

    const token = generateRefreshToken(data);
    const decryptedToken = jwt.verify(token, refreshSecret);

    expect(decryptedToken.id).toBe(data.id);
  });
});
