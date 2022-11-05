import bcrypt from "bcryptjs";

export const encryptData = (data) => {
  const salt = bcrypt.genSaltSync(10);
  const encryptedData = bcrypt.hashSync(data, salt);
  return encryptedData;
};

export const decryptData = (originalData, encryptedData) => {
  const compairData = bcrypt.compareSync(originalData, encryptedData);
  return compairData;
};
