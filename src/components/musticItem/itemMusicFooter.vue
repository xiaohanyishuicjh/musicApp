<template>
  <div class="itemMusicFooter">
    <div class="footerLeft">
      <img
        :src="playMusicInfo?.al?.picUrl"
        alt=""
        @click="setShowSongDetailContent"
      />
      <div class="musicDescription">
        <p>{{ playMusicInfo?.name }}</p>
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
      @error="handleError"
      @ended ="handleEnded"
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
        :musicInfo="playMusicInfo"
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
import { watch, ref, computed,onMounted,onUnmounted} from "vue";
import musicSongList from '@/views/musicSongList.vue';
import musicDetail from "@/request/api/wyMusicDetail";
import qqMusicDetail from "@/request/api/qqMusicDetail";
import musicDetailContent from "@/components/musticItem/musicDetailContent.vue";
import { useStore } from "vuex";
import checkIsIOS from "@/util/util";
import { showNotify } from "vant";
export default {
  name: "itemMusicFooter",
  setup() {
    // 使用 mapGetters 获取 users
    const store = useStore();
    const isIos = ref(false);
    const currentTime = computed(() => store.state.currentTime);
    const showMusicListPopover = computed(() => store.state.showMusicListPopover);
    const playCurrentTime = computed(() => store.state.playCurrentTime);
    const playList = computed(() => store.state.playList);
    const playMusicInfo = computed(() => store.state.playMusicInfo);
    const playListIndex = computed(() => store.state.playListIndex);
    const isShowPlay = computed(() => store.state.isShowPlay);
    const duration = computed(() => store.state.duration);
    let showSongDetailContent = computed(
      () => store.state.showSongDetailContent
    );
    
    //歌曲详情页
    // 监听 users 的变化
    // watch(
    //   () => playList,
    //   (newValue) => {
    //     // 显示用户数据已修改的提示信息
    //     //showUserUpdateMessage.value = true;
    //     console.log(newValue, "cjh2");
    //     console.log(newValue.value[playListIndex.value].id, "12312");
    //     // console.log(playListIndex.value, "7898978");
    //     // console.log(toRaw(newValue._value)[0][playListIndex.value], "123121");
    //     calcMusicSrcUrl(playList.value[playListIndex.value].id);
    //   },
    //   {
    //     deep: true,
    //   }
    // );
    watch(playMusicInfo,
      (newVal,oldVal) => {
        if(newVal.id!==oldVal.id){
          calcMusicSrcUrl(newVal);
        }
        
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
          //console.log(playCurrentTime.value, "当前的时间");
          playAudio.value.currentTime = playCurrentTime.value;
          //playMusic();
        }
        if(playAudio.value.paused &&
          playAudio.value.currentTime !== playCurrentTime.value){
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
        // if(currentTime.value===duration.value){
        //   clearInterval(currentTimeInterVal);
        // }
        
        
      },
      {
        deep: true,
      }
    );

    let musicSrcUrl = ref("");
    let currentTimeInterVal = ref("");
    let playInterVal = ref("");
    const playAudio = ref(null);
    let songReady = ref(false);
    onMounted(()=>{
      isIos.value = checkIsIOS();
      console.log(isIos.value,"是否是ios")
    });
    onUnmounted(()=>{
      if(playInterVal.value){
        clearInterval(playInterVal.value)
      }
      if(currentTimeInterVal.value){
        clearInterval(currentTimeInterVal.value)
      }
      
    })
//     functionaudioAutoPlay(id){
//       varaudio = document.getElementById(id),

//       play =function(){
//       audio.play();

//       document.removeEventListener("touchstart",play,false);

//       };

//       audio.play();

//       document.addEventListener("WeixinJSBridgeReady",function() {
//       play();

//       },false);

//       document.addEventListener('YixinJSBridgeReady',function() {
//       play();

//       },false);

//       document.addEventListener("touchstart",play,false);

//       }

// audioAutoPlay('myAudio');
      function handleEnded() {
        store.commit("setCurrentTime", duration.value ?? 0);
        clearInterval(currentTimeInterVal.value)
      }
    async function calcMusicSrcUrl(musicData) {
      stopMusic();
      if(musicData.musicType==='qq'){
        let data = {
        id: musicData.songmid,
        type: "128",
      };
      console.log(data, "传递的数据");
      let resultData = await qqMusicDetail.getMusicItemSrcUrl(data);
      console.log(resultData, "歌曲信息");
      let url = resultData?.data?.data ?? "";
      let errMsg = resultData?.data?.errMsg ?? "";
      if(errMsg !== '') {
        showNotify({
            message: errMsg,
            color: "#fff",
            background: "#697823",
          });
          return;
      }
      console.log(url, "链接");
      if(url===''){
        store.commit("setIsShowPlay", false);
        showNotify({
            message: "获取歌曲链接失败",
            color: "#fff",
            background: "#697823",
          });
      }
      else{
        musicSrcUrl.value = url;
        playAudio.value.load();
        store.commit("setIsShowPlay", false);
        store.commit("setCurrentTime", 0);
        store.commit("setPlayCurrentTime", 0);
        songReady.value = false;
        store.dispatch("getQqLyric", musicData.songmid);
        playMusic();
      }
      
      }
      else{
      let data = {
        id: musicData.id,
        type: "lossless",
      };
      let resultData = await musicDetail.getMusicItemSrcUrl(data);
      console.log(resultData, "歌曲信息");
      let url = resultData?.data?.data[0]?.url ?? "";
      console.log(url, "链接");
      musicSrcUrl.value = url;
      playAudio.value.load();
      store.commit("setIsShowPlay", false);
      store.commit("setCurrentTime", 0);
      store.commit("setPlayCurrentTime", 0);
      songReady.value = false;
      store.dispatch("getWyLyric", musicData.id);
      playMusic();
      }
      
    }
    function audioPlay(){
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
    }
    //播放音乐
    async function playMusic() {
      // if (!songReady.value) {
      //   return;
      // }
      //!playAudio.value.ended
      //playAudio.value.currentTime > 0
      //alert("触发了播放音乐...");
        
        playAudio.value.muted = false;
        let readyState = playAudio?.value?.readyState?? 0;
        
        let isLoaded = readyState >= 1;
        if (!isLoaded) {

          playInterVal.value = setInterval(() => {
            let readyState = playAudio?.value?.readyState?? 0;
            let isLoaded = readyState >= 1;
            //alert(readyState, "readyState");
            if(isLoaded){
              audioPlay();
              if(playInterVal.value){
                console.log('清除定时器');
                clearInterval(playInterVal.value)
              }
            }
            else{
              
              console.log('音乐加载中');
            }
        
      }, 150);
          //playAudio.value.load();
          //readyState 0没有是否准备音频数据好的信息  1音视频已经加载好  2 当前可用，下一毫秒不可用 3 当前和下一毫秒可用 4足够数据可用
          //var isPlaying = playAudio.value.currentTime > 0 && !playAudio.value.paused && !playAudio.value.ended && playAudio.value.readyState > 2;
          // if (!isPlaying) {
          // setTimeout(function () {
          //   playAudio.value.play().catch(function (e) {
          // console.log("", e.message);
          // console.log("", e.description);
          // });
          // }, 150);
          // } else {
          // console.log("网络缓慢，正在加载音频...");
          // }
          


          
        } else {
          audioPlay();
          // playAudio.value.pause();
          // store.commit("setIsShowPlay", true);
        }
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
    // function ready() {
    //   //songReady.value = true;
    //   playMusic();
    // }
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
      store.commit('setCurrentPlayMusic', data);
      //store.commit('setPlayListIndex', data.index);
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
      handleError,
      songReady,
      showSongDetailContent,
      setShowSongDetailContent,
      setMusicCurrentTime,
      currentTimeInterVal,
      playInterVal,
      currentTime,
      playCurrentTime,
      showMusicListPopover,
      setShowMusicListPopover,
      setMusic,
      showMusicPopover,
      isIos,
      audioPlay,
      handleEnded,
      playMusicInfo
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
