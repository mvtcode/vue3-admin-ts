import type { ActionContext } from "vuex";
import type { RootState } from "..";

const SET_INFO = "SET_INFO";
const REMOVE_INFO = "REMOVE_INFO";

export interface PermissionState {
  permissions?: string[];
}

type Context = ActionContext<PermissionState, RootState>;

export default {
  namespaced: true,

  state: {
    permissions: undefined,
  } as unknown as PermissionState,

  getters: {
    get(state: PermissionState): string[] | undefined {
      return state.permissions;
    },
  },

  actions: {
    set(context: Context, permissions: string[]) {
      context.commit(SET_INFO, permissions);
    },

    remove(context: Context) {
      context.commit(REMOVE_INFO);
    },
  },

  mutations: {
    [SET_INFO](state: PermissionState, permissions: string[]) {
      state.permissions = permissions;
    },

    [REMOVE_INFO](state: PermissionState) {
      state.permissions = undefined;
    },
  },
};
