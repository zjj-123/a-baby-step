<template>
  <div class="home">
    <div>
      <card> card-contenet </card>
    </div>
  </div>
</template>

<script>
import { Card } from 'element-ui';

export default {
  name: 'Home',
  components: {
    card: Card
  }
};
</script>

<style>
.home {
  margin: 20px auto;
}
</style>
