import axios from "axios";

export const axiosIntence = axios.create({
  baseURL: `http://localhost:6001/`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
