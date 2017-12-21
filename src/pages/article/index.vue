<template>
  <div class="seven-article">
    <div class="seven-article-container">
      <s-lnav></s-lnav>
      <s-card></s-card>
    </div>
  </div>
</template>
<script>

import sLnav from './children/index-left-nav'
import sCard from './children/index-card'
export default {
  components: { sLnav, sCard }
}
</script>
<style lang="scss">
@import '../../assets/styles/mixin';
.seven-article{
  height: 100%;
  .seven-article-container{
    max-height: 800px;
    min-height: 650px;
    background: #fff;
    padding: 6% 6%;
    padding-right: 0;
    @include fj;
  }
}
</style>
