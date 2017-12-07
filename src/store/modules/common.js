const comonModule = {
	state:{
		tab:'all',
		myanimate:'left',
		showpage:false,
		isbackicon:false,
		loading:false,
		navid:'home',
		tabIdx:0
	},
	mutations:{
		getTab(state,a){
			console.log(a,3456879)
			state.tab = a;
		},
		getmyanimate(state,a){
			state.myanimate = a
		},
		getshowpage(state,a){
			state.showpage = a
		},
		getisbackicon(state,a){
			state.isbackicon = a
		},
		getloading(state,a){
			console.log(a)
			state.loading = a
		},
		getnavid(state,a){
			state.navid = a
		},
		gettabIdx(state,a){
			state.tabIdx = a
		}
	}
}
export default comonModule
