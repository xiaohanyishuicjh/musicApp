<template>
  <div class="itemMusicTop">
    <img :src="playList.coverImgUrl" alt="" class="bgImg" />
    <div class="musicTop">
      <div class="itemLeft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="itemRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-chaxun"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-caidan"></use>
        </svg>
      </div>
    </div>
    <div class="musicListContent">
      <div class="musicListTop">
        <div class="musicListTopLeft">
          <img :src="playList.coverImgUrl" alt="" class="musicImg" />
          <div class="listenNumber">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang1"></use>
            </svg>
            <span>{{ changeCount(playList.playCount) }}</span>
          </div>
        </div>
        <div class="musicListTopRight">
          <div class="musicListTopRightTop">
            <span>{{ playList.name }}</span>
          </div>
          <div class="musicListCreator">
            <img :src="playList.creator.avatarUrl" alt="" class="creatorIMg" />
            <span>{{ `${playList.creator.nickname} >` }}</span>
          </div>
          <div class="musicListDescription" :title="playList.description">
            <span>{{ playList.description }}</span>
          </div>
        </div>
      </div>
      <div class="musicControl">
        <div class="musicControlItem">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-pinglun"></use>
          </svg>
          <div class="musicControlItemWord">
            <span>{{ playList.commentCount }}</span>
          </div>
        </div>

        <div class="musicControlItem">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
          </svg>
          <div class="musicControlItemWord">
            <span>{{ playList.shareCount }}</span>
          </div>
        </div>
        <div class="musicControlItem">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
          </svg>
          <div class="musicControlItemWord">
            <span>{{ "下载" }}</span>
          </div>
        </div>
        <div class="musicControlItem">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-round_check"></use>
          </svg>
          <div class="musicControlItemWord">
            <span>{{ "多选" }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted } from "vue";
export default {
  name: "swiperTop",
  components: {},
  setup(props) {
    //console.log(props.cjh.cjh,"1231");
    //判断数据如果拿不到的话，就获取sessionStorage里面的数据
    // if(!props.playList){
    //     //props.playList = JSON.parse(sessionStorage.getItem('musicDetail')).playList;
    // }
    console.log(props.playList.creator);
    onMounted(async () => {
      //获取网易云音乐的轮播图数据
    });
    function changeCount(num) {
      if (num >= 100000000) {
        return `${(num / 100000000).toFixed(1)}亿`;
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    // watch(
    //   () => props.playList,
    //   (curAge, preAge) => {
    //     console.log("新值:", curAge, "老值:", preAge);
    //     curAge && (playListLocal = curAge.playList);
    //     console.log(playListLocal,"playListLocal");
    //   }
    // );
    return { changeCount };
  },
  props: {
    playList: {
      type: Object,
      default: () => {
        return {};
      },
    },
  }
};
</script>
<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 100%;
}
.musicTop {
  width: 100%;
  height: 1rem;
  //padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //padding: 0.2rem;
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.2rem;
    span {
      font-size: 0.4rem;
      color: #fff;
      font-weight: 500;
    }
  }
 
}
 .bgImg {
    width: 100%;
    height: 6.5rem;
    position: absolute;
    z-index: -1;
    filter: blur(30px);
  }
.musicListContent {
  width: 100%;
  height: 5rem;
  .musicListTop {
    width: 100%;
    height: 3.6rem;
    //padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0.2rem;
    //padding: 0.2rem;
    .musicListTopLeft {
      width: 3rem;
      height: 3rem;
      position: relative;
      margin-right: 0.4rem;
    }
    .musicImg {
      width: 3rem;
      height: 3rem;
      border-radius: 0.3rem;
    }
    .listenNumber {
      position: absolute;
      right: 0.15rem;
      top: 0.08rem;
      display: flex;
      align-items: center;
      .icon {
        width: 0.3rem;
        height: 0.3rem;
      }
      span {
        font-size: 0.2rem;
        color: #fff;
        font-weight: 600;
        text-align: center;
        //margin: 0 auto;
      }
    }
    .musicListTopRight {
      width: 100%;
      height: 100%;
      .musicListTopRightTop {
        width: 100%;
        max-height: 1.2rem;
        span {
          font-size: 0.3rem;
          color: #fff;
          font-weight: 600;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        margin-bottom: 0.16rem;
      }
      .musicListCreator {
        width: 100%;
        height: 1.2rem;
        display: flex;
        align-items: center;
        .creatorIMg {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 0.8rem;
          filter: blur(0.01rem);
        }
        span {
          margin-left: 0.32rem;
          font-size: 0.28rem;
          color: #d5d5d5cc;
          font-weight: 600;
        }
      }
      .musicListDescription {
        width: 100%;
        height: 1.2rem;
        span {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.28rem;
          color: #f0f0f0d0;
          font-weight: 500;
        }
      }
    }
  }
}
.musicControl {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: flex-top;
  padding: 0 0.3rem;
  .musicControlItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    svg {
      color: white;
    }
    .musicControlItemWord {
      font-size: 0.28rem;
      color: #f0f0f0d0;
      font-weight: 500;
    }
  }
}
</style>
