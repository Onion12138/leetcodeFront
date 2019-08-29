<style type="text/css">
  .blog_table_footer {
    display: flex;
    box-sizing: content-box;
    padding-top: 10px;
    padding-bottom: 0px;
    margin-bottom: 0px;
    justify-content: space-between;
  }
</style>
<template>
  <div>
    <div style="display: flex;justify-content: flex-start">
      <el-header class="el-header" height="100px">
      <el-input
        placeholder="通过标题或标签搜索题解..."
        prefix-icon="el-icon-search"
        v-model="input" style="width: 200px" size="mini" v-if="activeName==='全部'&& search ===''">
      </el-input>
      <el-button
        type="warning" icon="el-icon-ice-tea" size="mini" style="margin-left: 10px" @click="searchById(1)" v-if="activeName==='全部'&& search ===''">题号搜索
      </el-button>
      <el-button
        type="primary" icon="el-icon-ice-drink" size="mini" style="margin-left: 10px" @click="searchByTitle(1)" v-if="activeName==='全部'&& search ===''">标题搜索
      </el-button>
      <el-button
        type="success" icon="el-icon-milk-tea" size="mini" style="margin-left: 10px" @click="searchByTag(1)" v-if="activeName==='全部'&& search ===''">标签搜索
      </el-button>
        <el-button
          type="primary" icon="el-icon-coffee" size="mini" style="margin-left: 10px" @click="searchAll" v-if="activeName==='全部' && search!==''">搜索全部
        </el-button>
      <el-badge :value="totalElements" class="item">
        <el-button
          type="text" icon="el-icon-document" size="mini" style="margin-left: 10px">题量
        </el-button>
      </el-badge>
      <el-switch style="margin-left:100px;alignment: right"
        v-model="sortById"
        active-text="按题号排序"
        inactive-text="按星级排序">
      </el-switch>
      </el-header>
    </div>

    <el-table
      ref="multipleTable"
      :data="answers"
      tooltip-effect="dark"
      :stripe="true"
      style="width: 100%;overflow-x: hidden; overflow-y: hidden;"
      max-height="800"
    >

      <el-table-column
        label="题号" prop="id"
        width="100" align="left">
      </el-table-column>

      <el-table-column
        label="标题" prop="title"
        width="150" align="left">
        <template slot-scope="scope"><span style="color: #409eff;cursor: pointer" @click="seeDetail(scope.row)">{{ scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="activeName==='全部'"
        label="题型" prop="type"
        width="150" align="left">
      </el-table-column>

      <el-table-column
        label="标签" prop="tags" align="left" width="300px">
        <template slot-scope="scope">
          <el-tag :key="tag" v-for="tag in scope.row.tags" type="success">{{tag}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="star"
        label="星级"
        width="150" align="left">
        <template slot-scope="scope">
        <el-rate
          v-model="scope.row.star"
          disabled
          text-color="#ff9900"
        >
        </el-rate>
        </template>
      </el-table-column>

      <el-table-column
        prop="publisher"
        label="作者"
        width="100" align="left">
      </el-table-column>

      <el-table-column label="操作" align="left">
        <template slot-scope="scope">
          <el-button
            type="primary" icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.publisher === nickname">编辑
          </el-button>
          <el-button type="info" disabled icon="el-icon-warning" v-if="scope.row.publisher!==nickname">只可查阅</el-button>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination
        background
        :page-size="pageSize"
        :page-count="totalPages"
        :pager-count="7"
        :current-page.sync="page"
        layout="prev, pager, next, jumper"
        @current-change="handleCurrentChange">
      </el-pagination>
<!--    </div>-->
  </div>
</template>
<script>
  import {getRequest} from '../utils/api'
  import Vue from 'vue'

  export default{
    data() {
      return {
          answers: [],
          page: 1,
          pageSize: 10,
          totalPages: -1,
          totalElements: 0,
          input: "",
          nickname: "",
          search: "",
          sortById: true,
      }
    },
    mounted: function () {
      let _this = this;
      this.nickname = sessionStorage.getItem('nickname');
      this.loadAnswer(this.page);
      window.bus.$on('blogTableReload', function () {
         _this.loadAnswer(_this.page);
       })
    },
    watch: {
        activeName: function () {
          this.loadAnswer(this.page);
        },
        sortById: function () {
            this.loadAnswer(this.page);
        }
    },
    methods: {
        searchAll(){
            this.search = "";
            this.page = 1;
            this.loadAnswer(this.page);
        },
        searchById(page){
          let _this = this;
          _this.search = "题号";
          getRequest("/answer/id",{
              page: page,
              size: _this.pageSize,
              sortById: _this.sortById,
              id: _this.input
          }).then(resp=>{
              if(resp.data.code === 0){
                  _this.answers = resp.data.data.content;
                  _this.totalPages = resp.data.data.totalPages;
                  _this.totalElements = resp.data.data.totalElements;
              } else {
                  _this.$alert(resp.data.msg);
              }
          })
        },
        searchByTitle(page){
            let _this = this;
            _this.search = "标题";
            getRequest("/answer/title",{
                page: page,
                size: _this.pageSize,
                title: _this.input,
                sortById: _this.sortById,
            }).then(resp=>{
                if(resp.data.code === 0){
                    _this.answers = resp.data.data.content;
                    _this.totalPages = resp.data.data.totalPages;
                    _this.totalElements = resp.data.data.totalElements;
                } else {
                    _this.$alert(resp.data.msg);
                }
            })
        },
        searchByTag(page){
            let _this = this;
            _this.search = "标签";
            getRequest("/answer/tag",{
                page: page,
                size: _this.pageSize,
                tag: _this.input,
                sortById: _this.sortById,
            }).then(resp=>{
                if(resp.data.code === 0){
                    _this.answers = resp.data.data.content;
                    _this.totalPages = resp.data.data.totalPages;
                    _this.totalElements = resp.data.data.totalElements;
                } else {
                    _this.$alert(resp.data.msg);
                }
            })
        },
      seeDetail(row){
        this.$router.push({path: '/answerDetail', query: {id: row.id}})
      },
      handleCurrentChange(currentPage){
        this.loadAnswer(currentPage);
      },
      loadAnswer(page){
        let _this = this;
        if(_this.activeName === "全部") {
            if(_this.search === ''){
              getRequest("/answer/all",
              {
                page: page,
                size: _this.pageSize,
                sortById: _this.sortById,
              }).then(resp => {
              if (resp.data.code === 0) {
                _this.answers = resp.data.data.content;
                _this.totalPages = resp.data.data.totalPages;
                _this.totalElements = resp.data.data.totalElements;
              } else {
              _this.$alert(resp.data.msg);
              }
            })}
            else if(_this.search === '题号'){
                _this.searchById(page);
            }else if(_this.search === '标题'){
                _this.searchByTitle(page);
            }else if(_this.search === '标签'){
                _this.searchByTag(page);
            }
        }
        else {
            getRequest("/answer/type", {
                type: _this.activeName,
                page: page,
                size: _this.pageSize,
                sortById: _this.sortById,
            }).then(resp => {
            if (resp.data.code === 0) {
              _this.answers = resp.data.data.content;
              _this.totalPages = resp.data.data.totalPages;
              _this.totalElements = resp.data.data.totalElements;
            } else {
                _this.$alert(resp.data.msg);
            }
          });
        }
      },
      handleEdit(index, row) {
        this.$router.push({path: '/editBlog', query: {from: this.activeName,id:row.id}});
      },
    },
     props: ['activeName']
  }
</script>
<style>
  .el-header {
    background-color: white;
    color: #333;
    line-height: 60px;
  }
</style>
