<template>
  <div class="topNav">
    <div class="menu">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-caidan"></use>
      </svg>
    </div>
    <div class="centerControl">
      <span @click="goToUserInfo">我的</span>
      <span>发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="search" @click="goToSearch">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-chaxun"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router"
// @ is an alias to /src
//import { ref } from "vue";

export default {
  name: "HomeView",
   setup() {
    const router = useRouter();
    // 使用 mapGetters 获取 users
    //const store = useStore();
    function goToSearch() {
      // 跳转到搜索页面
      router.push({ name: "musicSearch" });
    }
    function goToUserInfo (){
      router.push({ name: "userInfo" });
    }
    return {
      goToSearch,
      goToUserInfo
    };
  },
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
