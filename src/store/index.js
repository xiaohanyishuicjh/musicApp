import { createStore } from 'vuex'
import musicDetail from "@/request/api/wyMusicDetail";
import qqMusicDetail from "@/request/api/qqMusicDetail";
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
      name:"歌曲名",
      id: 31445474
    }],
    playListIndex: 0,//默认下标为0
    playMusicInfo:{
      al: {
        picUrl: ''
      },
      id: '',
      name: '',
      ar: []
    },
    isShowPlay: true,
    showSongDetailContent: false,//是否显示歌曲详情页
    lyricData:{},//歌词信息
    currentTime: 0,//歌曲时间
    duration: 0,//歌曲总时长
    playCurrentTime: 0,
    songPlaySortMethods: 0 ,//0表示列表循环,1表示单首循环2表示随机循环
    showMusicListPopover:false, //是否显示音乐列表popover
    isLogin: false //是否登录
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
    },
    playMusicId(state){
      return state.playMusicInfo.id;
    }
  },
  mutations: {
    setIsShowPlay(state,data){
      console.log(data,"是否在播放");
      state.isShowPlay = data;
    },
    setPlayList(state,data){
      console.log(data,"歌曲信息数据");
      state.playList = data
    },
    pushPlayList(state,data){
      console.log(data,"歌曲數據");
      state.playList.push(data);
    },
    //根据下标删除歌曲
    deletePlyaListByIndex(state,data){
      console.log(data,"下标值");
      state.playList.splice(data,1);
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
      //console.log(data,"当前的时间");
      state.currentTime = data;//默认为0
    },
    //设置歌曲总时长
    setDuration(state,data){
      console.log(data,"歌曲总时长");
      state.duration = data;//默认为0
    },
    //设置播放的时间
    setPlayCurrentTime(state,data){
      console.log(data,"当前的歌曲播放时间");
      state.playCurrentTime = data;//默认为0
    },
    //设置歌曲的播放循环方式
    setSongPlaySortMethods(state,data){
      console.log(data,"设置歌曲的播放循环方式值");
      state.songPlaySortMethods = data;//默认为0
    },
    setShowMusicListPopover(state,data){
      console.log(data,"是否显示音乐列表popover");
      state.showMusicListPopover = data;
    },
    //设置登录信息
    setIsLogin(state,data){
      console.log(data,"是否登录");
      state.isLogin = data;
    },
    //设置当前播放的音乐
    setCurrentPlayMusic(state,data){
      console.log(data,"当前正在播放的音乐");
      state.playMusicInfo = data;
    }
  },
  actions: {
    async getWyLyric(state,id){
        let data = await musicDetail.getMusicItemLyric(id);
        console.log(data,"歌词");
        let lyricData = data?.data?.lrc ??{};
        state.commit("setSongLyric",lyricData);
    },
    async getQqLyric(state,id){
      let data = await qqMusicDetail.getMusicItemLyric(id);
      console.log(data,"歌词");
      let lyricData = data?.data?.data?.lyric ??'';
      let lyricDataInfo = {
      };
      lyricDataInfo.lyric = lyricData;
      state.commit("setSongLyric",lyricDataInfo);
    }

  },
  modules: {
  }
})
