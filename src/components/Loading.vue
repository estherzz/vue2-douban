<template>
    <div class="loading" :style="{display: 'flex',justifyContent:'center',marginTop:'100px'}"
                    v-show="show">
        <!-- 加载中 -->
        <span>内容加载中</span>
        <van-loading type="spinner" />
    </div>
</template>
<script>
    import { Loading } from 'vant';

    export default {
        props: ['show'],
        components: {
            [Loading.name]:Loading
        }
    }
</script>