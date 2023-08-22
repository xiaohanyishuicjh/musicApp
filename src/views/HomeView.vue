<template>
  <div class="home">
    <top-nav></top-nav>
    <swiperTop></swiperTop>
    <IconList></IconList>
    <musicList></musicList>
  </div>
</template>

<script>
import topNav from "@/components/home/topNav.vue";
import swiperTop from "@/components/home/swiperTop.vue";
import IconList from "@/components/home/IconList.vue";
import musicList from "@/components/home/musicList.vue";
// @ is an alias to /src
export default {
  name: "HomeView",
  components: {
    topNav,
    swiperTop,
    IconList,
    musicList
  },
};
</script>
