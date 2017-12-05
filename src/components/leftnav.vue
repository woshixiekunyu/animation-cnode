<template>
	<div>
		<div class="top">
			<img src="../../static/pernode.jpg" alt="" />
			<p>Vue2.x Cnode社区</p>
			<div class="personList">
				<ul>
					<li v-for="(item,idx) in personList" @click="getId(idx,item.id)">
						
						<span href="javascript:;" :class="{active:navid==item.id}">
							<i :class="item.classname"></i>
							<span>{{item.title}}</span>							
						</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="mymask" @click="hidenav"></div>
		<!--<div class="mymask"></div>-->
	</div>
</template>

<script>
	export default {
		name:'laftnav',
		data(){
			return {
				personList:[
					{
						title: '首页',
						id: 'home',
						classname:'iconfont icon-shouye'
					},
					{
						title: '发布',
						id: 'mysend',
						classname:'iconfont icon-fabu'
					},
					{
						title: '个人',
						id: 'personal',
						classname:'iconfont icon-geren'
					},
					{
						title: '关于',
						id: 'about',
						classname:'iconfont icon-about'
					},
					{
						title: '登录',
						id: 'login',
						classname:'iconfont icon-login'
					},
				]
			}
		},
		computed:{
			tab(){
				return this.$store.state.common.tab
			},
			navid(){
				return this.$store.state.common.navid
			},
		},
		
		methods:{
			hidenav(){
				this.$emit('hidenav',false)
			},
			getId(idx,id){
				this.$store.commit('getloading',false)
				this.hidenav();
				if(sessionStorage.getItem('accesstoken') && id!='login' || id=="home"){
					console.log(id)
					if(this.tab == 'all' && this.navid == 'home'){
						return
					}
					this.$store.commit('getnavid',id)
					this.$store.commit('getTab','all')
					this.$store.commit('gettabIdx',0);
					this.$router.push({
						name:id,
						query:{
							tab:idx==0?'all':''
						}
					})
				}else{
					this.$router.push({
						name:id,
						query:{
							tab:idx==0?'all':''
						}
					})
//					this.$router.push({
//						name:'login'
//					})
				}
			}
		}
	}
</script>

<style>
</style>