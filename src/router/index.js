import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
//import Hello from '@/components/Hello'
Router.prototype.goBack = function(){
	this.isBack = true
	this.xky = true
//	window.history.go(-1)
}

Vue.use(Router)
var router = new Router({
		routes:[
			{path:'/',redirect:'/home/topic/all'},
			{
				path:'/home',
				name:'home',
				meta:{
						title:'cnode社区'
				}, 
				component:r=>require(['@/page/home'],r),
				children:[
					{
						path:'topic',
						name:'topic',
						meta:{
								title:''
						},
						component:r=>require(['@/page/topic'],r),
						children:[
							{
								path:'all',
								name:'all',
								meta:{
										title:'全部',
										idx:0
								},
								component:r=>require(['@/page/list/all'],r),
							},
							{
								path:'ask',
								name:'ask',
								meta:{
										title:'',
										idx:1
								},
								component:r=>require(['@/page/list/ask'],r),
							},
							{
								path:'share',
								name:'share',
								meta:{
										title:'',
										idx:2
								},
								component:r=>require(['@/page/list/share'],r),
							},
							{
								path:'job',
								name:'job',
								meta:{
										title:'',
										idx:3
								},
								component:r=>require(['@/page/list/job'],r),
							},
							{
								path:'good',
								name:'good',
								meta:{
										title:'',
										idx:4
								},
								component:r=>require(['@/page/list/good'],r),
							},
						]
					},
					{
						path:'dt/:id',
						name:'dt',
						meta:{
							title:'详情页'
						},
						component:r=>require(['@/page/dt'],r),
					},
					{
						path:'login',
						name:'login',
						meta:{
							title:'登录'
						},
						component:r=>require(['@/page/login'],r),
					}
				]
			}
		]
})
router.beforeEach((to,from,next)=>{
	window.document.title = to.meta.title;
	store.state.user.accesstoken
	?next()
	:store.dispatch('login').then(res=>{
		next()
	});
})
export default router
