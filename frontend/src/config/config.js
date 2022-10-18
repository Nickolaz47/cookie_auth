export const baseUrl = "http://localhost:3000";

export const requestConfig = (method, data) => {
  let config;

  if (method === "delete" || data === null) {
    config = {
      method: method,
      headers: {},
    };
  } else {
    config = {
      method: method,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  return config;
};
