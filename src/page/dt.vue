<template>
	<div class="topicdt">
		<header>
			<div class="userImg">
				<img :src="autherImg" alt="" />
			</div>
			<div class="userinfo">
				<span class="title">{{authername}}</span>
				<span class="tab">#{{artitab}}#</span>
				<span class="sendart">楼主 发表于{{detail.last_reply_at}}</span>
			</div>
			<div class="collect">
				<span @touchstart="collect(iscollect,detail.id)">{{iscollect?'取消收藏':'收藏'}}</span>
			</div>
		</header>
		<nav>
			<i v-if="detail.top">置顶</i>
			<span>{{detail.title}}</span>
		</nav>
		<main>
			<div class="articon" v-html="detail.content"></div>
		</main>
		<div class="discu">
			<p>评论</p>
			<ul>
				<li v-for="(item,idx) in discList" :key="item.id">
					<div class="disclist">
						<div class="discimg">
							<img :src="item.author.avatar_url" alt="" />
						</div>
						<div class="discinfo">
							<p class="discname">{{item.author.loginname}}</p>
							<p class="time">{{idx}}楼·发表于{{item.create_at}}</p>
							<p class="disccon" v-html="item.content"></p>
						</div>
					</div>
					<div class="hfreply">
						<div class="zan">
							<img src="../../static/zan.png" alt="" />
						</div>
						<div class="reply" @touchstart="setpl(idx)">
							<img src="../../static/reply.png" alt="" />
						</div>
					</div>
					{{item.showinput}}
					<div v-show="!item.showinput == 0" :class="item.showinput == 0?'input':item.showinput == 1?'input show':'input hide'">
						<textarea name="textarea"></textarea>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {ApiGet} from '@/api/index';
	import {ApiPost} from '@/api/index';
	import {Mate} from '@/util/formate';
	import {mapState} from 'vuex';
	export default {
		name:'dt',
		data(){
			return {
				pageid:'',
				detail:[],
				autherImg:'',
				authername:'',
				artitab:'',
				discList:[],
				collects:'',
				iscollect:false,
//				showinput:0
			}
		},
		beforeRouteLeave(to,from,next){
//			this.$routerisBack = true
			var tj = to.name == 'ask' || to.name == 'all' || to.name == 'share' || to.name == 'job' || to.name == 'good'
			if(tj){
//				this.$store.commit('getshowpage',false)
				this.$store.commit('getisbackicon',false)
				this.$router.goBack();
			}
			next()
		},
		computed:{
			...mapState({
				accesstoken:state=>state.user.accesstoken
			})
		},
		methods:{
			collect(bool,id){
				if(!this.accesstoken){
					this.$router.push({
						name:'login'
					})
					return
				}
				var url;
				if(bool){
					url = 'de_collect/'
				}else{
					url = 'collect/'
				}
				var params = {
					accesstoken : this.accesstoken,
					topic_id : id
				}
				ApiPost.collect.list(url,params).then(res=>{
					console.log(res)
					this.iscollect = !this.iscollect
				})
			},
			setpl(idx){
				this.discList[idx].showinput = 1
				console.log(idx,this.discList[idx].showinput)
			}
		},
		mounted(){
			this.$store.commit('getisbackicon',true)
			this.pageid = this.$route.params.id;
			var params = {
				mdrender : true,
				accesstoken : this.accesstoken
			}
			ApiGet.getTopicdt.list(''+this.pageid,params).then(res=>{
				console.log(res)
					res.data.data.last_reply_at = Mate.getNumDate(new Date(res.data.data.last_reply_at));
				this.detail = res.data.data;
				this.autherImg = this.detail.author.avatar_url;
				this.authername = this.detail.author.loginname;
				this.iscollect = this.detail.is_collect
				switch(res.data.data.tab){
					case 'share':
						this.artitab = '分享';
						break;
					case 'ask':
						this.artitab = '问答';
						break;
					case 'good':
						this.artitab = '精华';
						break;
					case 'job':
						this.artitab = '招聘';
						break;
					default:
						this.artitab = '未知';
						break;
				}
				console.log(this.detail)
				this.discList = res.data.data.replies;
				this.discList.map(item=>{
					item.create_at = Mate.getNumDate(new Date(item.create_at));
					item.showinput = 0;
					return item
				})
				this.$store.commit('getloading',false);
//				this.showinput = 1
			})
		}
	}
</script>

<style>
</style>