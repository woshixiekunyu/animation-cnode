<template>
	<div class="mysend">
		<form action="">
			<p>
				<label for="topictitle"><i class="grren iconfont icon-title"></i><span>标题</span></label>
				<input type="text" v-model="topictitle" id="topictitle" placeholder="请输入标题"/>
			</p>
			<p>
				<label for="topictype"><i class="grren iconfont icon-fenlei"></i><span>分类</span></label>
				<select id="topictype" v-model="topictype">
					<option value="请选择">请选择</option>
					<option value="share">分享</option>
					<option value="ask">问答</option>
					<option value="job">招聘</option>
					<option value="dev">测试</option>
				</select>
			</p>
			<p>
				<label for="topiccon"><i class="grren iconfont icon-neirong"></i><span>内容</span></label>
				<textarea v-model="topiccon" name="topiccon" id="topiccon" placeholder="请输入内容..."></textarea>
			</p>
			<p>
				<input type="text" class="cmt" @click="cmt" value="提交"/>
			</p>
		</form>
		<alert v-model="shows" :content="msgtip" @on-hide="onHide"></alert>
	</div>
</template>

<script>
	import {ApiPost} from '@/api/index';
	export default {
		data(){
			return {
				topictitle:'',
				topictype:'请选择',
				topiccon:'',
				shows:false,
				msgtip:''
			}
		},
		methods:{
			onHide(bool){
				if(this.msgtip == '提交成功'){
					this.shows = bool;
					history.go(-1)
				}else if(this.msgtip == '未登录'){
					this.shows = bool;
					this.$router.push({
						name:'login'
					})
				}else{
					this.shows = bool;
				}
			},
			cmt(){
				if(!this.accesstoken || !sessionStorage.getItem('accesstoken')){
					this.msgtip = '未登录';
					this.shows = true
					return
				}
				var params = {
					accesstoken : this.accesstoken,
					content : this.topiccon,
					title : this.topictitle,
					tab : this.topictype
				}
				//getTopic   post请求时，getTopic为新建评论
				ApiPost.getTopic.list('',params).then(res=>{
					if(res.data.success){
						this.msgtip = '提交成功';
						this.shows = true
					}
				}).catch(err=>{
					this.msgtip = err.response.data.error_msg
					this.shows = true
				})
				console.log(this.topictitle,this.topictype,this.topiccon)
			}
		},
		mounted(){
			this.$store.commit('getloading',false)
		},
		computed:{
			accesstoken(){
				return this.$store.state.user.accesstoken
			}
		},
		components:{
			Alert:r=>require(['@/components/dialog'],r)
		}
	}
</script>

<style scoped lang="scss">
	.mysend{
		margin-top: 2.15rem;
		form{
			p{
				border-bottom: 1px solid #ccc;
				padding: 10px;
				box-sizing: border-box;
				font-size: 18px;
				&:nth-child(3),
				&:last-child{
					border: 0;
				}
				label{
					i{
						margin-right: 5px;
					}
					span{
						font-size: 14px;
					}
				}
				input,
				select,
				textarea{
					display: block;
					width: 100%;
					height: 1.6rem;
					box-sizing: border-box;
					border: 0;
					background-color: #eee;
					border-radius: 5px;
					padding-left: 10px;
					outline: none;
					resize: none;
					font-size: 18px;
					margin-top: 5px;
				}
				select{
					padding-left: 0;
				}
				textarea{
					min-height:10rem;
					padding: 10px;
					box-sizing: border-box;
					&::-webkit-input-placeholder { /* WebKit browsers */ 
						font-size:12px;
						color: #888;
					} 
				}
				.cmt{
					width: 100%;
					border: 0;
					background-color: #80bd01;
					height: 2rem;
					color: #fff;
					text-align: center;
					padding-left: 0;
				}
			}
			.grren{
				font-size:18px;
				color: #80bd01;
			}
		}
	}
</style>