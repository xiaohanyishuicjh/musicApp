import * as musicApi from "@/request/index.js";
import LocalCache from "@/util/localStorageCache";
let cookieToken = LocalCache.getCache("cookie") ?? '';
let homeApi = {};
homeApi.getHomeBanner = function (type){
 return musicApi.wyService({
    method: 'get',
    url: `banner?type=${type}`,
 })
};
homeApi.getMusicList = function (number){
   return musicApi.wyService({
      method: 'get',
      url: `/personalized?limit=${number}`,
   })
  };
  //搜索歌曲网易云
  homeApi.getWySearchInfo= function (word){
   return musicApi.wyService({
      method: 'get',
      url: `/search?keywords=${word}&cookie=${cookieToken}`,
   })
  };
  //搜索歌曲qq
  homeApi.getQqSearchInfo= function (word){
   return musicApi.qqService({
      method: 'get',
      url: `/getSearchByKey?key=${encodeURIComponent(word)}`,
   })
  };
export default homeApi;