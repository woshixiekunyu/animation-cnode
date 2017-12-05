<template>
	<div>
		<!--<div :class="toright?'homepage toright':'homepage'">-->
		<div :class="toright==0?'homepage':toright==1?'homepage torights':'homepage tolefts'">
			<header :class="toright==0?'homepage':toright==1?'homepage torights':'homepage tolefts'">
				<i :class="isbackicon?'back':'more'" @click="cz(isbackicon)"></i>
				<img src="../../static/cnodelogo.svg" alt="" />
			</header>
			<loading :loading="loading"></loading>
			<transition :name="transitionName">
			    <router-view class="child-views"></router-view>
			</transition>
		</div>
		<div :class="toright==0?'leftnav':toright==1?'leftnav toright':'leftnav toleft'">
			<leftnav @hidenav = 'hidenav'></leftnav>
		</div>
	</div>
</template>

<script>
	export default {
		name:'home',
		data(){
			return {
//				loading:false,
				transitionName: 'slide-lefts',
				toright:0,
			}
		},
		components:{
			loading:r=>require(['@/components/loading'],r),
			leftnav:r=>require(['@/components/leftnav'],r)
		},
		computed:{
			isbackicon(){
				return this.$store.state.common.isbackicon
			},
			loading(){
				return this.$store.state.common.loading
			}
		},
		methods:{
			cz(bool){
				if(bool){
					this.$store.commit('getisbackicon',false);
					this.$router.goBack();
					history.go(-1)
				}else{
					var name;
					switch(this.$route.name){
						case 'home':
							name = 'home';
							break;
						case 'mysend':
							name = 'mysend';
							break;
						case 'personal':
							name = 'personal';
							break;
						case 'about':
							name = 'about';
							break;
						case 'login':
							name = 'login';
							break;
						default:
							name = 'home';
					}
					this.$store.commit('getnavid',name)
					this.toright = 1
				}
			},
			hidenav(){
				this.toright = 2
			}
		},
		beforeRouteUpdate (to, from, next) {
			console.log(to)
			if(to.name == 'login'){
				this.$store.commit('getloading',false)
			}else if(to.name == 'mysend'){
				this.$store.commit('getloading',false)
			}else{
				this.$store.commit('getloading',true)
			}
	      let isBack = this.$router.isBack
	      if (isBack) {
	        this.transitionName = 'slide-rights';
	      } else {
	        this.transitionName = 'slide-lefts';
	      }
	      this.$router.isBack = false
	      next()
	    }
	}
</script>

<style scoped lang="scss">
.homepage{
	width: 100%;
	height: 100%;
	position: absolute;
	/*left: 0;*/
	top: 0;
	header{
	    background-color: #444;
	    width: 100%;
	    height: 2.15rem;
	    text-align: center;
	    line-height: 2.15rem;
	    position: fixed;
	    top: 0;
	    z-index: 1000;
	    z-index: 20000;
	    &>i{
	    	width: 1rem;
	        height: 1rem;
	        position: absolute;
	        background-size: 100% 100%;
	        background-repeat: no-repeat;
	        left: 0.565rem;
	        top: 0.565rem;
	    }
	    .more{
	        background-image: url(../../static/more.png);
	    }
	    .back{
	    	background-image: url(../../static/back.png);
	    }
	    img{
	        width: 6rem;
	        height: 1.4rem;
	        vertical-align: middle;
	//      display: inline-block;
	    }
	}
}

.child-views {
  position: absolute;
  width:100%;
  transition: all .5s ease;
  }
  .slide-lefts-enter, .slide-rights-leave-active {
    transform: translate(100%, 0);
  }
  .slide-lefts-leave-active, .slide-rights-enter {
    transform: translate(-100%, 0);
  }
  
  .toright{
  	animation: toright .28s linear forwards;
  }
  .torights{
  	animation: torights .3s linear forwards;
  }
   .toleft{
  	animation: toleft .25s linear forwards;
  }
  .tolefts{
  	animation: tolefts .3s linear forwards;
  }
  @keyframes torights{
  	from{
  		left: 0;
  		/*opacity: 0;*/
  	}
  	to{
  		left: 60%;
  		/*opacity: 1;*/
  	}
  }
  @keyframes tolefts{
  	from{
  		left: 60%;
  	}
  	to{
  		left: 0%;
  	}
  }
  @keyframes toright{
  	from{
  		left: -100%;
  		opacity: 0;
  	}
  	to{
  		left: 0%;
  		opacity: 1;
  	}
  }
  @keyframes toleft{
  	from{
  		left: 0%;
  		opacity: 1;
  	}
  	to{
  		left: -100%;
  		opacity: 0;
  	}
  }
</style>