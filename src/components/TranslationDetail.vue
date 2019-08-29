<!--<template>-->
<!--  <el-container>-->
<!--    <el-header height="100px">-->
<!--      <el-button type="text"  icon="el-icon-back" @click="goBack" >返回</el-button>-->
<!--      <el-button type="text"  icon="el-icon-reading">{{translation.item}}</el-button>-->
<!--    </el-header>-->
<!--      <el-main>-->
<!--        <div id="editor">-->
<!--          <mavon-editor-->
<!--            :editable="false"-->
<!--            defaultOpen="preview"-->
<!--            :toolbarsFlag="false"-->
<!--            :ishljs="true"-->
<!--            :subfield="false"-->
<!--            style="height: 100%"-->
<!--            :value="translation.content">-->
<!--          </mavon-editor>-->
<!--        </div>-->
<!--      </el-main>-->
<!--    </el-container>-->
<!--</template>-->

<!--<script>-->
<!--    import {getRequest} from "../utils/api";-->
<!--    import {mavonEditor} from 'mavon-editor'-->
<!--    export default {-->
<!--        methods: {-->
<!--            goBack() {-->
<!--                this.$router.go(-1);-->
<!--            },-->
<!--            loadDetails: function () {-->
<!--                let id = this.$route.query.id;-->
<!--                let _this = this;-->
<!--                getRequest("/translation/one",-->
<!--                    {id: id}-->
<!--                ).then(resp => {-->
<!--                    if (resp.data.code === 0) {-->
<!--                        _this.answer = resp.data.data;-->
<!--                    } else {-->
<!--                        _this.$alert("找不到信息");-->
<!--                    }-->
<!--                });-->
<!--            },-->
<!--        },-->
<!--        mounted: function () {-->
<!--            let _this = this;-->
<!--            this.loadDetails();-->
<!--            window.bus.$on('detailReload', function () {-->
<!--                _this.loadDetails();-->
<!--            });-->
<!--        },-->
<!--        data() {-->
<!--            return {-->
<!--                translation: {-->
<!--                    id: "",-->
<!--                    book: "",-->
<!--                    chapter: "",-->
<!--                    item: "",-->
<!--                    content: ""-->
<!--                },-->
<!--                drawer: false,-->
<!--            }-->
<!--        },-->
<!--        components: {-->
<!--            mavonEditor,-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
