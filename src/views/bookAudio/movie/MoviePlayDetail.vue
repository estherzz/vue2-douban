<template>
    <div class="play-list-item-detail"
                :style="{width:$store.state.screenWidth+'px',minHeight:$store.state.screenHeight+'px'}">

                <header class="play-list-item-header"  >

                    <div class="bgImg" :style="{backgroundImage:'url('+dealImg(playListItemData.bgImg?playListItemData.bgImg:'')+')'
                    }">
                    <!-- {{playListItemData.bg_color_light+playListItemData.bg_color_dark}} -->
                    <div class="mask"
                            :style="{backgroundImage: 'linear-gradient(to bottom,'+playListItemData.bg_color_light+','+playListItemData.bg_color_dark+')'}"></div>
                    </div>
                 
                    <!-- 返回箭头 -->
                    <div class="icon" @touchend="clickBack('playListItemShow')" :style="{padding:'15px'}">
                        <van-icon name="arrow-left" size="1.2em" color="#fff"></van-icon>
                    </div>
                    
                    <div class="content">
                          <img class="header-img" :src="playListItemData.img" alt="">
                          <div class="text">
                               <h1>{{playListItemData.title}}</h1>
                               <p>{{playListItemData.count+'个内容'}}</p>
                               <button :style="{backgroundColor:attention?'rgba(250,250,250,0.5)':'#fff',borderColor:'transparent',color:'#333',width:'65px',borderRadius:'4px',height:'30px'}"  @touchend="attention=!attention">{{attention?'已关注':'+ 关注'}}</button>
                          </div>
                         
                    </div>
                  

                </header>

                <!-- 内容加载中 -->
                <Loading :show="!playListItemData.title"></Loading>


                <ul style="padding: 15px;">
                    <li v-for="(item) in playListItemData.data" :key="item.id" style="margin: 8px 0;color: #111;">
                        <MovieCard :data="item" :img="item.cover_url" imgWidth="100px" titleSize="18" imgHeight="140px"
                            type="row">
                            <div class="movie-play-detail">
                                <!-- 想看 图标 -->
                                <span class="like-icon"
                                    @touchend.stop="()=>$set(item,'like',item.like==='success'?'like-o':'success')"
                                    :style="{color:item.like==='success'?'#ccc':'#F0B255'}">
                                    <van-icon :name="item.like?item.like:'like-o'" size="20px"
                                        :color="item.like==='success'?'#ccc':'#F0B255'" />
                                    {{item.like==='success'? '已想看' : '想看'}}
                                </span>
                                <p>{{item.subtitle}}</p>
                                <!-- 评论 图标 -->
                                <span class="comment-icon">
                                    <van-icon name="comment-o" size="16px" /> 查看评论</span>
                            </div>
                        </MovieCard>
                    </li>
                </ul>

            </div>
</template>
<script>
    import Loading from '@/components/Loading.vue';
    import MovieCard from '@/components/MovieCard.vue';
    
    export default {
        components:{Loading, MovieCard},
        props:['playListItemData','clickBack'],
       data(){
           return {
             attention:false,
           }
       }
    }
</script>
<style scoped lang="scss">
    .play-list-item-detail {
        padding-bottom: 40px;
            li {
                font-size: 20px;
                position: relative;
                height: 140px;

            }

            .movie-play-detail {
                height: 40px;
                font-size: 12px;
                line-height: 22px;
                p {
                    height: 100%;
                    padding: 7px 0;
                    overflow: hidden;
                    display: -webkit-box;/** 对象作为伸缩盒子模型显示 **/
                    text-overflow: ellipsis; 
                    word-break: break-all;
                    -webkit-box-orient: vertical;/** 设置或检索伸缩盒对象的子元素的排列方式 **/
                    -webkit-line-clamp: 2;/** 显示的行数 **/
                }

                .like-icon,
                .comment-icon {
                    position: absolute;
                    bottom:  6px;
                    right: 0;
                }
                .comment-icon {
                    right: 100px;
                }

            }
        }

        .play-list-item-header {
            min-height: 220px;
            position: relative;
            .bgImg{
                position: absolute;
                width: 100%;
                height: 100%;
                background-size: cover;
                z-index: -1;
                
            }
            .mask{
                width:100%;
                height:100%;
                position:absolute;
                opacity:0.6;
                z-index: -1;
            }
            .content{
                display: flex; 
                .header-img{
                width: 100px;
                height: 100px;
                margin-left: 15px;
                }  
                .text{
                    margin-left:15px ;
                    margin-right: 15px;
                    padding-bottom: 15px;
                    color: #fff;
                    font-size:15px;

                    h1{
                        font-size:24px;
                        font-weight:400;
                    }
                    p{
                        color: #ccc;
                        padding: 8px 0;
                    }
                }
              
               
            }
        }
</style>