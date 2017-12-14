<template>
	<div class="chatmore">
		<div class="header">
			<p>聊天信息</p>
		</div>
		<div class="userList">
			<ul>
				<li v-for="(item,idx) in userList" :key="item.id">
					<img :src="item.avatar_url" alt="" />
					<span>{{item.loginname}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name:'chatmore',
		data(){
			return {
				
			}
		},
		computed:{
			userList(){
				return JSON.parse(localStorage.userList)
			}
		},
		mounted(){
			console.log(this.userList)
			this.$store.commit('getisbackicon',true)
			this.$store.commit('getloading',false)
			
		}
	}
</script>

<style>
</style>