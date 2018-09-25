//"2018-02-01 21:11:48"
let dataLists = []
for(var n=0; n<20;n++){
	dataLists.push(
		{
			"brandInfo":"雷凌 17款 1.2T 改款 185T CVT自动精英版",
			"price":12.68+Math.ceil(Math.random()*10),
			"tips1":"支付定金",
			"time":"2018-02-01",
			"tips2":"请在30分钟内支付订金，否则系统会关闭订单",
			"linkText":"马上去办"
		}
	)
}

export const messageListDatas = dataLists