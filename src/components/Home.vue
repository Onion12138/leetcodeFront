<template>
<!--  <div class="pull-height animated">-->
  <el-container class="home_container" >
    <el-header style="background-color: black">
      <div class="home_title">Coding Your World!</div>
      <div class="home_userinfoContainer">
        <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link home_userinfo">
    {{currentUserName}}<i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="comment" divided>给开发人员留言</el-dropdown-item>
            <el-dropdown-item command="version" divided>查看新功能</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="0"
          class="el-menu-horizontal-demo"  router>
          <template v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="item.children.length>1" :key="index">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-for="child in item.children" v-if="!child.hidden" :index="child.path" :key="child.path">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/begin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
          </el-breadcrumb>
          <keep-alive>
            <router-view v-if="this.$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!this.$route.meta.keepAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
    <div>题目来源：力扣（LeetCode）链接：https://leetcode-cn.com/</div>
    <div>著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。</div>
    <div>Version: 1.1.4</div>
    <a href="http://www.beian.miit.gov.cn/">蜀ICP备19025514号</a>
  </el-container>
</template>
<script>
  export default{
    methods: {
        handleCommand(command) {
            let _this = this;
            if (command === 'logout') {
                this.$confirm('注销登录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    _this.currentUserName = '游客';
                    sessionStorage.clear();
                    _this.$router.replace({path: '/'});
                })
            }
            else if (command === 'comment') {
                _this.$router.replace({path: 'comment'});
            }else if(command === 'version'){
                _this.$router.replace({path: 'version'});
            }
        },
    },
      mounted: function () {
            if(sessionStorage.getItem('nickname') == null)
                this.$router.replace({path: '/'});
            else {
                this.$router.replace({path: '/begin'});
                this.currentUserName = sessionStorage.getItem("nickname");
            }
        },
        data() {
            return {
                currentUserName: '',
                nickname: sessionStorage.getItem('nickname')
            }
        },
    }
</script>
<style>
  .home_container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .el-header {
    background-color: #20a0ff;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .el-aside {
    background-color: #ECECEC;
  }

  .el-main {
    background-color: #fff;
    color: #000;
    text-align: center;
  }

  .home_title {
    /*color: #fff;*/
    color: aquamarine;
    font-size: 28px;
    display: inline;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
    /*background-color: #fff;*/
  }

  /*.pull-height animated{*/
  /*  background-image: url("../assets/background.png");*/
  /*}*/
</style>
