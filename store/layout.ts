import { th } from "element-plus/es/locales.mjs";
import { defineStore } from "pinia";

interface HeadText {
    selected: boolean;
}

interface AllHeadText  {
    mainPage:HeadText
    carSearch:HeadText
    photoSearch:HeadText
    labelOrdered:HeadText
}

class StyleHeadText {
    public current: HeadText | null;
    public arrayHeadText: AllHeadText;

    constructor(current: HeadText | null, arrayHeadText: AllHeadText) {
        this.current = current;
        this.arrayHeadText = arrayHeadText;
    }
    public mainPage(){
        if(this.current === null){
            this.current = this.arrayHeadText.mainPage
            this.arrayHeadText.mainPage.selected = true
          }
          else{
            this.current.selected = false
            this.current = this.arrayHeadText.mainPage
            this.arrayHeadText.mainPage.selected = true
          }
    }
    public carSearch(){
        if(this.current === null){
            this.current = this.arrayHeadText.carSearch
            this.arrayHeadText.carSearch.selected = true
          }
          else{
            this.current.selected = false
            this.current = this.arrayHeadText.carSearch
            this.arrayHeadText.carSearch.selected = true
          }
    }
    public photoSearch(){
        if(this.current === null){
            this.current = this.arrayHeadText.photoSearch
            this.arrayHeadText.photoSearch.selected = true
          }
          else{
            this.current.selected = false
            this.current = this.arrayHeadText.photoSearch
            this.arrayHeadText.photoSearch.selected = true
          }
    }
    public labelOrdered(){
        if(this.current === null){
            this.current = this.arrayHeadText.labelOrdered
            this.arrayHeadText.labelOrdered.selected = true
          }
          else{
            this.current.selected = false
            this.current = this.arrayHeadText.labelOrdered
            this.arrayHeadText.labelOrdered.selected = true
          }
    }
    public clear(){
      if(this.current != null){
        this.current.selected = false;
        this.current = null
      }
    }
}

let allHeadText:AllHeadText = {
    mainPage:{selected:false},
    carSearch:{selected:false},
    photoSearch:{selected:false},
    labelOrdered:{selected:false}
}
let styleHeadText = new StyleHeadText(null, allHeadText)

export const useLayoutStore = defineStore('layout', {
    state() {
        return {
          styleHeadText, 
          searchInputBox:true,
        }
    },
})