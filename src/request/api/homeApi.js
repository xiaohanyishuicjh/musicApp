import service from "..";
let homeApi = {};
homeApi.getHomeBanner = function (type){
 return service({
    method: 'get',
    url: `banner?type=${type}`,
 })
};
homeApi.getMusicList = function (number){
   return service({
      method: 'get',
      url: `/personalized?limit=${number}`,
   })
  };
  //搜索歌曲
  homeApi.getSearchInfo= function (word){
   return service({
      method: 'get',
      url: `/search?keywords=${word}`,
   })
  };
export default homeApi;