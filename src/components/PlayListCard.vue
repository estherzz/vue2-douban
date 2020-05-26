<template>
    <div class="play-list-card">
        <img :src="img?img:data.target_doulist.cover_url" alt="图片加载失败" onerror="this.src='/img/playlist-default.png'">
        <p class="title">{{data.title}}</p>
        <p class="num">看过0部/<span>{{data.target_doulist.items_count}}部</span></p>
    </div>
</template>
<script>
    export default {
        props: ['data','img']
    }
</script>
<style scoped lang="scss">
    .play-list-card{
        img{
            width: 100%;
        }
        .title{
            font-size:10px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            padding-bottom: 6px;
        }
        .num{
            font-size:6px;
            span{
            color: #aaa;
            }

        }
    }
</style>