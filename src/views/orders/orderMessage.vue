<template>
	<div class="aboutUs pageHeader">
		<x-header class="myHeader">
			<x-icon slot="overwrite-left" type="ios-arrow-back" size="32" class="icon-back" @click="$router.back()"></x-icon>
			<span slot="left" class="back-text">消息</span>
		</x-header>
		
		<div class="content">
			<div class="messgae-box">
				<ul>
					<li class="chat-mine">
						<div class="chat-user">
							<img src="../../images/home/nickName.jpg" class="user_logo" width="38">
							<cite><i>2018-08-05 18:42:11</i>我</cite>
						</div>
						<div class="chat-text ">111</div>
					</li>
					<li>
						<div class="chat-user">
							<img src="../../images/order/meinv-icon.jpg" class="user_logo" width="38">
							<cite>刘小姐<i>2018-08-05 19:42:11</i></cite>
						</div>
						<div class="chat-text ">晚上约吗</div>
					</li>
					<li>
						<div class="chat-user">
							<img src="../../images/order/meinv-icon.jpg" class="user_logo" width="38">
							<cite>刘小姐<i>2018-08-05 19:52:11</i></cite>
						</div>
						<div class="chat-text ">已经订好房间了，你几点到</div>
					</li>
				</ul>
			</div>
		</div>
		
		<div class="bottom-box">
			<div class="footer-top">
				<textarea name="" rows="" cols="" class="textBox"></textarea>
				<div class="uploadBox" v-show="!showSendBtn">
					<img src="../../images/order/order-canamer.png" alt="" class="uploadImg"  />
					<input type="file" name="" class="uploadBtn" />
				</div>
				<x-button  type="primary" mini @click.native="sendMessage" v-show="showSendBtn">发送</x-button>
			</div>
			<div class="footer-bottom">
				<x-button  type="primary" mini @click.native="callMe" class="callMe">让店小二联系我</x-button>
			</div>
		</div>
	</div>
	
	
</template>

<script>
	import { XHeader} from 'vux'
	export default{
		data(){
			return {
				message:''
			}
		},
		computed:{
			showSendBtn(){
				return this.message.length>0
			}
		},
		components:{
			XHeader
		},
		methods:{
			sendMessage(){
				console.log(1)
			},
			callMe(){
				console.log(2)
			}
		}
	}	
</script>

<style scoped lang="less">
	@import '../../styles/myHeader.less';
	@import '../../styles/transition.less';
	
	/*content start*/
	.messgae-box{
		position: absolute;
		top:50px;
		bottom:3rem;
		left: 0;
		right:0;
		padding:10px;
		ul li{
			position: relative;
		    margin-bottom: 10px;
		    padding-left: 60px;
		    min-height: 68px;
		    overflow:auto;
		    .chat-user{
		    	position: absolute;
			    left: 3px;
			    display: inline-block;
			    vertical-align: top;
			    font-size: 14px;
			    img{
			    	border-radius: 100%;
			    }
			}
			cite {
			    position: absolute;
			    left: 60px;
			    top: -2px;
			    line-height: 24px;
			    font-size: 12px;
			    white-space: nowrap;
			    color: #999;
			    text-align: left;
			    font-style: normal;
			    i{
			    	padding-left: 15px;
    				font-style: normal;
			    }
			}
			.chat-text{
				position: relative;
			    line-height: 22px;
			    margin-top: 25px;
			    padding: 8px 15px;
			    background-color: #e2e2e2;
			    border-radius: 3px;
			    color: #333;
			    word-break: break-all;
			    display: inline-block;
			    &:after{
				    content: '';
				    position: absolute;
				    left: -10px;
				    top: 13px;
				    width: 0;
				    height: 0;
				    border-style: solid dashed dashed;
				    border-color: #e2e2e2 transparent transparent;
				    overflow: hidden;
				    border-width: 10px;
			    }
			}
		    &.chat-mine{
		    	text-align: right;
			    padding-left: 0;
			    padding-right: 60px;
			    .chat-user{
				    left: auto;
    				right: 3px;
    				cite {
					    left: auto;
					    right: 60px;
					    text-align: right;
					    i{
					    	padding-left: 0;
    						padding-right: 15px;
			    		}
					}
			    }
			    .chat-text{
			    	margin-left: 0;
				    text-align: left;
				    background-color: #5FB878;
				    color: #fff;
				    &:after{
					    left: auto;
					    right: -10px;
					    border-top-color: #5FB878;
				    }
			    }
		    }
		}
	}
	
	/*footer start*/
	.bottom-box{
		position: absolute;
		bottom:0;
		left:0;
		z-index:100;
		width:100%;
		border-top: 1px solid #ddd;
		background: #f6f6f6;
		.footer-top{
			display:flex;
			height:1.5rem;
			padding:10px;
			.textBox{
				flex: 1;
				border: 1px solid #e6e6e6;
				border-radius: 2px;
				outline: none;
				height: 20px;
			    background: #fff;
			    font-size: 14px;
			    padding: 8px 5px 6px;
			}
			.uploadBox{
				margin: auto;
				margin-left:10px;
				position: relative;
				.uploadImg{
					width:35px;
					height:28px;
				}
				.uploadBtn{
					position: absolute;
					left:0;
					top:0;
					width:100%;
					height:100%;
					opacity: 0;
				}
			}
		}
		.footer-bottom{
			display:flex;
			height:1.5rem;
			padding:0px 10px 10px;
			.callMe{
				margin: 0;
				height:auto
			}
		}
	}
</style>