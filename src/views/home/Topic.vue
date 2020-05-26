<template>
    <div class="topic"
        :style="{width:$store.state.screenWidth+'px',minHeight:$store.state.screenHeight+'px'}">
        <!-- 返回箭头 -->
        <div class="icon" @touchend="$store.commit('changePageShow',['topicShow',false])" :style="{padding:'15px',position: 'sticky',top: '0px',display:'flex',background:'#f7f7f7',
 zIndex: 1}">
            <van-icon name="arrow-left" size="20px" color="#000" />

            <h5 class="title"
                style="font-weight: 700; color: #000; padding-left: 15px;overflow:hidden;text-overflow: ellipsis;word-wrap: no-wrap;">
                {{hotTopicData[0]?hotTopicData[0].topic.name:''}}</h5>
            {{scrollTop}}
        </div>
        <Loading v-if="!hotTopicData[0]" style="text-align: center;"></Loading>

        <main v-show="hotTopicData[0]">
            <div class="topic-part" v-if="hotTopicData[0]"
                :style="{background:hotTopicData[0].topic.topic_label_bg_color,padding:'0 15px'}">
                <h3 style="font-weight: 700;margin-bottom: 10px;">{{hotTopicData[0].topic.name}}</h3>
                <p style="line-height: 1.5em;padding-bottom: 15px;">{{hotTopicData[0].topic.introduction}}</p>
                <ul v-if="status(hotTopicData[0].target).photos">
                    <li v-for="(item,index) in status(hotTopicData[0].target).photos" :key="index">
                        <img :src="dealImg(item.src)" alt="" style="width: 100%;">
                    </li>
                </ul>
            </div>
            <div class="tabs" style="transform: none">
                <div class="title" slot="title" style="position: sticky;top: 45px;">
                    <span :class="active===index?'active':''" v-for="(val,index) in tags" :key="index"
                        @touchstart="active=index;">{{val}}</span>
                </div>
                <div class="content" v-for="(val,index) in tags" :key="index">
                    <ul class="comments" v-show="active===index">
                        <li v-for="item in index===0?hotTopicData:newTopicData" :key="item.id">
                            <GroupAuthorCard :avatar="status(item.target).author.avatar"
                                :authorName="status(item.target).author.name"
                                :updateTime="status(item.target).create_time" avatarSize="30" :text="item.abstract">
                            </GroupAuthorCard>
                            <div class="like" style="padding-left: 40px;padding-top: 5px;">
                                <van-icon name="thumb-circle-o" size="20px" style="padding-top: 2px;"></van-icon>
                                <span style="fontSize:14px">{{status(item.target).like_count}}</span>
                            </div>

                        </li>
                    </ul>
                </div>
            </div>


        </main>

    </div>
</template>
<script>
    import GroupAuthorCard from '@/components/GroupAuthorCard'
    import Loading from '@/components/Loading'

    // 监听滚动条事件 tabs固定
    export default {
        components: { GroupAuthorCard, Loading },
        data() {
            return {
                hotTopicData: [],
                newTopicData: [],
                active: 0,
                tags: ['热门', '最新'],
                scrollTop: ''

            }
        },
        watch: {
            id() {
                this.hotTopicData = [];
                this.getData()
            },

        },
        computed: {
            id() {
                return this.$store.state.topicId;
            },

        },
        created() {
            this.getData();
            console.log('creat')
        },
        mounted() {
            window.addEventListener('scroll',this.scroll, false)

        },
        methods: {
            scroll(){
                var scrollTop = document.documentElement.scrollTop; //document.documentElement获取数据
                var scrollTop11 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || document.querySelector('.topic').scrollTop;
                console.log(777, scrollTop, scrollTop11);
                console.log(777, document.querySelector('.topic').scrollTop);
                console.log(this)
            
            },
            getData() {
                fetch('/api/v2/gallery/topic/' + this.$store.state.topicId + '/items?sort=hot&start=0&count=20&status_full_text=1&guest_only=0&ck=null')
                    .then(res => res.json())
                    .then(res => {
                        console.log('hot', res.items);
                        this.hotTopicData = res.items;

                        // this.$set(this,'hotTopicData',res.items)
                    })
                fetch('/api/v2/gallery/topic/' + this.$store.state.topicId + '/items?sort=new&start=0&count=20&status_full_text=1&guest_only=0&ck=null')
                    .then(res => res.json())
                    .then(res => {
                        console.log('new', res.items);
                        this.newTopicData = res.items;

                    })
            },

            status(taget) {
                return taget.status ? taget.status : taget
            },

        }
    }
</script>
<style scoped lang="scss">
    .topic {
        background: #f7f7f7;


        .icon {}

        header {
            padding: 0 15px;
        }


        main {

            background: #fff;

            .tabs {

                .title {
                    background: #fff;
                    height: 30px;
                    border-bottom: 1px solid #f7f7f7;
                    padding: 6px 15px;
                    z-index: 1;

                    span {
                        padding: 6px 0;
                        margin-right: 10px;

                        &.active {
                            color: #000;
                            border-bottom: 2px solid #000;
                        }
                    }
                }

                .content {
                    padding: 0 15px;
                }
            }
        }
    }
</style>