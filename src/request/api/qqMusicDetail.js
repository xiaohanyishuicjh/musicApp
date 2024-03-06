import * as musicApi from "@/request/index.js";
let qqMusicDetail = {};
//import LocalCache from "@/util/localStorageCache";
//let cookieToken = LocalCache.getCache("cookie") ?? '';
//获取歌单详情页数据
qqMusicDetail.getMusicDetail= function (id){
 return musicApi.qqService({
    method: 'get',
    url: `/playlist/detail?id=${id}`,
 })
};
//获取歌单所有歌曲
qqMusicDetail.getMusicItemlist= function (data){
   return musicApi.qqService({
      method: 'get',
      url: `/playlist/track/all?id=${data.id}&limit=${data.limit}&offset=${data.offset}`,
   })
  };
  //获取歌曲src
qqMusicDetail.getMusicItemSrcUrl= function (data){
   
   return musicApi.qqService({
      method: 'get',
      url: `song/url?id=${data.id}&type=320&mediaId=${data.id}`,

   })
  };
  //获取歌词
  qqMusicDetail.getMusicItemLyric= function (id){
   return musicApi.qqService({
      method: 'get',
      url: `/lyric?songmid=${id}`
   })
  };
  //获取song详情页数据
qqMusicDetail.getSongDetail= function (id){
   return musicApi.qqService({
      method: 'get',
      url: `/getSongInfo?songmid=${id}`,
   })
  };

    //获取song封面图片
qqMusicDetail.getSongPicURl= function (id){
  return musicApi.qqService({
     method: 'get',
     url: `/getImageUrl?id=${id}`,
  })
 };
export default qqMusicDetail;