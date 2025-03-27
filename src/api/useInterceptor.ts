import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 5000,
});

apiInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (err) {
    return Promise.reject(err);
  }
);

export default apiInstance;
