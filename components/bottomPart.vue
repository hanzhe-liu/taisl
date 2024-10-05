<template>
    <div class="bottomPart">
        <div v-if="BottomPartStore.total_num != null" class="title">VP共为你匹配到{{ BottomPartStore.total_num }}辆车</div>
        <div class="boxPart">
            <staBottom v-for="([key, item]) in Object.entries(BottomPartStore.searchResult)" :key="key" :carID="key" class="theStaBottom"
            text1="江苏无锡" :text2="getLabelValue(item, '车标品牌')" text3="红色"
            :text4="getLabelValue(item, '近一年累计行驶时长')" :text5="getLabelValue(item, '近一年在网天数')" :showColor="computeColor(key)">
            </staBottom>
            <el-empty v-if="BottomPartStore.searchResult == null || Object.entries(BottomPartStore.searchResult).length == 0" description="没有符合条件的结果" />
        </div>
        <div class = "pag" v-if="ifShow()">
            <el-pagination background layout="prev, pager, next" v-model:currentPage="BottomPartStore.currentPage" :total="BottomPartStore.pages" class = "fixpag"/>
        </div>
    </div>
</template>
  
<script lang='ts' setup name="bottomPart">
import { ref, getCurrentInstance, watch, computed } from "vue";
import staBottom from './staBottom.vue';
import { ElMessage } from 'element-plus'
import { useBottomPartStore } from "../store/bottomPart";

let BottomPartStore = useBottomPartStore()

const {proxy}=getCurrentInstance()

function ifShow(): boolean {
    return Object.keys(BottomPartStore.searchResult).length !== 0;
}
    
    // let currentPage = ref(1)
    function handleEnter(inputValue){
        let params = {
            size:15,
            page:1,
            app_key:"f4f56da0-4589-11eb-aa8e-5b1ae6b0d7f8",
            search:{}
        }
        if(inputValue.value.length < 4){
            ElMessage('不能少于4个字符')
            return;
        }
        params.search={veh_plate: inputValue.value}
        BottomPartStore.givenvalue = inputValue
        params.search = JSON.stringify(params.search);
        proxy.$api.searchData(params).then((res)=>{
            BottomPartStore.pages = res.pages*10
            BottomPartStore.searchResult = res.data
        })
    }
    const currentPage = computed(() => BottomPartStore.currentPage);
    watch(currentPage, (newVal, oldVal) => {
        sessionStorage.setItem('page', String(newVal))
        BottomPartStore.search(BottomPartStore.prevalue, proxy, BottomPartStore.pre_veh_kind,newVal)
      // 在此处执行你需要的操作
    });

    function computeColor(key) {
        let charIndex = key.indexOf('_');
        return Number(key.substring(charIndex + 1));
    }
    function getLabelValue(data, targetLabelName: string){
        for (const key in data) {
            if (data[key].label_name === targetLabelName) {
                let toreturn =  data[key].label_value;
                return toreturn[0]
            }
        }
        return undefined;
    }
    
    defineExpose({ handleEnter });
</script>
  
<style lang="scss" scoped>
.bottomPart{
    position: absolute;
    width: 97.0883vw;
    height: 64.6296vh;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 1px 2px 0px rgba(137,146,162,0.30);
    left: 1.4583vw;
    top: 32.5926vh;
    z-index: 0;
    overflow: hidden;
    .title{
        margin-top: 2vh;
        margin-left: 1.3vw;
        height: 2.037vh;
        font-size: 2.037vh;
        font-family: Source Han Sans CN, Source Han Sans CN-Medium;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 2.037vh;
    }
    .boxPart{
        width: 97.0883vw;
        height: 46.481vh;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        margin-top: 1.5555vh;
        .el-empty{
            margin-left: 43.9vw;
        }
    }
    
    //flex-wrap: wrap; 
    .theStaBottom{
        z-index: 1;
        margin-left: 1vw;
    }

    .changeText1{
        position: absolute;
        height:2vh;
        font-size: 1.8vh;
        left:45vw;
        bottom: 1vh;
        background: #c9d8a6;
        border-radius: 4px;
        box-shadow: 0px 1px 2px 0px rgba(137,146,162,0.30);
        cursor: pointer;
    }

    .changeText2{
        position: absolute;
        height:2vh;
        font-size: 1.8vh;
        left:51vw;
        bottom: 1vh;
        background: #c9d8a6;
        border-radius: 4px;
        box-shadow: 0px 1px 2px 0px rgba(137,146,162,0.30);
        cursor: pointer;
    }

    .pag{
        position: absolute;
        width: 100vw;
        top: 55vh;
        display: flex;
        justify-content: center; /* 水平居中 */
        .fixpag{
            margin-right: 3vw;
        }
    }
}
</style>