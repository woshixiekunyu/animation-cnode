<template>
	<div>
		<topic-list></topic-list>
	</div>
</template>

<script>
	export default {
		name:'dev',
		data(){
			return {
				topicList:[],
			}
		},
		components:{
			topicList:r=>require(['@/components/topicList'],r)
		}
	}
</script>

<style scoped lang="scss">

</style>