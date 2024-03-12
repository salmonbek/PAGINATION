import axios from "axios";

const request = axios.create({
  baseURL: "https://640b314281d8a32198dce736.mockapi.io/api/v1/",
  timeout: 10000,
});

export default request;
