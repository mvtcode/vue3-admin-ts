import store from "@/store";
import { Get } from "./index";
import { PermissionsRes } from "@/dto/authRes";

// const api = process.env.API_AUTH_URL || "/user";

export const GetPermission = async (query?: any): Promise<string[]> => {
  const dataCache = store.getters["permissions/get"];
  if (dataCache) return dataCache;
  const res: PermissionsRes = await Get("/v1/cfg/user/permissions", query);
  if (res.success) {
    const permissions: string[] = res.data;
    store.dispatch("permissions/set", permissions);
    return permissions;
  }
  return [];
};

export const ClearData = () => {
  store.dispatch("permissions/remove");
};
