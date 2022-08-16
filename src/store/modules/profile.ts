import { UserInfo } from "@/dto/user";
import type { ActionContext } from "vuex";
import type { RootState } from "..";

const SET_INFO = "SET_INFO";
const REMOVE_INFO = "REMOVE_INFO";

export interface ProfileState {
  info?: UserInfo;
}

type Context = ActionContext<ProfileState, RootState>;

export default {
  namespaced: true,

  state: {
    info: null,
  } as unknown as ProfileState,

  getters: {
    getInfo(state: ProfileState): UserInfo | undefined {
      return state.info;
    },
  },

  actions: {
    setInfo(context: Context, user: UserInfo) {
      context.commit(SET_INFO, user);
    },

    remove(context: Context) {
      context.commit(REMOVE_INFO);
    },
  },

  mutations: {
    [SET_INFO](state: ProfileState, user: UserInfo) {
      state.info = user;
    },

    [REMOVE_INFO](state: ProfileState) {
      state.info = undefined;
    },
  },
};
