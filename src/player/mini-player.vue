<!--底部小播放器-->
<template>
  <div class="mini-player-container" @click="enterFullScreenAction">
      <!--专辑照片-->
      <div class="icon">
      <div class="img-wrapper">
          <img  :class="{pause:!playing}" :src="currentSong.al.picUrl" alt="">
      </div>
      </div>
      <div class="text">
          <h2 class="name">{{currentSong.name}}</h2>
          <p class="desc">{{currentSong.ar}}</p>
      </div>
      <div class="control circle"  @click.stop="" >
          <!-- 绑定仓库状态，那么不能再使用v-model了，如果使用，意味着组件在修改状态 -->
          <!-- 需要把v-model拆开为：绑定value属性，实现input事件 -->
         <Circle-progress :value="playing" @input="changePlayingAction"  :progress="progress" />
      </div>
      <div class="control circle" @click.stop="">
        
          <img src='../iconfont/yinyue.png' >
         
       
      </div>
     
  </div>
</template>

<script>

import CircleProgress from './children/circle-progress'
import {mapState,mapGetters} from 'vuex'
export default {

    components:{
      CircleProgress
    },
    props:{
       progress:Number
    },
   
    computed:{
        //把仓库的state转为组件的计算属性
        ...mapState({
            playing:(state)=>state.player.playing,
        
        }),
        //把仓库的geetters转为组件的计算属性
        ...mapGetters({
            currentSong:'player/currentSong'
        })
    },
    methods:{
       changePlayingAction(value){
           console.log('切换',value);
           //让仓库修改playing的值
           this.$store.commit({
               type:'player/setPlaying',
               value
           })
       },
       //进入全屏
       enterFullScreenAction(){
           console.log('enter...');
           this.$store.commit({
               type:'player/setFullScreen',
               value:true
           })
        
       }
    }

}
</script>

<style scoped lang="scss">

.mini-player-container{
  position: fixed;
  left:0;
  bottom: 0;
  z-index:1000;
  width:100%;
  height:60px;
  display:flex;
  align-items: center;
  background: rgb(247, 247, 247);
  
}
.icon{
    flex:0 0 40px;
    width:40px;
    height:40px;
    padding:0 10px 0 20px;
    .img-wrapper{
        width:100%;
        height:100%;
        img
        {
            border-radius: 50%;
            width: 100%;
            height:100%;
            animation:rotate 10S linear infinite;
           
            &.pause{
                animation-play-state: paused;

            }
        
        }
    }

}
.text{
    flex:1;
    display:flex;
    flex-direction: column;
    justify-content: center;
    float: left;
    line-height: 20px;
    overflow: hidden;
    
    .name{
        
        font-size:14px;
        color:#333;

    }
    .desc{
        
        font-size: 12px;
        color:#999;
    }
}

.control{
    flex:0 0 30px;
    padding: 0 10px;
    img{
        width:100%;
        height:100%;
        
    }
  
}


</style>
