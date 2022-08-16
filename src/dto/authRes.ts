import { ApiBaseRes } from "./apiResBase";

export interface LoginRes extends ApiBaseRes {
  data: {
    expireAt: string;
    refreshToken: string;
    token: string;
    userId: string;
    username: string;
  };
}

export interface PayloadToken {
  SID: string;
  roleOverride: string;
  userId: string;
  username: string;
}

export interface VerifyTokenRes extends ApiBaseRes {
  data: {
    valid: boolean;
    decode: PayloadToken;
  };
}

export interface Permissions {
  permissions: string[];
}

export interface PermissionsRes extends ApiBaseRes {
  data: string[];
}
