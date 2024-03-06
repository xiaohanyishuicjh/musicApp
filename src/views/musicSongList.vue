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
              <div class="addMusic" @click.stop="addMusic(item)">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tianjiayinle_add-music"></use>
              </svg>
            </div>

            <div class="deleteMusic" @click.stop="deleteMusic(index)">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_del"></use>
          </svg>
          </div>


          </div>
        </div>
      </div>
</template>
<script>
import { ref } from 'vue';
import { useStore } from "vuex";
export default {
  setup(props,ctx) {
    const store = useStore();
    const message = ref('Hello World');
    console.log(props.songList,"歌曲列表数据1");
    function setMusic(item){
      console.log(item,"歌曲数据");
      // store.commit('setPlayList', props.songList);
      // store.commit('setCurrentPlayMusic', item);
      ctx.emit('playMusic',item)
    }
    function addMusic(item){
      store.commit("pushPlayList", item);
    }
    function deleteMusic(index){
      store.commit("deletePlyaListByIndex", index);
      
    }
    return {
      message,
      setMusic,
      addMusic,
      deleteMusic
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