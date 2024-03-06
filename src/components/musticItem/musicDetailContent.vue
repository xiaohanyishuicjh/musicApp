<template>
  <div class="musicDetailContent">
    <!-- {{ musicInfo }} -->
    <div class="imgContent">
      <img :src="musicInfo.al.picUrl" alt="" class="bigImg" />
    </div>

    <div class="detailTop">
      <div class="detailTopLeft">
        <svg class="icon" aria-hidden="true" @click="closeSongDetailContent">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
        <div class="leftMarquee">
          <Vue3Marquee style="color: #fff">{{ musicInfo.name }}</Vue3Marquee>
          <span v-for="item in musicInfo.ar" :key="item">
            {{ item.name }}
          </span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jinru-"></use>
          </svg>
        </div>
      </div>

      <div class="detailRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang1"></use>
        </svg>
      </div>
    </div>
    <div class="detailContent" v-show="!isLyricShow" @click="setShowLyric">
      <img
        src="@/assets/music/needle-ab.png"
        alt=""
        :class="!isShowPlay ? 'img_needle_active' : 'img_needle'"
      />
      <img src="@/assets/music/cd.png" alt="" class="img_cd" />
      <img
        :src="musicInfo.al.picUrl"
        alt=""
        class="img_ar"
        :class="!isShowPlay ? 'img_ar_active' : 'img_ar_paused'"
      />
    </div>
    <div
      class="musicLyric"
      ref="musicLyricDiv"
      v-show="isLyricShow"
      @click="setShowLyric"
    >
      <div
        class="lyricInfo"
        v-for="(lyricItem, index) in lyricData"
        :key="index"
      >
        <p
          ref="lyricWord"
          :class="
            currentTime * 1000 >= lyricItem.time &&
            currentTime * 1000 <= lyricItem.nextTime
              ? 'active'
              : ''
          "
        >
          {{ lyricItem.lrc }}
        </p>
      </div>
    </div>
    <div class="detailFooter">
      <div class="footerTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiai"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          style="width: 0.8rem; height: 0.8rem"
        >
          <use xlink:href="#icon-yunxiazai"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangqing"></use>
        </svg>
      </div>
      <div class="footerContent">
        <!-- <input
          class="range"
          type="range"
          min="0"
          :max="duration"
          step="0.5"
          v-model="currentTime"
          @input="changeValue"
        /> -->

        <van-slider
          v-model="currentTime"
          @change="changeValue"
          step="0.5"
          min="0"
          :max="duration"
        >
          <template #button>
            <!-- class="musicDurationSlider" -->
            <div class="musicDurationSlider">
              <svg
                class="musicDurationSliderIcon"
                :class="
                  !isShowPlay
                    ? 'musicDurationSliderIcon_active'
                    : 'musicDurationSliderIcon_paused'
                "
                aria-hidden="true"
              >
                <use xlink:href="#icon-yinle1"></use>
              </svg>
            </div>
          </template>
        </van-slider>
      </div>
      <!-- <van-progress :percentage="calcProgress" stroke-width="8" :show-pivot="false" /> -->

      <div class="footer">
        <!-- 列表循环 -->
        <svg
          class="icon"
          aria-hidden="true"
          v-show="songPlaySortMethods === 0"
          @click="changeSongPlaySortMethods()"
        >
          <use xlink:href="#icon-liebiaoxunhuan"></use>
        </svg>
        <!-- 随机循环 -->
        <svg
          class="icon"
          aria-hidden="true"
          v-show="songPlaySortMethods === 2"
          @click="changeSongPlaySortMethods()"
        >
          <use xlink:href="#icon-suijixunhuan"></use>
        </svg>
        <!-- 单首循环 -->
        <svg
          class="icon"
          aria-hidden="true"
          v-show="songPlaySortMethods === 1"
          @click="changeSongPlaySortMethods()"
        >
          <use xlink:href="#icon-danshouxunhuanbofang"></use>
        </svg>
        <!-- 上一首 -->
        <svg class="icon" aria-hidden="true" @click="setPlayMusicIndex(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <!-- 暂停 -->
        <svg
          class="icon"
          aria-hidden="true"
          style="width: 0.8rem; height: 0.8rem"
          v-show="isShowPlay"
          @click="playMusic"
        >
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <!-- 播放 -->
        <svg
          class="icon"
          aria-hidden="true"
          style="width: 0.8rem; height: 0.8rem"
          v-show="!isShowPlay"
          @click="stopMusic"
        >
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <!-- 下一首 -->
        <svg class="icon" aria-hidden="true" @click="setPlayMusicIndex(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="showMusicPopover">
          <use xlink:href="#icon-playlist"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from "vue3-marquee";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
