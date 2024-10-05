<template>
    <div :class="['back', rankClass]">
        <div class="text title">
            【{{ title }}】
        </div>
        <div class="text content">
            超过路网{{ roundToDecimalPlaces(content*100,2) }}%的车辆
        </div>
        <img v-if="iconPath" :src="iconPath" class="rankImg">
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
    function roundToDecimalPlaces(value: number, decimalPlaces: number): number {
        const factor = Math.pow(10, decimalPlaces);
        return Math.round(value * factor) / factor;
    }
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
        margin-left: 2.24vw;
    }
    .content{
        margin-left: 1.35vw;
    }
    .rankImg{
        position: absolute;
        width: 0.9896vw;
        height: 2.5vh;
        top:0.76vh;
        left:25.29vw;
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
