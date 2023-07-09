import axios from "axios";

const baseURL = process.env.REACT_APP_BASEURL;

export const AxiosApi = axios.create({
  baseURL,
});

if (sessionStorage.getItem("accessToken")) {
  AxiosApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${sessionStorage.getItem("accessToken")}`;
}
