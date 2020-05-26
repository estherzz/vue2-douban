<template>
<div id="app">
    <Search :searchColor="$route.path==='/'?'#fff':''" :bgColor="$route.path==='/'?'#42BD56':'#fff'" :rightColor="$route.path==='/'?'#fff':''" v-show=" /^\/{1}(bookaudio(\/[a-z]*){0,1}){0,1}(group){0,1}$/.test($route.path)"></Search>

    <div class="nav-tab">
      <router-link to="/" class="link-home">首页</router-link>
      <router-link to="/bookaudio" class="link-bookAudio">书影音</router-link>
      <router-link to="/group" class="link-group">小组</router-link>
      <router-link to="/shop" class="link-shop">市集</router-link>
      <router-link to="/my" class="link-my">我的</router-link>
    </div>
    <div class="router-view" :style="{backgroundColor:($route.path==='/')?'#efefef':'',height:$store.state.screenHeight-170+'px'}">
       <router-view />
    </div>
   
  </div>
</template>

<style lang="scss">
@import './base.scss';
*{
  margin: 0;
  padding: 0;
}
li{
   list-style: none;
}
a{
  text-decoration: none;
  color: #6a6a6a;
  height: 100%;
  
}
h1,h2,h3,h4,h5,h6{
           font-weight: 400;
       }
#app {
  
  color: #6a6a6a;
  .router-view{
    padding: 0 15px 60px;
  }

  .nav-tab{
    z-index: 9999;
    padding: 8px 15px 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display:flex;
    justify-content: space-between;
    border-top:1px solid #eee;
    font-size: 8px;
    background: #F7F7F7;
    a {
      width: 40px;
      height: 35px;
      line-height: 54px;
      text-align: center;
       &.router-link-exact-active{
         color:$color;
       }
      background: no-repeat center top;
      background-size: 18px 18px;
    }
    .link-home{
      background-image: url('/img/icons/home.png');
      &.router-link-exact-active{
        background-image: url('/img/icons/home-active.png');
      }
    }
    .link-bookAudio{
      background-image: url('/img/icons/bookAudio.png');
      &.router-link-exact-active{
        background-image: url('/img/icons/bookAudio-active.png') ;
      }
    }
    .link-group{
      background-image: url('/img/icons/group.png');
        &.router-link-exact-active{
          background-image: url('/img/icons/group-active.png') ;
        }
      }
    .link-shop{
      background-image: url('/img/icons/shop.png');
        &.router-link-exact-active{
          background-image: url('/img/icons/shop-active.png') ;
        }
    }
    .link-my{
      background-image: url('/img/icons/my.png');
        &.router-link-exact-active{
          background-image: url('/img/icons/my-active.png');
        }
    }

    
  }
}
</style>
<script>
import Search from "./components/Search.vue";
export default {
  components: { Search },
  created(){
    let screenWidth = document.documentElement.clientWidth;
    let screenHeight = document.documentElement.clientHeight;
    console.log(screenWidth,screenHeight)
    this.$store.commit('getScreenWidth',{screenWidth,screenHeight})
  }
};
</script> 