// @ is an alias to /src
export default {
  name: "musicDetailContent",
  props: {
    musicInfo: Object,
  },
  emits: ["playMusic", "stopMusic"],
  components: {
    Vue3Marquee,
  },
  setup(props, ctx) {
    console.log("函数开始");
    let lyricWord = ref(null);
    let musicLyricDiv = ref(null);
    const currentTime = computed({
      get() {
        return store.state.currentTime;
      },
      set(newValue) {
        //store.commit("setCurrentTime", newValue);
        store.commit("setPlayCurrentTime", newValue);
      },
    });
    const songPlaySortMethods = computed(() => store.state.songPlaySortMethods);
    const playList = computed(() => store.state.playList);
    const playListIndex = computed(() => store.state.playListIndex);
    const playMusicInfo = computed(() => store.state.playMusicInfo);
    const playMusicId = computed(() => store.state.playMusicInfo.id);
    const duration = computed(() => store.state.duration);
    let calcProgress = computed(() => {
      let currentTime = store.state.currentTime;
      let duration = store.state.duration;
      //console.log(currentTime / duration,"进度值");
      return (currentTime / duration) * 100;
    });
    let isLyricShow = ref(false);
    const lyricData = computed(() => {
      let lyricInfo = store.state.lyricData?.lyric ?? "";
      let calcInfo = lyricInfo.split(/[(\r\n)\r\n]+/).map((item) => {
        let min = item.slice(1, 3);
        let sec = item.slice(4, 6);
        let mill = item.slice(7, 10);
        let lrc = item.slice(11, item.length);
        //console.log(min, sec, mill, lrc, "拆分后的时间和歌词");
        if (isNaN(Number(mill))) {
          mill = item.slice(7, 9);
          lrc = item.slice(10, item.length);
        }
        let time =
          parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
        return {
          min,
          sec,
          mill,
          lrc,
          time,
        };
      });
      calcInfo.forEach((item, index) => {
        if (index === calcInfo.length - 1 || isNaN(Number(item.time))) {
          item.nextTime = 9999999; //下一句歌词的时间
        } else {
          item.nextTime = calcInfo[index + 1].time; //下一句歌词的时间
        }
      });
      return calcInfo;
    });
    const isShowPlay = computed(() => store.state.isShowPlay);
    const store = useStore();
    // setup() 接收 props 作为第一个参数
    console.log(props.musicInfo, "接收得到的值");
    watch(
      () => currentTime,
      () => {
        if (currentTime.value === duration.value) {
          if (songPlaySortMethods.value === 0) {
            //顺序播放
            setPlayMusicIndex(1); //下一首
            //alert("播放下一首");
          } else if (songPlaySortMethods.value === 1) {
            //单首循环
            store.commit("setPlayCurrentTime", 0);
            store.commit("setCurrentTime", 0);
            playMusic();
          } else {
            //随机循环
            let randomNum = Math.floor(
              Math.random() * playList.value.length - 1
            );
            console.log(randomNum, "随机数");
            store.commit('setCurrentPlayMusic', playList.value[randomNum]);
            //store.commit("setPlayListIndex", randomNum);
          }
          if (musicLyricDiv.value) {
            musicLyricDiv.value.scrollTop = 0;
          }
          return;
        }
        // 显示用户数据已修改的提示信息
        //showUserUpdateMessage.value = true;
        //console.log(lyricWord.value,"活动的歌词");
        //console.log(musicLyricDiv,"列表");
        let findItem = lyricWord.value.find((lyricItem) => {
          return lyricItem.className === "active";
        });
        console.log(findItem);
        if (findItem && findItem.offsetTop > 300) {
          if (musicLyricDiv.value) {
            musicLyricDiv.value.scrollTop = String(findItem.offsetTop - 300);
          }
        }
      },
      {
        deep: true,
      }
    );
    function closeSongDetailContent() {
      store.commit("setShowSongDetailContent", false);
    }
    //播放音乐
    function playMusic() {
      console.log("播放音乐");
      ctx.emit("playMusic");
      //store.commit("setIsShowPlay", false);
    }
    //暂停音乐
    function stopMusic() {
      console.log("暂停音乐");
      ctx.emit("stopMusic");
      //store.commit("setIsShowPlay", true);
    }
    function setShowLyric() {
      isLyricShow.value = !isLyricShow.value;
    }
    function changeValue(value) {
      console.log(value, "滑块的值");
      let currentTime = value;
      //store.commit("setCurrentTime", currentTime);
      store.commit("setPlayCurrentTime", currentTime);
    }
    function setPlayMusicIndex(value) {
      console.log(value, "上一首还是下一首");
      console.log(playList.value, playListIndex.value, "缓存歌曲的值");
      console.log(playMusicId.value,"当前播放的歌曲id");
      let findIndex =  playList.value.findIndex((item)=>{
        return item.id === playMusicId.value;
      });
      console.log(findIndex, "寻找的下标");
      if(findIndex!==-1){
        //顺序播放的场景
      if (value + findIndex < 0) {
        //上一首到最后一个
        store.commit('setCurrentPlayMusic', playList.value[playList.value.length - 1]);
        //store.commit("setPlayListIndex", playList.value.length - 1);
      } else if (value + findIndex > playList.value.length - 1) {
        //下一首到第一首
        store.commit('setCurrentPlayMusic', playList.value[0]);
        //store.commit("setPlayListIndex", 0);
      } else {
        //正常切换上下首
        store.commit('setCurrentPlayMusic', playList.value[value + findIndex]);
        //store.commit("setPlayListIndex", value + findIndex);
      }
      }
      else{
        store.commit('setCurrentPlayMusic', playList.value[0]);
        //store.setCurrentPlayMusic(playList.value[0]);
      }
    }
    function changeSongPlaySortMethods() {
      let value = 0;
      if (songPlaySortMethods.value + 1 > 2) {
        value = 0;
      } else {
        value = songPlaySortMethods.value + 1;
      }
      store.commit("setSongPlaySortMethods", value);
    }
    function showMusicPopover() {
      store.commit("setShowMusicListPopover", true);
    }
    return {
      closeSongDetailContent,
      playMusic,
      stopMusic,
      isShowPlay,
      isLyricShow,
      lyricData,
      setShowLyric,
      currentTime,
      lyricWord,
      musicLyricDiv,
      calcProgress,
      duration,
      changeValue,
      setPlayMusicIndex,
      songPlaySortMethods,
      changeSongPlaySortMethods,
      showMusicPopover,
      playMusicInfo,
      playMusicId
    };
  },
};
</script>
<style lang="less" scoped>
.musicDetailContent {
  width: 100%;
  height: 100%;
}
@keyframes rotate_ar {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 4rem;
      height: 100%;
      margin-left: 0.4rem;
      .icon {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
  }
}
.imgContent {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  z-index: -1;
}
.bigImg {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(68px);
  background-color: #ffffff11;
  transform: scale(1.5);
  overflow: hidden;
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2.4rem;
    height: 3rem;
    position: absolute;
    left: 40%;
    transform-origin: 0 0;
    transform: rotate(-20deg);
    //-20暂停
    transition: all 2s;
    z-index: 6;
  }
  .img_needle_active {
    width: 2.4rem;
    height: 3rem;
    position: absolute;
    left: 40%;
    transform-origin: 0 0;
    transform: rotate(-1deg);
    transition: all 2s;
    z-index: 6;
  }
  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: 5;
  }
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    position: absolute;
    border-radius: 50%;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_paused {
    animation-play-state: paused;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .footerContent {
    width: 100%;
    height: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    .range {
      width: 100%;
      height: 0.1rem;
    }
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
.musicLyric {
  width: 100%;
  height: 11.5rem;
  overflow-y: auto;
  margin-top: 0.2rem;
  .lyricInfo {
    display: flex;
    justify-content: center;
    p {
      color: #ffffffcc;
      margin-bottom: 0.8rem;
    }
    .active {
      color: #fff;
      font-size: 0.5rem;
    }
  }
}
.musicDurationSlider {
  width: 0.5rem;
  height: 0.5rem;
  .musicDurationSliderIcon {
    width: 0.5rem;
    height: 0.5rem;
    animation: rotate_ar 10s linear infinite;
  }
  .musicDurationSliderIcon_active {
    animation-play-state: running;
  }
  .musicDurationSliderIcon_paused {
    animation-play-state: paused;
  }
}
</style>
