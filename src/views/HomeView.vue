<template>
  <div class="home">
    <top-nav></top-nav>
    <swiperTop></swiperTop>
  </div>
</template>

<script>
import topNav from "@/components/home/topNav.vue";
import swiperTop from "@/components/home/swiperTop.vue";
// @ is an alias to /src
export default {
  name: "HomeView",
  components: {
    topNav,
    swiperTop,
  },
};
</script>
