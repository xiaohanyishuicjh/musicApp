<template>
  <div class="itemMusicFooter">
    <div class="footerLeft">
      <img :src="playList[0][playListIndex]?.al?.picUrl" alt="" />
      <div class="musicDescription">
        <p>{{ playList[0][playListIndex]?.name }}</p>
        <span>{{ "横滑切换上下首" }}</span>
      </div>
    </div>
    <div class="footerRight">
      <svg
        class="icon"
        aria-hidden="true"
        v-show="isShowPlay"
        @click="playMusic"
      >
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg
        class="icon"
        aria-hidden="true"
        v-show="!isShowPlay"
        @click="stopMusic"
      >
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
    <audio ref="playAudio" :src="musicSrcUrl">
      <!-- <source :src="musicSrcUrl" type="audio/mpeg"> -->
    </audio>
    <!-- <audio controls  ref="playAudio" src="../../../src/assets/music/一花一剑.flac"></audio> -->
  </div>
</template>
<script>
import { watch, ref, computed } from "vue";
import musicDetail from "@/request/api/musicDetail";
import { useStore } from "vuex";
export default {
  name: "itemMusicFooter",
  setup() {
    // 使用 mapGetters 获取 users
    const store = useStore();

    const playList = computed(() => store.state.playList);
    const playListIndex = computed(() => store.state.playListIndex);
    const isShowPlay = computed(() => store.state.isShowPlay);
    // 监听 users 的变化
    watch(
      () => playList,
      (newValue) => {
        // 显示用户数据已修改的提示信息
        //showUserUpdateMessage.value = true;
        console.log(newValue, "cjh2");
        console.log(newValue.value[0][playListIndex.value].id, "12312");
        // console.log(playListIndex.value, "7898978");
        // console.log(toRaw(newValue._value)[0][playListIndex.value], "123121");
        calcMusicSrcUrl(newValue.value[0][playListIndex.value].id);
      },
      {
        deep: true,
      }
    );
    watch(
      () => playListIndex,
      (newValue) => {
        // 显示用户数据已修改的提示信息
        //showUserUpdateMessage.value = true;
        console.log(newValue, "cjh");
        console.log(playList, "cjh");
        calcMusicSrcUrl(playList.value[0][newValue.value].id);
      },
      {
        deep: true,
      }
    );
    let musicSrcUrl = ref("");
    const playAudio = ref(null);
    async function calcMusicSrcUrl(id) {
      let data = {
        id: id,
        type: "standard",
      };
      let resultData = await musicDetail.getMusicItemSrcUrl(data);
      console.log(resultData, "歌曲信息");
      let url = resultData?.data?.data[0]?.url ?? "";
      console.log(url, "链接");
      musicSrcUrl.value = url;
    }
    function playMusic() {
      console.log(playAudio,"cjh")
      playAudio.value.play()
      
          store.commit("setIsShowPlay", false);
      // nextTick(() => {
        
      //     playAudio.value.play()
      //     store.commit("setIsShowPlay", false);
      // });
    }
    function stopMusic() {
      playAudio.value.pause();
          store.commit("setIsShowPlay", true);
      //console.log(proxy,"cjh")
      // nextTick(() => {
        
      //     playAudio.value.pause();
      //     store.commit("setIsShowPlay", true);
        
      // });
    }
    
    return { musicSrcUrl, playList, playListIndex, isShowPlay, playMusic, stopMusic,playAudio };
  },
  // computed:{
  //   ...mapGetters(['playListIndex','isShowPlay','playList'])
  // },
  // data() {
  //   return {
  //     musicSrcUrl:''
  //   };
  // },
  // watch:{
  //   playListIndex: {
  //     handle(){
  //       console.log("下标");
  //       this.calcMusicSrcUrl(this.playList[this.playListIndex].id);
  //     },
  //     immediate: true
  //   },
  //   playList: {
  //     immediate: true,
  //     deep: true,
  //     handle(val){
  //       console.log(this.playList[this.playListIndex],val,"表格");
  //       this.calcMusicSrcUrl(this.playList[this.playListIndex].id);
  //     }
  //   }
  // },
  // created: function () {
  //   console.log(this.playList[this.playListIndex],"表格cjh");
  //    this.calcMusicSrcUrl(this.playList[this.playListIndex].id);
  // },
  // methods:{
  //   ...mapMutations(['setIsShowPlay']),
  //   playMusic(){
  //     if(this.$refs.playAudio.paused){
  //       this.$refs.playAudio.play();
  //       this.setIsShowPlay(false)
  //     }else {
  //       this.$refs.playAudio.pause();
  //       this.setIsShowPlay(true)
  //     }
  //   },
  //   async calcMusicSrcUrl(id){
  //     let data ={
  //       id: id,
  //       type: 'standard'
  //     }
  //     let resultData = await musicDetail.getMusicItemSrcUrl(data);
  //     console.log(resultData,"歌曲信息");
  //     let url = resultData?.data?.data[0]?.url ?? '';
  //     console.log(url,"链接");
  //     this.musicSrcUrl = url;
  //   }

  // }
};
</script>
<style lang="less" scoped>
.itemMusicFooter {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  border-top: 1px solid #ccc;
  bottom: 0;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .footerLeft {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footerRight {
    align-items: center;
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  .icon {
    width: 0.6rem;
    height: 0.6rem;
  }
}
</style>
