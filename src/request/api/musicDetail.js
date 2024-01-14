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
  //获取歌单所有歌曲
musicDtail.getMusicItemSrcUrl= function (data){
   return service({
      method: 'get',
      url: `/song/url/v1?id=${data.id}&level=${data.type}`,
   })
  };
  //获取歌词
  musicDtail.getMusicItemLyric= function (id){
   return service({
      method: 'get',
      url: `/lyric?id=${id}`,
   })
  };
export default musicDtail;