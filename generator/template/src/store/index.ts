import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';

Vue.use(Vuex);

export type RootState = {};

const state: RootState = {};

export default new Vuex.Store({
  state,
  mutations: {},
  actions: {},
  modules: {
    auth
  }
});
