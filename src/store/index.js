import { createStore } from 'vuex'

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
    }
  },
  mutations: {
    setIsShowPlay(state,data){
      console.log(data,"数据cjh");
      state.isShowPlay = data;
    },
    setPlayList(state,data){
      console.log(data,"数据cjh2");
      state.playList.splice(0,state.playList.length,data);
    },
    setPlayListIndex(state,data){
      console.log(data,"数据cjh3");
      state.playListIndex= data;//默认下标为0
    }
  },
  actions: {
  },
  modules: {
  }
})
