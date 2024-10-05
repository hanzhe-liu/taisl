<template>
    <div :class="['back', rankClass]">
        <div class="text title">
            【{{ title }}】
        </div>
        <img src="../assets/热.png" class="hot">
        <div class="text content">
            {{ content }}位订阅者
        </div>
        <img v-if="iconPath" :src="iconPath" class="rankImg">
        <div v-if="!iconPath" class="rankImg2">4</div>
        <el-button type="primary" class="order" plain>+订阅</el-button>
    </div>
</template>

<script setup lang='ts' name="rank">
    import { computed } from "vue";
    interface Props{
        title:string 
        content:number
        icon:string|null
        rankClass:string
    }

    let allProps = defineProps<Props>()

    const iconPath = computed(() => {
        if(allProps.icon != null && allProps.icon != ''){
            return new URL(allProps.icon, import.meta.url).href;
        }
        return null
    });
</script>


<style lang="scss" scoped>
.back{
    position: relative;
    width: 27.5vw;
    height: 3.889vh;
    border-radius: 6px;
    display: flex;
    flex-wrap: wrap;
    .text{
        min-height: 3.889vh;
        font-size: 1.48vh;
        font-family: Source Han Sans CN, Source Han Sans CN-Bold;
        font-weight: 700;
        text-align: left;
        color: #333333;
        line-height: 3.889vh;
    }
    .title{
        margin-left: 1.8vw;
    }
    .content{
        margin-left: 0.5vw;
    }
    .rankImg{
        position: absolute;
        width: 0.9896vw;
        height: 2.5vh;
        top:0.76vh;
        left:0.14vw;
    }
    .rankImg2{
        position: absolute;
        width: 0.9896vw;
        height: 1.8vh;
        top: 1.17vh;
        left:0.18vw;
        background: linear-gradient(0deg,#afd2fa 0%, #79aeed 100%), #8bb3ef;
        font-size: 1.2vh;
        color: #333333;
        text-align: center;
        line-height: 1.8vh;
        border-radius: 14px;
    }
    .hot{
        position: relative;
        width: 0.625vw;
        height: 1.389vh;
        top: 1.2vh;
        margin-left: 1.5vw;
    }
    .order{
        position: absolute;
        left: 23.19vw;
        top: 0.83vh;
        width: 2.917vw;
        height: 2.407vh;
    }
}
.rank1{
    background: linear-gradient(270deg,#fff1b5 0%, #ffffff 100%), #b78048;
}
.rank2{
    background: linear-gradient(270deg,#e2eef3 0%, #ffffff 100%), #b78048;
}
.rank3{
    background: linear-gradient(270deg,#fff2e5 0%, #ffffff 100%), #b78048;
}
.rank4{
    background: linear-gradient(270deg,#e5f1ff 0%, #ffffff 100%), #b78048;
}
</style>
