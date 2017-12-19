<template>
  <section class="seven-home-card">
    <swiper class="swiper-container" :options="swiperOption" :style="outStyle">
      <swiperSlide class="card-item" v-for="(item, index) in articleList" :key="item.title" :class="{'fade-out': outIndex === index}">
        <div class="card-img" :style="{'backgroundImage': 'url('+item.imgUrl+')'}"  @click="goDetail(index)">
          <p class="card-title">{{ item.title}}</p>
        </div>
        <div class="card-mes">
          <div class="mes-left">{{ 'Reads: ' + item.readerNum }}</div>
          <div class="mes-right">{{ item.time }}</div>
        </div>
      </swiperSlide>
    </swiper>
  </section>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { GO_PAGE } from '@/store/mutation-types'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      outIndex: -1,
      outStyle: {
        'overflow': 'hidden',
        'width': 'auto'
      },
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      articleList: [{
        title: 'every day',
        readerNum: '20',
        time: '2016/10/12',
        imgUrl: require('../../../assets/images/card-img/card-bg-1.png')
      }, {
        title: 'how to have a house',
        readerNum: '41',
        time: '2016/10/15',
        imgUrl: require('../../../assets/images/card-img/card-bg-2.png')
      }, {
        title: 'house life',
        readerNum: '12',
        time: '2016/11/22',
        imgUrl: require('../../../assets/images/card-img/card-bg-3.png')
      }, {
        title: 'show more sometings',
        readerNum: '13',
        time: '2016/12/12',
        imgUrl: require('../../../assets/images/card-img/card-bg-4.png')
      }]
    }
  },
  methods: {
    goDetail (index){
      this.outIndex = index
      this.outStyle.overflow = 'inherit'
      this.outStyle.width = '1200px'
      setTimeout(()=>this.GO_PAGE({'path': '/article'}), 600)
    },
    ...mapMutations({ GO_PAGE })
  },
  mounted () {
    
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss">
@import '../../../assets/styles/mixin';
@import '../../../assets/styles/animate';
.seven-home-card{
  width: 70%;
  min-width: 1300px;
  height: 100%;
  padding-left: 4%;
  min-height: 630px;
  @include fj;
  .card-item{
    padding-left: 2%;
    padding-top: 2%;
    &.fade-out{
      animation: zoomOut 3s;
    }
    .card-img{
      overflow: hidden;
      position: relative;
      transition: all .6s;
      width: 400px;
      height: 580px;
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
      &:hover{
        box-shadow: 0 15px 30px rgba(0,0,0,0.4);
        transform: translate3d(0, -3px, 0);
      }
      @include borderRadius(14px);
      img{
        height: 100%;
        
      }
      .card-title{
        width: 100%;
        padding: 0 4%;
        font-size:30px;
        color: #eee;
        text-align: center;
        @include center;
        top: 70%;
      }
      @include abBorder(80%, 50%, #eee, 40%);
    }
    .card-mes{
      margin-top: 20px;
      font-size: 12px;
      width: 400px;
      @include fj;
    }
  }
}
</style>

