

import store from "@/store/index.js";
const musicUtil ={
    audioPlay:(playAudio,currentTimeInterVal)=>{
        let playPromise = playAudio.value.play();
            if (playPromise) {
              console.log("playPromise", playPromise);
              playPromise
                .then(() => {
                  console.log("开始音频播放");
                  store.commit("setIsShowPlay", false);
                  playAudio.value.play();
                  this.setMusicCurrentTime(playAudio,currentTimeInterVal);
                  this.setMusicDuration(playAudio);
                })
                .catch((error) => {
                  console.log("音频播放失败", error);
                });
            }
            
      },
      //设置音乐当前播放的时间
      setMusicCurrentTime : (playAudio,currentTimeInterVal)=> {
        currentTimeInterVal.value = setInterval(() => {
          store.commit("setCurrentTime", playAudio?.value?.currentTime ?? 0);
        }, 1000);
        console.log("音乐当前播放的时间", playAudio?.value?.currentTime ?? 0);
      },
       setMusicDuration:(playAudio)=> {
        console.log("音乐总时长", playAudio?.value?.duration ?? 0);
        store.commit("setDuration", playAudio?.value?.duration);
      },
    //   onUnmounted(()=>{
    //     if(playInterVal.value){
    //       clearInterval(playInterVal.value)
    //     }
    //     if(currentTimeInterVal.value){
    //         clearInterval(currentTimeInterVal.value)
    //       }
        
    //   })
    
    
      
      playMusic:(playAudio,currentTimeInterVal,playInterVal)=> {
        
      playAudio.value.muted = false;
      let readyState = playAudio?.value?.readyState?? 0;
      let isLoaded = readyState > 2;
      if (!isLoaded) {
    
        playInterVal.value = setInterval(() => {
          let readyState = playAudio?.value?.readyState?? 0;
          let isLoaded = readyState > 2;
          if(isLoaded){
            this.audioPlay(playAudio,currentTimeInterVal);
            if(playInterVal.value){
              console.log('清除定时器');
              clearInterval(playInterVal.value)
            }
          }
          else{
            
            console.log('音乐加载中');
          }
      
    }, 150);
    
        
      } else {
        this.audioPlay(playAudio);
        // playAudio.value.pause();
        // store.commit("setIsShowPlay", true);
      }
}
// 按照惯例，组合式函数名以“use”开头
}
export default musicUtil;
