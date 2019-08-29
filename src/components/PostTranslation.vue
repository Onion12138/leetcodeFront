<!--<template>-->
<!--  <el-container class="post-article">-->
<!--    <el-header class="header" height="100px">-->
<!--      <el-input v-model="translation.item" placeholder="请输入条例" style="width: 400px;margin-left: 10px"></el-input>-->
<!--      <el-select v-model="translation.chapter" placeholder="请选择章节">-->
<!--        <el-option-->
<!--          v-for="item in options"-->
<!--          :key="item.index"-->
<!--          :label="'第'+item.index+'章: '+item.title"-->
<!--          :value="item.index">-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--    </el-header>-->
<!--    <el-main class="main">-->
<!--      <div id="editor" style="height: 500px">-->
<!--        <mavon-editor-->
<!--          :toolbarsFlag="false"-->
<!--          placeholder="输入内容"-->
<!--          style="height: 100%; width: 100%"-->
<!--          :ishljs="true"-->
<!--          v-model="translation.content">-->
<!--        </mavon-editor>-->
<!--      </div>-->
<!--    </el-main>-->
<!--    <el-footer>-->
<!--      <div>-->
<!--        <el-button @click="cancelEdit" v-if="from!==undefined">放弃修改</el-button>-->
<!--        <template v-if="from===undefined || from==='draft'">-->
<!--          <el-button type="primary" @click="saveBlog">发表内容</el-button>-->
<!--        </template>-->
<!--        <template v-else="from==post">-->
<!--          <el-button type="primary" @click="updateBlog">保存修改</el-button>-->
<!--        </template>-->
<!--      </div>-->
<!--    </el-footer>-->
<!--  </el-container>-->
<!--</template>-->

<!--<script>-->
<!--    import {postRequest} from '../utils/api'-->
<!--    import {putRequest} from '../utils/api'-->
<!--    import {getRequest} from '../utils/api'-->
<!--    import {mavonEditor} from 'mavon-editor'-->
<!--    // 可以通过 mavonEditor.markdownIt 获取解析器markdown-it对象-->
<!--    import 'mavon-editor/dist/css/index.css'-->
<!--    import {isNotNullORBlank} from '../utils/utils'-->

<!--    export default {-->
<!--        data() {-->
<!--            return {-->
<!--                translation: {-->
<!--                    id: "",-->
<!--                    chapter: "",-->
<!--                    book: "Effective Java",-->
<!--                    item: "",-->
<!--                    content: "",-->
<!--                },-->
<!--                options: [{-->
<!--                    index: 2,-->
<!--                    title: '创建与销毁对象'-->
<!--                }, {-->
<!--                    index: 3,-->
<!--                    title: '对象的共同方法'-->
<!--                }, {-->
<!--                    index: 4,-->
<!--                    title: '类和接口'-->
<!--                }, {-->
<!--                    index: 5,-->
<!--                    title: '泛型'-->
<!--                }, {-->
<!--                    index: 6,-->
<!--                    title: '枚举与注解'-->
<!--                },{-->
<!--                    index: 7,-->
<!--                    title: 'lambda与流'-->
<!--                }, {-->
<!--                    index: 8,-->
<!--                    title: '方法'-->
<!--                }, {-->
<!--                    index: 9,-->
<!--                    title: '通用编程'-->
<!--                }, {-->
<!--                    index: 10,-->
<!--                    title: '异常'-->
<!--                }, {-->
<!--                    index: 11,-->
<!--                    title: '并发'-->
<!--                },{-->
<!--                    index: 12,-->
<!--                    title: '序列化'-->
<!--                }],-->
<!--                from: "",-->
<!--            }-->
<!--        },-->
<!--        mounted: function () {-->
<!--            let from = this.$route.query.from;-->
<!--            this.from = from;-->
<!--            let _this = this;-->
<!--            if (from != null && from !== '' && from !== undefined) {-->
<!--                this.id = this.$route.query.id;-->
<!--                getRequest("/translation/one",{id: this.id}).then(resp=> {-->
<!--                    if (resp.data.code === 0) {-->
<!--                        _this.answer = resp.data.data;-->
<!--                    } else {-->
<!--                        _this.$message({type: 'error', message: '页面加载失败!'})-->
<!--                    }-->
<!--                }, resp=> {-->
<!--                    _this.$message({type: 'error', message: '页面加载失败!'})-->
<!--                })-->
<!--            }-->
<!--        },-->
<!--        components: {-->
<!--            mavonEditor,-->
<!--        },-->
<!--        methods: {-->
<!--            cancelEdit(){-->
<!--                this.$router.go(-1)-->
<!--            },-->
<!--            updateBlog(){-->
<!--                if (!(isNotNullORBlank(this.translation.item, this.answer.chapter, this.answer.content))) {-->
<!--                    this.$message({type: 'error', message: '数据不能为空!'});-->
<!--                    return;-->
<!--                }-->
<!--                let _this = this;-->
<!--                putRequest("/translation/update",{-->
<!--                    id: _this.$route.query.id,-->
<!--                    chapter: _this.translation.chapter,-->
<!--                    book: _this.translation.book,-->
<!--                    item: _this.translation.item,-->
<!--                    content: _this.translation.item,-->
<!--                },{}).then(resp=>{-->
<!--                        if(resp.data.code === 0){-->
<!--                            _this.$alert("修改成功");-->
<!--                            window.bus.$emit('blogTableReload');-->
<!--                            _this.$router.push({path: '/articleList'})-->
<!--                        }else{-->
<!--                            _this.$alert(resp.data.msg);-->
<!--                        }-->
<!--                    })-->
<!--            },-->
<!--            saveBlog(){-->
<!--                if (!(isNotNullORBlank(this.translation.item, this.answer.chapter, this.answer.content))) {-->
<!--                    this.$message({type: 'error', message: '数据不能为空!'});-->
<!--                    return;-->
<!--                }-->
<!--                let _this = this;-->
<!--                postRequest("/translation/post", {-->
<!--                    chapter: _this.translation.chapter,-->
<!--                    book: _this.translation.book,-->
<!--                    item: _this.translation.item,-->
<!--                    content: _this.translation.item,-->
<!--                },{})-->
<!--                    .then(resp=> {-->
<!--                        if (resp.data.msg === "success" ) {-->
<!--                            window.bus.$emit('blogTableReload');-->
<!--                            _this.$alert("发表成功");-->
<!--                            _this.$router.replace({path: '/articleList'});-->
<!--                        }else{-->
<!--                            _this.$alert(resp.data.msg);-->
<!--                        }-->
<!--                    })-->
<!--            },-->
<!--        },-->

<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--  .header {-->
<!--    background-color: #ececec;-->
<!--    margin-top: 10px;-->
<!--    padding-left: 5px;-->
<!--    display: flex;-->
<!--    justify-content: flex-start;-->
<!--  }-->
<!--</style>-->
