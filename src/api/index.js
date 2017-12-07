import axios from './factory';
class ApiConfig {
	constructor() {
		this.api = {}
		this.api.getTopic={
			list:{url:'/topics'}
		};
		this.api.getTopicdt={
			list:{url:'/topic/'}
		};
		this.api.collect={
			list:{url:'/topic_collect/'}
		};
		this.api.login={
			list:{url:'/accesstoken'}
		};
		this.api.pl={
			list:{url:'/topic/'}
		};
		this.api.zan={
			list:{url:'/reply/'}
		};
		this.api.userInfo={
			list:{url:'/user/'}
		};
	}
	//请求get
	getApi(){
		var vm = this;
		var a = vm.api
		let rs = {};
		for(let items in a){
			rs[items] = {}
			for(let v in a[items]){
				rs[items][v] = (url,params)=>{
					params = {params:params}
					var rsUrl = a[items][v]['url']+url
//					console.log(a[items][v]['url'],params)
					return axios.get(rsUrl,params)
//					return axios.get(url,params)
				}
			}
			
		}
		return rs
	};
	//请求post
	postApi(){
		var vm = this;
//		var ugModule = that.toisapi()
		var a = vm.api
		let rs = {};
		for(let items in a){
			rs[items] = {};
			for(let v in a[items]){
				rs[items][v] = (url='',params)=>{
					var rsUrl = a[items][v]['url']+url
					return axios.post(rsUrl,params)
//					return axios.post(a[items][v]['url'],params)
				}
			}
			
		}
		return rs
	};
}
export const ApiGet = new ApiConfig().getApi();
export const ApiPost = new ApiConfig().postApi();
