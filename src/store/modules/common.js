const comonModule = {
	state:{
		tab:'all',
		myanimate:'left',
		showpage:false,
		isbackicon:false,
		loading:false
	},
	mutations:{
		getTab(state,a){
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
			state.loading = a
		}
	}
}
export default comonModule
