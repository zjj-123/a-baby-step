<template>
  <div id="app">
    <div id="app__left">
      <router-view />
    </div>
    <div id="app__right">
      <TimeLine :activities="activities" />
    </div>
  </div>
</template>

<script>
import TimeLine from './components/element/TimeLine';

export default {
  components: {
    TimeLine: TimeLine
  },
  data() {
    return {
      activities: [
        {
          content: '蒙布',
          timestamp: '2020-08-06',
          path: '/calendar'
        },
        {
          content: '拖拽',
          timestamp: '2020-08-07',
          path: '/dragAndDrop'
        },
        {
          content: 'Grid',
          timestamp: '2020-08-10',
          path: '/gridTest'
        },
        {
          content: '组件封装',
          timestamp: '2020-08-11',
          path: '/myEleTable'
        },
        {
          content: '翻牌时钟',
          timestamp: '2020-08-12',
          path: '/flipper'
        }
      ]
    };
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
