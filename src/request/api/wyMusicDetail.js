import * as musicApi from "@/request/index.js";
let musicDetail = {};
import LocalCache from "@/util/localStorageCache";
//let cookieToken = LocalCache.getCache("cookie") ?? '';
//获取歌单详情页数据
musicDetail.getMusicDetail= function (id){
 return musicApi.wyService({
    method: 'get',
    url: `/playlist/detail?id=${id}`,
 })
};
//获取歌单所有歌曲
musicDetail.getMusicItemlist= function (data){
   return musicApi.wyService({
      method: 'get',
      url: `/playlist/track/all?id=${data.id}&limit=${data.limit}&offset=${data.offset}`,
   })
  };
  //获取歌单所有歌曲
musicDetail.getMusicItemSrcUrl= function (data){
   
   return musicApi.wyService({
      method: 'get',
      url: `/song/url/v1?id=${data.id}&level=${data.type}&cookie=${LocalCache.getCache("cookie") ?? ''}`,

   })
  };
  //获取歌词
  musicDetail.getMusicItemLyric= function (id){
   return musicApi.wyService({
      method: 'get',
      url: `/lyric?id=${id}`,
   })
  };
  //获取song详情页数据
musicDetail.getSongDetail= function (id){
   return musicApi.wyService({
      method: 'get',
      url: `/song/detail?ids=${id}`,
   })
  };
export default musicDetail;