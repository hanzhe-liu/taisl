<template>
    <div>
        <span v-if="!writting" class="addLabel" @click="modelChange">+新增标签</span>
        <input type = "text" v-if="writting" v-model="newLabel" @keyup.enter="saveLabel" 
        ref="inputRef" @keyup.esc="modelChange">
    </div>
</template>
  
<script setup lang='ts' name="App">
    import { ref, nextTick } from 'vue'
    let writting = ref(false)
    let newLabel = ref('')

    const inputRef = ref<HTMLElement | null>(null)
    const emit = defineEmits(['addToClick'])

    function saveLabel(){
        let toPush = {
            value: newLabel.value
        }
        emit('addToClick', toPush)
        newLabel.value=''
        modelChange()

    }
    function modelChange(){
      writting.value = !writting.value;
      nextTick(() => {
        if (writting.value && inputRef.value) {
          inputRef.value.focus();
        }
      });
    };
    
</script>
  
<style lang="scss">
.addLabel{
    position: relative;
    cursor: pointer;
    width: 4.802vw;
    height: 1.3888vh;
    font-size: 0.8333vw;
    font-family: Source Han Sans CN, Source Han Sans CN-Medium;
    font-weight: 500;
    text-align: left;
    color: #0b89ed;
}
.textInput{
    position: relative;
    cursor: pointer;
    width: 7.3958vw;
    height: 3.7037vh;
    font-weight: 500;
    text-align: left;
}

</style>