import service from "..";
let musicDtail = {};
musicDtail.getMusicDetail= function (id){
 return service({
    method: 'get',
    url: `/playlist/detail?id=${id}`,
 })
};
export default musicDtail;