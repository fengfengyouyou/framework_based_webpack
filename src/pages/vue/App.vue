<template>
  <div id="app">
    <!-- <img src="@/assets/images/logo.png"> -->
    <h1 id="img"></h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
      return {
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#img{
  width: 200px;
  height: 200px;
  background-color: red;
  background: url('~@/assets/images/logo.png');
}
</style>
