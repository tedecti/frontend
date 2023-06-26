import { createStore } from 'vuex'

import { api } from './../api/index';

function saveSortingToLocalStorage(sortBy, sortDir) {
  const sorting = { sortBy, sortDir };
  localStorage.setItem('sorting', JSON.stringify(sorting));
}

export default createStore({
  state: {
    games: [],
    authData: null,
    user: [],
    isFiltered: 1,
    sortBy: "",
    sortDir: "",
    username: null,
    game: [],
    scores: [],
  },
  getters: {
    allGames(state) {
      return state.games;
    },
    game(state) {
      return state.game;
    },
    authData(state) {
      return state.authData;
    },
    user(state) {
      return state.user;
    },
    allScores(state) {
      return state.scores;
    },
    username(state) {
      return state.username;
    }
  },
  mutations: {
    setGames(state, payload) {
      state.games = payload;
    },
    setGame(state, payload) {
      state.game = payload;
    },
    setAuthData(state, payload) {
      state.authData = payload;
    },
    setUsername(state, payload) {
      state.username = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setScores(state, payload) {
      state.scores = payload;
    },
    setSortingFromLocalStorage(state) {
      const sorting = JSON.parse(localStorage.getItem('sorting'));
      if (sorting) {
        state.sortBy = sorting.sortBy;
        state.sortDir = sorting.sortDir;
      }
    },
  },
  actions: {
    saveAuthData({ state, commit }, payload) {
      commit('setAuthData', payload)
      localStorage.setItem('authData', JSON.stringify(payload))
      localStorage.setItem('username', payload.username);
    },
    username({ commit }) {
      const data = localStorage.getItem('username')
      if (data) {
        commit('setUsername', data);
      }
    },
    authData({ state, commit, dispatch }) {
      const data = localStorage.getItem('authData')
      if (data) {
        commit('setAuthData', JSON.parse(data));
        dispatch('username');
      }
    },
    removeAuthData({ state, commit }) {
      localStorage.removeItem('authData');
      localStorage.removeItem('username');
      commit('setAuthData', null);
      commit('setUsername', null);
    },
    async fetchGames({ commit }) {
      let response = await api.get('games')
      const data = JSON.parse(localStorage.getItem('sorting'))
      if (data.sortBy) {
        response = await api.get('games?sortBy=' + data.sortBy)
      }
      if (data.sortDir) {
        response = await api.get('games?sortDir=' + data.sortDir)
      }
      commit('setGames', response.data)
    },
    async fetchGame({ commit }, payload) {
      const response = await api.get('games/' + payload)
      commit('setGame', response.data)
    },
    async sortTitle({ commit, dispatch }) {
      const data = JSON.parse(localStorage.getItem('sorting'))
      saveSortingToLocalStorage('title', null);
      await dispatch('fetchGames');
    },
    async sortPopular({ commit, dispatch }) {
      const data = JSON.parse(localStorage.getItem('sorting'))
      saveSortingToLocalStorage('popular', null);
      await dispatch('fetchGames');
    },

    async sortUpload({ commit, dispatch }) {
      const data = JSON.parse(localStorage.getItem('sorting'))
      saveSortingToLocalStorage('uploaddate', null);
      await dispatch('fetchGames');
    },

    async sortDir({ commit, dispatch, state }) {
      const data = JSON.parse(localStorage.getItem('sorting'))
      if (state.isFiltered == 0) {
        saveSortingToLocalStorage(data.sortBy, 'desc');
      } else {
        saveSortingToLocalStorage(data.sortBy, 'asc');
      }
      await dispatch('fetchGames');
    },
    async signUp({ dispatch }, payload) {
      const response = await api.post('auth/signup', payload)
      dispatch('saveAuthData', response.data);
      dispatch('username')
      localStorage.setItem('username', payload.username);
      const data = localStorage.getItem('authData');
      if (!data) {
        console.error('Ошибка сохранения данных пользователя в локальном хранилище');
      }
    },
    async signIn({ dispatch }, payload) {
      const response = await api.post('auth/signin', payload)
      dispatch('saveAuthData', response.data);
      dispatch('username')
    },
    async signOut({ dispatch, state }) {
      const response = await api.post('auth/signout', null, {
        headers: {
          'authorization': 'Bearer ' + state.authData.token,
        }
      });
      dispatch('removeAuthData');
    },
    async createScore({ commit, state }, payload) {
      const gameSlug = payload[0];
      const playerScore = payload[1];

      const scoreData = {
        score: playerScore
      };

      const response = await api.post(`games/${gameSlug}/scores`, scoreData, {
        headers: {
          'authorization': 'Bearer ' + state.authData.token,
        }
      });

      commit('setScores', response.data)
    },
    async scores({ commit }, payload) {
      const response = await api.get('games/' + payload + '/scores')
      commit('setScores', response.data.scores)
    },
    async fetchUser({ commit, state }, payload) {
      const response = await api.get('users/' + payload, payload, {
        headers: {
          'authorization': 'Bearer ' + state.authData.token,
        }
      });
      commit('setUser', response.data.data)
    },
    async updateGame({ commit, state }, payload){
      const response = await api.put('games/' + payload[0], payload[1], {
        headers: {
          'authorization': 'Bearer ' + state.authData.token,
        }
      });
      commit('setGame', response.data)
    },
    async deleteGame({commit, state}, payload){
      const response = await api.delete('games/' + payload, {
        headers: {
          'authorization': 'Bearer ' + state.authData.token,
        }
      });
      commit('setGame', response.data)
    },
  },
  modules: {
  }
})