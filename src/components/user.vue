<template>
  <div class="user">
    <!-- 登陆前 -->
    <div @click="onOpenModel" class="login-trigger">
      <i class="user-icon iconfont icon-yonghu"></i>
      <p class="user-name">未登录</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      uid: ""
    }
  },
  methods: {
    onOpenModel() {
      this.visible = true
    },
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
    
    .user-icon {
      font-size: 24px;
    }
  }
  

}
</style>