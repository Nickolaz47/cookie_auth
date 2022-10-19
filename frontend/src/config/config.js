export const baseUrl = "http://localhost:3000";

export const requestConfig = (baseURL, method, data, credentials = true) => {
  if (method === "delete" || data === null) {
    const config = {
      baseURL,
      method,
      timeout: 5000,
      withCredentials: credentials,
    };
    return config;
  } else {
    const config = {
      baseURL,
      method,
      data: JSON.stringify(data),
      timeout: 5000,
      withCredentials: credentials,
      headers: {
        "Content-Type": "application/json",
      },
    };
    return config;
  }
};
