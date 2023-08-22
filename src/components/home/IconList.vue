<template>
  <div class="iconList">
    <div class="inconItem">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tuijian"></use>
        </svg>
        <span>每日推荐</span>
    </div>
    <div class="inconItem">
        <svg class="icon smallIcon" aria-hidden="true">
            <use xlink:href="#icon-02f"></use>
        </svg>
        <span>私人FM</span>
    </div>
    <div class="inconItem">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gedan"></use>
        </svg>
        <span>歌单</span>
    </div>
    <div class="inconItem">
        <svg class="icon smallIcon" aria-hidden="true">
            <use xlink:href="#icon-paihangbang1"></use>
        </svg>
        <span>排行榜</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import {reactive, onMounted} from "vue";
// import homeApi from "@/request/api/homeApi";
// export default {
//   name: "swiperTop",
//   components: {},
//   setup() {
//     const state = reactive(
//       {
//         images:[]
//       }
//     );
//     onMounted(async ()=>{
//       //获取网易云音乐的轮播图数据
//       let res = await homeApi.getHomeBanner(2);
//       console.log(res);
//       state.images = res.data.banners ?? [];
     
     
//     })
//     return { state };
//   },
// };
</script>
<style lang="less" scoped>
.iconList{
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 2rem;
    .inconItem{
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .icon{
            width: 1rem;
            height: 1rem;
        }
        /deep/.smallIcon{
            width: 0.8rem;
            height: 1rem;
        }
    }
    
}
</style>
