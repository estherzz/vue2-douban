<template>
    <div class="movie-board-play"
    :style="{width:$store.state.screenWidth+'px',minHeight:$store.state.screenHeight+'px'}">
    <div class="tab-title" :style="{position:'relative'}">
        <!-- 标签页 -->
        <van-tabs v-model="active" :line-height="1" color="#000" :line-width="40">
            <div class="icon" slot="nav-left" @touchend="clickBack('moveMovieShow')" :style="{padding:'15px'}">
                <van-icon name="arrow-left" size="1.2em"></van-icon>
            </div>
            <van-tab>
                <div slot="title" :style="{fontSize:'18px',fontWeight:'bold'}">
                    豆瓣电影
                </div>
            </van-tab>
            <van-tab>
                <div slot="title" :style="{fontSize:'18px',fontWeight:'bold'}">
                    豆瓣片单
                </div>
                <!-- 内容加载中 -->
                <Loading :show="!playListData.data"></Loading>
                <h3 style="fontSize:15px;padding:15px">{{playListData.search_titile}}</h3>

                <ul class="play-list">

                    <li class="play-list-item" v-for="item in playListData.data" :key="item.id"
                        @touchend="clickPlayList(item.id,item.target_doulist.cover_url,item.bg_image,item.bg_color_light,item.bg_color_dark,item.target_doulist.items_count,item.title)">
                        <PlayListCard :data="item"></PlayListCard>
                    </li>

                </ul>
            </van-tab>

        </van-tabs>
    </div>


</div>

</template>
<script>
    import PlayListCard from '@/components/PlayListCard.vue';
    import Loading from '@/components/Loading.vue';
    export default {
        components:{PlayListCard,Loading},
        props: ['playListData','active','clickBack','clickPlayList'],
        created () {
            
        }

    }
</script>
<style scoped lang="scss">
    .movie-board-play {
        padding-bottom: 70px;

            .van-icon {
                color: #333
            }
            .play-list {
                padding-left: 15px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;

                .play-list-item {
                    margin-right: 15px;
                    margin-bottom: 15px;
                    width: 25%;
                    &:last-type-of {
                        margin-right: 0px;
                    }
                }
            }
        }
</style>