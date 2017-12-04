<template>
	<div class="loading" v-show="show">
		<img src="../../static/loading.gif" alt="" />
	</div>
</template>

<script>
	export default {
		name:'loading',
		data(){
			return {
				show:false
			}
		},
		props:{
			loading:{
				type:Boolean,
				default:true
			}
		},
		watch:{
			loading(bool){
				console.log(bool)
				this.show = bool;
			}
		},
	}
</script>

<style scoped lang="scss">
	.loading{
		img{
			position: fixed;
			left: 50%;
			top: 50%;
			width: 4rem;
			height: 4rem;
			margin-left: -2rem;
			margin-top: -2rem;
			z-index: 90000;
		}
	}
</style>