<template>
  <div class="all">
    <div class="head"> 
      <img src="../assets/logo白.png" class="logo">
      <input v-if="layoutStore.searchInputBox" type="text" class="input" placeholder="请输入车牌号" v-model="inputValue" @keyup.enter="changeBottom()">
      <img v-if="layoutStore.searchInputBox" src="../assets/形状 795.png" class="searchLogo" @click="changeBottom()">
      <div class="allTags">
        <div :class="layoutStore.styleHeadText.arrayHeadText.mainPage.selected ? 'headTextSelected' : 'headText'" @click="toMainPage()">首页</div>
        <div :class="layoutStore.styleHeadText.arrayHeadText.carSearch.selected ? 'headTextSelected' : 'headText'" @click="toCarSearch()">车辆检索</div>
        <div :class="layoutStore.styleHeadText.arrayHeadText.photoSearch.selected ? 'headTextSelected' : 'headTextCouldNotSelect'" @mouseenter="showIcon" 
          @mouseleave="hideIcon" @mousemove="moveIcon" @click="Tips()">画像查询</div>
        <div :class="layoutStore.styleHeadText.arrayHeadText.labelOrdered.selected ? 'headTextSelected' : 'headText'" @click="toLabelOrdered()">标签订阅</div>
      </div>
      <div v-if="iconVisible" class="hidden" :style="iconStyle">🔒</div>
      <img src="../assets/形状 11.png" class="logo2" @click ="toPersonalPage()">
      <div class="username" @click ="toPersonalPage()">{{ username }}</div>
      <img v-if="username" src="../assets/形状 633.png" class="exit" @click="logout()">
      <loginBox :Visible="showLogin" @closeSelf="showLogin = !showLogin"></loginBox>
    </div>
    <router-view></router-view>
  </div>
</template>
<script setup lang='ts' name="App">
import {ref, watch, getCurrentInstance, onMounted, computed} from "vue"
import {useRouter} from "vue-router"
import { ElMessage } from 'element-plus'
import { useLayoutStore } from "../store/layout";
import { useBottomPartStore } from "../store/bottomPart";
import loginBox from '../components/loginBox.vue';

onMounted(()=>{
  if(sessionStorage.getItem('inputValue') != null){
    inputValue.value = String(sessionStorage.getItem('inputValue'))
  }
})

let BottomPartStore = useBottomPartStore()
let layoutStore = useLayoutStore()
const {proxy}=getCurrentInstance()

let username = ref<string | null>(sessionStorage.getItem('username'))

let inputValue = ref<string>('')
let showLogin = ref<Boolean>(false)


watch(showLogin, ()=>{
  if(showLogin.value == false){
    username.value = sessionStorage.getItem('username')
  }
})

const iconVisible = ref(false);
const iconStyle = ref({
  left: '0px',
  top: '0px'
});
const router = useRouter()
function changeBottom(){
  if(BottomPartStore.currentPage === 1){
    BottomPartStore.prevalue = BottomPartStore.givenvalue
    BottomPartStore.pre_veh_kind = BottomPartStore.veh_kind
    sessionStorage.setItem('pre_veh_kind', String(BottomPartStore.veh_kind))
    sessionStorage.setItem('inputValue', inputValue.value)
    BottomPartStore.search(inputValue.value, proxy, BottomPartStore.veh_kind, 1)
    return
  }
  BottomPartStore.prevalue = BottomPartStore.givenvalue
  BottomPartStore.pre_veh_kind = BottomPartStore.veh_kind
  sessionStorage.setItem('pre_veh_kind', String(BottomPartStore.veh_kind))
  sessionStorage.setItem('inputValue', inputValue.value)
  BottomPartStore.currentPage = 1

}
function toMainPage(){
  router.push({
    path:"/mainLogin"
  })
}
function toCarSearch(){
  router.push({
    path:"/carSearch"
  })
  // if(styleHeadText.current === null){
  //   styleHeadText.current = styleHeadText.arrayHeadText.carSearch
  //   styleHeadText.arrayHeadText.carSearch.selected = true
  // }
  // else{
  //   styleHeadText.current.selected = false
  //   styleHeadText.current = styleHeadText.arrayHeadText.carSearch
  //   styleHeadText.arrayHeadText.carSearch.selected = true
  // }
}
function toPhotoSearch(){
  router.push({
    path:"/photoSearch"
  })
  // if(styleHeadText.current === null){
  //   styleHeadText.current = styleHeadText.arrayHeadText.photoSearch
  //   styleHeadText.arrayHeadText.photoSearch.selected = true
  // }
  // else{
  //   styleHeadText.current.selected = false
  //   styleHeadText.current = styleHeadText.arrayHeadText.photoSearch
  //   styleHeadText.arrayHeadText.photoSearch.selected = true
  // }
}
function toLabelOrdered(){
  if(username.value == null){
    ElMessage('请先登录')
    return
  }
  router.push({
    path:"/labelOrdered"
  })
}
function toPersonalPage(){
  if(username.value == null){
    showLogin.value = !showLogin.value
    return
  }
  router.push({
    path:"/personalPage"
  })
}
function logout(){
  sessionStorage.clear()
  ElMessage('已退出登录')
  router.push({
    path:"/mainLogin"
  })
}
function showIcon() {
  iconVisible.value = true;
}
function hideIcon() {
  iconVisible.value = false;
}
function moveIcon(event) {
  iconStyle.value.left = `${event.clientX + 10}px`;
  iconStyle.value.top = `${event.clientY + 10}px`;
}

