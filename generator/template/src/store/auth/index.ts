import { Module, GetterTree, MutationTree, ActionTree } from 'vuex';
import { RootState } from '../index';

type authState = {
  userinfo: Record<string, any>;
};

const UPDATE_USERINFO = 'UPDATE_USERINFO';

const state: authState = {
  userinfo: {}
};

const getters: GetterTree<authState, RootState> = {
  userInfo(state) {
    return state.userinfo;
  }
};

const mutations: MutationTree<authState> = {
  [UPDATE_USERINFO](state, userInfo: any) {
    state.userinfo = userInfo;
  }
};

const actions: ActionTree<authState, RootState> = {
  updateUserinfoAction({ commit }, userInfo) {
    commit(UPDATE_USERINFO, userInfo);
  },
  logoutAction({ commit }) {
    commit(UPDATE_USERINFO, null);
  }
};

const auth: Module<authState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default auth;
