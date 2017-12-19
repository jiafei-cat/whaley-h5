<template>
  <section class="seven-head-container">
    <div class="head-logo"><img src="../assets/images/logo-white.png" alt=""></div>
    <div class="head-nav">
      <ul>
        <li v-for="item in navList" :key="item.name" :class="{ 'active': curPath === item.path }"><router-link :to="item.path">{{ item.name }}</router-link></li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      navList: [
        {
          name: 'Home',
          path: '/home'
        }, {
          name: 'Article',
          path: '/article'
        }, {
          name: 'Photo',
          path: '/photo'
        }, {
          name: 'Abouts',
          path: '/abouts'
        }
      ]
    }
  },
  computed: {
    curPath () {
      return '/' + this.$route.name
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/mixin';
.seven-head-container {
  width: 100%;
  padding: 10px;
  position: fixed;
  display: flex;
  top: 0;
  @include fj;
  .head-logo {
    height: 65px;
    padding-left: 20px;
    padding-top: 10px;
    width:20%;
    img {
      width: 100px;
    }
  }
  .head-nav {
    padding:0 16%;
    padding-right: 6%;
    width:60%;
    line-height: 65px;
    ul {
      @include fj;
      li a{
        font-weight: 900;
        color: #eee;
      }
      li{
        position: relative;
        &:after{
          opacity: 0;
          content: '';
          width: 0;
          height: 3px;
          background: rgba(0, 0, 0, 1);
          transition: all 1s;
          @include center;
          top: 80%;
        }
        &:hover{
          &:after{
            width: 50%;
            opacity: 1;
          }
        }
      }
      li.active{
        &:after{
          opacity: 1;
          width: 50%;
        }
        a{
          color: rgba(0, 0, 0, .8);
        }
      }
    }
  }
}
</style>