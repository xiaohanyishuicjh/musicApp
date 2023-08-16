<template>
  <div class="topNav">
    <div class="menu">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-caidan"></use>
      </svg>
    </div>
    <div class="centerControl">
      <span>我的</span>
      <span>发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="search">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-chaxun"></use>
      </svg>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
};
</script>
<style lang="less" scoped>
.topNav {
  width: 100%;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem;
  .menu {
  }
  .centerControl {
    width: 65%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 18px;
  }
  .search {
  }
}
</style>
