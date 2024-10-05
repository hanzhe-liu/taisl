<template>
    <el-scrollbar height="93vh">
        <div class="all">
            <div class="left">
                <div class="leftTitle">
                    <img src="../assets/VP标签体系.png" class="VPLabel">
                    VP标签体系
                </div>
                <!-- <select class="selectBox" v-model="selected">
                    <option v-for="option in theoptions.arrayOption" :value="option.id">{{ option.name }}</option>
                </select> -->

                <el-select v-model="selected" placeholder="请选择分组" size="default" class="selectBox">
                  <el-option v-for="option in theoptions.arrayOption" :value="option.id" :label="option.name"/>
                </el-select>

                <div class="routerLabel" @click="routerToPersonalPage()">还没有分组，去创建>></div>
                <input type="button" class="changeRight" :value="onChange ? '提交':'编辑订阅' " @click="changeStart()">
                <div class="verticalLine"></div>
                <div v-for="title in arrayTitle" class="titleBubble">
                    <div class="line"></div>
                    <div class="rightTitle">
                        <img src="../assets/通行类.png" class="titleLabel">
                        <div class="rightTitleText">{{ title.titleName }}</div>
                    </div>
                    <div class="alltypes">
                        <div v-for="type in title.arrayType" class="typeBubble">
                            <div class="typeName">{{ type.typeName }}</div>
                            <input v-if="onChange&&!type.haveSelectedAll" type="button" class="selectAll" value="+全选" @click="type.selectall()">
                            <input v-if="onChange&&type.haveSelectedAll" type="button" class="selectAll" value="-撤销" @click="type.resetall()">
                            <div class="allBoxs">
                                <box2 class="box" v-for="box in type.arrayBox" :content="box.content" :onchange="onChange"
                                :ToShow="box.show" :already="box.already" @changeState="box.addSelfToSelectedCache(type)"></box2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="rightTop">
                <div class="titleText">标签上新</div>
                <img src="../assets/点.png" class="rightTopPic">
            </div>
            <div class="rightBottom">
                <div class="titleText">热门订阅</div>
                <div class="allRanks">
                    <rank2 v-for="i in theTotalRank.arrayRank" class="oneRank" :title="i.title" 
                    :content="i.percent" :rankClass="i.rankClass" :icon="i.icon"></rank2>
                </div>
            </div>
        </div>

    </el-scrollbar>
</template>


<script setup lang='ts' name="labelOrdered">
import { reactive, ref, onMounted, getCurrentInstance, watch } from 'vue';
import rank2 from '../components/rank2.vue';
import box2 from '../components/box2.vue';
import {useRouter} from "vue-router"
import { useLayoutStore } from "../store/layout";
import { ElMessage } from 'element-plus';

const {proxy} = getCurrentInstance()
let layoutStore = useLayoutStore()

const router = useRouter()

let selected = ref<string>('')


let onChange = ref<boolean>(false) 
onMounted(()=>{
  layoutStore.searchInputBox = false
  layoutStore.styleHeadText.labelOrdered()
  getphotoSearchClass()
  getphotoSearch('')
})

function getphotoSearchClass(){
  let params = {
      app_key:"f4f56da0-4589-11eb-aa8e-5b1ae6b0d7f8",
      vp_app_name:sessionStorage.getItem('app_name')
  }
  proxy.$api.getphotoSearchClass(params).then((res)=>{
    let APIres = res.data
    theoptions.ApiParser(APIres)
  })
}

function getphotoSearch(VClass_id:string){
  let params = {
      app_key:"f4f56da0-4589-11eb-aa8e-5b1ae6b0d7f8",
      vp_app_name:sessionStorage.getItem('app_name'),
      vp_class_id:VClass_id
  }
  proxy.$api.getphotoSearch(params).then((res)=>{
    console.log(res)
    let leftData = res.data
    if(VClass_id != ''){
      arrayTitle.value = []
    }
    for(let i:number = 0; i < leftData.length; i++){
        let onetitle:title = new title()
        onetitle.ApiParser(leftData[i])
        arrayTitle.value.push(onetitle)
    }
  })
}

