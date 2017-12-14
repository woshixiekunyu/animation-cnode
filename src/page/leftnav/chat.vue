<template>
	<div class="chatPage">
		<div class="allpeople">
			<i @click="chatmore" class="iconfont icon-qunzu-copy"></i>
		</div>
		<div class="mian_msg">
			<ul>
				<li v-for="(item,idx) in msgList">
					<p v-if="item.showtime">{{item.time}}</p>
					<div v-if="item.id == userInfo.id" class="rightCon">
						<div class="none"></div>
						<div class="messageCon">
							<div class="username">{{item.loginname}}</div>
							<p class="rsjx">{{item.msgCon}}</p>
						</div>
						<div class="userimg">
							<img @click="toInfo(item.loginname)" :src="item.userImg" alt="" />
						</div>
					</div>
					<div v-else class="leftCon">
						<div class="userimg">
							<img @click="toInfo(item.loginname)" :src="item.userImg" alt="" />
						</div>
						<div class="messageCon">
							<div class="username">{{item.loginname}}</div>
							<p class="lsjx">{{item.msgCon}}</p>
						</div>
						<div class="none"></div>
					</div>
				</li>
			</ul>
		</div>
		<div class="inputCon">
			<div class="notemoji">
				<div class="inputArea">
					<textarea v-model="msg" @keyup.enter="sengMsg" class="input_msg" name="input_msg"></textarea>
					<i @click="showemoji = !showemoji">😄</i>
				</div>
				<input type="button" class="send_msg" @click="sengMsg" value="发送" />
			</div>
			<div class="emoji" v-show="showemoji">
			<ul>
				<li v-for="(item,idx) in emoji" @click="chemoji(idx)">{{item}}</li>
			</ul>
		</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				emoji:['😂', '🙏', '😄', '😏', '😇', '😅', '😌', '😘', '😍', '🤓', '😜', '😎', '😊', '😳', '🙄', '😱', '😒', '😔', '😷', '👿', '🤗', '😩', '😤', '😣', '😰', '😴', '😬', '😭', '👻', '👍', '✌️', '👉', '👀', '🐶', '🐷', '😹', '⚡️', '🔥', '🌈', '🍏', '⚽️', '❤️', '🇨🇳'],
				showemoji:false,
				msg:'',
				msgList:localStorage.msgCon && JSON.parse(localStorage.msgCon) || [],
				userList:localStorage.userList && JSON.parse(localStorage.userList) || [],
//				msgList:[],
				mainHeight:document.querySelector('.mian_msg>ul')
			}
		},
		watch:{
			msgList(val){
				localStorage.msgCon = JSON.stringify(val);
				setTimeout(() => this.mainHeight.scrollTop = this.mainHeight.scrollHeight, 0);		
			},
			userList(val){
				localStorage.userList = JSON.stringify(val);
			},
		},
		beforeRouteLeave(to,from,next){
			if(to.name != 'chatmore'){
				var userList = JSON.parse(localStorage.userList);
				JSON.parse(localStorage.userList).forEach((item,idx)=>{
					if(item.id == this.userInfo.id){
						console.log(idx)
						userList.splice(idx,1)
					}
				})
				localStorage.userList = JSON.stringify(userList);
				console.log(localStorage.userList)
			}
			next()
		},
		methods:{
			toInfo(name){
//				console.log(11)
				this.$router.push({
					name:'personal',
					query:{
						loginname:name
					}
				})
			},
			sengMsg(){
				if(!this.msg){
					return
				}
				var obj = {};
				obj.msgCon = this.msg;
				obj.time = this.moment().format('YYYY-MM-DD HH:mm:ss')
				obj.userImg = this.userInfo.avatar_url
				obj.id = this.userInfo.id
				obj.loginname = this.userInfo.loginname
				this.msgList.map((item,idx)=>{
					if(obj.time.split(' ')[1].split(':')[1]-item.time.split(' ')[1].split(':')[1]<3){
						obj.showtime = false
					}else{
						obj.showtime = true
					}
				})
				socket.emit('sendGroupMsg',obj)
				this.msgList.push(obj)
				this.showemoji = false
				this.msg='';
				console.log(this.mainHeight.scrollHeight)
//				setTimeout(() => this.mainHeight.scrollTop = this.mainHeight.scrollHeight, 0);
				setTimeout(() => {
					window.scrollTo(0,11111*this.mainHeight.children.length)
				}, 0);
			},
			chemoji(idx){
				console.log(idx)
				this.msg+=this.emoji[idx];
//				document.getElementsByClassName('input_msg')[0].focus()
			},
			chatmore(){
				this.$router.push({
					name:'chatmore'
				})
			}
		},
		computed:{
			userInfo(){
				return this.$store.state.user.userInfo?this.$store.state.user.userInfo:{}
			},
			onlinepeo(){
				return this.$store.state.chat.onlinepeo
			}
		},
		mounted(){
			if(!sessionStorage.getItem('accesstoken')){
				this.$router.push({
					name:'all'
				})
			}
			this.mainHeight = document.querySelector('.mian_msg>ul');
//			socket.on('online', data => {
//			  console(data);
//			});
			socket.on('receiveGroupMsg',data=>{
//				alert(data)
				this.msgList.push(data)
				setTimeout(() => {
					window.scrollTo(0,111111*this.mainHeight.children.length);
				}, 0);
			})
//			监听上线
			var isbools = true;
			this.userList.forEach(item=>{
				if(this.userInfo.id == item.id){
					isbools = false
				}
			})
			isbools?this.userList.push(this.userInfo):''
			socket.emit('online', this.userInfo);
			socket.on('online', data => {
				var obj = {
					id : data.id,
					loginname : data.loginname,
					pic : data.avatar_url
				}
				var isbool = true;
				this.onlinepeo.forEach(item=>{
					if(obj.id == item.id){
						isbool = false
					}
				})
				isbool?this.$store.commit('getonlinepeo',obj):''
//				var objs = {}
				let oOnline = document.createElement('li');
		      	oOnline.className = 'online';
		      	oOnline.innerText = '您的好友'+this.userInfo.loginname+'已进入聊天室';
				this.mainHeight.appendChild(oOnline)
				
				setTimeout(() => {
					window.scrollTo(0,111111*this.mainHeight.children.length);
				}, 0);
			});
//			setTimeout(() => this.mainHeight.scrollTop = this.mainHeight.scrollHeight, 0);		
			setTimeout(() => {
				window.scrollTo(0,111111*this.mainHeight.children.length);
			}, 0);
			this.$store.commit('getisbackicon',true);
		}
	}
</script>

<style>
</style>