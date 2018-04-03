<template>
  <div>
    <canvas id="canvas" class="canvas"></canvas>
      <h1 class="title" style="color: black">webpack打包测试</h1>
    <!-- <div class="city"></div>
    <div class="moon"></div> -->
  </div>
</template>
<script>
  import Stars from 'Stars'
  import Moon from 'Moon'
  import Meteor from 'Meteor'
  import Conf from 'config'
  export default {
    components: {},
    props: {},
    data () {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      }
    },
    methods: {
      doLogin: function () {
        /*Conf.hasCommonBar = true
        this.$router.push({name: 'planIndex'})*/
      }
    }
  }
</script>

<style scoped>
  .title {
    padding: 30px 0;
    color: white;
    text-align: center;
  }

  .moon {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 100px;
    top: 100px;
    background: url('../../assets/images/moon.png') no-repeat;
    background-size: cover;
  }

  .canvas {
    position: fixed;
    z-index: 0;
  }

  #login {
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .back {
    position: fixed;
    left: 20px;
    top: 20px;
    width: 30px;
    height: 30px;
    background: url('../../assets/images/back.png') no-repeat;
    background-size: cover;
    cursor: pointer;
  }

  .city {
    width: 100%;
    height: 170px;
    position: fixed;
    bottom: 0px;
    z-index: 100;
    background: url('../../assets/images/city.png') no-repeat;
    background-size: cover;
  }

  .gv {
    text-decoration: none;
    background: url('../../assets/images/nav_gv.png') repeat 0px 0px;
    width: 130px;
    height: 43px;
    display: block;
    text-align: center;
    line-height: 43px;
    cursor: pointer;
    float: left;
    margin: 10px 2px 10px 2px;
    font: 18px/43px 'microsoft yahei';
    color: #066197;
  }

  .nav {
    width: 200px;
    height: auto;
    position: absolute;
    z-index: 10000;
    top: 350px;
    left: 50%;
    margin-left: -100px;
  }

  a.gv:hover {
    background: url('../../assets/images/nav_gv.png') repeat 0px -43px;
    color: #1d7eb8;
    -webkit-box-shadow: 0 0 6px #1d7eb8;
    transition-duration: 0.5s;
  }

  .login-box {
    width: 600px;
    padding: 50px;
    margin: 40px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 100001;
  }

  .login-box .logo {
    width: 270px;
    height: 108px;
    margin-bottom: 20px;
    background: url('../../assets/images/logo.png') no-repeat;
    background-size: cover;
  }

  .ipunt-wrap label {
    display: inline-block;
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin-right: 10px;
    background-size: cover;
  }

  .icon-id {
    background: url('../../assets/images/id.png') no-repeat;
  }

  .icon-user {
    background: url('../../assets/images/user.png') no-repeat;
  }

  .icon-password {
    background: url('../../assets/images/password.png') no-repeat;
  }

  .ipunt-wrap input {
    border: none;
    outline: none;
    background: none;
    border-bottom: 1px solid #fff;
    margin-top: 30px;
    width: 200px;
    height: 30px;
    line-height: 30px;
    /* text-align: center; */
    color: #fff;
    font-size: 14px;
    padding: 0 5px;
  }

  .button {
    margin-top: 30px;
    margin-left: 60px
  }

  .toregist {
    font-size: 12px;
    float: right;
    padding-top: 20px;
    color: #fff;
  }

  .toregist a {
    color: #066197;
    text-decoration: none;
  }

</style>
