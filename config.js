const host = "http://192.168.199.150:2346"

const config = {
	host,
	login: `${host}/app/login`, //登录地址
	indexApi: `${host}/app/index`, //首页接口
	// 线路
	lineCondition: `${host}/route/query/conditions`, //线路筛选条件
	lineList: `${host}/route/page`, //线路列表
	lineDetail: `${host}/route/details`, //线路详情
	lineBatch: `${host}/route/batch/list` ,//线路批次
	lineComment: `${host}/route/comment/page`, //线路评论
	lineCommentTag: `${host}/route/comment/tags`, //线路评论标签
	userList: `${host}/user/rel/list`,//出行列表
	createUser: `${host}/user/rel/create`,//新增出行人
	updateUser: `${host}/user/rel/update`,//编辑出行人
	deleteUser: `${host}/user/rel/delete`, //删除出行人
	
	// 收货地址
	addressList: `${host}/user/address/list`,//地址列表
	addAddress: `${host}/user/address/create`, //新增收货地址
	updateAddress: `${host}/user/address/update`, //更新地址
	deleteAddress: `${host}/user/address/delete`, //删除地址
	
	//收藏
	collectList: `${host}/user/collect/page`, //收藏列表
	addCollect: `${host}/user/collect/add`,//收藏
	cancelCollect: `${host}/user/collect/cancel`, //取消收藏
}

module.exports = config