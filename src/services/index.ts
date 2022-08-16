import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import store from "@/store";
import Router from "@/router";
import { GetToken, DelToken, DelRefreshToken, ClearStore } from "./auth";

const API_URL = process.env.API_URL || "/api";

axios.create({
  baseURL: API_URL,
  method: "get",
  timeout: 10000,
  responseEncoding: "utf8",
  headers: { "client-version": "1.0.0" },
});

axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token: string | null = GetToken();
    if (token) {
      const headers = config.headers;
      if (headers) headers.Authorization = token;
    }
    store.dispatch("loading/set", true);
    return config;
  },
  (error) => {
    store.dispatch("loading/set", false);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    store.dispatch("loading/set", false);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      DelToken();
      DelRefreshToken();
      ClearStore();
      Router.push({
        path: "/login",
        query: {
          redirect: Router.currentRoute.value.path,
        },
      });
    }
    store.dispatch("loading/set", false);
    return Promise.reject(error);
  }
);

const getUrl = (url: string): string => {
  if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) {
    return url;
  }
  return url.indexOf("/") === 0 ? API_URL + url : "/" + url;
};

export const Get = async (url: string, params = {}) => {
  const res = await axios.get(getUrl(url), { params });
  return res.data;
};

export const Post = async (
  url: string,
  body: any = {},
  option?: AxiosRequestConfig
) => {
  const res = await axios.post(getUrl(url), body, option);
  return res.data;
};

export const Put = async (
  url: string,
  body: any = {},
  option?: AxiosRequestConfig
) => {
  const res = await axios.put(getUrl(url), body, option);
  return res.data;
};

export const Patch = async (
  url: string,
  body: any = {},
  option?: AxiosRequestConfig
) => {
  const res = await axios.patch(getUrl(url), body, option);
  return res.data;
};

export const Delete = async (url: string, option?: AxiosRequestConfig) => {
  const res = await axios.delete(getUrl(url), option);
  return res.data;
};
