<template>
  <div class="Home__Body">
    <card :data="cardData">
      <template v-slot:footer>这是JIO</template>
    </card>
  </div>
</template>

<script>
import Card from '../components/Card';

export default {
  name: 'DragAndDrop',
  components: {
    [Card.name]: Card
  },
  data() {
    return {
      cardData: {
        title: '头部可进行拖拽',
        body: 'body',
        footer: 'footer'
      },
      imageUrl: ''
    };
  },
  methods: {}
};
</script>

<style scoped>
.Home__Body {
  width: 100%;
  height: 100%;
}
.card {
  width: 200px;
}
.avatar {
  width: 100%;
}
</style>
