<template>
    <div class="group-author-card">
        <h4 class="title">{{title}}</h4>
        <div class="author" :style="{lineHeight:avatarSize?(avatarSize+'px'):'20px'}">
            <div class="avatar"
                :style="{backgroundImage:'url('+dealImg(avatar)+')',width:avatarSize?(avatarSize+'px'):'20px',height:avatarSize?(avatarSize+'px'):'20px'}">
            </div>
            <span class="author-name">{{authorName}}</span>
            <span class="update-time">
                {{parseInt((new Date()-new Date(updateTime))/1000/60)>3?parseInt((new Date()-new Date(updateTime))/1000/60)+'分钟前':'刚刚'}}</span>
        </div>
        <p class="text" :style="{paddingLeft:avatarSize?+avatarSize+10+'px':'30px'}">{{text}}</p>
    </div>

</template>
<script>
    export default {
        props: ['avatar', 'authorName', 'updateTime', 'title', 'avatarSize', 'text'],
        created() {
            console.log(this.data)
        }
    }
</script>
<style scoped lang="scss">
    .group-author-card {

        .author {
            display: flex;
            font-size: 12px;
            margin-top: 10px;

            .avatar {

                border-radius: 50%;
                margin-right: 10px;
                background-size: cover;
            }

            span.update-time {
                margin-left: 10px;
                color: #ccc;

            }
            
        }
        p{
                font-size: 16px;
                line-height: 1.5em;
                
            }

    }
</style>