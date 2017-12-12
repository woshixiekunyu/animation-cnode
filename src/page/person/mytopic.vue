<template>
	<div>
		<mylist :title="title" :topicList="topicList"></mylist>
	</div>
</template>

<script>
	import {ApiGet} from '@/api/index';
	import {Mate} from '@/util/formate';
	export default {
		name:'mypl',
		data(){
			return {
				tabIdx:0,
				topicList:[],
				haslist:false,
				title:'我创建的主题',
			}
		},
		components:{
			mylist:r=>require(['@/components/mylist'],r)
		},
		computed:{
			accesstoken(){
				return this.$store.state.user.accesstoken
			},
			userInfo(){
				return this.$store.state.user.userInfo?this.$store.state.user.userInfo:{}
			},
			personalInfo(){
				return this.$store.state.user.personalInfo
			}
		},
		mounted(){
			this.$store.commit('getisbackicon',true);
			if(!sessionStorage.getItem('accesstoken')){
				this.$router.push({
					name:'all'
				})
			}
			var params = {
				accesstoken : this.accesstoken
			}
			ApiGet.userInfo.list(''+this.userInfo.loginname,params).then(res=>{
				res.data.data.recent_topics.map(item=>{
					item.last_reply_at = Mate.getNumDate(new Date(item.last_reply_at));
				})
				this.topicList = res.data.data.recent_topics;
				console.log(this.topicList)
				if(this.topicList.length == 0){
					this.haslist = true
				}
				this.$store.commit('getloading',false);
			})
		}
	}
</script>