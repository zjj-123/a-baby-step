<template>
  <div class="Card__Body">
    <div class="header" v-if="$slots.header || title || data.title">
      <slot name="header" :title="title ? title : data.title">
        {{ this.title ? this.title : this.data.title }}
      </slot>
    </div>

    <div class="content">
      <slot></slot>
    </div>

    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    title: String,
    data: Object
  },
  data() {
    return {
      moveElement: null,
      top: 0,
      left: 0,
      maxLeft: 0,
      maxTop: 0
    };
  },
  mounted() {
    document.addEventListener('mousedown', this.mouseDown);
    document.addEventListener('mouseup', this.mouseUp);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('mousedown', this.mouseDown);
      document.removeEventListener('mouseup', this.mouseUp);
    });
  },
  methods: {
    mouseDown(e) {
      const { clientX, clientY } = e;
      let flag = false;
      e.path.some(item => {
        if (item.className === 'header') {
          flag = true;
        }
        if (item.className === 'Card__Body' && flag) {
          document.querySelector('body').classList.add('onMove');
          this.maxTop = document.querySelector('#app__left').offsetHeight - item.offsetHeight - 20;
          this.maxLeft = document.querySelector('#app__left').offsetWidth - item.offsetWidth - 20;
          this.moveElement = item;
          this.left = clientX - this.moveElement.offsetLeft;
          this.top = clientY - this.moveElement.offsetTop;
          document.addEventListener('mousemove', this.mouseMove);
        }
      });
    },
    mouseUp() {
      if (this.moveElement) {
        document.querySelector('body').classList.remove('onMove');
        document.removeEventListener('mousemove', this.mouseMove);
        this.moveElement = null;
      }
    },
    mouseMove(e) {
      let { clientX, clientY } = e;
      let moveLeft = clientX - this.left - 10;
      let moveTop = clientY - this.top - 10;
      if (this.maxLeft < moveLeft) {
        this.moveElement.style.left = this.maxLeft + 'px';
      } else {
        this.moveElement.style.left = moveLeft + 'px';
      }
      if (this.maxTop < moveTop) {
        this.moveElement.style.top = this.maxTop + 'px';
      } else {
        this.moveElement.style.top = moveTop + 'px';
      }
    }
  }
};
</script>

<style lang="less">
@padding: 10px;

.onMove {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.Card__Body {
  position: absolute;
  margin: 10px;
  width: 200px;
  min-height: 100px;
  border-radius: 5px;
  border: solid 1px gainsboro;
  .header {
    padding: @padding;
    cursor: move;
    border-bottom: solid 1px gainsboro;
  }
  .content {
    padding: @padding;
  }
  .footer {
    padding: @padding;
    border-top: solid 1px gainsboro;
  }
}
</style>
