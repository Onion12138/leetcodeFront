<template>
  <el-container class="article_list">
    <el-main class="main">
      <el-tabs v-model="activeName" :tab-position="tabLeft" style="height: 1000px;">
        <el-tab-pane name="全部" label="全部">
          <blog_table :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane name="双指针" label="双指针">
          <blog_table :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane name="动态规划" label="动态规划">
          <blog_table :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane name="递归与回溯" label="递归与回溯">
          <blog_table :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane name="图论" label="图论">
          <blog_table :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane name="分治" label="分治">
          <blog_table :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane name="贪心" label="贪心">
          <blog_table :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane name="数组与字符串" label="数组与字符串">
          <blog_table :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane name="栈" label="栈">
          <blog_table :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane name="树" label="树">
          <blog_table :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane name="队列" label="队列">
          <blog_table :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane name="查找表" label="查找表">
          <blog_table :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane name="位运算" label="位运算">
          <blog_table :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane name="数学" label="数学">
          <blog_table :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane name="设计" label="设计">
          <blog_table :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane name="逻辑" label="逻辑">
          <blog_table :activeName="activeName"></blog_table>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>

</template>
<script>
  import BlogTable from '@/components/BlogTable'
  export default {
    data() {
      return {
          tabLeft: 'left',
          tabRight: 'right',
          activeName: '全部',
      };
    },
    components: {
      'blog_table': BlogTable,
    }
  };
</script>
<style>
  .article_list > .main {
    display: flex;
    flex-direction: column;
    padding-left: 0px;
    background-color: #fff;
    padding-top: 0px;
    margin-top: 8px;
  }
</style>
