<template>
  <div id="app">
    <div id="app__left">
      <router-view />
    </div>
    <div id="app__right">
      <TimeLine />
    </div>
  </div>
</template>

<script>
import TimeLine from './components/TimeLine';

export default {
  components: {
    TimeLine: TimeLine
  }
};
</script>

<style lang="less">
#app__left {
  overflow: hidden;
}

#app {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;

  #app__left {
    width: 80%;
    height: 100%;
    overflow: auto;
  }
  #app__right {
    width: 20%;
    height: 100%;
    min-width: 200px;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
