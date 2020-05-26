<template>
    <div class="group-topic" :style="{width:$store.state.screenWidth+'px',minHeight:$store.state.screenHeight+'px'}">
        <!-- 返回箭头 -->
        <div class="icon" @touchend="$store.commit('changePageShow',['groupTopicShow',false])"
            :style="{padding:'25px 15px 15px',background:'#fff'}">
            <van-icon name="arrow-left" size="1.2em" color="#000"></van-icon>
        </div>
        <header>
            <GroupAuthorCard
                :title="(topicData.topic_tags[0]?(topicData.topic_tags[0].name+' | '):'') + topicData.title"
                :avatar="topicData.author.avatar" :authorName="topicData.author.name"
                :updateTime="topicData.update_time" avatarSize="30"></GroupAuthorCard>
        </header>

        <p class="content" v-html="dealCImg(topicData.content)">
        </p>
        
        <div class="counts" :style="{minHeight:$store.state.screenHeight+'px'}">
            <van-tabs v-model="active" color="#000" :line-width="40">

                <van-tab :title="'回复'+topicData.comments_count">
                    <Loading :show="!topicComments"></Loading>
                    <ul>
                        <li v-for="item in topicComments" :key="item.id">

                            <GroupAuthorCard :avatar="item.author.avatar" :authorName="item.author.name"
                                :updateTime="item.create_time" avatarSize="30" :text="item.text"></GroupAuthorCard>
                            <div class="like" style="padding-left: 40px;padding-top: 5px;">
                                <van-icon name="thumb-circle-o" size="20px" style="padding-top: 2px;"></van-icon>
                                <span style="fontSize:14px">{{ item.vote_count}}</span>
                            </div>


                        </li>
                    </ul>

                </van-tab>
                <van-tab :title="'收藏'+topicData.like_count">
                    <Loading :show="true"></Loading>
                </van-tab>
                <van-tab :title="'转发'+topicData.reshares_count">
                    <Loading :show="true"></Loading>
                </van-tab>

            </van-tabs>
            <span class="comments_count"></span>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .group-topic {
        background: #efefef;

        header {
            padding: 0 15px;
            font-size: 22px;
            color: #000;
            background: #fff;
        }

        .content {
            background: #fff;
            padding: 15px;

            p {
                line-height: 50px !important;
                text-indent: 2em;
            }

            img {
                width: 70%;
            }


        }

        .counts {
            margin-top: 10px;
            background: #fff;
            padding-bottom: 100px;
            padding: 0 15px;

        }
    }
</style>
<script>
    import GroupAuthorCard from '@/components/GroupAuthorCard'
    import Loading from '@/components/Loading'
    export default {
        components: {
            GroupAuthorCard, Loading
        },
        data() {
            return {
                topicData: '',
                topicComments: '',
                active: 0
            }
        },
        computed: {
            groupTopicId() {
                return this.$store.state.groupTopicId
            },
        },
        // 监听￥store中的数据 有改变则先清空再更新
        watch: {
            groupTopicId() {
                this.topicData = '';
                this.getData()

            }

        },
        created() {
            this.getData()

        },
        methods: {
            getData() {
                fetch('/api/v2/group/topic/' + this.$store.state.groupTopicId)
                    .then(res => res.json())
                    .then(res => {
                        console.log(33322, res)
                        this.topicData = res;
                    })
                fetch('/api/v2/group/topic/' + this.$store.state.groupTopicId + '/comments')
                    .then(res => res.json())
                    .then(res => {
                        console.log('toupics-comments', res.comments)
                        this.topicComments = res.comments;
                    })
        

            },

        }
    }
</script>