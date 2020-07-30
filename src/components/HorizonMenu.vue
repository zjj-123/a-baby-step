<template>
  <div class="HorizonMenu">
    <div>
      <span style="float:left">logo</span>
    </div>
    <div>
      <el-input />
    </div>
    <div>
      <div id="userDiv" v-if="ifLogin" style="float:right">
        <avatar icon="el-icon-user-solid" class="inline__middle" />
        <div class="inline__middle">登录</div>
        <div class="inline__middle">注册</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Avatar, Input } from 'element-ui';

export default {
  name: 'HorizonMenu',
  components: {
    avatar: Avatar,
    'el-input': Input
  },
  data() {
    return {
      ifLogin: true
    };
  }
};
</script>

<style>
.HorizonMenu {
  height: 60px;
  width: 100%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
}
.HorizonMenu div {
  width: 33%;
}
.inline__middle {
  display: inline-block;
  vertical-align: middle;
}
</style>
