<template>
  <div class="itemMusicList">
    <div class="songTopControl">
      <div class="playAll">
        <div class="playAllIcon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zanting"></use>
          </svg>
        </div>
        <div class="playAllWord">
          <span>播放全部</span>
          <span>{{ `(共${songList.length}首)` }}</span>
        </div>
      </div>

      <div class="collectSong">
        <van-button type="danger"
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-chuangjiantianjiapiliangtianjia"></use></svg
          >收藏{{ `(${subscribedCount})` }}</van-button
        >
      </div>
    </div>
    <div class="songList">
      <div class="songItem" v-for="(item, index) in songList" :key="index">
        <div class="songLeft">
          <div class="songIndex">
            {{ index }}
          </div>
          <div class="songInfo">
            <div class="songName">
              {{ item.name }}
            </div>
            <div class="songCreator">
              <span
                v-for="(creatorItem, creatorItemIndex) in item.ar"
                :key="creatorItemIndex"
              >
                {{ creatorItem.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="songRight">
          <!-- v-show="item.mv!==0" -->
          <div class="MvControl">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofangMV"></use>
            </svg>
          </div>
          <div class="songDetail">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-caidan"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "itemMusicList",
  components: {},
  setup(props) {
    console.log(props.songList);
  },
  props: {
    songList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    subscribedCount: {
      type: Number,
      default: () => {
        return 0;
      },
    },
  },
};
</script>
<style lang="less" scoped>
.itemMusicList {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
}
.songTopControl {
  width: 100%;
  height: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.3rem;
  .playAll {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .playAllIcon {
      margin-right: 0.2rem;
      display: flex;
      svg {
        color: #000;
        width: 0.35rem;
        height: 0.35rem;
      }
    }
    .playAllWord {
    }
  }
  /deep/.collectSong {
    .van-button--normal {
      padding: 0.01rem 0.2rem;
      height: 0.6rem;
      border-radius: 0.25rem;
    }
    .van-button__text {
      display: flex;
      svg {
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.1rem;
      }
    }
  }
}
.songList {
  width: 100%;
  height: calc(100% - 0.8rem);
  padding: 0 0.3rem;
  .songItem {
    display: flex;
    justify-content: space-between;
    margin: 0.36rem 0;
  }
  .songLeft {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .songIndex {
      margin-right: 0.4rem;
    }
  }
  .songRight {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
