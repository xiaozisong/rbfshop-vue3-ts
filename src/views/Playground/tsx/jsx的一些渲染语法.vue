<script lang="tsx" setup name="play">
import { ref } from 'vue';

const list = ref([
  {id: '123', name: 'zs'},
  {id: '321', name: 'li'},
  {id: '231', name: 'ww'},
])
const money = ref(100)
const addMoney = () => {
  money.value++
}
const flag = ref(false)
const changeFlag = () => {
  flag.value = !flag.value
}
const showNode = (val: boolean) => {
  if (val) {
    return <div>我是真的</div>
  }else{
    {/*asdasd */}
    return <div>
      <ul>
        <li><div>我是假的</div></li>
        <li><div>我是假的</div></li>
        <li><div>我是假的</div></li>
        <li><div>我是假的</div></li>
      </ul>
    </div>
  }
}
const VNode = () => {
  return (
    <div>
      <ul>
        {list.value.map(item => <li key={item.id}>{ item.name }</li>)}
      </ul>
      <h2>{ money.value }</h2>
      <button onClick={addMoney}>加钱</button>
      <div>
        <h1>{ flag.value ? '我是真的呗' : '我是假的呗'}</h1>
      </div>
      <button onClick={changeFlag}>改变flag</button>
      <h1>{ showNode(flag.value) }</h1>
    </div>
  )
}
</script>
<template>
  <VNode></VNode>
</template>
<style scoped>
#headerH1 {
  color: aliceblue;
  background-color: red;
  height: 300px;
  width: 300px;
}
</style>