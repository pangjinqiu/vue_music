<template>
  <div id="app">
    <SongListPage :data="dataSource" :class="{hasPadding:showPlayer}"/>
    <Player v-if="showPlayer"/>
  </div>
</template>

<script>
import SongListPage from './SongListPage'
import Player from './player/index'
import axios from 'axios'
import {mapState} from 'vuex'
export default{
  components:{
    SongListPage,
    Player
  },
  data(){
    return{
      //数据源
      dataSource:[]
    }
  },
  computed:{
    ...mapState({
      showPlayer:(state)=>state.player.currentIndex >=0
    })
  },
  //在create时，已经可以操作属性了
  created(){
    //请求歌手的链接
    axios.get('http://localhost:3000/artists?id=7424')
    
     .then(data=>{
       console.log(data);
       //过滤数据
       const newData = data.data.hotSongs.map(item=>({
         //获得id
          id:item.id,
          //获得名字
          name:item.name,
          //歌手姓名 过滤得到姓名，然后使用join设置分隔符
          ar:item.ar.map(arItem=>arItem.name).join('/'),
          //获得专辑姓名
         al:{
           name:item.al.name,  
           picUrl:item.al.picUrl
           },  
          
       }));
       //将数据覆值给当前组件属性
       this.dataSource=newData;
       
        




           })
    }
}

  

</script>

<style >
*{
  margin:0;
  padding:0;
}
html,body,#app{
  width:100%;
  height:100%;
}
@keyframes rotate{
    0%{
        transform: rotate(0);
    }
    100%{
        transform: rotate(360deg);
    }
}
.hasPadding{
  padding-bottom: 60px;
}
</style>