<template>
    <div class="group-detail" :style="{width:$store.state.screenWidth+'px',minHeight:$store.state.screenHeight+'px'}">
        <header :style="{background:data.background_mask_color}">
            <!-- 返回箭头 -->
            <div class="icon" @touchend="$store.commit('changePageShow',['groupDetailShow',false])"
                :style="{padding:'25px 0 15px'}">
                <van-icon name="arrow-left" size="1.2em" color="#fff"></van-icon>
            </div>
            <div class="title-part">
                <div class="avatar" :style="{backgroundImage:'url('+dealImg(data.avatar)+')'}"></div>
                <div class="text">
                    <p class="title">{{data.name}}</p>
                    <p class="member-num"> {{data.member_count+'成员'}}</p>
                </div>
                <div class="join" :style="{color:data.background_mask_color}"> + 申请</div>
            </div>
            <div class="abstract">
                <span>小组简介 : </span>
                {{data.desc_abstract}}
            </div>

        </header>
        <!-- 内容加载 -->
        <Loading :show="!groupList.topics"></Loading>
        <!-- 讨论列表 -->
        <ul class="topics-list" :show="groupList.topics">
            <li v-for="item in groupList.topics" :key="item.id"
                @touchstart="e=>dealTouchStart(e,$el,()=>{$store.commit('changeDetailId',['groupTopicId',item.id]);$store.commit('changePageShow',['groupTopicShow',true])})">
                <div class="icon-part">
                    <van-icon name="diamond" :color="diamondColor(item.comments_count)"></van-icon>
                    <p class="comments-num"> {{item.comments_count}}</p>
                </div>
                <div class="text-part">
                    <GroupAuthorCard 
                    :title="(item.topic_tags[0]?(item.topic_tags[0].name+' | '):'') + item.title"
                    :avatar="item.author.avatar"
                    :authorName="item.author.name"
                    :updateTime="item.update_time"></GroupAuthorCard>
                  
                </div>
                <div class="cover-url" :style="{backgroundImage:'url('+dealImg(item.cover_url)+')'}"></div>

            </li>
        </ul>



    </div>
</template>
<script>
    import Loading from '@/components/Loading'
    import GroupAuthorCard from '@/components/GroupAuthorCard'
    export default {
        components: { Loading, GroupAuthorCard },
        props: ['data'],
        data() {
            return {
                groupList: {},

            }
        },
        created() {
            this.getData()
        },
        computed: {
            groupId() {
                return this.$store.state.groupId
            },
        },
        // 监听￥store中的数据 有改变则先清空再更新
        watch: {
            groupId() {
                this.groupList = '';
                this.getData()

            }

        },
        methods: {
            getData() {
                fetch('/api/v2/group/' + this.$store.state.groupId + '/topics')
                    .then(res => res.json())
                    .then(res => {
                        console.log(1222, res)
                        this.groupList = res;
                    })

            },
            diamondColor(comment) {
                if (comment > 1000) {
                    return '#D64C49'
                } else if (comment > 100) {
                    return '#E38F6D'
                } else {
                    return '#EDB27A'
                }
            }

        }
    }
</script>
<style scoped lang="scss">
    .group-detail {
        header {
            color: #eee;
            padding: 0 15px 10px;
            font-size: 14px;

            .avatar {
                width: 60px;
                height: 60px;
                border-radius: 4px;
                margin-right: 15px;
            }

            .title-part {
                display: flex;

                .avatar {
                    background-size: cover;
                }

                .title {
                    font-size: 20px;
                    margin-bottom: 6px;
                    color: #fff;

                }

                .text {
                    flex: 1;

                }

                .join {
                    width: 55px;
                    height: 28px;
                    border-radius: 4px;
                    line-height: 28px;
                    background: #fff;
                    text-align: center;
                }

            }



            .abstract {
                padding: 10px 0;
                letter-spacing: 1.1px;
                font-weight: 100;

                span {
                    font-size: 15px;
                    color: #fff;
                    font-weight: 400;

                }
            }

        }

        .topics-list {
            padding: 0 15px;

            li {
                display: flex;
                color: #000;
                padding-top: 20px;

                .icon-part {
                    width: 25px;
                    text-align: center;

                    .comments-num {
                        font-size: 12px;

                    }
                }

                .text-part {
                    flex: 1;
                    margin-left:15px;


                }

                .cover-url {
                    width: 70px;
                    height: 50px;
                    background-size: cover;
                    border-radius: 4px;
                    margin-left: 15px;
                }
            }


        }
    }
</style>