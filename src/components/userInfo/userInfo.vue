<template>
  <div class="userInfo">
    <div class="avatarImg">
      <img :src="accountInfo.profile.avatarUrl" alt="" srcset="" class="avatarImgContent">
      <img :src="accountInfo.profile.backgroundUrl" alt="" srcset="" class="avatarImgBg">
    </div>
    <div class="musicList">
      <div class="musicItem" v-for="(item,index) in playList" :key="index" @click="linkToPlayDetail(item)">
        <div class="playListImg">
          <img :src="item.coverImgUrl" alt="" class="playListImgContent">
        </div>
        <div class="playInfo">
          <div class="musicPlayName">
            {{ item.name }}
          </div>
          <div class="musicPlayDetail">
            <div class="musicTotal">
              {{ `歌曲数量: ${item.trackCount}` }}
            </div>
            <div class="musicPlayNumber">
              {{ `创建人: ${item.creator.nickname}` }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userInfoApi from "@/request/api/userInfoApi";
import { ref,onMounted } from "vue";
import LocalCache from "@/util/localStorageCache";
import {useRouter} from "vue-router"
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
    const wyUid = LocalCache.getCache("wyUid") ?? '';
    let accountInfo = ref({
      profile:{
        avatarUrl: ''
      }
    });
    let playList = ref([]);
    const router = useRouter();
    async function getUserInfoById () {
      let playListInfo = await userInfoApi.getUserPlayList(wyUid);
      console.log(playListInfo, "用户收藏的歌单");
      playList.value = playListInfo?.data?.playlist ?? [];
        let data = await userInfoApi.getUserInfoByUserId(wyUid);
        console.log(data, "用户信息");
        accountInfo.value = data?.data ?? {};
        console.log(accountInfo.value.profile.avatarUrl,"头像链接")
    }
    function linkToPlayDetail (item){
      router.push({path:'/musicDetail',query:{id:item.id}});
    }
    onMounted(async ()=>{
      //获取qrCode
      await getUserInfoById();
    });
    return {
      getUserInfoById,
      accountInfo,
      playList,
      linkToPlayDetail
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.userInfo{
  width: 100%;
  height: 100vh;
}
.avatarImg{
  width: 100%;
  height: 6rem;
  display: flex;
    justify-content: center;
    position: relative
}
.avatarImgContent{
  width: 2rem;
    height: 2rem;
    border-radius: 1.8rem;
    z-index: 999;
    margin-top: 1rem;
    border: 1px solid #ffffff8c;
}
.avatarImgBg{
  width: 100%;
  height: 6rem;
  position: absolute;
  z-index: 2;
}
.musicList{
  width: 100%;
  height: calc(100% - 6rem);
  overflow-y: auto;
  padding: 0 0.3rem;
  .musicItem{
    width: 100%;
    height: 1.8rem;
    display:flex;
    align-items: center;
    margin: 0.2rem 0;
    .playListImg{
      width: 1.6rem;
      height: 1.6rem;
      margin-right: 0.2rem;
      .playListImgContent{
        width: 1.6rem;
    height: 1.6rem;
    border-radius: 0.3rem;
    border: 1px solid #c6c6c686;
      }
    }
    .playInfo{
      width: calc(100% - 2rem);
      height: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .musicPlayName{
        opacity: 0.8;
          font-size: 18px;
          color: #000000;
          letter-spacing: 0;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%;
          margin-bottom: 0.18rem;
      }
      .musicPlayDetail{
        display:flex;
        align-items: center;
        .musicTotal{
          opacity: 0.4;
          font-size: 14px;
          color: #000000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100px;
          margin-right: 6px;
        }
        .musicPlayNumber{
          opacity: 0.4;
          font-size: 14px;
          color: #000000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: calc(100% - 100px);
        }
      }
    }
  }
 
}
</style>
