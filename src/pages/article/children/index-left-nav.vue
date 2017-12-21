<template>
  <section class="seven-left-nav">
    <div class="home-title">
      <p>Best</p>
      <p>Story</p>
    </div>
    <div class="home-link">
      <router-link to="/photo">See all ></router-link>
      <ul class="home-more-list"><li v-for="item in articleList" :key="item.title"><router-link to="/story">{{ '#' + item.title }}</router-link></li></ul>
    </div>
    <div class="home-bottom-logo">
      @seven
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      articleList: [{
        title: 'every day'
      }, {
        title: 'how to have a house'
      }, {
        title: 'house life'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.seven-left-nav {
  padding-top: 1%;
  width: 30%;
  min-width: 200px;
  position: relative;
  background: #fff;
  .home-title {
    p{
      line-height: 60px;
      color: rgba(0, 0, 0, 0.8);
      font-weight: 900;
    }
    font-size: 60px;
  }
  .home-link{
    font-size: 24px;
    padding: 16px 0;
    text-indent: 2px;
    a{
      color: rgba(0, 0, 0, 0.7);
    }
  }
  .home-more-list{
    position: relative;
    margin-top: 40px;
    padding-top: 12px;
    &:after{
      content: '';
      width:30%;
      height: 1px;
      background: rgba(0, 0, 0, 0.7);
      position: absolute;
      top: 0;
    }
    font-size: 16px;
    li{
      margin:10px 0;
    }
  }
  .home-bottom-logo{
    font-size: 14px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
