import { createStore } from 'vuex'
import musicDetail from "@/request/api/musicDetail";
export default createStore({
  state: {
    playList: [{
      al:{
        id: 19243,
        name: '吻别',
        pic: 109951166032666620,
        picUrl:"https://p2.music.126.net/8cxEF5lBfKLWbAqrF0yVmg==/109951166032666632.jpg",
        tns: []
      },
      id: 31445474
    }],
    playListIndex: 0,//默认下标为0
    isShowPlay: true,
    showSongDetailContent: false,//是否显示歌曲详情页
    lyricData:{},//歌词信息
    currentTime: 0//歌曲时间
  },
  getters: {
    playList(state){
      return state.playList;
    },
    playListIndex(state){
      return state.playListIndex;
    },
    isShowPlay(state){
      return state.isShowPlay;
    },
    showSongDetailContent(state){
      return state.showSongDetailContent;
    }
  },
  mutations: {
    setIsShowPlay(state,data){
      console.log(data,"是否在播放");
      state.isShowPlay = data;
    },
    setPlayList(state,data){
      console.log(data,"数据cjh2");
      state.playList.splice(0,state.playList.length,data);
    },
    setPlayListIndex(state,data){
      console.log(data,"下标");
      state.playListIndex= data;//默认下标为0
    },
    setShowSongDetailContent(state,data){
      console.log(data,"歌曲详情页显示");
      state.showSongDetailContent= data;//默认下标为0
    },
    //设置歌词信息
    setSongLyric(state,data){
      console.log(data,"歌词信息");
      state.lyricData= data;//默认下标为0
    },
    //设置当前的时间
    setCurrentTime(state,data){
      console.log(data,"当前的时间");
      state.currentTime = data;//默认为0
    }
  },
  actions: {
    async getLyric(state,id){
      let data = await musicDetail.getMusicItemLyric(id);
      console.log(data,"歌词");
      let lyricData = data.data.lrc ??{};
      state.commit("setSongLyric",lyricData);


    }
  },
  modules: {
  }
})
