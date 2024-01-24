<template>
  <div class="itemMusicFooter">
    <div class="footerLeft">
      <img
        :src="playList[playListIndex]?.al?.picUrl"
        alt=""
        @click="setShowSongDetailContent"
      />
      <div class="musicDescription">
        <p>{{ playList[playListIndex]?.name }}</p>
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
      <svg class="icon" aria-hidden="true" @click="showMusicPopover">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
    <audio
      ref="playAudio"
      :src="musicSrcUrl"
      @canplay="ready"
      @error="handleError"
    >
      <!-- <source :src="musicSrcUrl" type="audio/mpeg"> -->
    </audio>
    <van-popup
    ref="SongDetailContent"
      v-model:show="showSongDetailContent"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <musicDetailContent
        :musicInfo="playList[playListIndex]"
        :isPlay="isShowPlay"
        @playMusic="playMusic"
        @stopMusic="stopMusic"
      ></musicDetailContent>
    </van-popup>
    <van-popup
    ref="SongList"
      v-model:show="showMusicListPopover"
      @click-overlay="setShowMusicListPopover(false)"
      position="bottom"
      :style="{ height: '70%', width: '100%' }"
    >
      <musicSongList v-if="showMusicListPopover" :song-list="playList" @playMusic="setMusic($event)"></musicSongList>
    </van-popup>
    <!-- <audio controls  ref="playAudio" src="../../../src/assets/music/一花一剑.flac"></audio> -->
  </div>
</template>
<script>
import { watch, ref, computed, nextTick } from "vue";
import musicSongList from '@/views/musicSongList.vue';
import musicDetail from "@/request/api/musicDetail";
import musicDetailContent from "@/components/musticItem/musicDetailContent.vue";
import { useStore } from "vuex";
export default {
  name: "itemMusicFooter",
  setup() {
    // 使用 mapGetters 获取 users
    const store = useStore();
    const currentTime = computed(() => store.state.currentTime);
    const showMusicListPopover = computed(() => store.state.showMusicListPopover);
    const playCurrentTime = computed(() => store.state.playCurrentTime);
    const playList = computed(() => store.state.playList);
    const playListIndex = computed(() => store.state.playListIndex);
    const isShowPlay = computed(() => store.state.isShowPlay);
    const duration = computed(() => store.state.duration);
    let showSongDetailContent = computed(
      () => store.state.showSongDetailContent
    );
    
    //歌曲详情页
    // 监听 users 的变化
    watch(
      () => playList,
      (newValue) => {
        // 显示用户数据已修改的提示信息
        //showUserUpdateMessage.value = true;
        console.log(newValue, "cjh2");
        console.log(newValue.value[playListIndex.value].id, "12312");
        // console.log(playListIndex.value, "7898978");
        // console.log(toRaw(newValue._value)[0][playListIndex.value], "123121");
        calcMusicSrcUrl(playList.value[playListIndex.value].id);
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
        calcMusicSrcUrl(playList.value[newValue.value].id);
      },
      {
        deep: true,
      }
    );

    watch(
      () => playCurrentTime,
      () => {
        //时间变化并且在播放中

        if (
          !playAudio.value.paused &&
          playAudio.value.readyState > 2 &&
          playAudio.value.currentTime !== playCurrentTime.value
        ) {
          console.log(playCurrentTime.value, "当前的时间");
          playAudio.value.currentTime = playCurrentTime.value;
          playMusic();
        }
      },
      {
        deep: true,
      }
    );

    watch(
      () => currentTime,
      () => {
        //时间变化并且在播放中
        console.log()
        if(currentTime.value===duration.value){
          clearInterval(currentTimeInterVal);
        }
        
        
      },
      {
        deep: true,
      }
    );

    let musicSrcUrl = ref("");
    let currentTimeInterVal = ref("");
    const playAudio = ref(null);
    let songReady = ref(false);
    async function calcMusicSrcUrl(id) {
      stopMusic();
      let data = {
        id: id,
        type: "standard",
      };
      let resultData = await musicDetail.getMusicItemSrcUrl(data);
      console.log(resultData, "歌曲信息");
      let url = resultData?.data?.data[0]?.url ?? "";
      console.log(url, "链接");
      musicSrcUrl.value = url;
      store.commit("setIsShowPlay", false);
      store.commit("setCurrentTime", 0);
      store.commit("setPlayCurrentTime", 0);
      songReady.value = false;
      store.dispatch("getLyric", id);
    }
    //播放音乐
    async function playMusic() {
      if (!songReady.value) {
        return;
      }
      nextTick(() => {
        if (playAudio.value.paused) {
          //playAudio.value.load();
          playAudio.value.muted = false;
          let playPromise = playAudio.value.play();
          if (playPromise) {
            console.log("playPromise", playPromise);
            playPromise
              .then(() => {
                console.log("开始音频播放");
                store.commit("setIsShowPlay", false);
                playAudio.value.play();
                setMusicCurrentTime();
                setMusicDuration();
              })
              .catch((error) => {
                console.log("音频播放失败", error);
              });
          }
        } else {
          playAudio.value.pause();
          store.commit("setIsShowPlay", true);
        }
      });
    }
    //暂停音乐
    function stopMusic() {
      if (playAudio.value.paused) {
        //已经暂停了
        store.commit("setIsShowPlay", true);
      } else {
        //未暂停
        playAudio.value.pause();
        store.commit("setIsShowPlay", true);
      }
      clearInterval(currentTimeInterVal);
    }
    function ready() {
      songReady.value = true;
      playMusic();
    }
    function handleError() {
      songReady.value = true;
    }
    function setShowSongDetailContent() {
      store.commit("setShowSongDetailContent", true);
    }
    //设置音乐当前播放的时间
    function setMusicCurrentTime() {
      currentTimeInterVal = setInterval(() => {
        store.commit("setCurrentTime", playAudio?.value?.currentTime ?? 0);
      }, 1000);
      console.log("音乐当前播放的时间", playAudio?.value?.currentTime ?? 0);
    }
    function setMusicDuration() {
      console.log("音乐总时长", playAudio?.value?.duration ?? 0);
      store.commit("setDuration", playAudio?.value?.duration);
    }
    function setShowMusicListPopover(value){
      store.commit("setShowMusicListPopover", value);
    }
    function setMusic(data){
      console.log(data,"歌曲传值列表数据");
      store.commit('setPlayListIndex', data.index);
    }
    function showMusicPopover(){
      store.commit("setShowMusicListPopover", true);

    }
    return {
      musicSrcUrl,
      playList,
      playListIndex,
      isShowPlay,
      playMusic,
      stopMusic,
      playAudio,
      ready,
      handleError,
      songReady,
      showSongDetailContent,
      setShowSongDetailContent,
      setMusicCurrentTime,
      currentTimeInterVal,
      currentTime,
      playCurrentTime,
      showMusicListPopover,
      setShowMusicListPopover,
      setMusic,
      showMusicPopover
    };
  },
  components: {
    musicDetailContent,
    musicSongList
  },
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
  .songList{
    width: 100%;
    height: 100%;
    padding: 0 0.3rem;
    overflow-y: auto;
}
}
</style>
