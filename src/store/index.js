import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import common from './modules/common';
//import List from './modules/List';
import chat from './modules/chat';
import mutation from './mutations';
import user from './modules/user';
const store = new Vuex.Store({
	modules: {
	    common,
	    user,
	    chat,
	},
	mutation,
	strict: process.env.NODE_ENV !== 'production'
});

if (module.hot) {
// 使 actions 和 mutations 成为可热重载模块
module.hot.accept([
    './modules/common', 
    './modules/chat', 
    './modules/user', 
    ], () => {
    // 获取更新后的模块 
    // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
    // 加载新模块 
    store.hotUpdate({
      modules: {
        common: require('./modules/common').default,
        chat:require('./modules/chat').default,
        user:require('./modules/user').default,
      }
    })
})
}
export default store
