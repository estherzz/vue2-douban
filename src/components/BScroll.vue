<template>
    <!-- <div id="bscroll"> -->
      <!-- <ul class="menu">
        <li @click="scrollTo(0, 0)">item 1</li>
        <li @click="scrollToEl('c-2')">item 2</li>
        <li @click="scrollToEl('c-3')">item 3</li>
        <li @click="scrollToEl('c-4')">item 4</li>
      </ul> -->
      <!-- <div
        class="wrapper"
        ref="wrapScroll"
      >
        <div class="content" @click="scrollTo(0, 0)">
          <div class="c-1" >content 1</div>
          <div class="c-2">content 2</div>
          <div class="c-3">content 3</div>
          <div class="c-4">content 4</div>
        </div>
      </div> -->
    <!-- </div> -->
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <!-- <ul>
          <li>jkhkjhk</li>
        </ul> -->
        <slot />
      </div>
    </div>
  </template>
   
  <script>
  import BScroll from "better-scroll";
   
  export default {
    mounted() {
      this.$nextTick(() => {
        //$refs绑定元素
        if(!this.scroll){
            this.scroll = new BScroll(this.$refs.wrapper, {
            //开启点击事件 默认为false
            click:true
        })
        // console.log(this.scroll)
        }else if(!this.$refs.wrapper){
            return
        }
        else{
            this.scroll.refresh()
        }
      })
  }
  };
  </script>
   
  <style scoped lang='scss'>
  .wrapper{
    .content{
      width: 100%;
      position: absolute;
      top: 45px;
      overflow: hidden;
      z-index: 1;
    }
  
}
  /* .menu {
    position: fixed;
    width: 200px;
    background-color: #eee;
  }
  .wrapper {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 600px;
    margin-left: 300px;
    background-color: #999;
    overflow: hidden;
  }
  .content > div {
    height: 500px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
  } */
  </style>
