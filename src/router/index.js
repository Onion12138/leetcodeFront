import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import ArticleList from '@/components/ArticleList'
import PostArticle from '@/components/PostArticle'
import BlogDetail from '@/components/BlogDetail'
import Begin from '@/components/Begin'
import Comment from "../components/Comment";
import Version from "../components/Version";
import TranslationDetail from "../components/TranslationDetail";
import PostTranslation from "../components/PostTranslation";
import TranslationList from "../components/TranslationList";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      component: Login,
      hidden: true,
    }, {
      path: '/home',
      name: '主页',
      component: Home,
      hidden: true,
      children: [
        {
          path: '/begin',
          name: '开始页',
          component: Begin,
          hidden: true,
        },
        {
          path: '/comment',
          name: '给开发人员留言',
          component: Comment,
          hidden: true,
          meta: {
            keepAlive: false,
          }
        },{
          path: '/version',
          name: '新功能',
          component: Version,
          hidden: true,
          meta: {
            keepAlive: false,
          }
        }
      ]
    },
    {
      path: '/home',
      component: Home,
      name: '题目列表',
      iconCls: 'fa fa-file-text-o',
      hidden: false,
      children: [
        {
          path: '/articleList',
          name: '题解列表',
          component: ArticleList,
          meta: {
            keepAlive: true,
          }
        }, {
          path: '/postArticle',
          name: '发表题解',
          component: PostArticle,
          meta: {
            keepAlive: false,
          }
        }, {
          path: '/answerDetail',
          name: '解答详情',
          component: BlogDetail,
          hidden: true,
          meta: {
            keepAlive: false,
          }
        }, {
          path: '/editBlog',
          name: '编辑答案',
          component: PostArticle,
          hidden: true,
          meta: {
            keepAlive: false,
          }
        }
      ]
    }
    // ,{
    //   path: '/home',
    //   component: Home,
    //   name: '编程书籍',
    //   iconCls: 'fa fa-file-text-o',
    //   hidden: false,
    //   children: [
    //     {
    //       path: '/translationDetail',
    //       name: '原文',
    //       component: TranslationDetail,
    //       hidden: true,
    //       meta: {
    //         keepAlive: true,
    //       }
    //     },{
    //       path: '/postTranslation',
    //       name: '发布',
    //       component: PostTranslation,
    //       hidden: false,
    //       meta: {
    //         keepAlive: false,
    //       }
    //     },{
    //       path: '/translationList',
    //       name: '文章列表',
    //       component: TranslationList,
    //       hidden: false,
    //       meta: {
    //         keepAlive: false,
    //       }
    //     }
    //   ]
    // }
  ]
})
