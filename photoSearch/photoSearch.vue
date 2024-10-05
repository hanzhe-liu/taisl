<template>
    <el-scrollbar height="93vh">
      <div class="all">
        <div class="left">
          <div v-for="bubble in Arrayleft" class="leftBottom">
              <div class="leftBottomText">
                  {{ bubble.typesName }}
              </div>
              <div v-for="type in bubble.arrayAllBoxs" class="type">
                  <div class="typeName">
                      {{ type.boxsName }}
                  </div>
                  <div class="allBoxs">
                      <Box v-for="box in type.arrayBoxs" :title="box.title" 
                      :content="box.content" :time="box.time" class="box"></Box>
                  </div>
              </div>
          </div>
        </div>

        <div class="rightTop">
          <img :src="imageSrc" class="licensePlate">
          <img src="../assets/组 41 拷贝.png" class="licenseBack">
          <div class="license">{{ aCar.carID }}</div>
          <div class="brand head">车标品牌</div>
          <div class="brandContent content">{{ aCar.brand }}</div>
          <div class="day head">近一年在网天数</div>
          <div class="dayContent content">{{ aCar.days }}</div>
          <div class="time head">近一年累积行驶时长</div>
          <div class="timeContent content">{{ aCar.time }}</div>
          <div class="nativePlace head">车籍</div>
          <div class="nativePlaceContent content">{{ aCar.place }}</div>
        </div>

        <div class="rightMid">
          <div class="rightMidTitle">通行轨迹</div>
        </div>
        <div class="rightBottom">
          <div class="rightBottomTitle">
            车群排名
          </div>
          <div class="allRanks">
            <rank v-for="i in theRightBottom.arrayRank" class="oneRank" :title="i.title" 
            :content="i.percent" :rankClass="i.rankClass" :icon="i.icon"></rank>
          </div>
        </div>
      </div>
  </el-scrollbar>
</template>


<script setup lang='ts' name="PhotoSearch">
import { ref, reactive, getCurrentInstance, onBeforeMount, onMounted } from 'vue';
import Box from '../components/Box.vue'
import rank from '../components/rank.vue'
import { useRoute } from 'vue-router';
import { useLayoutStore } from "../store/layout";

let layoutStore = useLayoutStore()
const route = useRoute();

const {proxy}=getCurrentInstance()

class carInfo{
  public carID:string|any
  public days: string|any
  public time: string|any
  public place: string|any
  public brand: string|any
  public color: string|any
  public sliceCarID(){
    this.carID = this.carID.slice(0,-2)
  }
}

let aCar:carInfo = new carInfo()
aCar = reactive(aCar);

onBeforeMount(()=>{
    if(route.query!=null && route.query.carID != null){
        aCar.carID = route.query.carID
    }
    if(route.query!=null && route.query.days != null){
        aCar.days = route.query.days
    }
    if(route.query!=null && route.query.time != null){
        aCar.time = route.query.time
    }
    if(route.query!=null && route.query.place != null){
        aCar.place = route.query.place
    }
    if(route.query!=null && route.query.color != null){
        aCar.color = route.query.color
    }
    console.log(aCar)
    loadData(aCar.carID)
    aCar.sliceCarID()
})

onMounted(()=>{
  layoutStore.searchInputBox = false
  layoutStore.styleHeadText.photoSearch();
  updateImageSrc(aCar.color)
})

function loadData(carID){
        console.log(carID)
        let app_id = sessionStorage.getItem('app_id')
        let params = {
            app_key:"f4f56da0-4589-11eb-aa8e-5b1ae6b0d7f8",
            veh_plate:carID,
            vp_app_id: app_id,
        }
        proxy.$api.getVehValue(params).then((res)=>{
          let get = res
          for(let i:number = 0; i<get.data.length; i++){
              let oneOBJ = get.data[i]
              let alltype:alltypes = new alltypes();
              alltype.ApiParser(oneOBJ)
              Arrayleft.value.push(alltype)
          }
          aCar.brand = Arrayleft.value[0].arrayAllBoxs[1].arrayBoxs[0].content
        })

        let params2 = {
            app_key:"f4f56da0-4589-11eb-aa8e-5b1ae6b0d7f8",
            veh_plate:carID,
            num: 5,
        }
        proxy.$api.getRankQuery(params2).then((res)=>{
          let getRightBottom = res
          theRightBottom.ApiParser(getRightBottom)

        })
    }

