<template>
    <!-- 'title', 'rightContent', 'arrow', 'rightEvent', 'type'  -->
    <div class="title">
        <!-- type===center -->
        <div class="centerTitle" v-if="type==='center'"></div>
        <!-- type===left -->
        <div class="left-title" v-else>
            <span class="content">{{title||'标题'}}</span>
            <div class="right" v-on:touchend="rightEvent()">
                <span class="right-content">{{rightContent||'点击'}}</span>
                <span class="arrow" v-if="arrow"></span>
            </div>

        </div>
        

    </div>
</template>

<script>
    export default {
        props: ['title', 'rightContent', 'arrow', 'rightEvent', 'type'],
        data() {
            return {
            }
        }
    }
</script>


<style scoped lang="scss">
    @import '../base.scss';
    .title {
        color: #333;
        font-weight: bold;
        height: 40px;
        line-height: 40px;

        .left-title {
            display: flex;
            justify-content: space-between;
            .content {
                font-size: 20px;
            }

            .right {
                font-size: 13px;
                margin-right: 2px;
               
            }
            .arrow{
                @include arrow();
                position: relative;
                top: -2px;
            }
        }
    }
</style>