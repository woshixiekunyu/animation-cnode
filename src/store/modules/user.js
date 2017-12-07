import {ApiPost} from '@/api/index';
const userModule = {
	state:{
		accesstoken:'',
		userInfo:{}
	},
	mutations:{
		getlogin(state,a){
			state.accesstoken = a
		},
		getuserInfo(state,a){
			state.userInfo = a
		}
	},
	actions:{
		login({commit}){
//			ApiPost.login.list('',)
			new Promise((res,rej)=>{
				commit('getlogin',sessionStorage.accesstoken)
				commit('getuserInfo',sessionStorage.userInfo?JSON.parse(sessionStorage.userInfo):sessionStorage.userInfo)
				res(sessionStorage.accesstoken)
			})
		}
	}
}
export default userModule