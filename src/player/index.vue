<!--播放器的整体结构-->
<template>
  <div class="player-wrap">
     <MiniPlayer  v-if="!fullScreen" :progress="progress" />
     <NormalPlayer  @touchChange="handleTouchChangeAction" v-else :progress="progress" @change="handleProgressChangeAction" :currentTime="currentTime" :duration="duration"  />
     <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`"></audio>
  </div>
</template>

<script>
import MiniPlayer from './mini-player'
import NormalPlayer from './normal-player'
import {mapGetters,mapState} from 'vuex'
export default {

   components:{
      
       MiniPlayer,
      NormalPlayer
   },
   data(){
     return {
        //audio当前时间
        currentTime:0,
        //audio总时长
        duration:0,
        isTouch:false
     }
   },
   computed:{
      //从仓库获取仓库计算属性，转为组件的计算属性
      ...mapGetters({
         currentSong:'player/currentSong'
      }),
      //获取state
      ...mapState({
         fullScreen:(state)=>state.player.fullScreen,
         playing:(state)=>state.player.playing,
         //currentSong:state=>state.player.currentSong

      }),
      //计算歌曲id
      id(){
         return this.currentSong.id;
      },
      //进度百分比
     
      //修改，实现set函数，或修改计算属性的依赖
       progress(){
         
         const result= this.currentTime /this.duration;
         return isNaN(result)? 0 : result;
      }
   },
   watch:{
      //监听歌曲状态
      playing(newVal){
         //等待dom渲染好之后再操作
         this.$nextTick(()=>{
         if(newVal){
            //播放
            this.audio.play();
         }else{
            //停止
            this.audio.pause();
         }
          })
      },
      //监听歌曲id，id变了，要重新加载歌曲，重新播放歌曲
      id(newvalue,oldValue){
         if(!oldValue){
            return;
         }
         //有上一首才执行
         this.$nextTick(()=>{
            this.audio.load();
            this.audio.play();
         })
      }

   },
   methods:{
      //根据两个事件实现
      //用户拖拽时只更新进度，用户停止后，更新播放的时间
   //处理内部组件的进度变化
   handleProgressChangeAction(newValue){
      //this.progress=newValue;
      //修改进度不是真的修改progress，而是currentTime
      this.currentTime=newValue*this.duration;//进度*百分比=当前时间
      //播放器调整播放时间
      //this.audio.currentTime=this.currentTime;
   },
   //全屏播放触摸拖拽事件
   //触摸开始，触摸结束
   handleTouchChangeAction(value){
      if(value==='start'){
         this.isTouch=true;
      }else if(value==='end'){
         this.isTouch=false;
          //播放器调整播放时间
      this.audio.currentTime=this.currentTime;
      }
   }

   },
   mounted(){
      //组件挂载好，dom首次渲染完毕，获取audio标签，设置在this上，方便之后访问
      this.audio=this.$refs.audio;

      this.audio.addEventListener('canplay',()=>{
         //audio可以播放时，获取音乐时长
         // console.log(this.audio.duration);
         this.duration=this.audio.duration;

      });
      //更新事件
      this.audio.addEventListener('timeupdate',()=>{
         // console.log('timeupdate',this.audio.currentTime);
         if(this.isTouch){
            //用户在拖拽进度条，进度条不要跟着音乐播放器去更新进度，而是用户拖拽到那进度条就在哪
            return;
         }
         this.currentTime=this.audio.currentTime;
      });
      //监听一首歌播放结束
      // this.audio.addEventListener('ended',()=>{

      // })

      
   }

}
</script>

<style >


</style>