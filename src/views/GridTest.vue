/* 关于Grid https://juejin.im/post/6854573220306255880 */
<template>
  <div class="Grid__Text">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="FlowAuto" name="first">
        <!-- first -->
        <h3>自动布局，先行后列</h3>
        <div class="wrapper">
          <div
            class="Grid__item"
            v-for="item in gridList"
            :key="'row:' + item.value"
            :style="item.style"
          >
            {{ item.value }}
          </div>
        </div>
        <h3>先行后列 dense</h3>
        <div class="wrapper" style="grid-auto-flow: row dense;">
          <div
            class="Grid__item"
            v-for="item in gridList"
            :key="'dense:' + item.value"
            :style="item.style"
          >
            {{ item.value }}
          </div>
        </div>
        <h3>先列后行</h3>
        <div class="wrapper" style="grid-auto-flow: column;">
          <div
            class="Grid__item"
            v-for="item in gridList"
            :key="'col:' + item.value"
            :style="item.style"
          >
            {{ item.value }}
          </div>
        </div>
      </el-tab-pane>
      <!-- second -->
      <el-tab-pane label="Areas" name="second">
        <div class="wrapper-areas">
          <div class="Grid__item Grid__header ">header</div>
          <div class="Grid__item Grid__sideLeft ">sideLeft</div>
          <div class="Grid__item Grid__sideRight">sideRight</div>
          <div class="Grid__item Grid__body">body</div>
          <div class="Grid__item Grid__footer">footer</div>
        </div>
      </el-tab-pane>
      <!-- third -->
      <el-tab-pane label="GridStartEnd" name="third">
        <div class="wrapper-startend">
          <div class="Grid__one Grid__item">One</div>
          <div class="Grid__two Grid__item">Two</div>
          <div class="Grid__three Grid__item">Three</div>
          <div class="Grid__four Grid__item">Four</div>
          <div class="Grid__five Grid__item">Five</div>
          <div class="Grid__six Grid__item">Six</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { Tabs, TabPane } from 'element-ui';

export default {
  name: 'gridTest',
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane
  },
  data() {
    return {
      activeName: 'first',
      gridList: [
        {
          value: '1',
          style: 'grid-column-start: span 1;background-color:red'
        },
        {
          value: '2',
          style: 'background-color:#338833;'
        },
        {
          value: '3',
          style: 'grid-column-start: span 2;background-color:#336699;'
        },
        {
          value: '4',
          style: 'grid-column-start: span 2;background-color:#4477dd;'
        },
        {
          value: '5',
          style: 'background-color:#aa6699;'
        },
        {
          value: '6',
          style: 'background-color:#aa66ff;'
        },
        {
          value: '7',
          style: 'background-color:#aaffff;'
        },
        {
          value: '8',
          style: 'background-color:#f0f0f0;'
        }
      ]
    };
  },
  methods: {
    handleClick() {
      console.log('click');
    }
  }
};
</script>

<style lang="less">
// 需要注意 grid-template-rows 和 grid-auto-rows 的区别
.wrapper,
.wrapper-areas,
.wrapper-startend {
  margin: 0 auto;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, minmax(50px, auto));
}
.wrapper {
  grid-auto-flow: row;
}
//相同 grid-area 必须是连续的四边形box，否则会布局失败
// 句号（.）表示一个空白占位单位格
// 例如：grid-column-start:span 2 那么分配的宽度需要和span 后的一直
.wrapper-areas {
  grid-template-areas:
    '. . header . . '
    'sideLeft body body body sideRight'
    '. footer footer footer . ';
}
.Grid__Text {
  width: 600px;
  margin: 0 auto;
}
.Grid__header {
  grid-area: header;
  background-color: darkgrey;
}
.Grid__sideLeft {
  grid-area: sideLeft;
  background-color: antiquewhite;
}
.Grid__sideRight {
  grid-area: sideRight;
  background-color: antiquewhite;
}
.Grid__body {
  grid-area: body;
  background-color: antiquewhite;
}
.Grid__footer {
  grid-area: footer;
  background-color: aqua;
}
// grid-column,grid-row 直接指定单元格位置坐标
//  grid-column-start.grid-column-end,grid-row-start,grid-row-end
// 计数基准为边线
//         1      2      3
// 1
//        |----| |----|
//       |    | |    |
//      |----| |----|
// 2
//     |----| |----|
//    |    | |    |
//   |----| |----|
// 3
.Grid__one {
  grid-column-start: 1;
  grid-column-end: 3;
  background: #19caad;
}
.Grid__two {
  grid-column-start: 3;
  grid-column-end: 6;
  grid-row-start: 1;
  grid-row-end: 2;
  /*   如果有重叠，就使用 z-index */
  z-index: 1;
  background: #8cc7b5;
}
.Grid__three {
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 4;
  background: #d1ba74;
  z-index: 2;
}
.Grid__four {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 5;
  background: #bee7e9;
}
.Grid__five {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 5;
  background: #e6ceac;
}
.Grid__six {
  grid-column: 5;
  grid-row: 4;
  background: #ecad9e;
}
// 通用样式
.Grid__item {
  padding: 10px;
  display: flex;
  align-items: center;
  overflow: hidden;
  border: solid 1px gray;
  border-radius: 5px;
}
</style>
