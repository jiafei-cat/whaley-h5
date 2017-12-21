<template>
  <div class="seven-container">
    <s-head></s-head>
    <transition name="seven">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
    </transition>
    <transition name="seven">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>
<script>
import sHead from '@/components/head'
import '@/assets/styles/common.scss'
import '@/assets/styles/mixin.scss'
import '@/assets/styles/markdown.scss'
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

.seven-enter-active,
.seven-leave-active {
  transition: all .2s ease;
}

.seven-enter,
.seven-leave-active {
  opacity: 0;
}
.seven-container{
  background: url('assets/images/bg/bg-2.jpg') 0 0;
  background-size: cover;
  padding-top: 85px;
  overflow: auto;
}
</style>


