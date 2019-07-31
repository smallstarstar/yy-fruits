<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin:0px;
  padding: 0px;
}
</style>

// scroller() {
//   this.$nextTick(()=>{
//   const planeTIime =  document.getElementById('place') as HTMLElement;
//   if(placeTime !== null && placeTime !== undefined) {
//     placeTIime.scrollTop = placeTime.scrollHeight;
//   }
// });
// }

// updated() {
//  scroller();
// }