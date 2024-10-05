<template>
      <el-dialog v-model="dialogVisible" title="登录" width="25%" center>
        <input type="text" class="inputName" placeholder="请输入姓名" v-model="inputName" />
        <div class="tips" v-if="showTips0">*{{ Tips0 }}</div>
        <input type="password" class="inputPassword" placeholder="请输入密码" v-model="inputPassword" />
        <div class="tips" v-if="showTips">*{{ Tips }}</div>
        <template #footer>
            <div class="dialog-footer">
                <input type="button" class="loginButton" value="登录" @click="loginPush()">
            </div>
        </template>


        
      </el-dialog>

    <!-- <div class="loginBox">
        <div class = "textLogin">登录</div>
        <input type="button" class="loginButton" value="登录" @click="loginPush()">
        <div class="close" @click="closeSelf()">x</div>
    </div> -->
</template>

<script setup lang="ts" name="loginBox">
import { ref, getCurrentInstance, watch } from 'vue'
const {proxy} = getCurrentInstance()


let inputName = ref<string>('')
let inputPassword = ref<string>('')
let userName = ref<string>('')
let dialogVisible = ref<boolean>(false)
let showTips = ref<boolean>(false)
let Tips = ref<string>('')

let showTips0 = ref<boolean>(false)
let Tips0 = ref<string>('')

interface Props{
    Visible:boolean
}
let allProps = defineProps<Props>()
watch(allProps, (newVal, oldVal)=>{
    if(newVal.Visible == true){
        dialogVisible.value = true
    }
})
watch(dialogVisible, (newVal, oldVal)=>{
    if(newVal == false){
        closeSelf()
    }
})


function loginPush(){
    let case1:boolean = false
    let case2:boolean = false
    if(inputName.value.length < 3 || inputName.value.length >10){
        case1 = true
        if(inputName.value.length == 0){
            showTips0.value = true
            Tips0.value = "请输入用户名"
        }
        else{
            showTips0.value = true
            Tips0.value = "用户名至少为3位不能多于10位"
        }
    }
    else{
        case1 = false
        showTips0.value = false
        Tips0.value = ""
    }
    if(inputPassword.value.length < 6 || inputPassword.value.length >16){
        case2 = true
        if(inputPassword.value.length == 0){
            showTips.value = true
            Tips.value = "请输入密码"
        }
        else{
            showTips.value = true
            Tips.value = "密码至少为6位不能多于16位"
        }
    }
    else{
        case2 = false
        showTips.value = false
        Tips.value = ""
    }
    if(case1 || case2){
        return
    }
    let params = {
        app_key:"f4f56da0-4589-11eb-aa8e-5b1ae6b0d7f8",
        username: inputName.value,
        password:inputPassword.value,
    }
    proxy.$api.postLoginInit(params).then((res)=>{
        if(Object.keys(res.data).length === 0){
            // dialogVisible.value = true
            showTips.value = true
            Tips.value = res.message
            return
        }
        console.log(res)
        userName.value = params.username
        sessionStorage.setItem("token",res.data.user_id);
        sessionStorage.setItem("username",params.username);
        sessionStorage.setItem("company_name", res.data.company_name);
        sessionStorage.setItem("app_id", res.data.resource[0][0]);
        sessionStorage.setItem("app_name", res.data.resource[0][1]);
        dialogVisible.value = false
    })
}

const emit = defineEmits(['closeSelf'])

function closeSelf(){
    emit('closeSelf')
}
</script>

<style lang="scss" scoped>
.inputName{
    width: 15.625vw;
    height: 4.074vh;
    background: #ffffff;
    border: 1px solid #0b89ed;
    border-radius: 4px;
    margin-top: 3.25vh;
    margin-left: 3.625vw;
}
.inputPassword{
    width: 15.625vw;
    height: 4.074vh;
    background: #ffffff;
    border: 1px solid #0b89ed;
    border-radius: 4px;
    margin-top: 2.963vh;
    margin-left: 3.625vw;
}
.loginButton{
    cursor: pointer;
    width: 15.625vw;
    height: 4.074vh;
    background: #0b89ed;
    border-radius: 4px;
    margin-top: 2.926vh;
    // margin-left: 3.125vw;
    margin-bottom: 4vh;
    border: none;
    outline: none; 
    color: #ffffff;
}
.loginButton:focus {
    border: 2px solid rgb(62, 62, 62);
    outline: auto; 
}
.tips{
    margin-left: 3.625vw;
    margin-top: 1vh;
    font-size: 1.5vh;
    color: red;
}
</style>