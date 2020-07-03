<template>
  <div class="menu">
    <User />
    <div class="menu-wrap">
      
    </div>
  </div>
</template>

<script>
import User from "@/components/user"

import { menuRoutes } from "@/router"

export default {
  data () {
    return {
      menus: [
        {
          type: "root",
          children: menuRoutes
        }
      ]
    }
  },
  components: {
    User
  }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--menu-bgcolor);


}
</style>