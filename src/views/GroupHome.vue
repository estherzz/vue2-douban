<template>
  <div class="group-home">
    <div class="join-ad" :style="{backgroundImage:'url('+dealImg(groupData[0].image)+')'}">
      <p>{{groupData[0].subtitle}}</p>
      <p>{{groupData[0].title}}</p>
    </div>
    <Title title="分类找小组" rightContent="全部" arrow="true"></Title>
    <!-- 小组tags -->
    <ul class="group-nav-list">
      <li class="group-nav-item" v-for="item in groupData[1].category_tags" :key="item.count"
        :style="{background:'#efefef url('+dealImg(item.icon_url)+') no-repeat 8px 6px'}">
        <span>{{item.name}}</span>
      </li>
    </ul>
    <Title title="热门小组排行榜" rightContent="全部" arrow="true"></Title>
    <!-- 四张轮播图 每个轮播图中有5条热门小组内容 -->
    <van-swipe :autoplay="3000" @change="indicatorChange">
      <van-swipe-item v-for="(n,i) in 4" :key="n">
        <ul class="rec-group-list">
          <li class="rec-group-item" v-for="(item,index) in recGroup(i*5,i*5+5)" :key="item.id"
            @touchstart="(e)=>dealTouchStart(e,$el,()=>{$store.commit('changeDetailId',['groupId',item.id]);$store.commit('changePageShow',['groupDetailShow',true]);groupDetailData=item})">
            <!-- 排名num -->
            <span class="num"
              :style="{backgroundColor:index+i*5<3?'#E96D73':'#F6C37C',color:'#fff'}">{{index+i*5+1}}</span>
            <!-- 头像 -->
            <img class="avatar" :src="dealImg(item.avatar)" />
            <div class="text">
              <!-- 小组名称 -->
              <p class="name">{{item.name}}</p>
              <!-- 成员数量 -->
              <p class="member-count">{{item.member_count+' 成员'}}</p>
            </div>
            <div class="join">
              <span>申请</span>
            </div>
          </li>
        </ul>

      </van-swipe-item>
      <div class="custom-indicator" slot="indicator">
        <ul>
          <li v-for="(item,index) in indicatorActive" :class="'indicator '+item" :key="index"></li>
        </ul>
      </div>
    </van-swipe>

    <!-- 单个小组详情 -->
    <van-popup v-model="$store.state.groupDetailShow" position="right" :overlay="false">
      <GroupDetail :data="groupDetailData"></GroupDetail>
    </van-popup>

    <!-- 话题详情 -->
    <van-popup v-model="$store.state.groupTopicShow" position="right" :overlay="false">
      <GroupTopic></GroupTopic>
    </van-popup>
  </div>
</template>

<script>
  import GroupDetail from '@/views/group/GroupDetail.vue';

  import Title from '@/components/Title.vue';
  import GroupTopic from '@/views/group/GroupTopic';

  export default {
    components: { Title, GroupDetail, GroupTopic },
    data() {
      return {
        groupData: [],
        indicatorActive: ['active', '', '', ''],
        groupDetailData: ''
      }
    },
    methods: {
      recGroup(a, b) {
        return this.groupData[2].groups.filter((item, index) => index < b && index >= a)
      },
      indicatorChange(index) {
        this.indicatorActive = this.indicatorActive.map((item, i) => index === i ? 'active' : '')
      }
    },
    created() {
      console.log('group');
      fetch('/api/v2/group/explore')
        .then(res => res.json())
        .then(res => {
          console.log('group', res.feed)
          this.groupData = res.feed;
        })
      fetch('/api/v2/group/rec_topics_by_tag?tag=读书')
        .then(res => res.json())
        .then(res => {
          console.log('rec_topics_by_tag?tag=读书', res)
        })
      fetch('/api/v2/group/rec_groups_by_tag?tag=读书')
        .then(res => res.json())
        .then(res => {
          console.log('rec_groups_by_tag?tag=读书', res)
        })
     
    }
  };
</script>
<style scoped lang="scss">
  @import '@/base.scss';

  @keyframes changeSize {
    from {
      font-size: 14px;
      transform: rotate(10deg);
    }

    to {
      font-size: 15px;
      transform: rotate(-10deg);

    }
  }

  ;

  .group-home {

    .join-ad {
      background-size: cover;
      background-position: center;
      width: 100%;
      text-align: center;
      height: 80px;
      line-height: 24px;
      color: #fff;
      font-size: 14px;
      padding-top: 80px;

      p {
        animation: changeSize 1s infinite alternate;
      }
    }

    .group-nav-list {
      display: flex;
      flex-wrap: wrap;
      padding: 10px 0;

      .group-nav-item {
        width: 65px;
        height: 34px;
        line-height: 34px;
        padding-left: 12px;
        text-align: center;
        border-radius: 17px;
        color: #333;
        font-size: 14px;
        margin: 4px;

      }
    }

    .rec-group-list {
      .rec-group-item {
        display: flex;
        margin: 15px 0;
        height: 70px;

        .num {
          width: 18px;
          height: 18px;
          text-align: center;
          line-height: 18px;
          font-size: 14px;
        }

        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 5px;
          margin: 0 15px;
        }

        .text {
          flex: 1;

          .name {
            font-size: 18px;
            color: #000;
          }

          .member-count {
            font-size: 14px;
            line-height: 2em;
          }
        }
      }

      /* 申请 */
      .join {
        width: 70px;
        text-align: right;

        span {
          padding: 3px 18px;
          font-size: 12px;
          border: 1px solid green;
          border-radius: 4px;
        }

      }
    }

    .custom-indicator {
      position: absolute;
      bottom: 0;
      width: 100%;

      ul {
        display: flex;
        justify-content: center;

        .indicator {
          float: left;
          width: 7px;
          height: 7px;
          border-radius: 3.5px;
          background: #ddd;
          margin: 0 3px;

          &.active {
            width: 16px;
            background: $color;
          }
        }
      }

    }






  }
</style>