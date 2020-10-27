import Mock from 'mockjs'
// 【****mock拦截时请求url是完全匹配, 如果是get请求时url携带参数需要用正则匹配，否则404***】


// 获取 mock.Random 对象
const Random = Mock.Random
// 获取 mock.Random 对象
//Random.guid()
//Random.string(10)
//Random.string('number', 8, 10)
//Random.cword(4, 16), // 随机生成任意名称
//Random.cname()

Mock.setup({
 timeout: 500, // 设置延迟响应，模拟向后端请求数据
});

var obj = {'aa':'11', 'bb':'22', 'cc':'33', 'dd':'44'};

//Mock.mock('/news/index', 'post', produceNewsData);   //可以指定post或get类型

//get请求时url携带参数需要使用正则匹配，否则404
Mock.mock(new RegExp('/testParam/testA' + '.*'), 'get', {
	"test": 666
})

// Mock响应模板
Mock.mock('/test/test', {
    "user|1-3": [{   // 随机生成1到3个数组元素
        'name': '@cname',  // 中文名称
        'id|+1': 88,    // 属性值自动加 1，初始值为88
        'age|18-28': 0,   // 18至28以内随机整数, 0只是用来确定类型
        'birthday': '@date("yyyy-MM-dd")',  // 日期
        'city': '@city(true)',   // 中国城市
        'color': '@color',  // 16进制颜色
        'isMale|1': true,  // 布尔值
        'isFat|1-2': true,  // true的概率是1/3
        'fromObj|2': obj,  // 从obj对象中随机获取2个属性
        'fromObj2|1-3': obj,  // 从obj对象中随机获取1至3个属性
        'brother|1': ['jack', 'jim'], // 随机选取 1 个元素
        'sister|+1': ['jack', 'jim', 'lily'], // array中顺序选取元素作为结果, 循环长度大于当前数组时， 当前数组又从第一个元素开始
        'friends|2': ['jack', 'jim'] // 重复2次属性值生成一个新数组
    },{
        'gf': '@cname'
    }]
});


//车源数据列表
Mock.mock('/resource/data', {
	"dataList|5-12":[
		{
			'logo|1':['dazhong', 'nissan', 'hyundai', 'buick', 'geely', 'ford', 'trumpchi', 'venucia', 'honda'],
			'isTeJia|1':true,
			'isBuins|1':true,
			'isSaleOut|1':true,
			'brandName|1':['缤智', '凯美瑞', '英朗', 'GS4', '飞度', '经典轩逸'],
			'modelName|1':['17款 1.5L CVT两驱舒适型', '18款 2.5L 2.5G豪华版', '18款 1.5L CVT两驱科技精英型', '17款 1.3T 200T手动两驱舒适版', '18款 1.5L 手动精英版', '16款 1.0L PHEV 精英版', '16款 1.6L 手动舒适版'],
			'inColor|1':['米', '黑', '象牙白', '黑棕双拼', '海洋蓝'],
			'exColor|1':['米', '黑', '象牙白', '黑棕双拼', '海洋蓝'],
			'guidePrice|1-99.2':1,
			"offPrice|-5-5.2": 1
		}
	]
})

//车源搜索列表
Mock.mock('/resource/search', {
	"dataList|5-12":[
		{
			'brandName|1':['缤智', '凯美瑞', '英朗', 'GS4', '飞度', '经典轩逸'],
			'modelName|1':['17款 1.5L CVT两驱舒适型', '18款 2.5L 2.5G豪华版', '18款 1.5L CVT两驱科技精英型', '17款 1.3T 200T手动两驱舒适版', '18款 1.5L 手动精英版', '16款 1.0L PHEV 精英版', '16款 1.6L 手动舒适版'],
			'guidePrice|1-99.2':1
		}
	]
})

//订单聊天记录列表
Mock.mock('/order/chatHistory', {
	"dataList|6":[
	
	]
})	

//车源原生品牌列表
Mock.mock('/resource/brandList', {
	"dataList":{
		"commonData|5":[
			{
				'brandId|+1':1,
				'logo|+1':['dazhong', 'nissan', 'hyundai', 'buick', 'geely', 'ford', 'trumpchi', 'venucia', 'honda'],
				'name|+1': ['大众', '奔驰', '吉利', '丰田', '长安'],
				'groupName|1': ['C', 'F','B', 'G', 'H', 'J', 'K', 'D'],
				'desc|1':["18款1.5L手动锋驰型", "18款1.8L手动锋驰型", "17款1.5L手动尊享型", "17款1.5L自动锋驰型"]
			}
		],
		"sortData|12":[
			{
				'brandId|+1':1,
				'groupName|1': ['C', 'F', 'G', 'H', 'J', 'K', 'D', 'M', 'B'],
				'logo|1':['dazhong', 'nissan', 'hyundai', 'buick', 'geely', 'ford', 'trumpchi', 'venucia', 'honda'],
				'name|+1': ['大众', '奔驰', '吉利', '丰田', '长安'],
				'desc|1':["18款1.5L手动锋驰型", "18款1.8L手动锋驰型", "17款1.5L手动尊享型", "17款1.5L自动锋驰型"]
			}
		]
	}
})	