function PostNewLabel(){
  let labelID:Array<string> = []
  for(let i:number = 0; i < arrayTitle.value.length; i++){
    for(let j:number = 0; j < arrayTitle.value[i].arrayType.length; j++){
      labelID = labelID.concat(Array.from(arrayTitle.value[i].arrayType[j].arraySelectedID))
    }
  }
  if(labelID.length == 0){
    return
  }
  let params = {
      app_key:"f4f56da0-4589-11eb-aa8e-5b1ae6b0d7f8",
      label_id: labelID.toString(),
      vp_class_id: selected.value
  }
  proxy.$api.PostNewLabel(params).then((res)=>{
    getphotoSearch(selected.value)
  })
}

watch(selected, (newVal, oldVal)=>{
  theoptions.onclick(newVal)
})

function changeStart(){
  if(selected.value === ''){
    ElMessage('请先选择分组')
    return
  }
  if(onChange.value){
    PostNewLabel()
  }
  onChange.value = !onChange.value
}

let theRank = {
  "keys": [
    "label_id",
    "label_name",
    "nums"
  ],
  "resource": [
    [
      "b7716088-dfdd-11ec-9180-e02be99ac3c3",
      "收费车型",
      10
    ],
    [
      "b023c3f0-0e43-11ed-980b-6af21d271c53",
      "是否是危化品车",
      7
    ],
    [
      "22116313-e0fa-11ec-8bfa-e02be99ac3c3",
      "车标品牌",
      7
    ],
    [
      "01abc312-e0a1-11ec-8eae-e02be99ac3c3",
      "车种",
      6
    ],
    [
      "31803688-f68b-11ec-a185-e02be99ac3c3",
      "近一年累计行驶时长",
      5
    ]
  ]
}

interface option{
  name:string
  id:string
}

class options{
  public arrayOption:Array<option> = []
  public ApiParser(ApiRes){
    for(let i:number=0; i<ApiRes.length; i++){
      let newOption:option = {name:ApiRes[i].vp_class_name, id:ApiRes[i].vp_class_id}
      this.arrayOption.push(newOption)
    }
  }

  public onclick(id:string){
    let params = {
      app_key:"f4f56da0-4589-11eb-aa8e-5b1ae6b0d7f8",
      vp_app_name:sessionStorage.getItem('app_name'),
      vp_class_id:id
    }
    proxy.$api.getphotoSearch(params).then((res)=>{
      let leftData = res.data
      arrayTitle.value = []
      for(let i:number = 0; i < leftData.length; i++){
          let onetitle:title = new title()
          onetitle.ApiParser(leftData[i])
          arrayTitle.value.push(onetitle)
      }
    })
  }
}

let theoptions:options = new options()
theoptions = reactive(theoptions)

interface rank{
  title:string
  percent:number
  icon:string|null
  rankClass:string
}

class totalRank{
    public arrayRank:Array<rank> = []
    ApiParser(ApiArray): void{
        for(let i:number=0; i<ApiArray.length; i++){
            let title = ApiArray[i][1]
            let content = ApiArray[i][2]
            let currenticon:string|null
            let rank:string
            if(i == 0){
              currenticon = "../assets/组 24.png"
              rank="rank1"
            }
            else if(i == 1){
              currenticon = "../assets/组 24_1.png"
              rank="rank2"
            }
            else if(i == 2){
              currenticon = "../assets/组 24_2.png"
              rank="rank3"
            } 
            else{
              currenticon = null
              rank="rank4"
            }
            let aRank:rank = {
              title:title, 
              percent:content,
              icon: currenticon,
              rankClass: rank,
            }
            this.arrayRank.push(aRank)
        }
    }
}
let theTotalRank:totalRank = new totalRank()
theTotalRank = reactive(theTotalRank)
theTotalRank.ApiParser(theRank.resource)

