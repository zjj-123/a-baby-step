<template>
  <div>
    <div class="radio">
      排序：
      <el-radio-group v-model="reverse">
        <el-radio :label="true">倒序</el-radio>
        <el-radio :label="false">正序</el-radio>
      </el-radio-group>
    </div>

    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
      >
        <div class="Content__Item" @click="clickItem(activity)">
          {{ activity.content }}
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { Timeline, TimelineItem, Radio, RadioGroup, RadioButton } from 'element-ui';

export default {
  name: 'TimeLine',
  components: {
    [Timeline.name]: Timeline,
    [TimelineItem.name]: TimelineItem,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [RadioButton.name]: RadioButton
  },
  props: {
    activities: Array[Object]
  },
  data() {
    return {
      reverse: true
    };
  },
  methods: {
    clickItem(e) {
      if (this.$route.path === e.path) return;
      this.$router.replace(e.path);
    }
  }
};
</script>

<style>
.Content__Item {
  cursor: pointer;
}
.radio {
  margin: 20px 0;
}
</style>
