<template>
  <div class="all">
    <div class="label-container">
      <span class="label1">公安车型:</span>
      <span class="label2">收费车型:</span>
      <span class="label3">车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种:</span>
      <span class="label4">高级检索:</span>
    </div>
    
    <div class="allButton">
      <div class="line1"><el-button :class="{onclick: item.onclick}" type="primary" @click="handleClick1(item)"
        v-for="(item, index) in list1" :key="`l1` + index" plain >{{ item.inBox }}</el-button></div>

      <div class="line2"><el-button :class="{onclick: item.onclick}" type="primary" @click="handleClick1(item)"
        v-for="(item, index) in list2" :key="`l1` + index" plain >{{ item.inBox }}</el-button></div>

      <div class="line3"><el-button :class="{onclick: item.onclick}" type="primary" @click="handleClick3(item)"
        v-for="(item, index) in list3" :key="`l1` + index" plain >{{ item.inBox }}</el-button></div>
    </div>
    
    <div class="allSelect">
      <el-select v-model="value1" placeholder="请选择高级项">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="value2" placeholder="请选择类别">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <input type="button" @click="resetAll()" id="reset" value="重置">
    <input type="button" @click="search()" id="search" value="搜索">

  </div>
</template>

<script lang="ts" setup name="staticHead">
import {ref, getCurrentInstance, onMounted} from 'vue'
import { useBottomPartStore } from '../store/bottomPart';
import { number } from 'echarts';

let BottomPartStore = useBottomPartStore()
const {proxy}=getCurrentInstance()
  let value1 = ''
  let value2 = ''
  let numberArray3 = ref<Array<number>>([])
  
    onMounted(()=>{
      if(sessionStorage.getItem('pre_veh_kind') != null){
        let currentArray:Array<number> = []
        if(sessionStorage.getItem('pre_veh_kind') != null && sessionStorage.getItem('pre_veh_kind').length != 0){
          currentArray =  sessionStorage.getItem('pre_veh_kind')?.split(',').map(Number)
        } 
          // console.log(currentArray)
        // console.log(sessionStorage.getItem('pre_veh_kind'))
        let NewArray:Array<number> = []
        if(currentArray != undefined && currentArray!=null && currentArray.length !=0){
          for(let i:number=0; i<currentArray.length; i++){
            NewArray.push(currentArray[i])
          }
        }
        numberArray3.value = NewArray
        BottomPartStore.pre_veh_kind = NewArray

        for(let i:number = 0; i < numberArray3.value.length; i++){
          for(let j:number = 0; j < list3.value.length; j++){
            if(list3.value[j].number == numberArray3.value[i]){
              list3.value[j].onclick = true
            }
          }
        }
      }
    })
  
  let list1 = ref([
        { inBox: "小型客车", onclick: false},
        { inBox: "中型客车", onclick: false},
        { inBox: "大型客车", onclick: false},
        { inBox: "轻型货车", onclick: false},
        { inBox: "中型货车", onclick: false},
        { inBox: "重型货车", onclick: false},
        { inBox: "专项作业车", onclick: false}
      ])
  let list2= ref([
        { inBox: "一型客车", onclick: false},
        { inBox: "二型客车", onclick: false},
        { inBox: "三型客车", onclick: false},
        { inBox: "四型客车", onclick: false},
        { inBox: "一型货车", onclick: false},
        { inBox: "二型货车", onclick: false},
        { inBox: "三型货车", onclick: false},
        { inBox: "四型货车", onclick: false},
        { inBox: "五型货车", onclick: false},
        { inBox: "六型货车", onclick: false},
        { inBox: "一型专项作业车", onclick: false},
        { inBox: "二型专项作业车", onclick: false}
      ])
  let list3= ref([
        { inBox: "普通", onclick: false, number:0},
        { inBox: "公务", onclick: false, number:6},
        { inBox: "军警", onclick: false, number:8},
        { inBox: "紧急", onclick: false, number:10},
        { inBox: "免费", onclick: false, number:12},
        { inBox: "车队", onclick: false, number:14},
        { inBox: "绿通车", onclick: false, number:21},
        { inBox: "联合收割机", onclick: false, number:22},
        { inBox: "抢险救灾", onclick: false, number:23},
        { inBox: "J1类型集装箱", onclick: false, number:24},
        { inBox: "大件运输", onclick: false, number:25},
        { inBox: "应急车", onclick: false, number:26},
        { inBox: "货车列车或半挂", onclick: false, number:27},
        { inBox: "J2类型集装箱", onclick: false, number:28}
      ])
  
  let options1= [{
          value: 0,
          label: '黄金糕'
        }, {
          value: 1,
          label: '双皮奶'
        }, {
          value: 2,
          label: '蚵仔煎'
        }, {
          value: 3,
          label: '龙须面'
        }, {
          value: 4,
          label: '北京烤鸭'
        }]

  let options2= [{
          value: 0,
          label: '黄金糕'
        }, {
          value: 1,
          label: '双皮奶'
        }, {
          value: 2,
          label: '蚵仔煎'
        }, {
          value: 3,
          label: '龙须面'
        }, {
          value: 4,
          label: '北京烤鸭'
        }]
    function handleClick1(item){
      item.onclick = !item.onclick
      // console.log(item)
    }
    function handleClick3(item){
      if(item.onclick === false){
        numberArray3.value.push(item.number)
        BottomPartStore.veh_kind = numberArray3.value.slice()
        // console.log(BottomPartStore.veh_kind)
      }
      else{
        let index = numberArray3.value.findIndex((num) => num == item.number);
        numberArray3.value.splice(index, 1)
        BottomPartStore.veh_kind = numberArray3.value.slice()
        // console.log(BottomPartStore.veh_kind)
      }
      item.onclick = !item.onclick
    }

    function resetAll() {
      for(let i:number =0; i < list1.value.length; i++){
        if(list1.value[i].onclick === true){
          list1.value[i].onclick = !list1.value[i].onclick
        }
      }
      for(let i:number =0; i < list2.value.length; i++){
        if(list2.value[i].onclick === true){
          list2.value[i].onclick = !list2.value[i].onclick
        }
      }
      for(let i:number =0; i < list3.value.length; i++){
        if(list3.value[i].onclick === true){
          list3.value[i].onclick = !list3.value[i].onclick
        }
      }
    }
    function search(){
      if(BottomPartStore.currentPage === 1){
        BottomPartStore.prevalue = BottomPartStore.givenvalue
        BottomPartStore.pre_veh_kind = BottomPartStore.veh_kind
        sessionStorage.setItem('pre_veh_kind', String(BottomPartStore.veh_kind))
        sessionStorage.setItem('inputValue', BottomPartStore.givenvalue)
        BottomPartStore.search(BottomPartStore.givenvalue, proxy, numberArray3.value.slice(), 1)
        return
      }
      BottomPartStore.prevalue = BottomPartStore.givenvalue
      BottomPartStore.pre_veh_kind = BottomPartStore.veh_kind
      sessionStorage.setItem('pre_veh_kind', String(BottomPartStore.veh_kind))
      sessionStorage.setItem('inputValue', BottomPartStore.givenvalue)
      BottomPartStore.currentPage = 1
    }
