<template>
	<div class="topic">
		<nav>
			<span class="title" :style="{fontSize:tabIdx == idx?'0.8rem':'0.7rem',color:tabIdx == idx?'#fff':''}" v-for="(item,idx) in tabList" @touchstart="tab(item.id,idx)">{{item.title}}</span>
		</nav>
		<transition :name="transitionName">
			<router-view class="myanimate"></router-view>
		</transition>
	</div>
</template>

<script>
	export default {
		name:'topic',
		data(){
			return {
				transitionName:'slide-left',
				tabList:[
					{
						title:'全部',
						id:'all'
					},
					{
						title:'问答',
						id:'ask'
					},
					{
						title:'分享',
						id:'share'
					},
					{
						title:'招聘',
						id:'job'
					},
					{
						title:'精华',
						id:'good'
					},
					{
						title:'测试',
						id:'dev'
					}
				]
			}
		},
		computed:{
			showpage(){
				return this.$store.state.common.showpage
			},
			mytab(){
				if(this.tabIdx == 0){
					
				}
				return this.$store.state.common.tab
			},
			tabIdx(){
				return this.$store.state.common.tabIdx
			}
		},
		beforeRouteUpdate(to,from,next){
			console.log(to,from)
			if(to.meta.idx<from.meta.idx){
				this.transitionName = 'slide-right'
			}else if(to.meta.idx>from.meta.idx){
				this.transitionName = 'slide-left'
			}
			next()
		},
		methods:{
			tab(id,idx){
				if(this.mytab == id){
					return
				}
				this.$store.commit('gettabIdx',idx)
				this.$store.commit('getTab',id)
				this.$router.push({
					path:id,
					query:{
						tab:id
					}
				})
			}
		},
		mounted(){
			this.tabList.forEach((item,idx)=>{
				if(item.id == this.mytab){
					this.$store.commit('gettabIdx',idx)
				}
			})
		}
	}
</script>
<style scoped>
	.myanimate {
	  position: absolute;
	  width:100%;
	  transition: all .8s ease;
	  }
	  .slide-left-enter, .slide-right-leave-active {
	    /*opacity: 0;*/
	    /*-webkit-transform: translate(50px, 0);*/
	    transform: translate(100%, 0);
	  }
	  .slide-left-leave-active, .slide-right-enter {
	    /*opacity: 0;*/
	    /*-webkit-transform: translate(-50px, 0);*/
	    transform: translate(-100%, 0);
	  }
</style>
