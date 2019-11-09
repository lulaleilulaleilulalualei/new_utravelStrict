import *as types from '../types';

 const state = {
	selfOrderObj: null,
	tvlObj: null, //出行人对象信息
	addressObj: null, //地址信息
 }

 const getters = {
	selfOrderObj: state => state.selfOrderObj,
	tvlObj: state => state.tvlObj,
	addressObj: state => state.addressObj,
 }

 const mutations  = {
 	[types.BUY_SELF_PRO](state, obj) {
 		state.selfOrderObj = obj
 	},
	[types.EDIT_TRAVELER](state, obj) {
		state.tvlObj = obj
	},
	[types.EDIT_ADDRESS](state, obj) {
		state.addressObj = obj
	}
 }

 const actions = {
 	toGetSelfOrder({commit}, obj) {
 		commit(types.BUY_SELF_PRO, obj)
 	},
	toGetTvlObj({commit}, obj) {
		commit(types.EDIT_TRAVELER, obj)
	},
	toGetAddressObj({commit}, obj) {
		commit(types.EDIT_ADDRESS, obj)
	}
 }

 export default {
	state,
    actions,
    getters,
    mutations
}