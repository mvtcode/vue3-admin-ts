import { PayloadToken } from "@/dto/authRes";
import type { ActionContext } from "vuex";
import type { RootState } from "..";

const SET_INFO = "SET_INFO";
const REMOVE_INFO = "REMOVE_INFO";

export interface UserState {
  info?: PayloadToken;
}

type Context = ActionContext<UserState, RootState>;

export default {
  namespaced: true,

  state: {
    info: null,
  } as unknown as UserState,

  getters: {
    getInfo(state: UserState): PayloadToken | undefined {
      return state.info;
    },
  },

  actions: {
    setInfo(context: Context, user: PayloadToken) {
      context.commit(SET_INFO, user);
    },

    remove(context: Context) {
      context.commit(REMOVE_INFO);
    },
  },

  mutations: {
    [SET_INFO](state: UserState, user: PayloadToken) {
      state.info = user;
    },

    [REMOVE_INFO](state: UserState) {
      state.info = undefined;
    },
  },
};
