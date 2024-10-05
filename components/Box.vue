<template>
    <div class="all">
        <!-- <img :src="iconPath" class="icon"> -->
        <div class="title">
            {{ title }}
        </div>
        <div class="content">
            {{ content }}
        </div>
        <div class="time">
            {{ time }}
        </div>
    </div>
</template>


<script setup lang='ts' name="Box">
    import { computed } from "vue";
    interface Props{
        title:string 
        content:string
        time:string
    }

    let allProps = defineProps<Props>()

    // const iconPath = computed(() => {
    //     return new URL(allProps.icon, import.meta.url).href;
    // });
</script>


<style lang="scss" scoped>
.all{
    position: relative;
    width: 15vw;
    height: 8.704vh;
    background: #f2f4f9;
    border-radius: 3px;
    // .icon{
    //     position: absolute;
    //     width: 2.604vw;
    //     height: 4.63vh;
    //     top: 2.237vh;
    //     left: 1.25vw;
    // }
    .title{
        position: absolute;
        height: 1.334vh;
        font-size: 1.334vh;
        font-family: Source Han Sans CN, Source Han Sans CN-Medium;
        font-weight: 500;
        text-align: left;
        color: #717b88;
        left: 1.544vw;
        top: 2.49vh;
        line-height: 1.334vh;
    }
    .content{
        position: absolute;
        height: 1.574vh;
        font-size: 1.574vh;
        font-family: Arial, Arial-Regular;
        font-weight: 400;
        text-align: left;
        color: #333333;
        left: 1.544vw;
        top: 4.71vh;
        line-height: 1.574vh;
    }
    .time{
        position: absolute;
        height: 1.204vh;
        font-size: 1.204vh;
        font-family: Source Han Sans CN, Source Han Sans CN-Medium;
        font-weight: 400;
        text-align: left;
        color: #717b88;
        left: 7.844vw;
        top: 6.31vh;
        line-height: 1.204vh;
    }
}
</style>
