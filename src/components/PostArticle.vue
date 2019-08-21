<template>
  <el-container class="post-article">
    <el-header class="header" height="100px">
    <div class="block">
      <div class="demonstration">题目推荐指数</div>
      <el-rate v-model="answer.star"></el-rate>
    </div>
      <el-input
        type="text"
        placeholder="题号"
        v-model="answer.id"
        maxlength="4"
        show-word-limit
        style="width: 100px;margin-left: 10px"
      ></el-input>
      <el-input v-model="answer.title" placeholder="请输入标题..." style="width: 400px;margin-left: 10px"></el-input>
      <el-select v-model="answer.type" placeholder="请选择题目类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.label">
        </el-option>
      </el-select>
      <el-tag
        :key="tag"
        v-for="tag in answer.tags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </el-header>
    <el-main class="main">
      <div style="height: 200px">
        <mavon-editor
          :toolbarsFlag="false"
          placeholder="对题目简单描述"
          defaultOpen="edit"
          :subfield="false"
          v-model="answer.description">
        </mavon-editor>
      </div>
      <div id="editor" style="height: 500px">
        <mavon-editor
          :toolbarsFlag="false"
          placeholder="输入解答"
          style="height: 100%; width: 100%"
          :ishljs="true"
          v-model="answer.mdContent">
        </mavon-editor>
      </div>
      <div style="height: 50px">
        <mavon-editor
          :toolbarsFlag="false"
          placeholder="笔记总结"
          defaultOpen="edit"
          :subfield="false"
          v-model="answer.note">
        </mavon-editor>
      </div>
      </el-main>
      <el-footer>
    <div>
<!--      <div style="display: flex;align-items: center;margin-top: 15px;justify-content: flex-end">-->
        <el-button @click="cancelEdit" v-if="from!==undefined">放弃修改</el-button>
        <template v-if="from===undefined || from==='draft'">
          <el-button type="primary" @click="saveBlog()">发表题解</el-button>
        </template>
        <template v-else="from==post">
          <el-button type="primary" @click="updateBlog()">保存修改</el-button>
        </template>
      </div>
      </el-footer>
  </el-container>
</template>
<script>
  import {postRequest} from '../utils/api'
  import {putRequest} from '../utils/api'
  import {getRequest} from '../utils/api'
  import {mavonEditor} from 'mavon-editor'
  // 可以通过 mavonEditor.markdownIt 获取解析器markdown-it对象
  import 'mavon-editor/dist/css/index.css'
  import {isNotNullORBlank} from '../utils/utils'

  export default {
      data() {
          return {
              answer: {
                  id: "",
                  star: 5,
                  type: "",
                  title: "",
                  description: "",
                  tags: [],
                  mdContent: "",
                  htmlContent: "",
                  note: "",
              },
              options: [{
                  value: '选项1',
                  label: '双指针'
              }, {
                  value: '选项2',
                  label: '动态规划'
              }, {
                  value: '选项3',
                  label: '递归与回溯'
              }, {
                  value: '选项4',
                  label: '图论'
              }, {
                  value: '选项5',
                  label: '分治'
              },{
                  value: '选项6',
                  label: '贪心'
              }, {
                  value: '选项7',
                  label: '数组与字符串'
              }, {
                  value: '选项8',
                  label: '栈'
              }, {
                  value: '选项9',
                  label: '树'
              }, {
                  value: '选项10',
                  label: '队列'
              },{
                  value: '选项11',
                  label: '查找表'
              }, {
                  value: '选项12',
                  label: '位运算'
              }, {
                  value: '选项13',
                  label: '数学'
              }, {
                  value: '选项14',
                  label: '设计'
              }, {
                  value: '选项15',
                  label: '逻辑'
              }],
              inputVisible: false,
              inputValue: '',
              from: "",
          }
      },
    mounted: function () {
      let from = this.$route.query.from;
      this.from = from;
      let _this = this;
      if (from != null && from !== '' && from !== undefined) {
        this.id = this.$route.query.id;
        getRequest("/answer/one",{id: this.id}).then(resp=> {
          if (resp.data.code === 0) {
            _this.answer = resp.data.data;
          } else {
            _this.$message({type: 'error', message: '页面加载失败!'})
          }
        }, resp=> {
          _this.$message({type: 'error', message: '页面加载失败!'})
        })
      }
    },
    components: {
      mavonEditor,
    },
    methods: {
      cancelEdit(){
        this.$router.go(-1)
      },
      updateBlog(){
        if (!(isNotNullORBlank(this.answer.id, this.answer.title, this.answer.mdContent))) {
          this.$message({type: 'error', message: '数据不能为空!'});
          return;
        }
        let _this = this;
        putRequest("/answer/update",{
            id: _this.answer.id,
            star: _this.answer.star,
            title: _this.answer.title,
            publisher: sessionStorage.getItem("nickname"),
            description: _this.answer.description,
            type: _this.answer.type,
            tags: _this.answer.tags,
            mdContent: _this.answer.mdContent,
            note: _this.answer.note,
        },{})
          .then(resp=>{
            if(resp.data.code === 0){
              _this.$alert("修改成功");
              window.bus.$emit('blogTableReload');
              _this.$router.push({path: '/articleList'})
            }else{
              _this.$alert(resp.data.msg);
            }
          },resp=>{
            _this.$alert("服务器繁忙");
          })
      },
      saveBlog(){
        if (!(isNotNullORBlank(this.answer.id, this.answer.title, this.answer.mdContent))) {
          this.$message({type: 'error', message: '数据不能为空!'});
          return;
        }
        let _this = this;
        postRequest("/answer/add", {
          id: _this.answer.id,
          star: _this.answer.star,
          title: _this.answer.title,
          publisher: sessionStorage.getItem("nickname"),
          description: _this.answer.description,
          type: _this.answer.type,
          tags: _this.answer.tags,
          mdContent: _this.answer.mdContent,
          note: _this.answer.note,
        },{})
          .then(resp=> {
          if (resp.data.msg === "success" ) {
            window.bus.$emit('blogTableReload');
            _this.$alert("发表成功");
            _this.$router.replace({path: '/articleList'});
          }else{
            _this.$alert(resp.data.msg);
          }
        }, resp=> {
          _this.$message({type: 'error', message: '题解发布失败!'});
        })
      },
        // 增加tag的操作
        handleClose(tag) {
            this.answer.tags.splice(this.answer.tags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.answer.tags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
    },

  }
</script>
<style>
  .post-article > .main > #editor {
    width: 100%;
    height: 450px;
    text-align: left;
  }

  .post-article > .header {
    background-color: #ececec;
    margin-top: 10px;
    padding-left: 5px;
    display: flex;
    justify-content: flex-start;
  }

  .post-article > .main {
    /*justify-content: flex-start;*/
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    background-color: #ececec;
    padding-top: 0px;
  }

  .post-article > .header > .el-tag + .el-tag {
    margin-left: 10px;
  }

  .post-article > .header > .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .post-article > .header > .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .post-article {
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
