<template>
  <div class="seven-home">
    <div class="seven-home-container">
      <s-lnav></s-lnav>
      <s-card></s-card>
    </div>
  </div>
</template>
<script>

import sLnav from './children/seven-left-nav'
import sCard from './children/seven-card'
export default {
  components: { sLnav, sCard }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';
.seven-home{
  height: 100%;
  .seven-home-container{
    max-height: 800px;
    min-height: 650px;
    background: #fff;
    padding: 6% 6%;
    padding-right: 0;
    @include fj;
  }
}
</style>
