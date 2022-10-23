import { generateToken } from "../token.js";
import jwt from "jsonwebtoken";

describe("Generate Token function", () => {
  it("Should generate a jwt token", () => {
    const data = { id: 12345678910 };
    const jwtSecret = "my_secret";

    const token = generateToken(data, jwtSecret);
    const decryptedToken = jwt.verify(token, jwtSecret);

    expect(decryptedToken.id).toBe(data.id);
  });
});
