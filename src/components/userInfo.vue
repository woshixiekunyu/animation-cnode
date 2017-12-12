<template>
	<div class="userInfo">
		<div class="img">
			<img :src="accesstoken?userInfo.avatar_url:'../../../static/pernode.jpg'" alt="" />
			<p>{{accesstoken?userInfo.loginname:'游客'}}</p>
		</div>
		<div class="infoCon">
			<ul>
				<li>积分:{{userInfo.score}}</li>
				<li>注册时间:{{userInfo.create_at}}</li>
				<li>github名字:<div>{{userInfo.githubUsername}}</div></li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name:'userInfo',
		data(){
			return {
			}
		},
		props:{
			accesstoken:{
				type:String,
				default:''
			},
			userInfo:{
				type:Object,
				default:function(){}
			}
		},
	}
</script>

<style scoped lang="scss">
	.userInfo{
		display: flex;
		.img{
			/*width: 100%;*/
			flex: 6.5;
			height: 7.5rem;
			box-sizing: border-box;
			background-color: #444;
			text-align:center;
			padding-top: 1.25rem;
			margin-top: 2.15rem;
			img{
				width: 25%;
				border-radius: 50%
			}
			p{
				color: #fff;
				font-size: 0.7rem;
			}
		}
		.infoCon{
			padding-top: 4.5rem;
			box-sizing: border-box;
			font-size: 14px;
			color: #fff;
			flex: 3.5;
			background-color: #444;
		}
	}
</style>