<template>
	<div>
		<!--<div class="dialog" v-show="myshow" :style="{opacity: num}">-->
		<div class="dialog" v-show="myshow" :class="swhi == 0?'':swhi == 1?'show':'hide'">
			<h5>提示</h5>
			<p>{{content}}</p>
			<div class="ok" @click="onHide">
				<span>确定</span>
			</div>
		</div>
		<!--<div class="mask" v-show="false""></div>-->
		<div class="mask" v-show="myshow" :class="swhi == 0?'':swhi == 1?'show':'hide'"></div>
	</div>
</template>

<script>
	export default {
		name:'dialog',
		data(){
			return {
				myshow:false,
				num:0,
				swhi:0
			}
		},
		props:{
			value:{
				type:Boolean,
				default:false
			},
			content:{
				type:String,
				default:''
			}
		},
		computed:{
			chtips(){
				return this.$store.state.nxwc.chtips
			},
		},
		watch:{
			value(val){
				var dialog = document.getElementsByClassName('dialog')[0];
				var mask = document.getElementsByClassName('mask')[0];
				var timer = null;
				if(this.myshow){
//					dialog.style.animation = 'hide 1s;'
//					timer = setInterval(()=>{
//						this.num -=0.4;
//						if(this.num <= 0){
//							this.num = 0
//							this.myshow = val
//							clearInterval(timer)
//						}
//					},100)
					this.swhi = 2
					setTimeout(()=>{
						this.myshow = val
					},300)
				}else{
					this.myshow = val
					this.swhi = 1
				}
				
			}
		},
		methods:{
			onHide(){
				this.$emit('on-hide',false)
			}
		}
	}
</script>

<style scoped lang="scss">
	.dialog{
		width: 240px;
		box-sizing: border-box;
		border: 1px solid #ccc;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-top: -80px;
		margin-left: -120px;
		background-color: #fff;
		padding-top: 15px;
		z-index: 100000;
		border-radius: 5px;
		opacity:0;
		text-align: center;
		h5{
			text-align: center;
			font-size: 16px;
			line-height: 20px;
		}
		p{
			box-sizing: border-box;
			line-height: 30px;
			text-align: center;
			font-size: 14px;
			font-family: '仿宋体';
		}
		&>span{
			line-height: 20px;
			font-size: 14px;
		}
		.ok{
			width: 100%;
			line-height: 40px;
			border-top: 1px solid #ccc;
			text-align: center;
			color: #a8cc28;
			&:active{
				background-color: #eee;
			}
		}
	}
	.mask{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,.5);
			z-index: 70000;
			opacity: 0;
		}
	.show{
			animation:show 0.3s linear forwards;
		}
		.hide{
			animation:hide 0.3s linear forwards;
		}
		@keyframes show{
			from {opacity:0;}
			to {opacity:1;}
		}
		@keyframes hide{
			from {opacity:1;}
			to {opacity:0;}
		}
</style>