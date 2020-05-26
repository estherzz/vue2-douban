<template>
    <div class="LeftPopup">
        <van-popup>内容</van-popup>
        <div class="h">tttt</div>
        <div class="h1">tttt</div>
    
    </div>
</template>
<script>
    // vant弹出层
    import { Popup } from 'vant';
    export default {
        components: { [Popup.name]: Proup }
    }
</script>
<style scoped lang="scss">
    .LeftPropup {
        color: #000;

        .h {
            color: red;

            .h1 {
                color: green;
            }
        }
    }
</style>