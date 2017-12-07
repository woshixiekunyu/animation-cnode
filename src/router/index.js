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
				redirect:'/home/topic/all',
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
										title:'问答',
										idx:1
								},
								component:r=>require(['@/page/list/ask'],r),
							},
							{
								path:'share',
								name:'share',
								meta:{
										title:'分享',
										idx:2
								},
								component:r=>require(['@/page/list/share'],r),
							},
							{
								path:'job',
								name:'job',
								meta:{
										title:'招聘',
										idx:3
								},
								component:r=>require(['@/page/list/job'],r),
							},
							{
								path:'good',
								name:'good',
								meta:{
										title:'精华',
										idx:4
								},
								component:r=>require(['@/page/list/good'],r),
							},
							{
								path:'dev',
								name:'dev',
								meta:{
										title:'测试',
										idx:5
								},
								component:r=>require(['@/page/list/dev'],r),
							}
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
						component:r=>require(['@/page/leftnav/login'],r),
					},
					{
						path:'mysend',
						name:'mysend',
						meta:{
							title:'发布'
						},
						component:r=>require(['@/page/leftnav/mysend'],r),
					},
					{
						path:'personal',
						name:'personal',
						meta:{
							title:'个人中心'
						},
						component:r=>require(['@/page/leftnav/personal'],r),
					},
					{
						path:'about',
						name:'about',
						meta:{
							title:'关于'
						},
						component:r=>require(['@/page/leftnav/about'],r),
					},
					{
						path:'mymessage',
						name:'mymessage',
						meta:{
							title:'我的消息'
						},
						component:r=>require(['@/page/person/message'],r),
					},
					{
						path:'mytopic',
						name:'mytopic',
						meta:{
							title:'我的主题'
						},
						component:r=>require(['@/page/person/mytopic'],r),
					},
					{
						path:'mypl',
						name:'mypl',
						meta:{
							title:'我的评论'
						},
						component:r=>require(['@/page/person/mypl'],r),
					},
					{
						path:'mycollect',
						name:'mycollect',
						meta:{
							title:'我的收藏'
						},
						component:r=>require(['@/page/person/mycollect'],r),
					},
					
				]
			}
		]
})
router.beforeEach((to,from,next)=>{
	window.document.title = to.meta.title;
	if(!sessionStorage.getItem('accesstoken') || !sessionStorage.getItem('userInfo')){
		sessionStorage.removeItem('accesstoken')
		sessionStorage.removeItem('userInfo');
		console.log(store.state.common)
//		store.state.common.personList.map((item,idx)=>{
//			if(idx == store.state.common.personList.length-1){
//				item.title = '登录';
//				item.id = 'login';
				store.commit('getlogin','')
//			}
//			return item
//		})
	}
	store.state.user.accesstoken
	?next()
	:store.dispatch('login').then(res=>{
		next()
	});
})
export default router
