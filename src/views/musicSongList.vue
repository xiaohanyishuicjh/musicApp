<template>
  <div class="songList">
        <div
          class="songItem"
          v-for="(item, index) in songList"
          :key="index"
          @click="setMusic(item,index)"
        >
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
            <div class="MvControl" v-show="item.mvid !== 0">
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
</template>
<script>
import { ref } from 'vue';
export default {
  setup(props,ctx) {
    const message = ref('Hello World');
    console.log(props.songList,"歌曲列表数据1");
    function setMusic(item,index){
      console.log(item,"歌曲数据");
      let data={
        value:item,
        index:index
      }
      ctx.emit('playMusic',data)
    }
    return {
      message,
      setMusic
    };
  
  },
    props: {
    songList: {
      type: Array,
      default: () => {
        return [];
      },
    }
  }
};
</script>
<style lang="less" scoped>
.songList {
  width: 100%;
  height: calc(100% - 2.2rem);
  padding: 0 0.3rem;
  overflow-y: auto;
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