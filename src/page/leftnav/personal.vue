<template>
	<div class="personalInfo">
		<user-info :accesstoken="accesstoken" :userInfo="myuserInfo"></user-info>
		<div class="persontab">
			<ul>
				<li class="clearfix" v-for="(item,idx) in persontab" @click="chooseTab(item.id,idx)">
					<i :class="item.classname"></i>
					<span>{{item.title}}</span>
					<a href="javascript:;" class="iconfont icon-mjiantou"></a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import userInfo from '@/components/userInfo'
	import {ApiGet} from '@/api/index';
	import {Mate} from '@/util/formate';
	export default {
		name:'personalInfo',
		data(){
			return {
				persontab:[
					{
						title:'我的消息',
						id:'mymessage',
						classname:'iconfont icon-xiaoxi'
					},
					{
						title:'my主题',
						id:'mytopic',
						classname:'iconfont icon-wenzhang'
					},
					{
						title:'我的评论',
						id:'mypl',
						classname:'iconfont icon-pinglun'
					},
					{
						title:'我的收藏',
						id:'mycollect',
						classname:'iconfont icon-shoucang'
					}
				],
				myuserInfo:{}
			}
		},
		methods:{
			chooseTab(id,idx){
				this.$store.commit('getisbackicon',true);
				this.$router.push({
					name:id,
					query:{
						loginname : this.$route.query.loginname
					}
				})
			}
		},
		components:{
			userInfo,
		},
		computed:{
			accesstoken(){
				return this.$store.state.user.accesstoken
			},
			userInfo(){
				return this.$store.state.user.userInfo?this.$store.state.user.userInfo:{}
			}
		},
		mounted(){
			if(!sessionStorage.getItem('accesstoken')){
				this.$router.push({
					name:'all'
				})
			}
			this.$store.commit('getisbackicon',true);
			this.$store.commit('getloading',false)
			var params = {
				accesstoken : this.accesstoken
			}
			var username = this.$route.query.loginname?this.$route.query.loginname:this.userInfo.loginname
			ApiGet.userInfo.list(''+username,params).then(res=>{
//				this.messageList = res.data.data;
					res.data.data.create_at = Mate.getNumDate(new Date(res.data.data.create_at));
				this.myuserInfo = res.data.data;
				console.log(this.myuserInfo)
			})
		}
	}
</script>

<style scoped lang="scss">
	.personalInfo{
		width: 100%;
		height: 100%;
		background-color: #eee;
		.persontab{
			ul{
				li{
					height: 2.25rem;
					text-align: left;
					line-height: 2.25rem;
					background-color: #fff;
					color: inherit;
					font-size: 14px;
					padding: 0 10px;
					box-sizing: border-box;
					&:active{
						background-color: #eee;
					}
					i{
						color: #80BD01;
						font-size: 18px;
						vertical-align: middle;
						margin-right: 5px;
						float: left;
					}
					span{
						float: left;
					}
					&>a{
						font-size: 12px;
						text-align: right;
						color: #c8c8cd;
						float: right;
						font-weight: bold;
						/*vertical-align: middle;*/
					}
				}
			}
		}
		.personCon{
			/*ul{
				li{
					width: 100%;
					height: 2.25rem;
				}
			}*/
		}
	}
</style>