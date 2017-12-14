<template>
	<div class="login">
		<img src="../../../static/cnodelogo.svg" alt="" />
		<form action="#">
			<input class="token" type="text" v-model="token" placeholder="请输入token"/>
			<input type="button" class="cmt" @touchstart="cmt" value="登录"/>
		</form>
		<alert v-model="shows" :content="tips" @on-hide="onHide"></alert>
	</div>
</template>

<script>
	import {ApiPost} from '@/api/index';
	export default {
		data(){
			return {
				token:'',
				shows:false,
				tips:''
			}
		},
		beforeRouteLeave(to,from,next){
			this.$store.commit('getisbackicon',false);
			this.$router.goBack();
			next()
		},
		methods:{
			onHide(bool){
				this.shows = bool
			},
			cmt(){
				var params = {
					accesstoken : this.token
				}
				ApiPost.login.list('',params).then(res=>{
					console.log(res)
					if(res.data.id){
						sessionStorage.setItem('accesstoken', this.token)
						sessionStorage.setItem('userInfo', JSON.stringify(res.data))
						this.$store.commit('getlogin',this.token)
						this.$store.commit('getuserInfo',res.data)
						
						history.go(-1)
					}
				}).catch(err=>{
					this.tips = err.response.data.error_msg
					this.shows = true
				})
			}
		},
		mounted(){
			if(this.$store.state.common.navid == 'login'){
				this.$store.commit('getisbackicon',false)
			}else{
				this.$store.commit('getisbackicon',true)
			}
			
//			this.$store.commit('getloading',false);
		},
		components:{
			alert:r=>require(['@/components/dialog'],r)
		}
	}
</script>

<style>
</style>