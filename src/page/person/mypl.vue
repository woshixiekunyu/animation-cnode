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
				title:'我创建的评论',
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
		methods:{
			mytab(idx){
				this.tabIdx = idx
			},
			toDt(id){
				this.$router.push({
					name:'dt',
					params:{
						id:id
					}
				})
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
			var username = this.$route.query.loginname?this.$route.query.loginname:this.userInfo.loginname
			ApiGet.userInfo.list(''+username,params).then(res=>{
				res.data.data.recent_replies.map(item=>{
					item.last_reply_at = Mate.getNumDate(new Date(item.last_reply_at));
				})
				this.topicList = res.data.data.recent_replies;
				console.log(this.topicList)
				if(this.topicList.length == 0){
					this.haslist = true
				}
				this.$store.commit('getloading',false);
			})
			
		}
	}
</script>