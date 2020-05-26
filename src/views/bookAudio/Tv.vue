<template>
    <div class="tv">
        <div>Tv</div>
    </div>
</template>
<style lang="scss" scoped>

</style>
<script>
export default {
    // 组件创建期
    created(){
        console.log(this)
         fetch('/api/v2/tv/modules?for_mobile=1')
        //  fetch('/api/v2/tag/49/subject_collection_boards')
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                
                let { modules } = res;
                modules.forEach(item=>this.$set(this.data,item.module_name,item))
               
            })
    },

    data(){
        return {
            data:{},
            name:'tv'
        }
    }
}
</script>