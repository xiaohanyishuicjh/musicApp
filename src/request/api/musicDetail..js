import service from "..";
let musicDtail = {};
//获取歌单详情页数据
musicDtail.getMusicDetail= function (id){
 return service({
    method: 'get',
    url: `/playlist/detail?id=${id}`,
 })
};
//获取歌单所有歌曲
musicDtail.getMusicItemlist= function (data){
   return service({
      method: 'get',
      url: `/playlist/track/all?id=${data.id}&limit=${data.limit}&offset=${data.offset}`,
   })
  };
export default musicDtail;