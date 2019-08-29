<template>
  <el-container>
    <el-header height="100px">
      <el-button type="text"  icon="el-icon-back" @click="goBack" >返回</el-button>
      <el-button type="text"  icon="el-icon-reading">{{answer.title}}</el-button>
      <el-button type="text"  icon="el-icon-collection-tag">{{answer.type}}</el-button>
    </el-header>
    <el-container>
      <el-aside width="300px" class="aside">
        <el-button @click="findRelated" type="primary" style="margin-left: 16px;">
          查看相似题型
        </el-button>

        <el-drawer
          title="推荐您继续尝试以下题目"
          :visible.sync="drawer"
          direction="ltr">
          <el-table
            :data="related"
            max-height="800"
            :default-sort = "{prop: 'id', order: 'ascending'}"
          >
            <el-table-column property="id" label="题号" width="50"></el-table-column>
            <el-table-column property="title" label="标题" width="150">
              <template slot-scope="scope"><span style="color: #409eff;cursor: pointer" @click="seeDetail(scope.row)">{{ scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column property="tags" label="标签" width="250">
              <template slot-scope="scope">
                <el-tag :key="tag" v-for="tag in scope.row.tags" type="success">{{tag}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-drawer>

        <mavon-editor
          :editable="false"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :ishljs="true"
          style="height: 100%"
          :subfield="false"
          :value="answer.note">
        </mavon-editor>
      </el-aside>
      <el-main>
        <div style="alignment: center">
        <el-tag type="success" :key="item" v-for="item in answer.tags">{{item}}</el-tag>
        </div>
        <div id="description" style="height: 200px">
          <mavon-editor
            :editable="false"
            defaultOpen="preview"
            :toolbarsFlag="false"
            :ishljs="true"
            :subfield="false"
            style="height: 50px"
            :value="answer.description">
          </mavon-editor>
        </div>
        <div id="editor">
          <mavon-editor
            :editable="false"
            defaultOpen="preview"
            :toolbarsFlag="false"
            :ishljs="true"
            :subfield="false"
            style="height: 100%"
            :value="answer.mdContent">
          </mavon-editor>
        </div>
      </el-main>
    </el-container>
  </el-container>

</template>
<script>
  import {getRequest} from '../utils/api'
  import {mavonEditor} from 'mavon-editor'
  export default{
    methods: {
      goBack(){
        this.$router.go(-1);
      },
      loadDetails: function () {
        let id = this.$route.query.id;
        let _this = this;
        getRequest("/answer/one",
          {id: id}
          ).then(resp=> {
          if (resp.data.code === 0) {
            _this.answer = resp.data.data;
          }
          else{
            _this.$alert("找不到解答");
          }
        });
      },
        findRelated: function () {
            this.drawer = true;
            let _this = this;
            let tagStr = '';
            let tags = this.answer.tags;
            for (let i = 0; i < tags.length; i++) {
                tagStr += tags[i];
                if(i !== tags.length -1){
                    tagStr += ',';
                }
            }
            getRequest("/answer/relation",{
                tags: tagStr,
                id: _this.answer.id,
            }).then(resp=>{
                if (resp.data.code === 0) {
                    _this.related = resp.data.data;
                }
            })
        },
        seeDetail(row){
            this.$router.replace({path: '/answerDetail', query: {id: row.id}});
            this.loadDetails();
            this.drawer = false;
        },
    },

    mounted: function () {
      let _this = this;
      this.loadDetails();
      window.bus.$on('detailReload', function () {
        _this.loadDetails();
      });
    },
    data(){
      return {
        answer: {
            id: "",
            star: "",
            title: "",
            publisher: "",
            description: "",
            type: "",
            tags: [],
            mdContent: "",
            note: "",
        },
        activeName: '',
          drawer: false,
        related: [],
      }
    },
      components: {
          mavonEditor,
      }
  }
</script>
<style>
  .aside{
    height: 800px;
  }
</style>
