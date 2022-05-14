<script lang="ts" name="play">
import { h } from "vue"

export default {
  //render函数与template标签是互斥的，如果有template，那么以template为主
  render () {
    return h('h1', {title: 'h111', id: 'headerH1'}, '我是一个H1')
  } 
}
</script>

<style scoped>
#headerH1 {
  color: aliceblue;
  background-color: red;
  height: 300px;
  width: 300px;
}
</style>