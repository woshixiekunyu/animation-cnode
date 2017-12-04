//import {ApiPost} from '@/api/index';
const userModule = {
	state:{
		accesstoken:''
	},
	mutations:{
		getlogin(state,a){
			console.log(a)
			state.accesstoken = a
		}
	},
	actions:{
		login({commit}){
//			ApiPost.login.list('',)
			new Promise((res,rej)=>{
				commit('getlogin',sessionStorage.accesstoken)
				res(sessionStorage.accesstoken)
			})
		}
	}
}
export default userModule