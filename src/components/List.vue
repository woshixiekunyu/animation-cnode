<template>
	<div class="topicList">
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
	export default {
		name:'List',
		data(){
			return {
				
			}
		},
		props:{
			topicList:{
				type:Array,
				default:[]
			}
		},
		methods:{
			todt(id){
				this.$router.push({
					name:'dt',
					params:{
						id:id
					}
				})
			}
		},
	}
</script>

<style>
</style>