
let mode=0;
const playMode={
    sequence:0,//顺序播放
    loop:1,//单曲播放
    random:2//随机播放
};
// const getPlayList=function(mode,sequencePlayList){
//                //修改播放列表，修改播放列表的歌曲列表
//          //如果是顺序播放：播放列表就是原始歌曲列表
//          if(mode===playMode.sequence){
//             return [...sequencePlayList];
//         }
//         //如果是单曲循环：播放列表就是原始的歌曲列表
//         else if(mode==playMode.loop){
//             return [...sequencePlayList];
//         }
//         //如果是随机播放：播放列表就是原始的歌曲列表打乱后的歌单
//         else if(mode==playMode.random){
//             //对歌曲列表进行复制
//             const newArr=[...sequencePlayList];
//             //打乱歌曲顺序
//             for(let i=0;i<newArr.length;i++){
//                 const item=newArr[i];
//                 const randomIndex=Math.floor(Math.random()*(i+1));
//                 //i=0 randomIndex 0
//                 //1=1 randomIndex 0,1
//                 //i=3 randomIndex 0,1,2,3
//                 newArr[i]=newArr[randomIndex];
//                 newArr[randomIndex]=item;
//             }
//            return newArr;

//         }
// }


//仓库的音乐播放器相关
export default{
    namespaced:true,
    state:{
        //是否全屏播放
        fullScreen:false,
        //当前音乐是否播放
        playing:false,
        
        //顺序歌曲列表
        sequencePlayList:[],
      //歌曲播放列表
       // playList:[],
        //播放模式
        mode: playMode.sequence,
        //当前播放歌曲在列表中的下标
        currentIndex:-1,
        
        

    },
    getters:{
        //当前歌曲信息依赖于getters currentIndex
        currentSong(state){
            
            if(state.currentIndex>=0 && state.currentIndex < state.sequencePlayList.length){
                //选中歌曲要播放
                return state.sequencePlayList[state.currentIndex];
            }else{
                //没有选中
                return {};
            }


        },
      
},
    mutations:{
        //歌单中点击歌曲后的处理事件
        selectSongByIndex(state,payload){
            //设置歌曲下标
            state.currentIndex=payload.index;
            //歌单列表的原始数据需要一直保留，不能被其他事件影响到歌单顺序
            state.sequencePlayList=[...payload.list];
            
            //重新计算
        //     state.playList=getPlayList(state.mode,state.sequencePlayList);
            
        //    //设置当前歌曲信息
        //    state.currentSong=state.sequencePlayList[state,currentIndex];
        //    //找到正确下标
        //    state.currentIndex=state.playList.findIndex(item=>item.id===state.currentSong.id);
        //    //播放音乐
           state.playing=true;
            

        },
        //修改播放状态
        setPlaying(state,payload){
            state.playing=payload.value;

        },
        //修改是否全屏播放
        setFullScreen(state,payload){
            state.fullScreen=payload.value;
        },
        //切换播放
      changePlayMode(state){
          //修改播放模式
         mode+=1;
         
         state.mode=mode%3;
           //播放音乐列表,，计算得到
       
        //     //修改播放列表，修改播放列表的歌曲列表

        //     state.playList=getPlayList(state.mode,state.sequencePlayList);
         
        //  //修改下标
        //  state.currentIndex=state.playList.findIndex(item=>{
        //      return item.id===state.currentSong.id;
        //  });
        //  //修改信息
        //  state.currentSong=state.playList[state.currentIndex];
         
        //  }
      }


 
    
    }
}
