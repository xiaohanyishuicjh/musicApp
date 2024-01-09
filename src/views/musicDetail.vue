<template>
    <div class="musicDetail">
     <itemMusicTop :play-list="state.playList" v-if="detailIsPedding" class="itemMusicTopDiv"></itemMusicTop>
     <itemMusicList :song-list="state.songList" :subscribed-count="state.playList.subscribedCount" v-if="songIsPedding" class="itemMusicListDiv"></itemMusicList>    
    </div>
    
</template>
<script>
import itemMusicTop from '@/components/musticItem/itemMusicTop.vue'
import itemMusicList from '@/components/musticItem/itemMusicList.vue'
import {useRoute} from "vue-router";
import {onMounted, reactive,ref} from "vue";
import musicDetail from "@/request/api/musicDetail";
export default {
  name: "swiperTop",
  components: {
    itemMusicTop,
    itemMusicList
  },
  setup() {
    const state = reactive({
      playList:{creator:""},
      songList:[]
    });
    let detailIsPedding =ref(false);
    let songIsPedding =ref(false);
    onMounted(async ()=>{
      //获取网易云音乐的轮播图数据
      let id =useRoute().query.id;
      //获取歌单详情
      let musicDetailData = await musicDetail.getMusicDetail(id);
      console.log(musicDetailData,"数据");
      console.log(id);
      state.playList = musicDetailData.data.playlist;
      //sessionStorage.setItem("musicDetail",JSON.stringify(state));
      console.log(detailIsPedding,"值");
      detailIsPedding.value = true;
      //获取歌单歌曲
      let paramsData = {
        id: id,
        limit: 20,
        offset: 0
      }
       let musicList = await musicDetail.getMusicItemlist(paramsData);
       state.songList = musicList.data.songs;
       songIsPedding.value = true;
       console.log(musicList,"歌曲数据");
    });
    return {state,detailIsPedding,songIsPedding}
  },
};
</script>
<style lang="less" scoped>
.musicDetail {     
width: 100%;
height: 100vh;
.itemMusicTopDiv{
    width:100%;
    height: 6rem;
}
.itemMusicListDiv{
    width:100%;
    height: calc(100% - 6rem);
}
}

</style>