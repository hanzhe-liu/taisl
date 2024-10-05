<template>
    <div class="controlAll">
      <div class="head">
        <img src="../assets/图层 2618.png" class="backPic">
        <div class="headBack">
          <div class="picBack">
            <img src="../assets/形状 6.png" class="headPic">
          </div>
          <div class="headName">
            {{ headName }}
          </div>
          <div class="headInfo">
            南京感动科技有限公司
          </div>
        </div>
      </div>
      <div class="leftTop">
        <img src="../assets/创建分组.png" class="pic" id="pic1" @click="dialogVisible = true">
        <el-dialog
          title="提示"
          v-model="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <span>请输入新分组名：</span>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <div v-if="checkNull" class="alterNull">*输入不能为Null</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteNewClass">取消</el-button>
            <el-button type="primary" @click="addNewClass">确定</el-button>
          </span>
        </el-dialog>
  
        <img src="../assets/订阅标签.png" class="pic" id="pic2">
  
        <span class="text1">创建分组</span>
        <div class="number1">{{ groups.length }}</div>
        <span class="text2">订阅标签</span>
        <div class="number2">{{ computelabels }}</div>
      </div>

        <div class="leftBottom">
            <el-scrollbar height="55.055vh" class="scroll">
            <div class="textstyle1">{{ recommendTitle1 }}</div>
            <div :class="show ? 'allBoxs' : 'fewBoxs'" id="boxs1">
              <el-tooltip v-for="(item, index) in givenList1()" class="box-item" effect="dark" :content="item[1]" placement="top-start" v-bind="$attrs">
                <div :key="index" class="box1">
                    {{ item[1].length<=5 ? item[1]:item[1].slice(0,4)+'...' }}
                </div>
              </el-tooltip>
              <div v-if="list1.length > 5" class="show" @click="showClick">{{ showLabel }}</div>
            </div>
    
            <div class="textstyle2">{{ recommendTitle2 }}</div>
            <div :class="show2 ? 'allBoxs' : 'fewBoxs'" id="boxs2">
              <el-tooltip v-for="(item, index) in givenList2()" class="box-item" effect="dark" :content="item[1]" placement="top-start" v-bind="$attrs">
                <div :key="index" class="box1">
                    {{ item[1].length<=5 ? item[1]:item[1].slice(0,4)+'...' }}
                </div>
              </el-tooltip>
              <div v-if="list2.length > 5" class="show" @click="showClick2">{{ showLabel2 }}</div>
            </div>
    
            <div class="textstyle3">{{ recommendTitle3 }}</div>
            <div :class="show3 ? 'allBoxs' : 'fewBoxs'" id="boxs3">
              <el-tooltip v-for="(item, index) in givenList3()" class="box-item" effect="dark" :content="item[1]" placement="top-start" v-bind="$attrs">
                <div :key="index" class="box1">
                    {{ item[1].length<=5 ? item[1]:item[1].slice(0,4)+'...' }}
                </div>
              </el-tooltip>
              <div v-if="list3.length > 5" class="show" @click="showClick3">{{ showLabel3 }}</div>
            </div>
        </el-scrollbar>
        </div>

      <div class="right">

        <el-scrollbar height="74.574vh" class="scroll">
          <div class='rightAll'>
            <div class="myOrderStyle"></div>
            <div class="myOrder">
              我的订阅
            </div>
            <div class="newClass" @click="dialogVisible = true">
              +新建分组
            </div>

            <div v-for="(i, index) in groups" class="rightMiddle">
              <div class="elContainer">
                <div class="elIcon" @click="i.ifIcon()">...</div>
              </div>
              <div class="showClass" v-if="i.IconClicked">
                <div :class="i.selected[0] ? 'markedBox' : 'showBox'" @click="i.changeSelected(0); i.modelChange()">重命名</div>
                <div :class="i.selected[1] ? 'markedBox' : 'showBox'" @click="i.changeSelected(1)">编辑</div>
                <div :class="i.selected[2] ? 'markedBox' : 'showBox'" @click="i.changeSelected(2)">解散分组</div>
              </div>

              <el-dialog
                title="是否确认解散当前分组"
                v-model="i.selected[2]"
                width="30%">
                <span slot="footer" class="dialog-footer">
                  <el-button @click="i.changeSelected(2);">取消</el-button>
                  <el-button type="primary" @click="deleteGroup(i, index)">确定</el-button>
                </span>
              </el-dialog>
              
                <div v-if="i.showName" class="rightText">{{ i.name }}</div>
                <input type = "text" v-if="!i.showName" v-model="i.newName" @keyup.enter="i.saveLabel()" class="addName"
                @keyup.esc="i.modelChange()">

                <div class="allBoxs">
                  <el-tooltip v-for="(item, index) in i.labels" class="box-item" effect="dark" :content="item.value" placement="top-start" v-bind="$attrs">
                    <div :key="index" class="box1">
                      {{ item.value.length<=5 ? item.value:item.value.slice(0,5)+'...' }}
                      <div v-if="i.selected[1]" class="deleteIcon" @click="i.delete(item.value)">删除</div>
                    </div>
                  </el-tooltip>
                  <addAction v-if="i.selected[1]" @addToClick="(newValue) => addToClick(newValue, i)" class="show"></addAction>
                </div>
            </div>
          </div>
        </el-scrollbar>
      </div>

    </div>
  </template>
  
  <script setup lang="ts">
  import addAction from '../components/addAction.vue'
  import { ElMessageBox } from 'element-plus'
  import { ref, onMounted, getCurrentInstance, computed } from 'vue'
  import { useLayoutStore } from "../store/layout";
  
  const {proxy}=getCurrentInstance()
  let layoutStore = useLayoutStore()
  let recommend:any
  let recommendTitle1 = ref('')
  let recommendTitle2 = ref('')
  let recommendTitle3 = ref('')
  let headName = ref(sessionStorage.getItem('username'))
  onMounted(()=>{
    layoutStore.searchInputBox = false
    layoutStore.styleHeadText.clear();
    getRecommend()
    getInventory()
  })
  function getRecommend(){
    let params = {
        app_key:"f4f56da0-4589-11eb-aa8e-5b1ae6b0d7f8",
        vp_app_id:sessionStorage.getItem('app_id'),
        num:3
    }
    proxy.$api.getRecommend(params).then((res)=>{
        recommend = ref(res)
        recommendTitle1.value = res.data[0].vp_class_name
        list1.value = res.data[0].resource
        recommendTitle2.value = res.data[1].vp_class_name
        list2.value = res.data[1].resource
        recommendTitle3.value = res.data[2].vp_class_name
        list3.value = res.data[2].resource
    })
  }

  function getInventory(){
    let params = {
        app_key:"f4f56da0-4589-11eb-aa8e-5b1ae6b0d7f8",
        vp_app_name:sessionStorage.getItem('app_name')
    }
    proxy.$api.getInventory(params).then((res)=>{
      for(let i:number=0; i < res.data.length; i++){
        let resourceArray:Array<label> = []
        for(let j:number=0; j < res.data[i].resource.length; j++){
          resourceArray.push({value:res.data[i].resource[j][1]})
        }
        let aGroup = new group(res.data[i].vp_class_name, resourceArray)
        groups.value.push(aGroup)
      }
    })

  }

  const checkNull = ref(false)
  const input = ref('')
  const dialogVisible = ref(false)
  const show = ref(false)
  const showLabel = ref('+展开')
  const show2 = ref(false)
  const showLabel2 = ref('+展开')
  const show3 = ref(false)
  const showLabel3 = ref('+展开')
  const list1 = ref([])
  const list2 = ref([])
  const list3 = ref([])
  const groups = ref<Array<group>>([])
  interface label{
    value:string
  }

  class group{
    public name:string
    public labels:Array<label> | null
    public IconClicked:boolean = false
    public selected:Array<boolean> = [false, false, false]
    public dialog:boolean = false
    public showName:boolean = true
    public newName:string = ''
    constructor(name:string, labels:Array<label> | null){
        this.name = name
        this.labels = labels
    }
    public push(label:label): number{
        if(this.labels === null){
            this.labels = []
            this.labels.push(label)
            return 1
        }
        this.labels.push(label)
        return 1
    }
    public delete(name:string): number{
        if(this.labels === null){
            return 0
        }
        for(let i:number=0; i<this.labels.length; i++){
            if(this.labels[i].value === name){
                this.labels.splice(i, 1)
                return 1
            }
        }
        return 0
    }
    public ifIcon(): void{
      for(let j:number = 0; j < 3; j++){
        this.selected[j] = false
      }
      if(!this.showName){
        this.modelChange()
      }
      this.IconClicked = !this.IconClicked

    }
    public changeSelected(i:number): number{
      if(i!==0 && i!==1 && i!==2){
        return 0
      }
      let current:boolean = this.selected[i]
      for(let j:number = 0; j < 3; j++){
        this.selected[j] = false
      }
      this.selected[i] = !current
      return 1
    }
    public ifDialog(): void{
      this.dialog = !this.dialog
    }

    public saveLabel(): number{
      this.selected[0] = !this.selected[0] 
      this.name = this.newName
      this.showName = !this.showName
      return 1
    }

    public modelChange(): void{
      this.showName = !this.showName
    }
  }

  
  
  const showClick = () => {
    show.value = !show.value
    showLabel.value = show.value ? '-收起' : '+展开'
  }
  
  const showClick2 = () => {
    show2.value = !show2.value
    showLabel2.value = show2.value ? '-收起' : '+展开'
  }
  
  const showClick3 = () => {
    show3.value = !show3.value
    showLabel3.value = show3.value ? '-收起' : '+展开'
  }
  
  const addToClick = (newValue, i) => {
    i.push(newValue)
    // list1.value.push({ value: newValue.value })
  }
  
  const deleteNewClass = () => {
    input.value = ''
    checkNull.value = false
    dialogVisible.value = false
  }
  
  const addNewClass = () => {
    if(input.value === '' || input.value === null){
      checkNull.value = true
      return
    }
    let aGroup = new group(input.value, null)
    groups.value.push(aGroup)
    let params = {
        app_key:"f4f56da0-4589-11eb-aa8e-5b1ae6b0d7f8",
        vp_app_id:sessionStorage.getItem('app_id'),
        vp_app_name:sessionStorage.getItem('app_name'),
        vp_class_description: "2",
        vp_class_name: input.value
    }
    proxy.$api.PostNewClass(params).then((res)=>{
      console.log(res)
    })

    input.value = ''
    checkNull.value = false
    dialogVisible.value = false
  }
  
  const givenList1 = () => {
    return show.value ? list1.value : list1.value.slice(0, 5)
  }
  
  const givenList2 = () => {
    return show2.value ? list2.value : list2.value.slice(0, 5)
  }
  
  const givenList3 = () => {
    return show3.value ? list3.value : list3.value.slice(0, 5)
  }

  function deleteGroup(i, index){
    i.changeSelected(2)
    groups.value.splice(index,1)
  }

  let computelabels = computed(()=>{
    let totalNumber = 0
    for(let i:number = 0; i < groups.value.length; i++){
      if(groups.value[i].labels != null){
        totalNumber+=groups.value[i].labels.length
      }
    }
    return totalNumber
  })
  const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确认关闭弹窗')
    .then(() => {
      done()
    })
    .catch(() => {
    })
}
  </script>
  
