<template>
  <div class="song-list-page">
  <ul>
    <!--遍历下标-->
    <li class="item" v-for="(item,index) in data" :key="item.id" @click="songClickAction(index)">
      <p class="index">{{index+1}}</p>
      <div class="content">
        <h3 class="name">{{item.name}}</h3>
        <p class="info">
          <!--遍历歌手名字-->
          <span>{{item.ar}}</span>
          <span> - </span>
          <span>{{item.al.name}}</span>
        </p>
      </div>

    </li>
  </ul>
  </div>
</template>

<script>
export default {
  //接收外部属性
  props:{
    data:Array
  },
  methods:{
    songClickAction(index){
      //将点击歌曲下标和歌曲列表传递
      this.$store.commit({
        type:'player/selectSongByIndex',//commit的事件名称
        index:index,//参数，点击的下标
        list:this.data//参数，整个歌单列表
      })
    }
  }
}
</script>

<style scoped>
.song-list-page{
  width:100%;
  height:100%;
  overflow: auto;
  box-sizing: border-box;
}
.item{
  border-bottom:1px solid #eee ;
  display: flex;
  padding: 5px;
}
.index{
  width:40px;
  height: 40px;
  justify-content: center;
  line-height: 40px;
  font-size: 16px;
}
.content{
  flex:1;
  height:40px;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  
}
.name{
  font-size: 16px;
  font-weight: normal;
  
}
.info{
  font-size:14px;
  color:#555;
 
}
</style>