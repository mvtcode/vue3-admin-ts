import type { ActionContext } from "vuex";
import type { RootState } from "..";

const SET_INFO = "SET_INFO";
const REMOVE_INFO = "REMOVE_INFO";

export interface LoadingState {
  isLoading: boolean;
}

type Context = ActionContext<LoadingState, RootState>;

export default {
  namespaced: true,

  state: {
    isLoading: false,
  } as LoadingState,

  getters: {
    get(state: LoadingState): boolean {
      return state.isLoading;
    },
  },

  actions: {
    set(context: Context, isLoading: boolean) {
      context.commit(SET_INFO, isLoading);
    },

    remove(context: Context) {
      context.commit(REMOVE_INFO);
    },
  },

  mutations: {
    [SET_INFO](state: LoadingState, isLoading: boolean) {
      state.isLoading = isLoading;
    },

    [REMOVE_INFO](state: LoadingState) {
      state.isLoading = false;
    },
  },
};
