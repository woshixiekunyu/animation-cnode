<template>
	<div>
		<list :topicList='topicList'></list>
	</div>
</template>

<script>
	import {ApiGet} from '@/api/index';
	import {Mate} from '@/util/formate';
	export default {
		name:'mypl',
		data(){
			return {
				topicList:[]
			}
		},
		components:{
			list:r=>require(['@/components/List'],r)
		},
		computed:{
			accesstoken(){
				return this.$store.state.user.accesstoken
			},
			userInfo(){
				return this.$store.state.user.userInfo?this.$store.state.user.userInfo:{}
			}
		},
		methods:{
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
			ApiGet.collect.list(''+username,params).then(res=>{
				console.log(res.data.data)
				res.data.data.map(item=>{
					item.last_reply_at = Mate.getNumDate(new Date(item.last_reply_at))
//					item.create_at = item.create_at.toString()
					return item
				})
				this.topicList = res.data.data
				this.$store.commit('getloading',false);
			})
		}
	}
</script>