<template>
	<div class="message">
		<ul>
			<li v-for="(item,idx) in messageTab" @click="mytab(idx)" :class="{active:tabIdx==idx}">
				{{item.title}}
			</li>
		</ul>
		<img src="../../../static/nosj.png" alt="" />
	</div>
</template>

<script>
	import {ApiGet} from '@/api/index';
	export default {
		name:'message',
		data(){
			return {
				tabIdx:0,
				messageList:{},
				messageTab:[
					{
						title:'已读消息',
						id:'isread'
					},
					{
						title:'未读消息',
						id:'noread'
					}
				]
			}
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
			mytab(idx){
				this.tabIdx = idx
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
				this.messageList = res.data.data;
				console.log(this.messageList)
			})
			this.$store.commit('getloading',false);
			
		}
	}
</script>

<style scoped lang="scss">
	.message{
		padding-top: 2.15rem;
		text-align: center;
		&>img{
			width: 50%;
			margin-top: 1rem;
		}
		ul{
			display: flex;
			li{
				flex: 1;
				height: 1.9rem;
				text-align: center;
				line-height: 1.9rem;
				font-size: 14px;
				border-bottom: 1px solid #eee;
				box-sizing: border-box;
				border-right: 1px solid #eee;
				&:last-child{
					border-right: 0;
				}
				&.active{
					color: #80BD01;
				}
			}
		}
	}
</style>