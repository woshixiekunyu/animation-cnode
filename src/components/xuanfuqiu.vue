<template>
	<div class="xuanfuqiu">
		<div :class="writearea?'writeImg shows':'writeImg'" @click="showwrite">
			<img @touchstart="move" @touchend="stop" src="../../static/write.png" alt=""/>
		</div>
		<div :class="writearea?'writearea show':'writearea'">
			<textarea placeholder="请输入评论内容"></textarea>
		</div>
	</div>
</template>

<script>
	export default {
		name:'xuanfuqiu',
		data(){
			return {
				shows:false,
				msgtip:'',
				writearea:0
			}
		},
//		props:['url','pageId','openId'],
		methods:{
			showwrite(){
				this.writearea = 1
			},
			move(e){
//				document.body.style.overflowY = 'hidden';
				var minx = e.target.offsetWidth/2;
				var miny = e.target.offsetHeight/2;
				e.target.ontouchmove = function(el){
					if(document.all){  //只有ie识别
				        el.cancelBubble=true;
				    }else{
				        el.stopPropagation();
				    }
				    if(el && el.preventDefault){ 
				        el.preventDefault(); 
				    } 
				    //IE中组织浏览器行为 
				    else{ 
				        window.event.returnValue=false;
				    } 
				    var x = el.targetTouches[0].clientX-e.target.offsetWidth/2;
				    var y = el.targetTouches[0].clientY-e.target.offsetHeight/2;
				    var yh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				    var xw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				    console.log(xw,x)
				    if(y<=40){
				    	y = 43
				    }else if(y>=yh-miny*2){
				    	y = yh-miny*2
				    }
				    if(x<0){
				    	x = 0
				    }else if(x>xw-minx*2){
				    	x = xw - minx*2
				    }
				    e.target.style.left = x+'px';
				    e.target.style.top = y+'px';
				}
			},
			stop(e){
//				document.body.style.overflowY = 'scroll'
			}
		}
	}
</script>

<style scoped lang="scss">
	.xuanfuqiu{
		.writeImg{
			position: fixed;
			bottom: 0;
			right: 0;
			z-index: 10000;
			img{
				width: 80px;
				height: 80px;
			}
		}
		.writearea{
			width: 100%;
			height: 0;
			position: fixed;
			bottom: 0;
			left: 0;
			textarea{
				resize: none;
				width: 100%;				
				height: 100%;
			}
		}
		.show{
			animation: showwrite .3s linear forwards;
		}
		.shows{
			animation: moveupimg .3s linear forwards;
		}
		.hide{
			animation: hidewrite .3s linear forwards;
		}
		.hides{
			animation: movedownimg .3s linear forwards;
		}
		@-moz-keyframes showwrite{
			from{
				height: 0;
			}
			to{
				height: 5rem;
			}
		}
		@-ms-keyframes showwrite{
			from{
				height: 0;
			}
			to{
				height: 5rem;
			}
		}
		@-webkit-keyframes showwrite{
			from{
				height: 0;
			}
			to{
				height: 5rem;
			}
		}
		@keyframes showwrite{
			from{
				height: 0;
			}
			to{
				height: 5rem;
			}
		}
		@keyframes moveupimg{
			from{
				bottom: 0;
			}
			to{
				bottom: 5rem;
			}
		}
		@keyframes hidewrite{
			from{
				height: 5rem;
			}
			to{
				height: 0;
			}
		}
		@keyframes movedownimg{
			from{
				bottom: 5rem;
			}
			to{
				bottom: 0;
			}
		}
	}
</style>