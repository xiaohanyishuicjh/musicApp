<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">
                发现好歌单
            </div>
            <div class="more">
                查看更多
            </div>
        </div>
        <div class="musicContent">
        <van-swipe :loop="false" :width="150" class="musicSwpie" :show-indicators="false">
            <van-swipe-item v-for="(item,index) in state.musicList" :key="index"> 
                <div class="musicImg">
                    <img :src="item.picUrl" alt="">
                </div>
                <div class="playContent">
                    <svg class="icon smallIcon" aria-hidden="true">
                        <use xlink:href="#icon-zanting"></use>
                    </svg>
                    <div class="playNumber">
                        {{changeCount(item.playCount)}}
                    </div>
                </div>
                <div class="bottomWord" :title="item.name">
                    <span>{{item.name}}</span>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
    </div>
    
</template>
<script>
import {reactive, onMounted} from "vue";
import homeApi from "@/request/api/homeApi";
export default {
  name: "swiperTop",
  components: {},
  setup() {
    const state = reactive(
      {
        musicList:[]
      }
    );
    onMounted(async ()=>{
      //获取网易云音乐的轮播图数据
      let res = await homeApi.getMusicList(10);
      console.log(res);
      state.musicList = res.data.result ?? [];
    });
    function changeCount(num) {
        if(num >= 100000000){
            return `${(num/100000000).toFixed(1)}亿`;
        }
        else if(num>= 10000){
            return (num/10000).toFixed(1)+'万';
        }
    }
    return { state,changeCount };
  },
};
</script>
<style lang="less" scoped>
.musicList {     
    width: 100%;
    height: 5rem;
    padding: 0.2rem;
    .musicTop {
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;
        .title {
            font-size: 0.4rem;
            font-weight: 900;
        }
        .more{
            border: 1px solid #ccc;
            text-align: center;
            line-height: 0.6rem;
            padding: 0 0.2rem;
            border-radius: 0.4rem;
        }
    }
    .musicContent{
        width: 100%;
        height: 4rem;
        .musicSwpie{
            width: 100%;
            position: relative;
            .van-swipe-item{
                margin-right: .2rem;
            }
            .musicImg{
                width: 100%;
                height: 150px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: .32rem;
                }
            }
            .playContent{
                top: .06rem;
                right: .06rem;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                position: absolute;
                .playNumber{
                    color:#fff;
                    font-size: 15px;
                    margin-left: 5px;
                }
            }
            .bottomWord{
                width: 100%;
                height: .8rem;
                border-bottom-right-radius: 0.3rem;
                border-bottom-left-radius: .3rem;
                padding: 0 10px;
                font-size: 15px;
                font-weight: 600;
                position: absolute;
                bottom: 0;
                /* left: 5%; */
                color: #f7f8ff;
                background-color: #cccccca3;
                display: flex;
                align-items: center;
                span{
                    display:-webkit-box;
                    -webkit-line-clamp:2;
                    -webkit-box-orient:vertical;
                    overflow:hidden;
                    text-overflow:ellipsis;
                }
            }
    }
    }
}

</style>