class Box{
    public content:string
    public show:boolean = false
    public already:number
    public id:string
    constructor(content:string, already:number, id:string){
        this.content = content
        this.already = already
        this.id = id
    }

    public addSelfToSelectedCache(fatherType:type):void{
      if(!this.already && !this.show){
        fatherType.addID(this.id)
      }
      if(!this.already && this.show){
        fatherType.deleteID(this.id)
      }
      this.show = !this.show
      // console.log(fatherType.arraySelectedID)
    }
}

class type{
    public typeName:string
    public arrayBox:Array<Box> = []
    public haveSelectedAll:boolean = false
    public arraySelectedID:Array<string> = []

    public ApiParser(ApiObject): void{
        this.typeName = ApiObject.sec_category_name_zh
        let arrayRes:[] = ApiObject.resource
        for(let i:number = 0; i < arrayRes.length; i++){
            let oneBox:Box = new Box(arrayRes[i][1], arrayRes[i][2], arrayRes[i][0])
            this.arrayBox.push(oneBox)
        }
    }

    public selectall():void{
      for(let i:number = 0; i < this.arrayBox.length; i++){
        this.arrayBox[i].show = true;
        if(!this.arrayBox[i].already && !this.arraySelectedID.includes(this.arrayBox[i].id)){
          this.arraySelectedID.push(this.arrayBox[i].id)
        }
      }
      this.haveSelectedAll = true
      // console.log(this.arraySelectedID)
    }

    public resetall():void{
      for(let i:number = 0; i < this.arrayBox.length; i++){
        this.arrayBox[i].show = false;
        // if(this.arraySelectedID.includes(this.arrayBox[i].id)){
        //   this.arraySelectedID.splice(i, 1)
        // }
      }
      this.arraySelectedID = []
      this.haveSelectedAll = false
      // console.log(this.arraySelectedID)
    }

    public addID(givenID:string):void{
      this.arraySelectedID.push(givenID)
    }

    public deleteID(givenID:string):void{
      let index = this.arraySelectedID.indexOf(givenID);
      if(index != -1){
        this.arraySelectedID.splice(index, 1);
      }
    }
}

class title{
    public titleName:string
    public arrayType:Array<type> = []
    public ApiParser(ApiObject){
        this.titleName = ApiObject.pri_category_name_zh
        let ApiTypes:[] = ApiObject.sec_category
        for(let i:number = 0; i < ApiTypes.length; i++){
            let oneType:type = new type()
            oneType.ApiParser(ApiTypes[i])
            this.arrayType.push(oneType)
        }
    }
}
let arrayTitle = ref<Array<title>>([])

function routerToPersonalPage(){
    router.push({
        path:"/personalPage"
    })
}
</script>


