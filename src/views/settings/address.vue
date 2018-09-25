<template>
	<div class="address pageHeader">
		<x-header class="myHeader">
			<x-icon slot="overwrite-left" type="ios-arrow-back" size="32" class="icon-back" @click="$router.back()"></x-icon>
			<span slot="left" class="back-text">详细地址</span>
		</x-header>
		
		<div class="content">
			<div class="sub-address">
				<group title="**平台会以此地作为运输地址，务必填写正确">
					<x-address @on-hide="logHide" @on-show="logShow" title="所在地区" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" 
						:placeholder="tempVal"  :show.sync="showAddress"></x-address>
			    </group>
			    
			    <group title="详细地址">
			      <x-textarea :max="200" name="description" :placeholder="'placeholder'"></x-textarea>
			    </group>
			    
			    <box gap="50px 10px 0">
			      <x-button type="primary" @click.native="$router.back()">保存</x-button>
			    </box>  
			</div>
		</div>
	</div>
</template>

<script>
	import { XHeader, Group, XTextarea, Cell, XAddress, ChinaAddressV4Data} from 'vux'
	export default{
		data(){
			return {
				address:'666',
				tempVal: '请选择地址',
			      value: [],
			      value2: ['天津市', '市辖区', '和平区'],
			      addressData: ChinaAddressV4Data,
			      showAddress: false
			}
		},
		components:{
			XHeader,
			Group,
			Cell,
			XTextarea,
			XAddress
		},
		methods:{
			doShowAddress () {
		      this.showAddress = true
		      setTimeout(() => {
		        this.showAddress = false
		      }, 2000)
		    },
		    onShadowChange (ids, names) {
		      console.log(ids, names)
		    },
		    getName (value) {
		      return value2name(value, ChinaAddressV4Data)
		    },
		    logHide (str) {
		      console.log('on-hide', str)
		    },
		    logShow (str) {
		      console.log('on-show')
		    }
		}
	}	
</script>

<style scoped lang="less">
	@import '../../styles/myHeader.less';
</style>