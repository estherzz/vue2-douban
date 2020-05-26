<template>
  <div class="home">
    <div class="book-audio-nav">
      <router-link to="/bookaudio">电影</router-link>
      <router-link to="/bookaudio/tv">电视</router-link>
      <router-link to="/bookaudio/book">读书</router-link>
      <router-link to="/bookaudio/originalnovel">原创小说</router-link>
      <router-link to="/bookaudio/music">音乐</router-link>
      <router-link to="/bookaudio/city">同城</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.home {
  .book-audio-nav {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    a{
       border-bottom: 2px solid transparent;
        &.router-link-exact-active {
       border-bottom: 2px solid black;
       font-weight: 600;
       // vue  路由自带类名 当点击到某路由时自动添加
      color: #555;}
    }
    
  }
   
    }
   
  

</style>
<script>

export default {
  
};
</script> 
