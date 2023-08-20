import service from "..";
let homeApi = {};
homeApi.getHomeBanner = function (type){
 return service({
    method: 'get',
    url: `banner?type=${type}`,
 })
};
export default homeApi;