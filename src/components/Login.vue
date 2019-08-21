<!--<template>-->
<!--  <el-row :gutter="0">-->
<!--  <el-form  class="login-container" label-position="left" label-width="0px">-->
<!--    <h3 class="login_title">系统登录</h3>-->

<!--    <el-form-item  style="margin-bottom: 80px">-->
<!--      <el-input type="text" v-model="nickname" auto-complete="off" placeholder="昵称"></el-input>-->
<!--    </el-form-item>-->

<!--    <el-form-item style="margin-bottom: 80px">-->
<!--      <el-input type="password" v-model="password" auto-complete="off" placeholder="密码"></el-input>-->
<!--    </el-form-item>-->

<!--    <el-tooltip placement="top">-->
<!--      <div slot="content">-->
<!--        1. 本网站仅用于学习使用，严禁违法行为！<br/>-->
<!--        2. 本网站安全系数较低，密码请不要设置为惯用密码！<br/>-->
<!--        3. 如果您觉得本网站有意义，欢迎加入我们协同开发！<br/>-->
<!--        4. 如果没有账号，请联系管理员获取！-->
<!--      </div>-->
<!--      <el-button style="width: 100% ;margin-bottom: 80px" type="warning">注意事项</el-button>-->
<!--    </el-tooltip>-->

<!--    <el-form-item style="width: 100% ;margin-bottom: 80px">-->
<!--      <el-button type="success" @click.native.prevent="submitClick()" style="width: 100%">登录</el-button>-->
<!--    </el-form-item>-->
<!--  </el-form>-->

<!--  </el-row>-->

<!--</template>-->
<template>
  <div id="app">
    <login-with-up
      ref="LoginUp"
      :loginCallBack="login"
      :bgImageUrl="bgImageUrl"
      :systemName="systemName"
      :loginTitle="loginTitle"
      :loginNameLabel="loginNameLabel"
      :loginNameHolder="loginNameHolder"
      :loginPwdLabel="loginPwdLabel"
      :loginPwdHolder="loginPwdHolder"
    >
    </login-with-up>
  </div>
</template>
<script>
  import {postRequest} from '../utils/api'
  import loginWithUp from 'login-with-up'
  export default{
    data(){
      return {
          formLabelWidth: '80px',
          bgImageUrl: "",
          systemName:"Leetcode刷题宝典",
          loginTitle:"用户登录",
          loginNameLabel:"用户名",
          loginNameHolder:"请输入用户名",
          loginPwdLabel:"密码",
          loginPwdHolder:"请输入用户密码",
      }
    }, components:{ //注册组件
          loginWithUp
      },

    methods: {
      login: function () {
            let _this = this;
            postRequest('/user/loginOrRegister', {},{
                nickname: _this.$refs.LoginUp.login.username,
                password: _this.$refs.LoginUp.login.password,
            }).then(resp=> {
                if(resp.data.code === 0){
                  sessionStorage.setItem("nickname", resp.data.data.nickname);
                  sessionStorage.setItem("hello",resp.data.data.hello);
                  sessionStorage.setItem("role",resp.data.data.role);
                  sessionStorage.setItem("token", resp.data.data.token);
                  _this.$router.push({path: '/home'});
                }else{
                  _this.$alert(resp.data.msg);
                }
              }, resp=> {
                _this.$alert('服务器繁忙');
              });
      }
    }
  }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 500px;
    height: 800px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    background-image: url("../assets/login.png");
    background-size: contain;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
