<template>
    <div class = "background">
        <img src="../assets/logo.png" class="logo">
        <img src="../assets/组 33.png" class="searchBox">
        <img src="../assets/组 33_1.png" class="search" @click="search()">
        <img src="../assets/组 33_2.png" class="search_2">
        <img src="../assets/形状 11 拷贝 2.png" class="logo2" @click ="login()" v-if="!checkUserName()">
        <img src="../assets/形状 11 拷贝 2.png" class="logo2" v-if="checkUserName()" @click="toPersonalPage()">
        <div class = "loginText" @click ="login()" v-if="!checkUserName()">
            登录
        </div>
        <div class = "loginText" v-if="checkUserName()" @click="toPersonalPage()">
            {{ showUserName() }}
        </div>
        <input type="text" class="input" placeholder="请输入车牌号 (例: 苏A12345 或 苏A123)" v-model="inputValue" @keyup.enter="search()" />
        <loginBox :Visible="showLogin" @closeSelf="login()"></loginBox>
    </div>
</template>
<script setup lang='ts' name="App">
    import {ref, getCurrentInstance, onBeforeMount, onMounted} from "vue"
    import { ElMessage } from 'element-plus'
    import {useRouter} from "vue-router"
    import { useLayoutStore } from "../store/layout";
    import loginBox from '../components/loginBox.vue';
    
    let layoutStore = useLayoutStore()
    
    const router = useRouter()
    const {proxy} = getCurrentInstance()
    let showLogin = ref<boolean>(false)
    let inputValue = ref<string>('')
    let inputName = ref<string>('')
    let inputPassword = ref<string>('')
    
    function checkUserName(){
        return sessionStorage.getItem('username')!=null
    }
    function showUserName(){
        return sessionStorage.getItem('username')
    }

    
    onMounted(()=>{
        layoutStore.styleHeadText.mainPage();
    })

    function search(){
        // if(userName.value === null ){
        //     ElMessage('请先登录')
        // }
        // else{
            if(inputValue.value.length<4){
                ElMessage('不能少于4个字符')
                return
            }
            sessionStorage.setItem('inputValue', inputValue.value)
            sessionStorage.setItem('pre_veh_kind', '')
            sessionStorage.setItem('page', '1')
            router.push(
                {
                    path:"/carSearch",
                    query: { searchValue: inputValue.value }
                }
            )
        // }
    }
    function login(){
        showLogin.value = !showLogin.value
    }
    // function loginPush(){
    //     let params = {
    //         app_key:"f4f56da0-4589-11eb-aa8e-5b1ae6b0d7f8",
    //         username: inputName.value,
    //         password:inputPassword.value,
    //     }
    //     proxy.$api.postLoginInit(params).then((res)=>{
    //         console.log(res)
    //         showLogin.value = !showLogin.value
    //         userName.value = params.username
    //         sessionStorage.setItem("token",res.data.user_id);
    //         sessionStorage.setItem("username",params.username);
    //         sessionStorage.setItem("company_name", res.data.company_name);
    //         sessionStorage.setItem("app_id", res.data.resource[0][0]);
    //         sessionStorage.setItem("app_name", res.data.resource[0][1]);
    //     })
    // }
    function toPersonalPage(){
        router.push(
            {
                path:"/personalPage",
            }
        )
    }

</script>


<style lang="scss" scoped>
.background{
    width:100vw;
    height: 100vh;
    background-image: url('../assets/背景.png');
    background-size: cover; /* This makes sure the image covers the entire background */
    background-position: center; /* This centers the background image */
    background-repeat: no-repeat; /* This prevents the background image from repeating */
    .logo{
        position: absolute;
        width: 14.79vw;
        height: 5.648vh;
        top: 31.296vh;
        left: 42.604vw;
    }
    .searchBox{
        position: absolute;
        width: 31.61vw;
        height: 5.74vh;
        top: 44.167vh;
        left: 30.521vw;
    }
    .search{
        cursor: pointer;
        position: absolute;
        width: 10.417vw;
        height: 5.74vh;
        top: 44.167vh;
        left: 59.06vw;
        z-index: 1;
    }
    .search_2{
        position: absolute;
        width: 40.31vw;
        height: 7.685vh;
        top: 43.148vh;
        left: 29.84vw;
    }
    .logo2{
        cursor: pointer;
        position: absolute;
        width: 0.9375vw;
        height: 1.944vh;
        top: 1.852vh;
        left: 95vw;
    }
    .loginText{
        cursor: pointer;
        position: absolute;
        left: 96.35vw;
        top: 2.13vh;
        height: 1.481vh;
        font-size: 1.481vh;
        font-family: Source Han Sans CN, Source Han Sans CN-Normal;
        font-weight: normal;
        text-align: left;
        color: #0b89ed;
        letter-spacing: 1.6px;
        line-height: 1.481vh;
    }
    .loginText2{
        cursor: pointer;
        position: absolute;
        left: 96.35vw;
        top: 2.13vh;
        height: 1.481vh;
        font-size: 1.481vh;
        font-family: Source Han Sans CN, Source Han Sans CN-Normal;
        font-weight: normal;
        text-align: left;
        color: #06355b;
        letter-spacing: 1.6px;
        line-height: 1.481vh;
    }
    .input{
        position: absolute;
        width: 23.333vw;
        height: 2vh;
        font-size: 1.9vh;
        font-family: Source Han Sans CN, Source Han Sans CN-Medium;
        font-weight: 500;
        text-align: left;
        color: #a7aeb8;
        letter-spacing: 1.1px;
        line-height: 2vh;
        left: 32.1vw;
        top: 45.68vh;
        border: none;
    }
    .input:focus {
        border: none;
        outline: none; 
    }
}
</style>
