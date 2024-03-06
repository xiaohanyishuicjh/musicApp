<template>
  <div class="musicSearch">
    <!-- div.musicsSerachTop -->
    <div class="musicsSerachTop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <van-search
        v-model="searchWord"
        placeholder="请输入搜索关键词"
        @search="onSearch(musicSerachType)"
        @cancel="onCancel"
      >
        <template #right-icon>
          <div @click="MusicTypeChange">
            {{ musicSerachType ? "网易云音乐" : "qq音乐" }}
          </div>
        </template>
      </van-search>
      <div class="rightSearch" @click="onSearch(musicSerachType)">搜索</div>
    </div>
    <div class="searchMainContent">
      <div class="searchHistory">
        <div class="searchHistoryTop">
          <div class="searchSpan">搜索历史</div>
          <svg class="icon" aria-hidden="true" @click="deletesearchHistory">
            <use xlink:href="#icon-icon_del"></use>
          </svg>
        </div>
        <div class="searchHistoryContent">
          <span
            v-for="(item, index) in searchWordList"
            :key="index"
            class="spanKey"
            @click="quickSearch(item)"
          >
            {{ item }}</span
          >
        </div>
      </div>
      <musicSongList
        :song-list="songResult"
        @playMusic="setMusic($event)"
      ></musicSongList>
      <!-- <div class="songList">
        <div
          class="songItem"
          v-for="(item, index) in songResult"
          :key="index"
          @click="setMusic(item)"
        >
          <div class="songLeft">
            <div class="songIndex">
              {{ index }}
            </div>
            <div class="songInfo">
              <div class="songName">
                {{ item.name }}
              </div>
              <div class="songCreator">
                <span
                  v-for="(creatorItem, creatorItemIndex) in item.ar"
                  :key="creatorItemIndex"
                >
                  {{ creatorItem.name }}
                </span>
              </div>
            </div>
          </div>
          <div class="songRight">
            <div class="MvControl" v-show="item.mvid !== 0">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofangMV"></use>
              </svg>
            </div>
            <div class="songDetail">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caidan"></use>
              </svg>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed, reactive } from "vue";
