(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/selectTraveler/selectTraveler"],{"3dfc":function(t,e,n){"use strict";n.r(e);var i=n("494d"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},"46a1":function(t,e,n){"use strict";var i=n("c106"),a=n.n(i);a.a},"494d":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("2f62");function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(e){o(t,e,n[e])})}return t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var r=function(){return n.e("components/loadErr").then(n.bind(null,"0281"))},s=function(){return n.e("components/noListData").then(n.bind(null,"61c5"))},c={data:function(){return{userList:[],isLoadErr:!1,userId:""}},components:{loadErr:r,noListData:s},computed:{addTop:function(){return this.CustomBar+"px"}},onShow:function(){this.userList=[],this.getUserList()},methods:a({},(0,i.mapActions)(["toGetTvlObj"]),{toSelectTraveler:function(t){this.userId==this.userList[t].id?this.userId="":this.userId=this.userList[t].id},toAddTraveler:function(e){t.navigateTo({url:"/pages/optTraveler/optTraveler?type=".concat(e)})},toEditTvl:function(e,n){this.toGetTvlObj(this.userList[n]),t.navigateTo({url:"/pages/optTraveler/optTraveler?type=".concat(e)})},toDeleteTvl:function(e){var n=this,i=this;t.showModal({title:"",content:"确认删除出行人 ".concat(i.userList[e].ch_name),cancelColor:"#909399",confirmColor:"#FFDA4C",success:function(t){t.confirm?i.deleteTvlMay(e):n.$api.warnNotice("已取消操作")},fail:function(){n.$api.warnNotice("操作失败")}})},deleteTvlMay:function(e){var n=this,i=this;this.$api.ajax({url:this.$config.deleteUser,method:"DELETE",data:{id:this.userList[e].id,token:"123456"}}).then(function(a){200==a.statusCode&&0==a.data.code?t.showToast({title:"操作成功",icon:"success",success:function(){i.userList.splice(e,1)}}):n.$api.warnNotice(a.data.message)}).catch(function(t){n.$api.warnNotice("操作失败")})},toRelaodData:function(){this.isLoadErr=!1,this.userList=[],this.getUserList()},getUserList:function(){var e=this;t.showLoading({title:"数据加载中",mask:!0}),this.$api.ajax({url:this.$config.userList}).then(function(n){if(200==n.statusCode&&0==n.data.code){var i=n.data.data;e.userList=i,setTimeout(function(){t.hideLoading()},500)}else 1==e.index?e.isLoadErr=!0:e.$api.warnNotice(n.data.message),t.hideLoading()}).catch(function(n){1==e.index?e.isLoadErr=!0:e.$api.warnNotice("评论列表加载失败"),t.hideLoading()})}})};e.default=c}).call(this,n("543d")["default"])},ac90:function(t,e,n){"use strict";(function(t){n("610e"),n("921b");i(n("66fd"));var e=i(n("fe64"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},c106:function(t,e,n){},d0eb:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},fe64:function(t,e,n){"use strict";n.r(e);var i=n("d0eb"),a=n("3dfc");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("46a1");var r=n("2877"),s=Object(r["a"])(a["default"],i["a"],i["b"],!1,null,"fd55f98a",null);e["default"]=s.exports}},[["ac90","common/runtime","common/vendor"]]]);