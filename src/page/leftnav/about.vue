<template>
	<div class="aboutpage">
		<user-info :accesstoken="accesstoken" :userInfo="userInfo"></user-info>
		<main>
			<div class="about-item">
				<span>关于项目</span>
				<p>
					vue2.x Cnode社区是基于vue、vue-router、vuex、axios、es6开发，使用webpack构建工具编译打包项目（如果此开源项目对大家学习vue的全家桶有帮助，请给我一个star,因为你的star让我觉得这个开源有了价值！）
				</p>
			</div>
			<div class="about-item">
				<span>源码地址</span>
				<a href="https://github.com/woshixiekunyu/animation-cnode">https://github.com/woshixiekunyu/animation-cnode</a>
			</div>
			<div class="about-item">
				<span>技术感谢</span>
				<p>
					初心想开发基于vue的cnode社区，也是借此学习和熟悉vue2.x，也可以随意设计社区界面。感谢<a href="https://cnodejs.org/">cnodejs</a>社区提供的api接口，在此也感谢之前已经基于vue开过cnode社区的开发人员，因为也有借鉴他们的代码实现，
				</p>
			</div>
			<div class="about-item">
				<span>当前版本</span>
				<p>
					V1.0.0
				</p>
			</div>
		</main>
	</div>
</template>

<script>
	import {ApiGet} from '@/api/index';
	import userInfo from '@/components/userInfo'
	export default {
		name:'about',
		data(){
			return {
				
			}
		},
		computed:{
			accesstoken(){
				return this.$store.state.user.accesstoken
			},
			userInfo(){
				console.log(this.$store.state.user.userInfo)
				return this.$store.state.user.userInfo?this.$store.state.user.userInfo:{}
			}
		},
		components:{
			userInfo,
		},
		mounted(){
			var username,params={};
			if(this.userInfo.loginname){
				username = this.userInfo;
				console.log(username)
				params.accesstoken = this.accesstoken
			}else{
				return
			}
			ApiGet.userInfo.list(''+username.loginname,params).then(res=>{
				console.log(res)
			})
		}
	}
</script>

<style scoped lang="scss">
	.aboutpage{
		main{
			.about-item{
				width: 100%;
				padding: 5px 15px;
				box-sizing: border-box;
				word-wrap: break-word;
				&>span{
					font-size: 0.7rem;
					line-height: 1.5rem;
				}
				&>p,&>a{
					margin-top: 5px;
					font-size: 13px;
					color: #333;
					text-indent: 20px;
				}
				&>a{
					padding-left: 20px;
					box-sizing: border-box;
					color: #80bd01;
					text-decoration: underline;
					line-height: 0;
				}
				a{
					color: #80bd01;
				}
			}
		}
	}
	
</style>