import musicSongList from "@/views/musicSongList.vue";
import LocalCache from "@/util/localStorageCache";
import homeApi from "@/request/api/homeApi";
import musicDetail from "@/request/api/wyMusicDetail";
//import qqMusicDetail from "@/request/api/qqMusicDetail";
import { useStore } from "vuex";
export default {
  name: "musicSearch",
  components: { musicSongList },
  setup() {
    let musicSerachType = ref(true); //默认网易云音乐
    const store = useStore();
    const playList = computed(() => store.state.playList);
    let searchWordListStore = LocalCache.getCache("searchWordList") ?? [];
    let searchWordList = ref([]);
    let songResult = ref([]);
    onMounted(() => {
      //组件挂载的过程 包括数据 dom等
      console.log("onMounted");
      if (searchWordListStore.length) {
        searchWordList.value = searchWordListStore;
      }
    });

    let searchWord = ref("");

    async function onSearch(type) {
      if (searchWord.value === "") {
        return;
      }
      if (type) {
        //网易云音乐
        await searchWySong();
      } else {
        //qq音乐
        await searchQqSong();
      }
      if (searchWordList.value.includes(searchWord.value)) {
        let findIndex = searchWordList.value.findIndex(
          (item) => item === searchWord.value
        );
        if (findIndex !== -1) {
          let value = searchWordList.value[findIndex];
          searchWordList.value.splice(findIndex, 1);
          searchWordList.value.unshift(value);
        }
      } else {
        searchWordList.value.unshift(searchWord.value);
      }
      LocalCache.setCath("searchWordList", searchWordList.value);
      console.log(searchWordList.value);
    }
    function deletesearchHistory() {
      searchWordList.value = [];
      LocalCache.setCath("searchWordList", searchWordList.value);
    }
    async function searchQqSong() {
      let res = await homeApi.getQqSearchInfo(searchWord.value);
      console.log(res, "返回的结果");
      let songInfo = res?.data?.data?.list ?? [];
      songInfo = songInfo.map((item) => {
        return {
          ...item,
          ar: item.singer,
          id: item.songmid,
        name: item.songname,
        al:{

        },
          musicType: "qq"
        };
      });
      songResult.value = songInfo;
      console.log(songInfo,"qq音乐数据");
    }
    async function searchWySong() {
      let res = await homeApi.getWySearchInfo(searchWord.value);

      let songInfo = res?.data?.result?.songs ?? [];
      songInfo = songInfo.map((item) => {
        return {
          ...item,
          ar: item.artists,
          al: item.album,
          musicType: "wy"
        };
      });
      songResult.value = songInfo;
      console.log(res?.data?.result?.songs);
    }
    function quickSearch(data) {
      searchWord.value = data;
      onSearch(musicSerachType.value);
    }
    async function setMusic(eventData) {
      let item = eventData;
      if(item.musicType==='wy'){
        item.al = item.album;
        item.al.picUrl = item.album.artist.img1v1Url;
        let respData = await musicDetail.getSongDetail(item.id);
        console.log(respData, "song详情");
        let musicPicUrl = respData?.data?.songs[0]?.al?.picUrl ?? '';
        item.al.picUrl = musicPicUrl;
        // item.al.name = item.album.artist.name;
        // item.dt = item.duration;
        // item.ar = item.artists;
      }
      else{
        console.log("音乐",item);
        //设置qq图片url
        const maxAge = 2592000;
        const size = '300x300';
        let qqImgUrl = `https://y.qq.com/music/photo_new/T002R${size}M000${item.albummid}.jpg?max_age=${maxAge}`
        //https://y.qq.com/music/photo_new/T002R300x300M000003EYehp2AkYdo_1.jpg?max_age=2592000
        //let respData = await qqMusicDetail.getSongPicURl(item.albummid);
        let musicPicUrl = qqImgUrl;
        item.al={};
        item.al.picUrl = musicPicUrl;
        item.id = item.songmid;
        item.name= item.songname;
        //console.log("查询qq音乐详情",respData);
      }
      let data = reactive(item);
      console.log(data, "qq音乐单个数据");
      let findIndex = playList.value.findIndex((findItem)=>{
        return findItem.id === item.id;
      })
      if(findIndex===-1){
        store.commit("pushPlayList", data);
        store.commit('setCurrentPlayMusic', data);
      }
      else{
        store.commit('setCurrentPlayMusic', data);
      }
        console.log(playList.value.length ?? 0, "下标值");
        // store.commit(
        //   "setPlayListIndex",
        //   playList.value.length !== 0 ? playList.value.length - 1 : 0
        // );
      
    }
    function MusicTypeChange() {
      musicSerachType.value = !musicSerachType.value;
    }

    return {
      searchWord,
      onSearch,
      searchWordList,
      deletesearchHistory,
      songResult,
      quickSearch,
      setMusic,
      playList,
      MusicTypeChange,
      musicSerachType,
      searchQqSong
    };
  },
};
</script>
<style lang="less" scoped>
.musicSearch {
  /deep/ .van-field__body{
      input { 
        -webkit-user-select: none;
        user-select:none;
      }
  }

  width: 100%;
  height: 100vh;
  .musicsSerachTop {
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
  .searchMainContent {
    width: 100%;
    height: calc(100% - 1rem);
    display: flex;
    flex-direction: column;
  }
  /deep/ .van-search {
    width: calc(100% - 1.2rem);
  }
  .rightSearch {
    width: 0.7rem;
    height: 0.5rem;
  }
  .searchHistory {
    width: 100%;
    position: relative;
    .searchHistoryTop {
      width: 100%;
      height: 0.6rem;
      position: relative;
      display: flex;
      justify-content: space-between;
      padding: 0 0.2rem;
      .searchSpan {
        font-weight: 700;
        vertical-align: middle;
      }
      .icon {
        width: 0.33rem;
        height: 0.33rem;
        vertical-align: middle;
      }
    }
    .searchHistoryContent {
      width: 100%;
      max-height: 2.32rem;
      overflow: hidden;
      .spanKey {
        padding: 0.1rem 0.1rem;
        background-color: rgba(105, 105, 105, 0.266);
        border-radius: 0.2rem;
        margin: 0.1rem 0.1rem;
        vertical-align: middle;
        display: inline-block;
        max-width: 46%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .songList {
    width: 100%;
    flex: 1;
    //height: calc(100% - 3.2rem);
    padding: 0 0.3rem;
    overflow-y: auto;
    .songItem {
      display: flex;
      justify-content: space-between;
      margin: 0.36rem 0;
    }
    .songLeft {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .songIndex {
        margin-right: 0.4rem;
      }
    }
    .songRight {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
