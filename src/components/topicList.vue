<template>
	<div>
		<list :topicList='topicList'></list>
	</div>
</template>

<script>
	import {ApiGet} from '@/api/index';
	import {Mate} from '@/util/formate';
	export default {
		name:'topicLists',
		data(){
			return {
				showpage:true,
				topicList:[],
				isload:true,
				page:1
			}
		},
		computed:{
			tab(){
				return this.$store.state.common.tab
			}
		},
		watch:{
			tab(tab){
				this.topicList = []
				this.getList(tab);
			}
		},	
		components:{
			list:r=>require(['@/components/List'],r)
		},
		methods:{
			getList(tab,page){
//				if(topiclist){
//					var position = sessionStorage.getItem('position');
//					var topiclist = sessionStorage.getItem('topiclist');
//					var pages = sessionStorage.getItem('page');
//					this.topicList = JSON.parse(topiclist);
//					window.scrollTo(0,position);
//					console.log(222)
//					sessionStorage.removeItem('position');
//					sessionStorage.removeItem('topiclist');
//					this.page = pages;
//					page = pages;
//					return
//				}
				var params={
					page : page,
					tab : tab,
					limit : 10,
				}
				ApiGet.getTopic.list('',params).then(res=>{
					res.data.data.map(item=>{
						item.last_reply_at = Mate.getNumDate(new Date(item.last_reply_at))
	//					item.create_at = item.create_at.toString()
						return item
					})
					this.topicList = this.topicList.concat(res.data.data)
					this.$store.commit('getloading',false)
					this.isload = true;
					this.page++
//					this.$store.commit('getshowpage',true)
				})
			},
			todt(id){
//				sessionStorage.setItem('position',document.body.scrollTop || document.documentElement.scrollTop)
//				sessionStorage.setItem('topiclist',JSON.stringify(this.topicList))
//				sessionStorage.setItem('page',this.page)
				this.$store.commit('getisbackicon',true)
				this.$router.push({
					name:'dt',
					params:{
						id:id
					}
				})
			}
		},
		mounted(){
			var  vm = this
			this.$store.commit('getisbackicon',false);
			this.getList(this.tab,this.page)
			window.onscroll = function(e){
//				var clientHeight = document.getElementsByClassName('myanimate').client;
				//132为列表每一项li的高度
				var clientHeight = vm.topicList.length*132;
				
//				console.log(document.getElementsByClassName('myanimate')[0].clientHeight)
				if(clientHeight-window.scrollY <= 500){
					if(vm.isload){
						vm.isload = false
						vm.getList(vm.tab,vm.page)
					}
				}
			}
		}
	}
</script>