import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screenWidth: '',
    screenHeight: '',
    movieId: '',
    groupId: '',
    // 首页话题
    topicId:'',
    //小组话题
    groupTopicId: '',
    movieDetailShow: false,
    groupDetailShow: false,
    topicShow: false,
    groupTopicShow: false,
  },
  mutations: {
    getScreenWidth(state, data) {
      state.screenWidth = data.screenWidth;
      state.screenHeight = data.screenHeight;
    },
    changeDetailId(state, data) {
      state[data[0]] = data[1];
      console.log(data)

    },
    changePageShow(state, data) {
      state[data[0]] = data[1];
      console.log(data)
    }
  },

  actions: {
  },
  modules: {
  }
})
