const chatModule = {
	state:{
		onlinepeo:[]
	},
	mutations:{
		getonlinepeo(state,a){
			state.onlinepeo.push(a)
			console.log(state.onlinepeo)
		},
		deleteUser(state,a){
			console.log(state.onlinepeo)
//			state.onlinepeo.forEach((item,idx)=>{
//				if(item.loginname == a.loginname){
//					state.onlinepeo.splice(idx,1)
//				}
//			})
//			console.log(state.onlinepeo)
		}
	},
	
}
export default chatModule