/*车辆品牌列表*/
Mock.mock('/resource/suBrandList', {
	'dataList|3-5':[
		{
			'title|+1': ['广汽本田', '东风本田', '一汽丰田', '广汽丰田', '吉利汽车', '上海通用五菱'],
			'items|3-6':[
				{
					'id|+1': 10,
					'name|+1': ['英朗', '阅朗', '卡罗拉', '皇冠', '雷凌', '汉兰达', 'CHR', '威驰', '锐志', '金刚', '远景X1', '远景X3', '博越', '帝豪']
				}
			]
		}
	]
})
/*车型列表*/
Mock.mock('/resource/modelList', {
	'dataList|5-12':[
		{
			'brand|+1':['雅阁','金刚', '远景', '博瑞', '博越'],
			'year|1': ['2016', '2017', '2018'],
			'desc|+1': ['手动精英型', '手动尊享型', '自动精英型', '自动尊贵型'],
			'price|+1' :['5.39', '5.79', '6.59', '8.18', '8.58', '9.38', '11.98']
		}
	]
})

/*车型颜色列表*/
Mock.mock('/resource/colorList', {
	'dataList|3-8':[
		{
			'incolor|+1': ['优雅白','黑', '海洋蓝', '天空蓝', '宝石黑', '摩卡棕', '陨铁灰', '星耀红'],
			'excolor': ['红','橙', '黄', '绿', '蓝', '紫']
		}
	]
})	

/*订单搜索*/
Mock.mock('/quotation/data', {
	'dataObj':{
		'chartLineData':{
			'columns': ['日期', '访问用户', '下单用户'],
			'rows|9':[
				{
					'日期|+1':['1','2','3','4','5','6','7','8','9'],
					'访问用户|12328-92381':1,
					'下单用户|4398-19810':1
				}
			]
		},
		'chartPieData':{
			'columns': ['日期', '访问用户'],
			'rows|6':[
				{ 
					'日期|+1': ['1/1', '1/2', '1/3', '1/4', '1/5', '1/6'], 
					'访问用户|1723-4593': 1 
				}
			]
		}
			
	}
})


/*行情搜索*/
Mock.mock('/quotation/search', {
	'dataList|5-20':[
		{
			'brand|+1':['雅阁','金刚', '远景', '博瑞', '博越'],
			'year|1': ['2016', '2017', '2018'],
			"desc|1": ['1.2T 改款 185T CVT自动精英版', '1.5T 手动精英型', '1.2T 手动尊享型', '1.5T 自动精英型', '2.0T 自动尊贵型'],
			"price|5-20.2": 1,
		}
	]
})



/*订单搜索*/
Mock.mock('/order/data', {
	'dataList|5-12':[
		{
			"time":"@datetime",
			"logistics|1":["太原物流自提", "广州物流自提", "福建物流自提", "山东物流自提"],
			'brand|+1':['雅阁','金刚', '远景', '博瑞', '博越'],
			'year|1': ['2016', '2017', '2018'],
			"desc|1": ['1.2T 改款 185T CVT自动精英版', '1.5T 手动精英型', '1.2T 手动尊享型', '1.5T 自动精英型', '2.0T 自动尊贵型'],
			"price|5-20.2":1,
			'inColor|1':['珍珠白', '米', '黑', '象牙白', '黑棕双拼', '海洋蓝'],
			'exColor|1':['珍珠白', '米', '黑', '象牙白', '黑棕双拼', '海洋蓝'],
			"cusName":"客户姓名",
			"state|1":["交易关闭", "付定金", "付尾款"]
		}
	]
})

/*订单消息中心*/
Mock.mock('/order/messageData', {
	'dataList|5-14':[
		{
			"time":"@date",
			'brand|+1':['雅阁','金刚', '远景', '博瑞', '博越'],
			'year|1': ['2016', '2017', '2018'],
			"desc|1": ['1.2T 改款 185T CVT自动精英版', '1.5T 手动精英型', '1.2T 手动尊享型', '1.5T 自动精英型', '2.0T 自动尊贵型'],
			"price|5-20.2":1,
			"tips1|1":["支付订金", "支付尾款", "上传汇款单"],
			"tips2":"请在30分钟内支付订金，否则系统会关闭订单",
			"linkText":"马上去办"
		}
	]
})

/*订单搜索*/
Mock.mock('/order/searchDatas', {
	'dataList|5-12':[
		{
			"time":"@datetime",
			"logistics|1":["太原物流自提", "广州物流自提", "福建物流自提", "山东物流自提"],
			'brand|+1':['雅阁','金刚', '远景', '博瑞', '博越'],
			'year|1': ['2016', '2017', '2018'],
			"desc|1": ['1.2T 改款 185T CVT自动精英版', '1.5T 手动精英型', '1.2T 手动尊享型', '1.5T 自动精英型', '2.0T 自动尊贵型'],
			"price|5-20.2":1,
			'inColor|1':['珍珠白', '米', '黑', '象牙白', '黑棕双拼', '海洋蓝'],
			'exColor|1':['珍珠白', '米', '黑', '象牙白', '黑棕双拼', '海洋蓝'],
			"cusName":"客户姓名",
			"state|1":["交易关闭", "付定金", "付尾款"]
		}
	]
})

