import { createStore } from 'vuex'

import { api } from './../api/index';

export default createStore({
  state: {
    games: [],
  },
  getters: {
    allGames(state){
      return state.games;
    }
  },
  mutations: {
    setGames(state, payload){
      state.games = payload;
    }
  },
  actions: {
    async fetchGames({commit}){
      const response = await api.get('games')
      commit('setGames', response.data)
    }
  },
  modules: {
  }
})
