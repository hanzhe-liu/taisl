import { defineStore } from "pinia";
import { ElMessage } from 'element-plus'

interface State {
    pages: number;
    searchResult: Object;
    givenvalue: string;
    prevalue: string;
    veh_kind: Array<number>;
    pre_veh_kind: Array<number>;
    currentPage: number;
    total_num: number;
  }

export const useBottomPartStore = defineStore('bottomPart', {
    state():State {
        return {
            pages:10,
            searchResult:{},
            givenvalue:'',
            prevalue:'',
            veh_kind:[],
            pre_veh_kind:[],
            currentPage:1,
            total_num:0
        }
    },
    actions:{
        search(inputValue:any, proxy:any, veh_kind:any, currentPage:any){
            if(veh_kind != null && veh_kind.length!=0){

                let params = {
                    size:15,
                    page:currentPage,
                    app_key:"f4f56da0-4589-11eb-aa8e-5b1ae6b0d7f8",
                    search:{},
                }
                if(inputValue.length < 4){
                    ElMessage('不能少于4个字符')
                    return;
                }
                params.search={veh_plate: inputValue, veh_kind: veh_kind}
                this.givenvalue = inputValue
                params.search = JSON.stringify(params.search);
                proxy.$api.searchData(params).then((res)=>{
                    this.pages = res.pages*10
                    this.searchResult = res.data
                    this.total_num = res.total_num
                })

                return;
            }

            let params = {
                size:15,
                page:currentPage,
                app_key:"f4f56da0-4589-11eb-aa8e-5b1ae6b0d7f8",
                search:{}
            }
            if(inputValue.length < 4){
                ElMessage('不能少于4个字符')
                return;
            }
            params.search={veh_plate: inputValue}
            this.givenvalue = inputValue
            params.search = JSON.stringify(params.search);
            proxy.$api.searchData(params).then((res)=>{
                this.pages = res.pages*10
                this.searchResult = res.data
                this.total_num = res.total_num
            })
        },
    }
})