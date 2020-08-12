<template>
  <div class="flipper clock">
    <div v-for="i in panelNums" :key="i" class="flip down" :class="{ start: panelsState[i - 1] }">
      <!-- 位于前面的牌 -->
      <div class="digital front" :class="`num${curTime[i - 1]}`"></div>
      <!-- 位于后面的牌 -->
      <div class="digital back" :class="`num${nextTime[i - 1]}`"></div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils';

const panelNums = 6; // 牌数
const flipDuration = 500; // 翻牌动画持续时间

/**
 * diff 当前时间与下一秒时间 返回对应的牌是否需要翻的状态
 * @param curTime 当前时间
 * @param nextTime 下一秒时间
 */
function diffNums(curTime, nextTime) {
  const res = [];
  for (let i = 0; i < curTime.length; i++) {
    if (curTime[i] === nextTime[i]) {
      res.push(false);
    } else {
      res.push(true);
    }
  }
  return res;
}

export default {
  data() {
    const time = new Date();
    return {
      time, // 当前时间
      panelsState: new Array(panelNums).fill(false), // 翻牌状态
      curTime: formatDate(time, 'HHmmss'),
      nextTime: formatDate(new Date(time.getTime() + 1000), 'HHmmss'),
      timer: -1
    };
  },
  computed: {
    panelNums() {
      return panelNums;
    }
  },
  mounted() {
    this.updateTime();
  },
  updated() {
    this.curTime = formatDate(this.time, 'HHmmss');
    this.nextTime = formatDate(new Date(this.time.getTime() + 1000), 'HHmmss');
  },
  methods: {
    updateTime() {
      const newTime = new Date();
      if (newTime.getMilliseconds() >= flipDuration) {
        // 根据翻牌动画的持续时间，在整秒后延迟相应的时间才更新牌内容
        this.setState(newTime, new Array(panelNums).fill(false));
      } else if (newTime.getMilliseconds() >= 0) {
        // 在整秒时触发翻牌动画
        this.setState(this.time, diffNums(this.curTime, this.nextTime));
      }
      this.timer = requestAnimationFrame(this.updateTime);
    },
    setState(time, panelsState) {
      this.time = time;
      this.panelsState = panelsState;
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.timer);
  }
};
</script>

<style lang="less" scoped>
@panel-height: 100px; // default 100px
@panel-width: 60px; // default 60px
@panel-text-size: 66px; // default 66px
@perspective: 160px; // default 160px

.clock {
  display: flex;
  flex-direction: row;
  user-select: none;
  -webkit-box-reflect: below 1px linear-gradient(transparent, rgba(0, 0, 0, 0.4));
}

.split {
  font-size: @panel-text-size;
  line-height: 0.85 * @panel-height;
  color: #000;
}

.flip {
  margin: 0 @panel-width / 20;
  width: @panel-width;
  height: @panel-height;
  border: 1px solid #000;
  border-radius: @panel-height / 10;
  box-shadow: 0 0 @panel-width / 10 rgba(0, 0, 0, 0.5);
  position: relative;
}

.down {
  .front::after,
  .back::before {
    z-index: 1;
  }
  .front::before {
    z-index: 3;
    transform-origin: 50% 100%;
    backface-visibility: hidden;
  }
  .back::after {
    z-index: 2;
    transform-origin: 50% 0%; // 设置旋转基点
    transform: perspective(@perspective) rotateX(180deg); // 设置透视和 3D 旋转
  }
}

.digital {
  color: #fff;
  font-size: @panel-text-size;
  text-align: center;
  &::before,
  &::after {
    content: '';
    background: #000;
    position: absolute;
    left: -0.5px;
    right: -0.5px;
    box-sizing: border-box;
    overflow: hidden;
  }
  &::before {
    top: 0;
    bottom: 50%;
    border-radius: @panel-height / 10 @panel-height / 10 0 0;
    border-bottom: 1px solid #666;
    line-height: @panel-height;
  }
  &::after {
    bottom: 0;
    top: 50%;
    border-radius: 0 0 @panel-height / 10 @panel-height / 10;
    line-height: 0;
  }
}

.start {
  .front::before {
    box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
    animation: frontflipdown 0.5s cubic-bezier(0.25, 0.5, 0.75, 1) forwards;
  }
  .back::after {
    animation: backflipdown 0.5s cubic-bezier(0.25, 0.5, 0.75, 1) forwards;
  }
}

.generate-nums(@n, @i: 0) when (@i <= @n) {
  .num@{i} {
    &::before,
    &::after {
      content: '@{i}';
    }
  }
  .generate-nums(@n, (@i + 1));
}

.generate-nums(9);

@keyframes frontflipdown {
  0% {
    transform: perspective(@perspective) rotateX(0);
  }
  100% {
    transform: perspective(@perspective) rotateX(-180deg);
  }
}

@keyframes backflipdown {
  0% {
    transform: perspective(@perspective) rotateX(180deg);
  }
  100% {
    transform: perspective(@perspective) rotateX(0);
  }
}
</style>