let Arrayleft = ref<Array<alltypes>>([])

class classBox{
    public title:string 
    public content:string
    public time:string
    constructor(title:string, content:string, time:string){
        this.title = title
        this.content = content
        this.time = time
    }
}

class allBoxs{
    public boxsName:string
    public arrayBoxs:Array<classBox> = []
    constructor(name:string){
        this.boxsName = name
    }
    ApiParser(ApiArray): void{
        for(let i:number=0; i<ApiArray.length; i++){
            let title = ApiArray[i][1]
            let content = ApiArray[i][2][0]
            let time = ApiArray[i][4]
            let aBox:classBox = new classBox(title, content, time)
            this.arrayBoxs.push(aBox)
        }
    }
}

class alltypes{
    public typesName:string = ''
    public arrayAllBoxs:Array<allBoxs> = []
    ApiParser(ApiObject): void{
        this.typesName = ApiObject.pri_category_name_zh
        for(let i:number = 0; i < ApiObject.sec_category.length; i++){
            let currentAllBoxs = ApiObject.sec_category[i]
            let oneallBoxs:allBoxs = new allBoxs(currentAllBoxs.sec_category_name_zh)
            oneallBoxs.ApiParser(currentAllBoxs.resource)
            this.arrayAllBoxs.push(oneallBoxs)
        }
    }
}

interface rank{
  title:string
  percent:number
  icon:string|null
  rankClass:string
}

  class rightBottom{
    public arrayRank:Array<rank> = []

    ApiParser(ApiObject): void{
      for(let i in ApiObject.data){
        if (ApiObject.data.hasOwnProperty(i)) {
          // console.log(ApiObject.data[i])
          let arrayResource = ApiObject.data[i].resource
          for(let j:number=0; j < arrayResource.length; j++){
            let currenticon:string|null
            let rank:string
            if(j == 0){
              currenticon = "../assets/组 24.png"
              rank="rank1"
            }
            else if(j == 1){
              currenticon = "../assets/组 24_1.png"
              rank="rank2"
            }
            else if(j == 2){
              currenticon = "../assets/组 24_2.png"
              rank="rank3"
            } 
            else{
              currenticon = null
              rank="rank4"
            }
            let aRank:rank = {
              title:arrayResource[j][1], 
              percent:arrayResource[j][2],
              icon: currenticon,
              rankClass: rank,
            }
            this.arrayRank.push(aRank)
          }
        }
      }
    }
  }
  let theRightBottom:rightBottom = new rightBottom()
  theRightBottom = reactive(theRightBottom);


const imageSrc = ref<string>('');
async function colorTo(colorNumber: string) {
  if (colorNumber === "color0") return (await import('../assets/0.png')).default;
  if (colorNumber === "color1") return (await import('../assets/1.png')).default;
  if (colorNumber === "color2") return (await import('../assets/2.png')).default;
  if (colorNumber === "color3") return (await import('../assets/3.png')).default;
  if (colorNumber === "color4") return (await import('../assets/4.png')).default;
  if (colorNumber === "color5") return (await import('../assets/5.png')).default;
  if (colorNumber === "color6") return (await import('../assets/6.png')).default;
  if (colorNumber === "color9") return (await import('../assets/9.png')).default;
  if (colorNumber === "color11") return (await import('../assets/11.png')).default;
  return (await import('../assets/12.png')).default;
}

// 异步函数来更新图片源
async function updateImageSrc(colorNumber: string) {
  imageSrc.value = await colorTo(colorNumber);
}

</script>


