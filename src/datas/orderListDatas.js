//"2018-02-01 21:11:48"
let dataLists = []
for(var n=0; n<20;n++){
	dataLists.push(
		{
			"time":"2018-02-01 21:11:48",
			"logistics":"太原物流自提",
			"brandInfo":"雷凌 17款 1.2T 改款 185T CVT自动精英版",
			"price":12.68+Math.ceil(Math.random()*10),
			"color":"珍珠白/黑",
			"cusName":"客户姓名",
			"state":"交易关闭"
		}
	)
}

export const dataList = dataLists