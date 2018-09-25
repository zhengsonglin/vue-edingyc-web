<template>
	<transition name="vux-slide">
		<div class="enterpriseInfo pageHeader">
			<x-header class="myHeader">
				<x-icon slot="overwrite-left" type="ios-arrow-back" size="32" class="icon-back" @click="$router.back()"></x-icon>
				<span slot="left" class="back-text">企业信息</span>
			</x-header>
			
			<div class="content">
				<div class="grop">
					<group title="**企业信息只限平台使用，我们会保障其安全性">
				      <cell title="地址" :value="address" :link="{path:'enterpriseInfo/address'}"></cell>
				      <cell title="银行账号"  :value="account" :link="{path:'enterpriseInfo/bankAccount'}"></cell>
				      <cell title="座机"  :value="landline" :link="{path:'enterpriseInfo/landline'}"></cell>
				    </group>
				</div>
			</div>
			
			<transition name="vux-slide">
				<router-view></router-view>
			</transition>
		</div>
	</transition>	
</template>

<script>
	import { XHeader, Group, Cell} from 'vux'
	export default{
		data(){
			return {
				address:'',
				account:'',
				landline:''
			}
		},
		components:{
			XHeader,
			Group,
			Cell
		}	
	}	
</script>

<style scoped lang="less">
	@import '../../styles/myHeader.less';
	@import '../../styles/transition.less';
</style>