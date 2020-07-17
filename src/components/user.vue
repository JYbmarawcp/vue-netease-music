<template>
  <div class="user">
    <!-- 登陆前 -->
    <div @click="onOpenModel" class="login-trigger">
      <i class="user-icon iconfont icon-yonghu"></i>
      <p class="user-name">未登录</p>
    </div>

    <!-- 登录框 -->
    <el-dialog
      :visible.sync="visible"
      :width="$utils.toRem(320)"
    >
      <p slot="title">登录</p>
      <div class="login-body">
        <el-input
          class="input"
          placeholder="请输入您的网易云uid"
          v-model="uid" 
        />
        <div class="login-help">
          <p class="help">
            1、请
            <a href="http://music.163.com" target="_blank">点我(http://music.163.com)</a>
            打开网易云音乐官网
          </p>
          <p class="help">2、点击页面右上角的“登录”</p>
          <p class="help">3、点击您的头像，进入我的主页</p>
          <p class="help">
            4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）
          </p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          :loading="loading"
          type="primary"
          class="login-btn"
          @click="onLogin(uid)"
        >
          登 录
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      loading: false,
      uid: ""
    }
  },
  methods: {
    onOpenModel() {
      this.visible = true
    },
    async onLogin() {
      this.loading = true
      // const success = await this.login(uid)
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  padding: 16px;
  padding-bottom: 0;
  margin-bottom: 12px;

  .login-trigger {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .user-icon {
    font-size: 24px;
  }
  
  .login-body {
    .input {
      margin-bottom: 16px;
    }

    .login-help {
      .help {
        margin-bottom: 4px;
      }
    }
  }

  .login-btn {
    width: 100%;
    padding: 8px 0;
  }
}
</style>