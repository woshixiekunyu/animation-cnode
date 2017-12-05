<template>
	<div>
		<ul>
			<li v-for="(item,idx) in topicList" @click="todt(item.id)">
				<div class="info">
					<div class="userImg">
						<img :src="item.author.avatar_url" alt="" />
					</div>
					<div class="info-con">
						<div class="username">
							<div class="name">{{item.author.loginname}}</div>
							<div class="time">{{item.last_reply_at}}</div>
						</div>
						<div class="artitle clearfix">
							<i class="top" v-if="item.top">置顶</i>
							<p>{{item.title}}</p>
						</div>
					</div>
				</div>
				<div class="view">
					<div class="chat">
						<img src="../../static/chat.png" alt="" />
						<span>{{item.reply_count}}</span>
					</div>
					<div class="read">
						<img src="../../static/read.png"/>
						<span>{{item.visit_count}}</span>
					</div>
					<div class="share">
						<img src="../../static/Share.png" alt="" />
						<span>分享</span>
					</div>
				</div>
			</li>
		</ul>
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
		methods:{
			getList(tab,page){
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
			this.getList(this.tab,this.page)
			window.onscroll = function(e){
//				var clientHeight = document.getElementsByClassName('myanimate').client;
				//132为列表每一项li的高度
				var clientHeight = vm.topicList.length*132;
				
				console.log(clientHeight)
				console.log(window.scrollY,clientHeight)
				console.log(clientHeight-window.scrollY)
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