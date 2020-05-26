<template>
    <div class="movie-card" :style="{display:type==='row'?'flex':''}" @touchstart="(e)=>dealTouchStart(e,$el,()=>{$store.commit('changeDetailId',['movieId',data.id]);$store.commit('changePageShow',['movieDetailShow',true])})">
        <div class="img" :style="{width:imgWidth?imgWidth:'100%',height:imgHeight?imgHeight:'90%'}">
            <img :src="dealImg(img?img:data.cover)" onerror="this.src='/img/movie-default.jpg'">
        </div>

        <div class="content">
            <div class="title" :style="{fontSize:titleSize?titleSize+'px':''}">{{data.title}}</div>
            <div class="rate">
                <!-- 评分星星 -->
                <ul class="rate-star">
                    <li v-for="item in 5" :key="item">
                        <!-- v-if判断评分-黄星星部分 -->
                        <span v-if="item-1 <= rate/2"
                            :style="{position: item>rate/2?'absolute':'',overflow:'hidden',width:item>rate/2?(rate/2-(item-1))*14+'px':'14px'}">
                            <svg class="icon" t="1589354275844" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="6586" :width="14" height="14">
                                <path
                                    d="M490.261333 173.44a49.066667 49.066667 0 0 1 64.064 19.178667l1.664 3.093333 87.850667 177.813333 196.352 28.501334a49.066667 49.066667 0 0 1 29.717333 81.066666l-2.538666 2.645334L725.333333 624l33.536 195.349333a49.066667 49.066667 0 0 1-68.010666 53.269334l-3.157334-1.514667L512 778.858667l-175.701333 92.266666a49.066667 49.066667 0 0 1-71.637334-48.426666l0.469334-3.328L298.666667 624.021333 156.629333 485.76a49.066667 49.066667 0 0 1 23.893334-83.114667l3.285333-0.597333 196.352-28.501333 87.850667-177.813334a49.066667 49.066667 0 0 1 22.250666-22.272z"
                                    p-id="6587" fill="#F0B255"></path>
                            </svg>
                        </span>

                        <!-- v-if判断评分 灰黄星星部分 -->
                        <svg v-if="item > rate/2" t="1589354275844" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6586" width="14" height="14">
                            <path
                                d="M490.261333 173.44a49.066667 49.066667 0 0 1 64.064 19.178667l1.664 3.093333 87.850667 177.813333 196.352 28.501334a49.066667 49.066667 0 0 1 29.717333 81.066666l-2.538666 2.645334L725.333333 624l33.536 195.349333a49.066667 49.066667 0 0 1-68.010666 53.269334l-3.157334-1.514667L512 778.858667l-175.701333 92.266666a49.066667 49.066667 0 0 1-71.637334-48.426666l0.469334-3.328L298.666667 624.021333 156.629333 485.76a49.066667 49.066667 0 0 1 23.893334-83.114667l3.285333-0.597333 196.352-28.501333 87.850667-177.813334a49.066667 49.066667 0 0 1 22.250666-22.272z"
                                p-id="6587" fill="#aaa"></path>
                        </svg>

                    </li>
                </ul>
                <span class="rate-num">{{rate}}</span>
            </div>
            <slot></slot>
        </div>

    </div>
</template>

<script>
    export default {
        props: ['type', 'data', 'img', 'imgWidth', 'titleSize', 'bgImg', 'bgImgWidth', 'imgHeight'],
        data() {
            return {
                rate: this.data.rate ? this.data.rate : this.data.rating.value,
                touchStart:''

            }
        },
      
    }
</script>

<style scoped lang="scss">
    .movie-card {
        height: 100%;

        .img {
            overflow: hidden;
            min-height: 50%;
            margin-right: 10px;
            min-width: 38px;
            display: flex;

            img {
                width: 100%;
                border-radius: 5px;

            }
        }

        .content{
            flex:1
        }
        .title {
            font-size: 13px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            padding: 3px 0;
        }

        .rate {
            display: flex;

            ul.rate-star {
                display: flex;

                li {
                    width: 14px;
                    height: 20px;
                }
            }
        }

        .rate-num {
            font-size: 12px;
            margin-left: 2px;
            line-height: 20px;
        }
    }
</style>