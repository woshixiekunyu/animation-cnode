<template>
	<div class="userInfo">
		<img :src="accesstoken?userInfo.avatar_url:'../../../static/pernode.jpg'" alt="" />
		<p>{{accesstoken?userInfo.loginname:'游客'}}</p>
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
		}
	}
</script>

<style scoped lang="scss">
	.userInfo{
			width: 100%;
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
</style>