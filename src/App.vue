<template>
  <div class="seven-container">
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
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
import '@/assets/styles/common.scss'
import '@/assets/styles/mixin.scss'
import { mapState } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      xx: 'xx'
    }
  },
  mounted () {
  },
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


