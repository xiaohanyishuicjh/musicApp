<template>
  <div id="swiperTop">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#db8282">
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
// @ is an alias to /src
import {reactive, onMounted} from "vue";
import homeApi from "@/request/api/homeApi";
export default {
  name: "swiperTop",
  components: {},
  setup() {
    const state = reactive(
      {
        images:[]
      }
    );
    onMounted(async ()=>{
      //获取网易云音乐的轮播图数据
      let res = await homeApi.getHomeBanner(2);
      console.log(res);
      state.images = res.data.banners ?? [];
     
     
    })
    return { state };
  },
};
</script>
<style lang="less" scope>
#swiperTop{
.van-swipe {
  width: 100%;
  height: 3rem;
  //padding:  10px;
  .van-swipe-item{
    padding: 0 0.2rem;
    img{
      width: 100%;
      height: 100%;
      border-radius: 0.2rem;
    }
  }
  // .van-swipe__track {
  //   .van-swipe-item {
  //     img {
  //       width: 100%;
  //       height: 3rem;
  //     }
  //   }
  // }
}
}

</style>