</script>


<style lang="scss" scoped>
.all{
  position: absolute;
  width: 97.0883vw;
  height: 21.29vh;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 1px 2px 0px rgba(137,146,162,0.30);
  left: 1.4583vw;
  top: 7.59vh;
  z-index: 0;
  background: #ffffff;
}


.allButton {
  position: absolute;
  left: 6.6146vw;
  top: 1.9vh;
  display: flex;
  flex-direction: column;

  .line1, .line2, .line3 {
    display: flex;
    margin-bottom: 1.481vh;
  }

  .el-button {
    margin-right: 0vw;
    width: 5.542vw;
    height: 2.777vh;
    border-radius: 0.156vw;
    font-size: 0.7292vw;
    font-family: Source Han Sans CN, Source Han Sans CN-Medium;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333333 !important;
    background: #f2f4f9 !important;
    text-align: center;

    .onclick {
      background: lightblue !important;
    }
  }

  .onclick {
    background: lightblue !important;
  }
}


.allSelect {
  position: absolute;
  left: 6.666vw;
  top: 15vh;

  .el-select {
    margin-right: 0.833vw;
    width: 12.7083vw;
    height: 2.7778vh;
    border: 1px solid rgba(161, 166, 180, 0.70);
    border-radius: 3px;
   
  }
}



// ::v-deep(.el-button--primary.is-plain:focus, .el-button--primary.is-plain:hover){
//   background: yellow !important;
// }
.head{
    width: 97.08vw;
    height: 24.07vh;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 1px 2px 0px rgba(137,146,162,0.30);
    left: 1.1458vw;
    top: 7.592vh;
    z-index: 0;
    position: absolute;
}

.label-container{
    width: 3.281vw;
    height: 13.981vh;
    font-size: 0.72vw;
    font-family: Source Han Sans CN, Source Han Sans CN-Medium;
    font-weight: 500;
    text-align: left;
    color: #717b88;
    line-height: 2.3958vw;
    letter-spacing: 0.04375vw;
    left:2.604vw;
    top:1.2vh;
    position: absolute;
    z-index: 1;
}

#selectBox1{
  position: absolute;
  width: 12.7083vw;
  height: 2.777vh;
  left: 6.666vw;
  top: 15vh;
}

#selectBox2{
  position: absolute;
  width: 12.7083vw;
  height: 2.777vh;
  left: 20.2083vw;
  top: 15vh;
}

#reset{
  position: absolute;
  width: 3.437vw;
  height: 2.777vh;
  left: 87.7916vw;
  top: 17vh;
  background: #ffffff, #f2f4f9;
  border: 1px solid rgba(11,137,237,0.70);
  border-radius: 3px;
  cursor: pointer;
}

#search{
  position: absolute;
  width: 3.437vw;
  height: 2.777vh;
  left: 91.7916vw;
  top: 17vh;
  background: #ffffff, #f2f4f9;
  border: 1px solid rgba(11,137,237,0.70);
  border-radius: 3px;
  cursor: pointer;
}

.allBox{
  position: absolute;
  left: 34.43vw;
  top: 14.4vh
}

.checkBox{
  font-size: 14px;
  font-family: Source Han Sans CN, Source Han Sans CN-Medium;
  font-weight: 500;
  text-align: left;
  color: #333333;
  line-height: 45px;
}


</style>

<style> 
.el-input__inner{
  height: 2.7778vh;
}

.el-input__icon {
  line-height: 2.7778vh;
}
</style>