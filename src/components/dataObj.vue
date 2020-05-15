<template>
  <div>
    <!-- 数据绑定 v-text指令等价于{{}} -->
    <h1>值：{{num}}</h1>
    <!-- <h1 v-text="num"></h1> -->
    <!-- 绑定html -->
    <span v-html="rawHtml"></span>
    <!-- 双向绑定 -->
    <input type="text" v-model="num" />
    <!-- 事件绑定：v-on指令简写@ v-on:click === @click
    修饰符.stop .prevent ....-->
    <button @click.stop.prevent="addNum">绑定事件</button>
    <br>
    <!-- 动态绑定标签属性attribute、传递proprs v-bind指令 === : -->
    <img src="@/assets/images/logo.png" />
  </div>
</template>

<script>
import imgUrl from "@/assets/images/logo.png";
export default {
  components: {
    comName: () => import("path") //懒加载组件
  },
  props: {
    propsName: {
      type: Number,
      default: 1
    }
  },
  // 为什么vue中data必须是一个函数
  // 组件是可复用的vue实例，一个组件被创建好之后，就可能被用在各个地方，而组件不管被复用了多少次，组件中的data数据都应该是相互隔离，互不影响的，基于这一理念，组件每复用一次，data数据就应该被复制一次，之后，当某一处复用的地方组件内data数据被改变时，其他复用地方组件的data数据不受影响
  data: () => ({
    num: 111,
    rawHtml: "<div>1233</div>",
    imageSrc: imgUrl
  }),
  computed: {
    dobuleNum() {
      return this.num * 2;
    }
  },
  methods: {
    addNum() {
      this.num = 2;
    }
  },
  watch: {
    num(newVal, oldVal) {
      console.log(newVal);
    }
  }
};
</script>

<style>
</style>