import { createStore } from "vuex";

import type { UserState } from "./modules/user";
import type { LoadingState } from "./modules/loading";
import type { ProfileState } from "./modules/profile";
import type { PermissionState } from "./modules/permissions";

import user from "./modules/user";
import loading from "./modules/loading";
import profile from "./modules/profile";
import permissions from "./modules/permissions";

export interface RootState {
  user: UserState;
  loading: LoadingState;
  profile: ProfileState;
  permissions: PermissionState;
}

export default createStore({
  // state: {},
  // getters: {},
  // mutations: {},
  // actions: {},
  modules: {
    user,
    loading,
    profile,
    permissions,
  },
});
