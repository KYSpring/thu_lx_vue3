const fs = require('fs')
const path = require('path')
const content = `
<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped>
</style>
`
const pageName = process.argv[2]+'.vue'
const newPath = path.join(__dirname,'../components/'+pageName)
if(fs.existsSync(newPath)){
    console.error('already exist!')
} else {
    console.log(pageName)
    fs.writeFile(newPath, content, (err) =>{
        if (err) {
            console.error('fail to create new page:',err)
        } else {
            console.log('Writing is done.')
        }
    })
}