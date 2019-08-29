<!--<template>-->
<!--  <el-container>-->
<!--    <el-header class="header">-->
<!--  <el-select v-model="chapter" placeholder="请选择章节" onchange="search">-->
<!--    <el-option-->
<!--      v-for="(item) in options"-->
<!--      :key="item.index"-->
<!--      :value="item.index"-->
<!--      :label="'第'+item.index+'章： '+item.title">-->
<!--    </el-option>-->
<!--  </el-select>-->
<!--    </el-header>-->
<!--    <el-main>-->
<!--      <el-table-->
<!--        :data="translation"-->
<!--        style="width: 100%">-->
<!--        <el-table-column-->
<!--          prop="item"-->
<!--          label="条例">-->
<!--        </el-table-column>-->
<!--        <el-table-column label="操作">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button-->
<!--              type="primary" icon="el-icon-edit"-->
<!--              @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.publisher === 'Onion'">编辑-->
<!--            </el-button>-->
<!--            <el-button type="info" disabled icon="el-icon-warning" v-if="scope.row.publisher!=='Onion'">没有权限</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--    </el-main>-->
<!--  </el-container>-->
<!--</template>-->

<!--<script>-->
<!--    import {getRequest} from "../utils/api";-->

<!--    export default {-->
<!--        methods: {-->
<!--            search(){-->
<!--                let _this = this;-->
<!--                getRequest("/translation/chapter",{-->
<!--                    chapter: _this.chapter-->
<!--                }).then(resp=>{-->
<!--                    if(resp.data.code === 0){-->
<!--                        _this.translation = resp.data.data;-->
<!--                    }else{-->

<!--                    }-->
<!--                })-->
<!--            },-->
<!--            handleEdit(index, row) {-->
<!--                this.$router.push({path: '/postTranslation', query: {from: "edit",id:row.id}});-->
<!--            },-->
<!--        },-->
<!--        data() {-->
<!--            return {-->
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
<!--                chapter: "",-->
<!--                translation: [],-->
<!--            }-->
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
