<template>
	<div>
		<div class="xky">
			<span @click="nopl">取消</span>
			<span @click="sendpl">发表</span>
		</div>
		<textarea v-model="myplcon" name="textarea"></textarea>
	</div>
</template>

<script>
	export default {
		name:'write',
		data(){
			return {
				myplcon:''
			}
		},
		methods:{
			nopl(){
				this.$emit('nopl')
			},
			sendpl(){
				this.$emit('sendpl')
			}
		}
	}
</script>

<style scoped lang="scss">
	.xky{
        width: 100%;
        line-height: 1.5rem;
        height: 1.5rem;
        background-color: rgba(255,255,255,.7);
        span{
            display: inline-block;
            width: 3rem;
            height: 1.2rem;
            line-height: 1.2rem;
            font-size: 16px;
            text-align: center;
            float: left;
            background-color: #80bd01;
            color: #fff;
            border-radius: 5px;
            margin-left: 10px;
            &:last-child{
                float: right;
                margin-left: 0;
                margin-right: 10px;
            }
        }
    }
    textarea{
        width: 100%;
        height: 3.5rem;
        resize:none;
        border-radius: 3px;
        box-sizing: border-box;
    }
</style>