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
export default homeApi;