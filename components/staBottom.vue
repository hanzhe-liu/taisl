<template>
    <div class="staBottom">
        <div :class="['colorAll', searchColor()]" @click="toPhotoSearch()">
            <!-- <img src="../assets/1.png" class="carIDPic"> -->
            <span class="thecarIDText">{{ carID.slice(0,-2) }}</span>
        </div>
        
        <div class="carProp">
            <div>
                <span class="prop">车籍：</span>
                <span class="text">{{ theCarPlace }}</span>
            </div>

            <div>
                <span class="prop">品牌：</span>
                <span class="text">{{ text2 }}</span>
            </div>

            <!-- <div>
                <span class="prop">颜色：</span>
                <span class="text">{{ text3 }}</span>
            </div> -->

        </div>

        <div class="boxText">
            <div>
                <span class="prop">近一年累计行驶时长：</span>
                <span class="text">{{ text4 }}</span>
            </div>

            <div>
                <span class="prop">近一年在网天数：</span>
                <span class="text">{{ text5 }}</span>
            </div>
        </div>
    
    
    </div>

</template>
  
<script setup lang='ts' name="staBottom">
    import {computed} from "vue"
    import {useRouter} from "vue-router"
    import carPlace from "../static/area_dict.json"
import { ElMessage } from "element-plus";
    const router = useRouter()
    
    interface Props{
        carID:string 
        text1:string
        text2:string
        text3:string
        text4:string
        text5:string 
        showColor:number
    }

    let allProps = defineProps<Props>()
    function searchColor(){
        let colorNumber:number = allProps.showColor
        if(colorNumber == 0) return "color0"
        else if(colorNumber == 1)return "color1"
        else if(colorNumber == 2)return "color2"
        else if(colorNumber == 3)return "color3"
        else if(colorNumber == 4)return "color4"
        else if(colorNumber == 5)return "color5"
        else if(colorNumber == 6)return "color6"
        else if(colorNumber == 9)return "color9"
        else if(colorNumber == 11)return "color11"
        else return "color12"
    }

    let theCarPlace = computed(()=>{
        let place_label:string = allProps.carID.slice(0,2)
        return carPlace[place_label as keyof typeof carPlace]
    })

    function toPhotoSearch(){
        if(sessionStorage.getItem('username') == null){
            ElMessage('请先登录')
            return
        }
        router.push(
            {
                path:"/photoSearch",
                query: { 
                    carID: allProps.carID, 
                    days: allProps.text5,
                    time: allProps.text4,
                    place: theCarPlace.value,
                    color: searchColor()
                }
            }
        )
    }
</script>
  
<style lang="scss" scoped>
.staBottom{
    position: relative;
    width: 18.2292vw;
    height: 14.63vh;
    background: #f2f4f9;
    .colorAll{
        cursor: pointer;
        width: 8.0729vw;
        height: 4.6296vh;
        top: 2.2222vh;
        left:  1.3542vw;
        position:relative;
        text-align: center;
        .thecarIDText{
            width: 8.0729vw;
            line-height: 4.6296vh;
            font-size: 1.25vw;
            font-family: Source Han Sans CN, Source Han Sans CN-Medium;
            font-weight: 500;
            z-index: 2;
        }
    };
    .color0{
        background: url('../assets/0.png') no-repeat;
        background-size: 100% 100%;
        .thecarIDText{
            color: #fff
        }
    };
    .color1{
        background: url('../assets/1.png') no-repeat;
        background-size: 100% 100%;
        .thecarIDText{
            color: #000
        }
    };
    .color2{
        background: url('../assets/2.png') no-repeat;
        background-size: 100% 100%;
        .thecarIDText{
            color: #fff
        }
    };
    .color3{
        background: url('../assets/3.png') no-repeat;
        background-size: 100% 100%;
        .thecarIDText{
            color: #000
        }
    };
    .color4{
        background: url('../assets/4.png') no-repeat;
        background-size: 100% 100%;
        .thecarIDText{
            color: #000
        }
    };
    .color5{
        background: url('../assets/5.png') no-repeat;
        background-size: 100% 100%;
        .thecarIDText{
            color: #000
        }
    };
    .color6{
        background: url('../assets/6.png') no-repeat;
        background-size: 100% 100%;
        .thecarIDText{
            color: #000
        }
    };
    .color9{
        background: url('../assets/9.png') no-repeat;
        background-size: 100% 100%;
        .thecarIDText{
            color: #fff
        }
    };    
    .color11{
        background: url('../assets/11.png') no-repeat;
        background-size: 100% 100%;
        .thecarIDText{
            color: #fff
        }
    };
    .color12{
        background: url('../assets/12.png') no-repeat;
        background-size: 100% 100%;
        .thecarIDText{
            color: #fff
        }
    };

    .carProp{
        position: absolute;
        left:10.3646vw;
        top:2.2222vh;
        line-height: 1.605vh;
        .prop{
            top:0vh;
            font-size: 0.7292vw;
            font-family: Source Han Sans CN, Source Han Sans CN-Regular;
            font-weight: 400;
            text-align: right;
            color: #717b88;
        }
        .text{
            font-size: 0.7292vw;
            font-family: Source Han Sans CN, Source Han Sans CN-Regular;
            font-weight: 400;
            text-align: left;
            color: #333333;
        }
    }

    .boxText{
        position: absolute;
        left:0.677vw;
        top: 8.796vh;
        line-height: 1.605vh;
        .prop{
            top:0vh;
            font-size: 0.7292vw;
            font-family: Source Han Sans CN, Source Han Sans CN-Regular;
            font-weight: 400;
            text-align: right;
            color: #717b88;
        }
        .text{
            font-size: 0.7292vw;
            font-family: Source Han Sans CN, Source Han Sans CN-Regular;
            font-weight: 400;
            text-align: left;
            color: #333333;
        }
    }
}
</style>