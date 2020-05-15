export default {
  namespaced: true,
  state: {
    text: 'moduleB'
  },
  getters: {},
  mutations: {
    setText(state,param){
      state.text = param
    }
  },
  actions: {}
}
