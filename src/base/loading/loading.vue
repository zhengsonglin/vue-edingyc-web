<template>
  <div class="loading">
    <img src="./loading.gif" width="38" height="38" alt="">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>

<style lang="less">
  .loading {
    width: 100%;
    text-align: center;
    .desc {
      line-height: 20px;
      font-size: 14px;
      color: #666;
    }
  }
</style>