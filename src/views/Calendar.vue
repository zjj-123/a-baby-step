<template>
  <div class="calendar">
    <div class="calendar-body">
      <div class="grid-container border-layer">
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
      </div>
      <div class="grid-container number-layer">
        <div class="grid-item"><span>28</span><span>十四</span></div>
        <div class="grid-item"><span>29</span><span>十五</span></div>
        <div class="grid-item"><span>30</span><span>十六</span></div>
        <div class="grid-item"><span>1</span><span>十七</span></div>
        <div class="grid-item"><span>2</span><span>十八</span></div>
        <div class="grid-item"><span>3</span><span>十九</span></div>
        <div class="grid-item"><span>4</span><span>廿十</span></div>
        <div class="grid-item"><span>5</span><span>廿一</span></div>
        <div class="grid-item"><span>6</span><span>廿二</span></div>
        <div class="grid-item"><span>7</span><span>廿三</span></div>
        <div class="grid-item"><span>8</span><span>廿四</span></div>
        <div class="grid-item"><span>9</span><span>廿五</span></div>
        <div class="grid-item"><span>10</span><span>廿六</span></div>
        <div class="grid-item"><span>11</span><span>廿七</span></div>
        <div class="grid-item"><span>12</span><span>廿八</span></div>
        <div class="grid-item"><span>13</span><span>廿九</span></div>
        <div class="grid-item"><span>14</span><span>初一</span></div>
        <div class="grid-item"><span>15</span><span>初二</span></div>
        <div class="grid-item"><span>16</span><span>初三</span></div>
        <div class="grid-item"><span>17</span><span>初四</span></div>
        <div class="grid-item"><span>18</span><span>初五</span></div>
        <div class="grid-item"><span>19</span><span>初六</span></div>
        <div class="grid-item"><span>20</span><span>初七</span></div>
        <div class="grid-item"><span>21</span><span>初八</span></div>
        <div class="grid-item"><span>22</span><span>初九</span></div>
        <div class="grid-item"><span>23</span><span>初十</span></div>
        <div class="grid-item"><span>24</span><span>十一</span></div>
        <div class="grid-item"><span>25</span><span>十二</span></div>
        <div class="grid-item"><span>26</span><span>十三</span></div>
        <div class="grid-item"><span>27</span><span>十四</span></div>
        <div class="grid-item"><span>28</span><span>十五</span></div>
        <div class="grid-item"><span>29</span><span>十六</span></div>
        <div class="grid-item"><span>30</span><span>十七</span></div>
        <div class="grid-item"><span>1</span><span>十八</span></div>
        <div class="grid-item"><span>2</span><span>十九</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      calendar: {
        left: 0,
        top: 0
      },
      borderLayer: null,
      timeID: null
    };
  },
  mounted() {
    this.getBorderLayerInfo();
    window.onresize = () => {
      if (this.timeID) window.clearTimeout(this.timeID);
      this.timeID = window.setTimeout(this.getBorderLayerInfo, 250);
    };
    let calendar = document.querySelector('.calendar');
    console.log(calendar);
    if (calendar) {
      calendar.addEventListener('mousemove', this.listenerMousemove);
      this.$once('hook:beforeDestroy', () => {
        calendar.removeEventListener('mousemove', this.listenerMousemove);
      });
    }
  },
  methods: {
    listenerMousemove(e) {
      const { clientX, clientY } = e;
      const left = clientX - this.calendar.left;
      const top = clientY - this.calendar.top;

      this.borderLayer.style.webkitMaskPosition = `${left - 80}px ${top - 80}px`;
    },
    getBorderLayerInfo() {
      // 获取网格信息以及在视窗中的位置信息
      this.borderLayer = document.querySelector('.border-layer');
      let { left, top } = this.borderLayer.getBoundingClientRect();
      this.calendar.left = left;
      this.calendar.top = top;
    }
  }
};
</script>

<style scoped>
.calendar {
  margin: 0;
  height: 100%;
  padding: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  font-family: system;
  flex-direction: row;
  justify-content: center;
  background: #000000aa;
}

.calendar-body {
  width: 380px;
  height: 240px;
  position: relative;
}
.grid-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
}

.grid-item {
  margin: 2px;
}

.border-layer {
  position: absolute;
  pointer-events: none;
  visibility: hidden;
  mask-image: radial-gradient(circle at center, white 0%, transparent 80px);
  mask-repeat: no-repeat;
  mask-size: 160px 160px;
}

.calendar:hover .border-layer {
  visibility: visible;
}

.border-layer .grid-item {
  border: 2px solid #ffffff66;
}

.number-layer .grid-item {
  color: white;
  font-size: 14px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.number-layer .grid-item:hover {
  border: 2px solid #ffffff66;
}
.number-layer .grid-item span:last-child {
  font-size: 12px;
}
</style>
