<template>
    <div>
        <el-tooltip v-if="showall" class="box-item" effect="dark" :content="content" placement="top-start" v-bind="$attrs">
            <div v-if="!allProps.already" class="all" @mouseenter="showOrder()" @mouseleave="showOrder()">
                <div class="content NotAlreay">
                    {{ showcontent }}
                </div>
                <div v-if="onchange">
                    <div v-if="show" class="show Order" @click="emitChangeState()">+订阅</div>
                    <div v-if="show&&allProps.ToShow" class="delete Order" @click="emitChangeState()">取消订阅</div>
                </div>
            </div>

            <div v-if="allProps.already" class="all">
                <div class="content already">
                    {{ showcontent }}
                </div>
            </div>
        </el-tooltip>

        <div v-if="!showall">
            <div v-if="!allProps.already" class="all" @mouseenter="showOrder()" @mouseleave="showOrder()" v-bind="$attrs">
                <div class="content NotAlreay">
                    {{ showcontent }}
                </div>
                <div v-if="onchange">
                    <div v-if="show" class="show Order" @click="emitChangeState()">+订阅</div>
                    <div v-if="show&&allProps.ToShow" class="delete Order" @click="emitChangeState()">取消订阅</div>
                </div>
            </div>

            <div v-if="allProps.already" class="all">
                <div class="content already">
                    {{ showcontent }}
                </div>
            </div>
        </div>


    </div>
</template>


<script setup lang='ts' name="Box">
    import { computed, ref } from "vue";

    const emit = defineEmits(['changeState'])

    function emitChangeState(){
        emit('changeState')
    }
    interface Props{
        content:string
        ToShow:boolean
        already:number
        onchange:boolean
    }
    let allProps = defineProps<Props>()
    let showall = ref<boolean>(true)
    let show = ref<boolean>(false)
    let showcontent = computed(() => {
        if(allProps.content.length > 6){
            showall.value = true
            return allProps.content.substring(0,6)+"..."
        }
        showall.value = false
        return allProps.content
    });

    function showOrder(){
        show.value = !show.value
        // console.log(allProps.ToShow)
    }

</script>


<style lang="scss" scoped>
.all{
    position: relative;
    width: 7.275vw;
    height: 4.07vh;
    background: #f2f4f9;
    border-radius: 3px;
    margin-top: 0.5vh;
    margin-left: 0.4vw;
    .content{
        position: absolute;
        width: 7.575vw;
        height: 4.07vh;
        font-size: 1.48vh;
        font-family: Source Han Sans CN, Source Han Sans CN-Medium;
        font-weight: 500;
        text-align: center;
        line-height: 4.07vh;
    }
    .already{
        color: #0b89ed;
    }
    .NotAlreay{
        color: #333333;
    }
    .Order{
        cursor: pointer;
        position: absolute;
        width: 7.575vw;
        height: 4.07vh;
        font-size: 1.48vh;
        font-family: Source Han Sans CN, Source Han Sans CN-Medium;
        font-weight: 500;
        text-align: center;
        color: #ffffff;
        line-height: 4.07vh;
    }
    .show{
        background: #0b89ed ;
    }
    .delete{
        background: #f1a513;
    }
}
</style>
