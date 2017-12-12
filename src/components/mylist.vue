<template>
	<div class="message">
		<header>
			<span>{{title}}</span>
		</header>
		<div class="main_list">
			<ul>
				<li v-for="(item,idx) in topicList" @click="toDt(item.id)">
					<div class="img">
						<img :src="item.author.avatar_url" alt="" />
					</div>
					<div class="list">
						<p>{{item.author.loginname}}</p>
						<p>{{item.title}}</p>
					</div>
					<div class="time">
						<span>{{item.last_reply_at}}</span>
					</div>
				</li>
			</ul>
			<img v-if="haslist" src="../../static/nosj.png" alt="" />
		</div>
	</div>
</template>

<script>
	import {ApiGet} from '@/api/index';
	import {Mate} from '@/util/formate';
	export default {
		data(){
			return {
				tabIdx:0,
				haslist:false,
			}
		},
		props:{
			title:{
				type:String,
				default:''
			},
			topicList:{
				type:Array,
				default:[]
			}
		},
		methods:{
			mytab(idx){
				this.tabIdx = idx
			},
			toDt(id){
				this.$router.push({
					name:'dt',
					params:{
						id:id
					}
				})
			}
		}
	}
</script>