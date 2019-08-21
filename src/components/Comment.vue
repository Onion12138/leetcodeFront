<template>
  <el-container>
    <el-main>
      <mavon-editor
        defaultOpen="edit"
        :toolbarsFlag="false"
        :ishljs="true"
        style="height: 100%"
        :subfield="false"
        v-model="content">
      </mavon-editor>
    </el-main>
    <el-footer>
        <el-button type="primary" @click="postComment">发表留言</el-button>
    </el-footer>
  </el-container>
</template>

<script>
    import {mavonEditor} from 'mavon-editor'
    import {postRequest} from "../utils/api";
    export default {
        methods: {
          postComment:function () {
              let _this = this;
              postRequest("/user/comment",{
                  nickname: sessionStorage.getItem("nickname"),
                  content: this.content,
              }).then(resp=>{
                  if(resp.data.code ===0){
                      _this.$alert("留言成功");
                      _this.$router.replace({path:"/begin"});
                  }else{
                      _this.$alert("留言失败")
                  }
              })
          }
        },
        data(){
            return {
                content: "",
            }
        },
        components:{
            mavonEditor,
        }
    }
</script>

<style scoped>

</style>
