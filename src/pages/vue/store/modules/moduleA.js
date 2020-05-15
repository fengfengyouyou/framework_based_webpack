export default {
  namespaced: true,
  state: {
    text: 'moduleA',
    count:0
  },
  // 对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象
  getters: {
    // 注意:rootState必须是第三个参数,根节点状态会作为第三个参数暴露出来
    detail(state, getters, rootState) {
      return state.text + '-' + rootState.name;
    }
  },
  mutations: {
    setText(state,param){
      state.text = param
    },
    setCount(state,param){
      state.count++
    },
  },
  // 对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState：
  actions: {
    aaa({ state, rootState,commit }) {
      alert(state.text + '-' + rootState.name);
    },
    // 在带命名空间的模块内注册全局 action。
    callAction: {
      root: true,
      handler(namespacedContext, payload) {
        let { state, commit } = namespacedContext;
        commit('setText');
        alert(state.text);
      }
    }
  }
}
