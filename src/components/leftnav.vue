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
				islogin:true,
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
						title: '聊天室',
						id: 'chat',
						classname:'iconfont icon-about'
					},
					{
						title: '登录',
						id: 'login',
						classname:'iconfont icon-login'
					},
				],
			}
		},
		computed:{
			tab(){
				return this.$store.state.common.tab
			},
			navid(){
				return this.$store.state.common.navid
			},
			accesstoken(){
				return this.$store.state.user.accesstoken
			},
			userInfo(){
				return this.$store.state.user.userInfo?this.$store.state.user.userInfo:{}
			}
		},
		watch:{
			accesstoken(val){
				//console.log(val,'xky')
				this.personList.map((item,idx)=>{
					if(idx == this.personList.length-1){
						//console.log(idx)
						item.title = val?'退出':'登录'
						item.id = val?'loginout':'login'
					}
					return item
				})
			}
		},
		methods:{
			hidenav(){
				this.$emit('hidenav',false)
			},
			getId(idx,id){
				this.$store.commit('getloading',false)
				this.hidenav();
				if(sessionStorage.getItem('accesstoken')){
					if(id!='loginout'){
						if(this.tab == 'all' && this.navid == 'home' && id=="home"){
							return
						}
						//console.log(this.$route.meta.idx)
						if(this.$route.meta.idx==undefined){
							//console.log(1,8)
							this.$store.commit('getTab','all')
							this.$store.commit('gettabIdx',0);
						}
						this.$store.commit('getnavid',id)
						//console.log(this.navid)
						this.$router.push({
							name:id,
							query:{
								tab:idx==0?'all':'',
								loginname:id=='personal'?this.userInfo.loginname:''
							}
						})
					}else{
						this.personList.map((item,idx)=>{
							if(idx == this.personList.length-1){
								item.title = '登录';
								item.id = 'login';
								sessionStorage.removeItem('accesstoken')
								this.$store.commit('getlogin','')
							}
							return item
						})
//						this.$store.commit('getnavid','home')
//						//console.log(this.$store.state.common.navid)
//						this.$store.commit('getTab','all')
//						this.$store.commit('gettabIdx',0);
//						if(typeof this.$route.meta.idx != 'number'){
						if(this.$route.name == 'personal'){
							//console.log(this.$route)
							this.$router.push({
								name:'all',
								query:{
									tab:'all'
								}
							})
						}
					}
				}else{
					//console
					if(id=='home'){
						if(this.navid == 'home'){
							return
						}else{
							this.$router.push({
								name:'all'
							})
						}
					}else if(id=='personal'){
						this.$router.push({
							name:'login'
						})
					}else if(id=='chat'){
						this.$router.push({
							name:'login'
						})
					}else{
						this.$router.push({
							name:id,
						})
					}
				}
			}
		},
		mounted(){
			this.personList.map((item,idx)=>{
				if(idx == this.personList.length-1 && sessionStorage.getItem('accesstoken')){
					item.title = '退出'
					item.id = 'loginout'
				}
				return item
			})
		}
	}
</script>

<style>
</style>