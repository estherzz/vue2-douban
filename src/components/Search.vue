<template>
  <div class="search"  :style="{backgroundColor:bgColor}">
    <div class="search-inner" v-bind:style="{backgroundColor:searchColor}">
        <span class="search-icon">
            <img src="/img/icons/search.png">
        </span>
        
        <input type="text"  v-on:touchend="searchBlur=false" v-on:blur="searchBlur=true" v-model="searchValue" :placeholder="placeholder">
        <span class="qrcode-icon">
            <img src="/img/icons/qr.png" v-show="searchBlur">
        </span>
    </div>
    <div class="right">
        <div class="cancel" v-show="!searchBlur" :style="{color:rightColor||''}">取消</div>
        <div class="info" v-show="searchBlur">
               <svg  class="icon" t="1589290513603"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2414" width="24" height="26">
            <path d="M128 768V301.248l361.344 361.376a32.032 32.032 0 0 0 45.312 0L896 301.248V768H128z m384-173.248L173.248 256h677.504L512 594.752zM64 832h896V192H64v640z" :fill="rightColor||'#6a6a6a'" p-id="2415">
            </path>
        </svg>
        <span class="info-num">1</span>
        </div>
     
    </div>
    

  
  </div>
</template>

<script>
export default {
    created(){
        // 请求一条数据作为placeholder的value
        fetch('/j/gallery/rec_topics?start='+(parseInt(46*Math.random())+1)+'&count=1')
        .then(res=>res.json())
        .then(res=>{
            let str1 = res.html;
            let index1=str1.indexOf('<span class="topic_name">')
            let index2=str1.indexOf('<span class="topic_desc">')
            let str2=str1.slice(index1,index2)
            this.placeholder = str2.slice(str2.indexOf('<span>')+6,str2.indexOf('</span>'))
            })
    },
 
  data(){
      return {
          value:'',
          placeholder:'',
          searchBlur:true,
          searchValue:''
      }
  },
  props:[
      'searchColor',
      'bgColor',
      'rightColor'
  ]
}
</script>


<style scoped lang="scss">
@import '../base.scss';
.search{
    height: 42px;
    padding: 15px;
    padding-bottom:0 ;
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    .search-inner{
        width: 88%;
        height: 30px;
        background: #efefef;
        border-radius: 15px;
        display: flex;;
        .search-icon
      {
        //    width: 16px;
        //    height: 16px;
           margin: 3px 9px;
           img{
               width: 100%;
           }
        }
        input{
            border:none;
            flex:1;
            background: transparent;
            outline:none;  
            caret-color:$color;
            &::-webkit-input-placeholder { 
                /* WebKit browsers */ 
                color: #bbb; 
                } 
        }
        .qrcode-icon{
            margin:2px 5px;
            width: 26px;
            height: 26px;
             img{
               width: 100%;
           }
        }
      
    }
    .right{
        position: relative;
        color: $color;
        // 消息-矢量图标
        svg.icon{
           padding-top: 2px;
        }
        .info-num{
            position: absolute;
            right: -2px;
            top: 2px;
            width: 12px;
            height: 12px;
            background: red;
            border-radius: 50%;
            color: #fff;
            line-height: 12px;
            font-size: 2px;
            text-align: center;
        }
    }
    
}
</style>