<style lang="scss" scoped>
.all{
    position: relative;
    .left{
      width: 68vw;
      .leftBottom{
        position: relative;
        width: 66.5vw;
        min-height: 22vh;
        margin-top: 1.9vh;
        left: 1vw;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 1px 2px 0px rgba(137,146,162,0.30); 
        box-sizing: border-box; 
        padding-bottom: 1.3vh;
        .leftBottomText{
            position: relative;
            padding-top: 2.8vh;
            margin-left: 2vw;
            height: 2vh;
            font-size: 2vh;
            font-family: Source Han Sans CN, Source Han Sans CN-Medium;
            font-weight: 500;
            text-align: left;
            color: #333333;
            line-height: 1.9vh;
        }
        .type{
            margin-top: 1vh;
            width: 66.5vw;
            min-height: 5vh;
            .typeName{
                position: relative;
                margin-left: 2vw;
                height: 1.7vh;
                font-size: 1.7vh;
                font-family: Source Han Sans CN, Source Han Sans CN-Medium;
                font-weight: 500;
                text-align: left;
                color: #333333;
                line-height: 1.65vh;
            }
            .allBoxs{
                width: 64vw;
                margin-top: 1vh;
                margin-left: 1vw;
                display: flex;
                flex-wrap: wrap;
                .box{
                    margin-top: 0.9vh;
                    margin-left: 0.9vw;
                    margin-bottom: 1vh;
                }
            }
        }
    }
  }
  .rightTop{
    position: absolute;
    width: 29.79vw;
    height: 15.74vh;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 1px 2px 0px rgba(137,146,162,0.30); 
    left: 68.75vw;
    top:  0vh;
    .licensePlate{
      position: absolute;
      width: 8.49vw;
      height: 5.37vh;
      top: 3.055vh;
      left: 10.99vw;
    }
    .licenseBack{
      position: absolute;
      width: 21.93vw;
      height: 10.278vh;
      top: 3.796vh;
      left: 4.22vw;
    }
    .license{
      position: absolute;
      width: 8.49vw;
      height: 5.37vh;
      font-size: 1.25vw;
      line-height: 5.37vh;;
      font-family: Source Han Sans CN, Source Han Sans CN-Medium;
      font-weight: 500;
      color: #fff;
      top: 3.055vh;
      left: 10.99vw;
      text-align: center;
    }
    .head{
      width: 6.5vw;
      min-height: 1.296vh;
      font-size: 1.296vh;
      font-family: Source Han Sans CN, Source Han Sans CN-Medium;
      font-weight: 500;
      text-align: center;
      color: #333333;
      line-height: 1.2vh;
    }
    .content{
      width: 6.5vw;
      min-height: 1.11vh;
      font-size: 1.11vh;
      font-family: Source Han Sans CN, Source Han Sans CN-Regular;
      font-weight: 400;
      text-align: center;
      color: #5f5f5f;
      line-height: 1.1vh;
    }
    .brandContent{
      position: absolute;
      left:4.1vw;
      top:3.611vh;
    }
    .brand{
      position: absolute;
      left:4.2vw;
      top:7.037vh;
    }
    .dayContent{
      position: absolute;
      left:5.4vw;
      top:8.704vh;
    }
    .day{
      position: absolute;
      left:5.5vw;
      top:12.24vh;
    }
    .timeContent{
      position: absolute;
      left:17.7vw;
      top:8.704vh;
    }
    .time{
      position: absolute;
      left:17.8vw;
      top:12.24vh;
    }
    .nativePlaceContent{
      position: absolute;
      left:19.2vw;
      top:3.611vh;
    }
    .nativePlace{
      position: absolute;
      left:19.3vw;
      top:7.037vh;
    }
  }
  .rightMid{
    position: absolute;
    width: 29.79vw;
    height: 42vh;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 1px 2px 0px rgba(137,146,162,0.30); 
    left: 68.75vw;
    top:  18.3vh;
    .rightMidTitle{
      margin-top: 2.04vh;
      margin-left: 1.198vw;
      font-size: 1.667vh;
      font-family: Source Han Sans CN, Source Han Sans CN-Medium;
      font-weight: 500;
      text-align: left;
      color: #333333;
    }
  }
  .rightBottom{
    position: absolute;
    width: 29.79vw;
    min-height: 26.5vh;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 1px 2px 0px rgba(137,146,162,0.30); 
    left: 68.75vw;
    top:  62.3vh;
    .rightBottomTitle{
      margin-top: 2.04vh;
      margin-left: 1.198vw;
      font-size: 1.667vh;
      font-family: Source Han Sans CN, Source Han Sans CN-Medium;
      font-weight: 500;
      text-align: left;
      color: #333333;
    }
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