function Tips(){
  ElMessage('请点击车牌跳转')
}

watch(inputValue, ()=>{
  BottomPartStore.givenvalue = inputValue.value
})

const givenvalue = computed(() => BottomPartStore.givenvalue);
watch(givenvalue, (newVal, oldVal) => {
    inputValue.value = newVal
});

</script>


<style lang="scss" scoped>
.all{
  min-width:100vw;
  min-height: 100vh;
  // background-image: url('../assets/背景.png');
  // background-size: cover; /* This makes sure the image covers the entire background */
  // background-position: center; /* This centers the background image */
  // background-repeat: no-repeat; /* This prevents the background image from repeating */
  background: #f2f3f8;

  .head{
    width: 100vw;
    height: 6.155vh;
    background: #272d37;
    // .el-menu-demo{
    //   margin-left: 20.833vw;
    //   width: 42vw;
    // }
    .input{
      position: absolute;
      width: 17.76vw;
      height: 3.889vh;
      background: #333a47;
      border-radius: 21px;
      top:0.833vh;
      left: 65.104vw;
      font-size: 1.481vh;
      font-family: Source Han Sans CN, Source Han Sans CN-Normal;
      font-weight: normal;
      text-align: left;
      color: #6d7686;
      padding-left: 1vw; 
    }
    .logo{
        position: absolute;
        width: 10vw;
        height: 3.7vh;
        left: 2vw;
        top:1.4vh;
    }
    .searchLogo{
      position: absolute;
      cursor: pointer;
      width: 0.9375vw;
      height: 1.666vh;
      left: 82.5vw;
      top: 2.3vh;
    }
    .allTags{
      height: 6.155vh;
      display: flex;
      flex-wrap: wrap;
      margin-left: 19.375vw;
      .headText{
        cursor: pointer;
        width: 8vw;
        height: 6.155vh;
        font-size: 1.667vh;
        font-family: Source Han Sans CN, Source Han Sans CN-Normal;
        font-weight: normal;
        text-align: center;
        color: #8d96a4;
        letter-spacing: 1.8px;
        line-height: 6.155vh;
      }
      .headText:hover{
        background: #20242b;
      }

      .headTextSelected{
        cursor: pointer;
        width: 8vw;
        height: 6.155vh;
        font-size: 1.667vh;
        font-family: Source Han Sans CN, Source Han Sans CN-Normal;
        font-weight: normal;
        text-align: center;
        color: #ffffff;
        letter-spacing: 1.8px;
        line-height: 6.155vh;
        background: #20242b;
      }
      .headTextCouldNotSelect{
        width: 8vw;
        height: 6.155vh;
        font-size: 1.667vh;
        font-family: Source Han Sans CN, Source Han Sans CN-Normal;
        font-weight: normal;
        text-align: center;
        color: #595c60;
        letter-spacing: 1.8px;
        line-height: 6.155vh;
        user-select: none;
      }
    }

    .logo2{
      cursor: pointer;
      position: absolute;
      width: 0.9375vw;
      height: 1.944vh;
      top: 1.852vh;
      left: 93.5vw;
    }
    .username{
      cursor: pointer;
      position: absolute;
      width: 2.55vw;
      height: 1.48vh;
      font-size: 1.38vh;
      font-family: Source Han Sans CN, Source Han Sans CN-Normal;
      font-weight: normal;
      text-align: center;
      color: #ffffff;
      letter-spacing: 1.6px;
      line-height: 1.48;
      top: 1.952vh;
      left: 95vw;
    }

    .exit{
      cursor: pointer;
      position: absolute;
      width: 0.781vw;
      height: 1.78vh;
      top: 1.852vh;
      left: 98.5vw;
    }
    .hidden{
      position: absolute;
      pointer-events: none; /* 确保图标无法被选取 */
      user-select: none; /* 禁止图标被选取 */
    }
  }
}
</style>
