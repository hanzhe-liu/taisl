<template>
    <div class="all">
        <!-- <img src="../assets/图层 2618.png" class="backPic"> -->
         <div class="pic"></div>
        <staticHead></staticHead>
        <bottomPart ref="bottomDataRef"></bottomPart>
    </div>
</template>


<script setup lang='ts' name="App">
    import { onMounted, ref, onUnmounted, getCurrentInstance } from "vue";
    import staticHead from '../components/staticHead.vue'
    import bottomPart from '../components/bottomPart.vue'
    import emitter from '../utils/emitter'
    import { useRoute } from 'vue-router';
    import { useLayoutStore } from "../store/layout";
    import { useBottomPartStore } from "../store/bottomPart";

    const {proxy} = getCurrentInstance()
    let BottomPartStore = useBottomPartStore();
    let layoutStore = useLayoutStore()
    const route = useRoute();
    const bottomDataRef=ref()


    emitter.on('changeButtom', (inputValue)=>{
        // console.log(bottomDataRef.value,'111111111')
        setTimeout(()=>{
        console.log(bottomDataRef.value,'22222222')

        bottomDataRef.value.handleEnter(inputValue)
        },1000)
    })

    onMounted(()=>{
        // console.log(bottomDataRef)
        // console.log(route.query)
        layoutStore.searchInputBox = true
        layoutStore.styleHeadText.carSearch();
        if(sessionStorage.getItem('inputValue') != null || sessionStorage.getItem('pre_veh_kind') != null){
            if((sessionStorage.getItem('inputValue') as string).length < 4){
                return
            }
            BottomPartStore.givenvalue = String(sessionStorage.getItem('inputValue'))
            BottomPartStore.prevalue = BottomPartStore.givenvalue
            if(Number(sessionStorage.getItem('page')) != 0){
                BottomPartStore.currentPage = Number(sessionStorage.getItem('page'))
            }
            BottomPartStore.search(BottomPartStore.prevalue, proxy, BottomPartStore.pre_veh_kind, BottomPartStore.currentPage)
            return
        }
    })

    onUnmounted(()=>{
        emitter.off('changeButtom')
    })


</script>


<style lang="scss" scoped>
    .all{
        // width: 100vw;
        // height: 93.846vh;
        // left:0vw;
        // top: 6.154vh;
        // color:  #f2f3f8;
        .pic{
            position: absolute;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(#f2f3f8, 0.5)), 
                  url('../assets/图层 2618.png');
            background-size: cover;
            background-repeat: no-repeat;
            width: 100vw;
            height: 12.407vh;
            left:0vw;
            top: 6.154vh;
        }
    }

</style>
<!-- 12.407vh; -->