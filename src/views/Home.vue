<template>
  <div class="home">
    <h4 class="title">初来豆瓣，写点什么吧...</h4>
    <div class="container">
      <!-- 轮播图 -->
      <van-swipe @change="indicatorChange" :show-indicators="false" :loop="false">
        <van-swipe-item class="rec-topics-item" v-for="item in topicsData.items" :key="item.id">
          <div class="inner"
            @touchstart="(e)=>dealTouchStart(e,$el,()=>{$store.commit('changeDetailId',['topicId',item.gallery_topic.id]);$store.commit('changePageShow',['topicShow',true]);})">
            <p class="tag">
              {{item.id}}
              {{dealTag(item.rec_reason)}}
            </p>
            <div class="creator" v-if="item.gallery_topic.creator">
              <img :src="dealImg(item.gallery_topic.creator.avatar)" alt="">
              <span class="creator-name">{{item.gallery_topic.creator.name}} </span>
              <span> 发起 </span>

            </div>
            <div class="title-part">
              <div class="title">
                <van-icon name="chat" color="#42BD56" size="28px"></van-icon>
                <h3>{{item.gallery_topic.name}}</h3>
              </div>

              <p class="intro">{{item.gallery_topic.introduction}}</p>
              <p class="counts">{{item.gallery_topic.card_subtitle}}</p>
            </div>
          </div>



        </van-swipe-item>

      </van-swipe>

    </div>
    <ul class="custom-indicator">
      <li class="indicator-item" v-for="(item,index) in 20" :key="index" :style="{
          transition:'1s left',
          left:idx<3?index*10+'px':(idx<17?((index-idx+2)*10+'px'):(index-15)*10+'px'),
          backgroundColor:idx===index?'#42BD56':'',
          width:size(index,20),
          height:size(index,20)
         
      }"></li>
    </ul>

    <!-- 话题详情 -->
    <van-popup v-model="$store.state.topicShow" position="right" :overlay="false">
        <Topic></Topic>
    </van-popup>

  </div>
</template>

<script>

  import Topic from '@/views/home/Topic'
  export default {
    components: {
      Topic
    },
    data() {
      return {
        topicsData: [],
        idx: 0,
      }
    },
  
    created() {
      fetch('/api/v2/gallery/rec_topics?start=0&count=20')
        .then(res => res.json())
        .then(res => {
          console.log('rec_topics', res)
          this.topicsData = res
        })
      // hot topics
      fetch('/api/v2/gallery/topic/142759/items?sort=hot&start=0&count=20&status_full_text=1&guest_only=0&ck=null')
        .then(res => res.json())
        .then(res => {
          console.log('topics hot', res)
          // this.topicsData = res
        })
      // new topics
      fetch('/api/v2/gallery/topic/142759/items?sort=new&start=0&count=20&status_full_text=1&guest_only=0&ck=null')
        .then(res => res.json())
        .then(res => {
          console.log('topics new', res)
          // this.topicsData = res
        })
    },
    methods: {
      indicatorChange(index) {
        this.idx = index;
      },
      dealTag(tag) {
        if (tag === '热门话题') {
          return '热门'
        } else if (tag === '新话题') {
          return '新发起'
        } else {
          return ''
        }
      },
      // 小圆点 宽高处理
      size(index, max) {
        if (this.idx < 3) {
          return index >= 4 ? '5px' : '6px'
        } else if (this.idx >= max - 3) {
          return index <= max - 5 ? '5px' : '6px'

        } else {
          if (index !== this.idx && index !== (this.idx + 1) && index !== this.idx && index !== (this.idx - 1)) {
            return '4px'
          } else {
            return '6px'
          }
        }

      }
    }

  }
</script>
<style scoped lang="scss">
  @import '@/base.scss';

  .home {
    background: #efefef;
    height: 100%;

    h4 {
      width: 100%;
      font-weight: 700;
      color: #000;
      padding-top: 40%;
      padding-bottom: 15px;

    }

    .container {
      overflow: hidden;
    }

    .van-swipe {
      overflow: visible !important;
      width: 93%;

      .van-swipe-item {
        .inner {
          height: 320px;
          margin-right: 10px;
          position: relative;
          background: #fff;
          border-radius: 10px;
          padding: 20px;

          .tag {
            width: 80px;
            height: 25px;
            text-align: right;
            position: absolute;
            top: 15px;
            right: 15px;
            color: $color;
          }

          .creator {
            width: 200px;
            height: 40px;
            position: absolute;
            top: 5px;
            left: 20px;

            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              margin-right: 10px;
              transform: translateY(10px);
            }

            .creator-name {
              color: #111;
            }
          }

          .title-part {
            padding-top: 20px;

            .title {
              padding: 10px 0;

              .van-icon {
                padding-right: 10px;
                transform: translate(0, 5px)
              }

              h3 {
                color: #000;
                font-weight: 700;
                font-size: 22px;
                display: inline;
              }
            }

            .intro {
              line-height: 1.5em;
              max-height: 190px;
              overflow: hidden;
              display: -webkit-box;
              /** 对象作为伸缩盒子模型显示 **/
              text-overflow: ellipsis;
              word-break: break-all;
              -webkit-box-orient: vertical;
              /** 设置或检索伸缩盒对象的子元素的排列方式 **/
              -webkit-line-clamp: 8;
              /** 显示的行数 **/
            }

            .counts {
              font-size: 11px;
              line-height: 4em;

            }
          }


        }
      }
    }

    .custom-indicator {
      width: 46px;
      height: 20px;
      line-height: 20px;
      left: 50%;
      margin-left: -25px;
      position: absolute;
      bottom: 23%;
      z-index: 1;
      overflow: hidden;

      .indicator-item {

        border-radius: 50%;
        background: #ccc;
        position: absolute;
      }
    }
  }
</style>