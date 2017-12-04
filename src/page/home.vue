<template>
	<div>
		<header>
			<i :class="isbackicon?'back':'more'" @touchstart="cz(isbackicon)"></i>
			<img src="../../static/cnodelogo.svg" alt="" />
		</header>
		<loading :loading="loading"></loading>
		<transition :name="transitionName">
		    <router-view class="child-views"></router-view>
		</transition>
	</div>
</template>

<script>
	export default {
		name:'home',
		data(){
			return {
//				loading:false,
				transitionName: 'slide-lefts'
			}
		},
		components:{
			loading:r=>require(['@/components/loading'],r)
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
					this.$router.goBack();
					history.go(-1)
				}else{
					
				}
			}
		},
		beforeRouteUpdate (to, from, next) {
			if(to.name != 'login'){
				this.$store.commit('getloading',true)
			}else{
				this.$store.commit('getloading',false)
			}
	      let isBack = this.$router.isBack
	      if (isBack) {
	        this.transitionName = 'slide-rights'
	      } else {
	        this.transitionName = 'slide-lefts'
	      }
	      this.$router.isBack = false
	      next()
	    }
	}
</script>

<style scoped lang="scss">
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
</style>