<style lang="scss" scoped>
.controlAll{
    position: relative;
    .backPic{
        position: absolute;
        width: 100vw;
        height: 12.407vh;
        z-index: -1;
        left:0;
        top: 0;
    }
    .head{
      z-index: 1;
      position: absolute;
        width: 100vw;
        height: 12.407vh;
        left:0;
        top: 0;
        .headBack{
          position: absolute;
          top: 0.926vh;
          left: 1.458vw;
          width: 97.083vw;
          height: 10.556vh;
          background: rgba(255,255,255,0.34);
          border: 1px solid rgba(255,255,255,0.70);
          border-radius: 2px;
          .picBack{
            position: absolute;
            top: 2.13vh;
            left: 1.41vw;
            width: 3.54vw;
            height: 6.3vh;
            opacity: 0.2;
            background: #a7b9c2;
            border-radius: 30px;
            .headPic{
              z-index: 2;
              position: absolute;
              top:1.51vh;
              left:0.85vw;
              width: 1.823vw;
              height: 3.241vh;
            }
          }
          .headName{
            position: absolute;
            top: 2.96vh;
            left: 6.09vw;
            height: 2.22vh;
            font-size: 2.22vh;
            font-family: Source Han Sans CN, Source Han Sans CN-Bold;
            font-weight: 700;
            text-align: left;
            color: #333333;
            line-height: 2.22vh;
          }
          .headInfo{
            position: absolute;
            top: 6.11vh;
            left: 6.09vw;
            height: 1.3vh;
            font-size: 1.3vh;
            font-family: Source Han Sans CN, Source Han Sans CN-Regular;
            font-weight: 400;
            text-align: left;
            color: #333333;
            line-height: 1.3vh;
          }
        }
    }
    .leftTop{
        position: absolute;
        width:27.1354vw;
        height:16.6667vh;
        left:1.4583vw;
        top: 15.0148vh;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 1px 2px 0px rgba(137,146,162,0.30); 
        .alterNull{
            color: red;
            margin-top: 1vh
        }
        .pic{
            cursor: pointer;
            position: absolute;
            width:4.7396vw;
            height:10.2778vh;
            top: 3.7037vh
        }
        #pic1{
            position: absolute;
            left:2.76vw;
        }
        #pic2{
            position: absolute;
            left:14.4792vw;
        }

        .text1{
            position: absolute;
            width: 3.6979vw;
            height: 1.667vh;
            font-size: 1.667vh;
            font-family: Source Han Sans CN, Source Han Sans CN-Medium;
            font-weight: 500;
            text-align: left;
            color: #717b88;
            left:8.4896vw;
            top:5.1852vh
        }
        .number1{
          position: absolute;
          left:8.4896vw;
          top: 8.33vh;
          height: 4.44vh;
          font-size: 4.44vh;
          font-family: Arial, Arial-Regular;
          font-weight: 400;
          text-align: left;
          color: #22c6e4;
          line-height: 4.44vh;
        }
        .text2{
            position: absolute;
            width: 3.6979vw;
            height: 1.667vh;
            font-size: 1.667vh;
            font-family: Source Han Sans CN, Source Han Sans CN-Medium;
            font-weight: 500;
            text-align: left;
            color: #717b88;
            left:20.208vw;
            top:5.1852vh
        }
        .number2{
          position: absolute;
          left:20.208vw;
          top: 8.33vh;
          height: 4.44vh;
          font-size: 4.44vh;
          font-family: Arial, Arial-Regular;
          font-weight: 400;
          text-align: left;
          color: #0b89ed;
          line-height: 4.44vh;
        }
    }

    .leftBottom{
        position: absolute;
        width: 27.1354vw;
        min-height: 55.055vh;
        // padding-bottom: 2vh;
        left:1.4583vw;
        top: 33.5333vh;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 1px 2px 0px rgba(137,146,162,0.30); 
        .scroll{
            padding-bottom: 3vh;
        }
        .textstyle1{
            //position: relative;
            // width: 3.281vw;
            height: 1.4815vh;
            font-size: 1.4815vh;
            font-family: Source Han Sans CN, Source Han Sans CN-Bold;
            font-weight: 700;
            text-align: left;
            color: #333333;
            margin-top:6.9444vh;
            margin-left:1.406vw;
        }

        #boxs1{
            //position: relative;
            margin-left:1.4062vw;
            margin-top:3vh;
        }

        #boxs2{
            //position: relative;
            margin-left:1.4062vw;
            margin-top:3vh;
        }

        #boxs3{
            position: relative;
            margin-left:1.4062vw;
            margin-top:3vh;
        }

        .allBoxs{
            width: 26vw;
            display: flex;
            flex-wrap: wrap; 
            overflow: hidden;
            min-height: 12vh;
            .box1{
                width: 7.3958vw;
                height: 4.0741vh;
                background: #f2f4f9;
                border-radius: 3px;
                text-align: center;
                margin-right: 1vw;
                margin-bottom: 0.7vh;
                line-height: 4.0741vh;
            }

            .show{
                width: 7.3958vw;
                height: 4.0741vh;
                font-size: 1.296vh;
                font-family: Source Han Sans CN, Source Han Sans CN-Medium;
                font-weight: 500;
                text-align: center;
                color: #888888;
                line-height: 4.0741vh;
            }
        }

        .fewBoxs{
            width: 26vw;
            display: flex;
            flex-wrap: wrap; 
            overflow: hidden;
            max-height: 9vh;
            .box1{
                width: 7.3958vw;
                height: 4.0741vh;
                background: #f2f4f9;
                border-radius: 3px;
                text-align: center;
                margin-right: 1vw;
                margin-bottom: 0.7vh;
                line-height: 4.0741vh;
            }

            .show{
                width: 7.3958vw;
                height: 4.0741vh;
                font-size: 1.296vh;
                font-family: Source Han Sans CN, Source Han Sans CN-Medium;
                font-weight: 500;
                text-align: center;
                color: #888888;
                line-height: 4.0741vh;
            }
        }

        .textstyle2{
            //position: relative;
            // width: 3.281vw;
            height: 1.4815vh;
            font-size: 1.4815vh;
            font-family: Source Han Sans CN, Source Han Sans CN-Bold;
            font-weight: 700;
            text-align: left;
            color: #333333;
            margin-top:3.5vh;
            margin-left:1.406vw;
        }

        .textstyle3{
            //position: relative;
            // width: 4.3vw;
            height: 1.4815vh;
            font-size: 1.4815vh;
            font-family: Source Han Sans CN, Source Han Sans CN-Bold;
            font-weight: 700;
            text-align: left;
            color: #333333;
            margin-top:3.5vh;
            margin-left:1.406vw;
        }
    }

    .right{
        position: absolute;
        width: 68.9062vw;
        height: 76.574vh;
        left:29.6354vw;
        top: 15.0148vh;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 1px 2px 0px rgba(137,146,162,0.30); 
        .rightAll{
          position: relative;
          padding-top: 6vh;
          .myOrderStyle{
            position: absolute;
            top: 1.9vh;
            left: 1.8vw;
            width: 1.614vw;
            height: 1.667vh;
            opacity: 0.7;
            background: linear-gradient(128deg,#1989fa 0%, #ffffff 63%), rgba(25,137,250,0.00);
          }
          .myOrder{
            position: absolute;
            top: 1.85vh;
            left: 2.76vw;
            height: 1.67vh;
            font-size: 1.67vh;
            font-family: Source Han Sans CN, Source Han Sans CN-Medium;
            font-weight: 500;
            text-align: left;
            color: #333333;
            line-height: 1.67vh;
          }
          .newClass{
            cursor: pointer;
            position: absolute;
            top: 2.05vh;
            left: 62.75vw;
            height: 1.55vh;
            font-size: 1.55vh;
            font-family: Source Han Sans CN, Source Han Sans CN-Medium;
            font-weight: 500;
            text-align: left;
            color: #0b89ed;
            line-height: 1.55vh;
          }
        }
        .rightText{
          margin-top: 1.496vh;
          margin-left: 1.3vw;
          font-size: 1.8vh;
          font-family: Source Han Sans CN, Source Han Sans CN-Medium;
          font-weight: 500;
          text-align: left;
          color: #333333;
          line-height: 1.8vh;
          letter-spacing: 0.8px;
        }
        .addName{
          margin-top: 1.296vh;
          margin-left: 0.9375vw;
          width: 7.3958vw;
          height: 4.0741vh;
          font-size: 1.296vh;
          font-family: Source Han Sans CN, Source Han Sans CN-Medium;
          font-weight: 500;
          text-align: center;
          color: #888888;
          line-height: 4.0741vh;
        }

        .rightMiddle{
          position: relative;
            width: 66.094vw;
            min-height: 11.4815vh;
            border: 1px solid #cad2e6;
            border-radius: 3px;
            margin-top: 0.4vh;
            margin-left: 1.406vw;
            margin-bottom: 2.5vh;
            .elContainer{
                position: absolute;
                cursor: pointer; 
                border: 1px solid #adb7c4;
                margin-left: 63.271vw;
                margin-top: 1.574vh;
                height:3.5vh;
                width:1.8vw;
                text-align: center;
                .elIcon{
                    font-size: 4vh;
                    line-height: 1vh;
                    color: #515757;
                }
            }

            .showClass{
                background:#f7f7f4;
                position: absolute;
                margin-left: 61vw;
                margin-top: 5.5vh;
                // outline: none;
                border: 1px solid #f3eeee;
                border-radius: 2px;
                z-index: 4;
                .showBox{
                  cursor: pointer;
                    height:2.88vh;
                    width: 3.646vw;
                    text-align: center;
                    font-size: 1.5vh;
                    line-height: 2.88vh;
                }

                .markedBox{
                  cursor: pointer;
                    height:2.88vh;
                    width: 3.646vw;
                    border: 1px solid #adb7c4;
                    text-align: center;
                    font-size: 1.5vh;
                    line-height: 2.88vh;
                    background: #e0f7fa;
                }
            }


            .allBoxs{
                width: 70vw;
                display: flex;
                flex-wrap: wrap; 
                overflow: hidden;
                min-height: 9.4815;
                margin-top: 3vh;
                margin-left: 0.8854vw;
                .box1{
                    position: relative;
                    width: 7.1vw;
                    height: 4.0741vh;
                    background: #f2f4f9;
                    border-radius: 3px;
                    margin-right: 1vw;
                    margin-bottom: 0.7vh;
                    line-height: 4.0741vh;
                    text-align: center;
                    .deleteIcon{
                        position: absolute;
                        background: red;
                        right: 0vw;
                        top: 0vh;
                        height:1.5vh;
                        width:2vw;
                        cursor: pointer; 
                        font-size: 1.3vh;
                        line-height: 1.3vh;
                        color: #ffffff;
                    }
                }

                .show{
                    width: 7.3958vw;
                    height: 4.0741vh;
                    font-size: 1.296vh;
                    font-family: Source Han Sans CN, Source Han Sans CN-Medium;
                    font-weight: 500;
                    text-align: center;
                    color: #000;
                    line-height: 4.0741vh;
                }
            }

        }

        .rightBottom{
            width: 66.094vw;
            height: 14.2592vh;
            border: 1px solid #cad2e6;
            border-radius: 3px;
            margin-top: 1.2962vh;
            margin-left: 1.406vw;
        }

    }
}
</style>