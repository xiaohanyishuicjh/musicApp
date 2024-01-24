<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
  <itemMusicFooter />

</template>
<script>
import itemMusicFooter from '@/components/musticItem/itemMusicFooter.vue';
export default {
  components: {
    itemMusicFooter
  },
};
</script>


<style lang="less">
   *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
   }
  .icon {
    width: 0.5rem;
    height: 0.5rem;
    /*vertical-align: -0.15em;*/
    fill: currentColor;
    overflow: hidden;
  }
</style>
