<template>
  <div class="seven-container">
    <s-head></s-head>
    <transition :name="'seven-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <div class="seven-container-child">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </transition>
  </div>
</template>
<script>
import sHead from '@/components/head'
import '@/assets/styles/common.scss'
import '@/assets/styles/mixin.scss'
import '@/assets/styles/animate.scss'
import { mapState } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  mounted () {
  },
  components: { sHead },
  computed: {
    ...mapState({
      direction: state => state.direction
    })
  }
}
</script>
<style lang="scss">
#app,.seven-container,.seven-container-child{
  height: 100%;
}

</style>
<style lang="scss" scoped>
.seven-container{
  background: url('assets/images/bg/bg-2.jpg') 0 0;
  background-size: cover;
  .seven-container-child{
    padding-top: 85px;
  }
}
</style>