<style lang="scss" scoped>
.all{
    position: relative;
    .left{
        position: relative;
        top:2.04vh;
        left: 1.46vw;
        width: 66.25vw;
        min-height: 89.63vh;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 1px 2px 0px rgba(137,146,162,0.30); 
        // .verticalLine{
        //   position: absolute;
        //   left: 1.2vw;
        //   top: 5.1vh;
        //   width: 0px;
        //   height: 3vh;
        //   opacity: 0.3;
        //   border: 2px solid #8dadc6;
        // }
        .leftTitle{
            position: relative;
            width: 10.21vw;
            height: 4.07vh;
            background: #0b89ed;
            border-radius: 4px;
            box-shadow: 0px 6px 18px 0px rgba(83,100,114,0.18);
            top: 0.8vh;
            left: 0.5vw;
            font-size: 2.04vh;
            font-family: Source Han Sans CN, Source Han Sans CN-Medium;
            font-weight: 500;
            text-align: center;
            color: #ffffff;
            line-height: 4.07vh;
            .VPLabel{
                position: absolute;
                width: 0.94vw;
                height: 0.833vh;
                top: 1.69vh;
                left: 0.745vw;
            }
        }
        .selectBox{
            position: absolute;
            width: 8.5vw;
            top: 1.48vh;
            left: 12vw;
        }
        .routerLabel{
            position: absolute;
            cursor: pointer;
            top: 1.644vh;
            left: 21.4vw;
            height: 2.037vh;
            font-size: 1.596vh;
            font-family: Source Han Sans CN, Source Han Sans CN-Medium;
            font-weight: 500;
            text-decoration: underline;
            text-align: left;
            color: #0b89ed;
            line-height: 2.778vh;
            letter-spacing: 0.7px;
        }
        .changeRight{
          cursor: pointer;
          position: absolute;
          left: 32vw;
          height: 3vh;
          width: 6vw;
          top: 1.6vh;
          background: #0b89ed;
          color: #ffffff;
          border: none;
        }
        .titleBubble{
            position: relative;
            width: 66.25vw;
            min-height: 8vh;
            padding-top: 3.5vh;
            padding-bottom: 3.5vh;
            margin-left:1.5vw;
            border-left: 2px solid #8dadc6;
            .line{
              position: absolute;
              top: 5.3vh;
              left: 0vw;
              border-top: 2px solid #8dadc6;
              height: 0vh;
              width: 2vw;
            }
            .rightTitle{
                position: absolute;
                min-width: 9.167vw;
                left: 2vw;
                height: 4.07vh;
                background: #ffffff;
                border: 1px solid #0bc5ed;
                border-radius: 4px;
                text-align: center;
                .titleLabel{
                    position: absolute;
                    width: 0.94vw ;
                    height: 0.833vh;
                    top: 1.69vh !important;
                    left: 0.745vw !important;
                }
                .rightTitleText{
                    margin-left: 1vw;
                    margin-right: 1vw;
                    height: 4.07vh;
                    font-size: 1.48vh;
                    font-family: Source Han Sans CN, Source Han Sans CN-Medium;
                    font-weight: 500;
                    color: #333333;
                    line-height: 4.07vh;
                }
            }
            .alltypes{
                margin-top: 5.5vh;
                .typeBubble{
                    position: relative;
                    margin-top: 2.8vh;
                    margin-left: 0.7vw;
                    .typeName{
                        margin-left: 2.3vw;
                        height:1.48vh;
                        font-size: 1.48vh;
                        font-family: Source Han Sans CN, Source Han Sans CN-Medium;
                        font-weight: 500;
                        text-align: left;
                        color: #333333;
                        line-height: 1.48vh;
                    }
                    .selectAll{
                      cursor: pointer;
                      position: absolute;
                      left: 8vw;
                      height: 2.2vh;
                      width: 3vw;
                      background: #ffffff;
                      color:#0b89ed;
                      top: 0;
                      border: 1px solid #0b89ed;
                    }
                    .allBoxs{
                        margin-top: 0.7vh;
                        margin-left: 1vw;
                        display: flex;
                        flex-wrap: wrap;
                        width: 64vw;
                    }
                }
            }
        }
    }
    .titleText{
        margin-top: 2.04vh;
        margin-left: 1.094vw;
        height: 1.667vh;
        font-size: 1.567vh;
        font-family: Source Han Sans CN, Source Han Sans CN-Medium;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 1.667vh;
    }
    .rightTop{
        position: absolute;
        top:2.04vh;
        left: 68.75vw;
        width: 29.79vw;
        height: 36.296vh;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 1px 2px 0px rgba(137,146,162,0.30); 
        .rightTopPic{
            position: absolute;
            width: 21.93vw;
            height: 23.52vh;
            top: 10.1vh;
            left: 4.01vw;
        }
    }
    .rightBottom{
        position: absolute;
        top:40.185vh;
        left: 68.75vw;
        width: 29.79vw;
        height: 51.48vh;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 1px 2px 0px rgba(137,146,162,0.30);
        .allRanks{
            margin-bottom: 1.5vh;
            margin-top: 1.5vh;
            margin-left: 1vw;
            display: flex;
            flex-wrap: wrap;
            .oneRank{
                margin-top: 1vh;
            }
        }
    }
}
</style>
