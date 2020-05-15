<template>
  <div class="hello">
    <!-- <h1>{{dobule}}</h1> -->
    <h2>
      {{text}}
    </h2>
    <h3>{{num}}</h3>
    <input type="text" :value="text" @input="changeVal" />
    <!-- <hello-world :count="num+1" v-if="count<3"></hello-world> -->
    <dataObj></dataObj>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "HelloWorld",
  components:{
    dataObj:()=>import('./dataObj')
  },
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      num:0,
      aaa:1
    }
  },
  beforeMount() {
    this.num = this.count;
    console.log(this.num);
    // this.setCount()
  },
  computed: {
    ...mapState("moduleA", ["text"]),
    ...mapGetters("moduleA", ["detail"]),
    dobule() {
      return this.num * 2;
    }
  },
  methods: {
    ...mapMutations("moduleA", ["setText", "setCount"]),
    computedNum() {
      return this.aaa * 2;
    },
    changeVal(e) {
      // console.log(e.target.value)
      this.setText(e.target.value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
