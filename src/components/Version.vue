<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <div>Version: 1.1.4</div>
    <div>Developed by Onion</div>
  </div>
  <div v-for="item in content" :key="item.index" class="text item">
    {{item.item}}
  </div>
</el-card>

</template>
<script>
  export default {
      data() {
          return {
              content: [{
                  index: 1,
                  item: "1. 加入了相似题目推荐",
              }, {
                  index: 2,
                  item: "2. 加入了版本介绍",
              }, {
                  index: 3,
                  item: "3. 加入了新特性介绍",
              },{
                  index: 4,
                  item: "4. 登录、主页风格重新设计",
              }]
          }
      }
  }

</script>
<style>
  .text {
    font-size: 18px;
  }

  .item {
    margin-bottom: 20px;
    alignment: left;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    height: 100%;
  }
</style>


