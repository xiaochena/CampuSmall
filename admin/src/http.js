import axios from "axios";

const http = axios.create({
  // baseURL: "http://localhost:3000/web/api",
  baseURL: "http://localhost:3000/web/admin",
  withCredentials: true,
});

export default http;
