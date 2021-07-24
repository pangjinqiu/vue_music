
<!--全屏播放器-->
<template>
  <div class="normal-player-container">
      <!--背景-->
      <div class="background" >
          <img :src="currentSong.al.picUrl" width="100%" height=:100% alt="">
      </div>
      <!--蒙层-->
      <div class="background layer"></div>
      <div class="top">
          <div class="back" @click="leaveFullScreenAction">
              <!-- 返回标签 -->
              <img class="iconfont" src="../iconfont/back.png">
          </div>
          <h1 class="title">{{currentSong.name}}</h1>
          <h2 class="subtitle">{{currentSong.ar}}</h2>
      </div>
      <div class="middle">
          <div class="CD-wrapper">
              <img class="image play" :class="{pause:playing}" :src="currentSong.al.picUrl"  alt="">
          </div>
      </div>
      <div class="bottom">
          <!-- v-model拆开 -->
          <bar-progress @touchstart="handleTouchAction('start')" @touchend="handleTouchAction('end')" :value="progress" @input="changeProgressAction" :currentTime="currentTime" :duration="duration"/>
          <div class="operators" >
          <div class="icon i-left">
            <!-- 循环 -->
              <i class="iconfont shunxubo fang" @click="changePlayModeAction" :class="playModeIcon">
                 <img class="shunxu" src="../iconfont/xunhuan.png" style="width:50%;height:50%;color:#333" v-if="this.mode==0">
                 <img class="oneplay" src="../iconfont/oneplay.png" style="width:50%;height:50%;color:#333" v-if="this.mode==1"> 
                <img class="randomplay" src="../iconfont/randomplay.png" style="width:50%;height:50%;color:#333" v-if="this.mode==2">
              </i>
          </div>
          <div class="icon i-left" >
              <!-- 上一首 -->
              <i class="iconfont shunxubo fang">
                  <img src="../iconfont/pre.png" style="width:50%;height:50%;">
              </i>
          </div>
          <div class="icon i-center" >
              <!-- 播放暂停 -->
              <i class="iconfont shunxubo fang" :class="{'icon-play':playing,'icon-stopplay':!playing}" @click="playChangeAction">
                  <img class="icon-play" src="../iconfont/play.png" style="width:50%;height:50%;" v-if="playing">
                  <img class="icon-stopplay" src="../iconfont/stopplay.png" style="width:50%;height:50%;" v-else>
              </i>
          </div>
          <div class="icon i-right" >
              <!-- 下一首 -->
              <i class="iconfont shunxubo fang">
                  <img src="../iconfont/next.png" style="width:50%;height:50%;">
              </i>
          </div>
          <div class="icon i-right">
              <!-- 列表 -->
              <i class="iconfont shunxubo fang">
             <img src='../iconfont/liebiao.png' style="width:50%;height:50%;">
             </i>
          </div>
          </div>
      </div>

  </div>
  
</template>

<script>
import BarProgress from './children/bar-progress'
import {mapState,mapGetters} from 'vuex'
export default {
    components:{
         BarProgress
    },
    props:{
        //接收
        currentTime:Number,
        duration:Number,
        progress:Number
    },
    
    computed:{
        ...mapState({
            playing:state=>state.player.playing,
            mode:state=>state.player.mode
        }),
        ...mapGetters({
            currentSong:'player/currentSong'
        }),
        //当前播放模式图标
        playModeIcon(){
            switch(this.mode){
                case 0:
                    return 'shunxu';
                case 1:
                    return 'oneplay';
                case 2:
                    return 'randomplay'
            }
            return this.mode;
        }
    },
//     watch:{
//         mode(newValue){
//          //判断播放模式如果由其他模式变为随机播放，则还需要找到当前歌曲的下标
//          if(newValue===2){
//              //根据id
//          }
// }
//     },
    methods:{
        //退出全屏播放
          leaveFullScreenAction(){
              this.$store.commit({
               type:'player/setFullScreen',
               value:false
           })
          },
          //修改进度条
          changeProgressAction(newValue){
              console.log(newValue);
              this.$emit('change',newValue);

            //   this.$emit('change',change);

          },
          //将进度条触摸的拖拽状态给外部
          handleTouchAction(flag){
              this.$emit('touchChange',flag);
          },
          //播放暂停点击事件
          playChangeAction(){
              this.$store.commit({
                  type:'player/setPlaying',
                  value:!this.playing
              })
          },
          //切换播放模式事件
              changePlayModeAction(){
                  //修改播放模式
                  this.$store.commit({
                      type:'player/changePlayMode'
                  });
                 
              },
            //   //上一曲点击事件
            //   prevAction(){

            //   },
            //   //下一首
            //   nextAction(){

            //   }

    }
}
</script>

<style scoped lang="scss">
.normal-player-container{
    position: fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    z-index:1000;
    background: #eee;

}
.background{
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index:-1;
    opacity: 0.6;
    filter: blur(20px);
    &.layer{
        background: #aaa;
        opacity: 0.3;
        filter: none;
    }

}
.top{
    position: relative;
    margin-bottom: 25px;
    .back{
        position: absolute;
        top:0;
        left:6px;
        .iconfont{
            display: block;
            
            width: 20%;
            height:20%;
            float: left;
            color:#333;
            font-weight: bold;;
        }
    }
    .title{
        width:70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        color: #333;

    }
    .subtitle{
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        color:#666;
        margin-top:-5px;
    }
}
.middle{
    position: absolute;
    margin: auto;
    top:120px;
    left:0;
    right:0;
    width:80%;
    height:80vw;
    box-sizing: border-box;
    .CD-wrapper{
        width:100%;
        height:100%;
        border-radius: 50%;
        .image{
            position: absolute;
            top:0;
            left:0;
            width: 100%;
            height:100%;
            box-sizing: border-box;
            border-radius: 50%;
            border:10px solid #333;
            animation: rotate 20s linear infinite;
            &.pause{
                animation-play-state: pause;
            }
        }
    }
}
.bottom{
    position: absolute;
    left:0;
    bottom: 50px;
    width: 100%;
    .operators{
        display: flex;
        align-items: center;
        .icon{
            font-weight: normal;
            flex:1;
            text-align: center;
            
            
        }

    }
}
</style>