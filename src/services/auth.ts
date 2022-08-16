import store from "@/store";
import { TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/token";
import { Post } from "./index";
import { LoginRes, VerifyTokenRes } from "@/dto/authRes";

// const api = process.env.API_AUTH_URL || "/user";

export const Login = async (body: any): Promise<LoginRes> => {
  return await Post("/v1/login", body);
};

export const LoginSocial = async (body: any) => {
  return await Post("/auth/login-social", body);
};

// export const Register = async (body) => {
//   return await Post("/auth", body);
// };

export const VerifyToken = async (token: string): Promise<VerifyTokenRes> => {
  return await Post("/v1/validateToken", {
    token,
  });
};

// export const Profile = async (query?: any) => {
//   return await Post("/v1/validateToken", query);
// };

export const Logout = async () => {
  // const res = await Post(`${api}/logout`, {
  //   refresh_token: GetRefreshToken(),
  // });
  ClearStore();
  DelToken();
  DelRefreshToken();
  // localStorage.clear();
  // return res;
};

// export const UpdatePassword = async (body) => {
//   return await Put("/auth/password", body);
// };

// export const Forgot = async (body) => {
//   return await Post("/auth/forgot", body);
// };

// export const ForgotChangePassword = async (body) => {
//   return await Put("/auth/forgot-change-password", body);
// };

export const ClearStore = () => {
  /* working in vue js, syntax error in typescript
  const keys = Object.keys(store._actions);
  if (keys && keys.length > 0) {
    keys.forEach((key) => {
      if (key.split("/")[1] === "remove") store.dispatch(key);
    });
  }*/

  store.dispatch("user/remove");
  store.dispatch("profile/remove");
  store.dispatch("permissions/remove");
};

export const SetToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const GetToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const DelToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const SetRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const GetRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const DelRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
