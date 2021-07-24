<template>
  <div class="bar-progress">
    <span class="text">{{currentTime | formatTime}}</span>
    <div class="bar" ref="bar" :style="{backgroundImage:backgroundStyle}">
      <span class="icon" ref="icon"></span>

    </div>
    <span class="text">{{duration | formatTime}}</span>
  </div>
</template>

<script>


export default {
  props:{
    value:Number,
    //接收
        currentTime:Number,
        duration:Number

  },
  //过滤器
  filters:{
    //格式化时间的过滤器
    formatTime(value){
      let mins=Math.floor(value/60);
      let secend=Math.floor(value%60);
      secend= secend>9?secend:('0'+secend);
      return mins+":"+secend;
    }
  },
  computed:{
    backgroundStyle(){
      //根据value修改渐变效果
      const percent=this.value * 100;
      return `linear-gradient(to right, #d44439 0%,#d44439 ${percent}%,#495a66 ${percent}%,#495a66 100%)`;
    }

  },
  watch:{
    value:{
    handler(){
      //组件dom下一次渲染好了
     this.$nextTick(()=>{
      //调整icon位置
        this.$refs.icon.style.transform = `translate(${this.maxScroll * this.value}px,-50%)`;
      });
      },
    immediate:true//初始化就执行
   }
  },
  mounted(){
    
    //操作dom，添加移动端触摸事件
    const bar = this.$refs.bar;
    
    const icon = this.$refs.icon;
    const maxScroll=this.maxScroll=bar.offsetWidth-icon.offsetWidth;
    
    
    

    //添加icon触摸事件
    //基于触摸开始事件上在监听触摸移动和触摸停止的事件
    icon.addEventListener("touchstart",(ev)=>{
      
      let x=this.maxScroll * this.value;
      //告诉外部，触摸开始了
      this.$emit('touchstart');
      const startX=ev.changedTouches[0].clientX;

      const touchmoveCallback = (ev)=>{
      
      console.log("touchmove...")
      //计算偏移量
       let offsetX=ev.changedTouches[0].clientX-startX;
           offsetX = offsetX + x;//叠加上一次的位置
      //约束偏移量
      if(offsetX<0){
        offsetX=0;
      }
      if(offsetX>maxScroll){
        offsetX=maxScroll;
      }
     console.log(offsetX);
    //手指移动，icon偏移多少
     icon.style.transform = `translate(${offsetX}px,-50%)`;
     //计算进度百分比
     const progress=offsetX/maxScroll;

     //传值给外部(触发)
     this.$emit('input',progress);

     };
    const touchendCallback = (ev)=>{
      // console.log(ev);
      //告诉外部，触摸停止
      this.$emit('touchend');
    
     
      //移除监听
      document.removeEventListener("touchmove",touchmoveCallback);
      document.removeEventListener("touchend",touchendCallback)
      };
    
        //添加监听
      document.addEventListener("touchmove",touchmoveCallback);
      document.addEventListener("touchend",touchendCallback);
    });



   },

};
</script>

<style scoped lang="scss">
.bar-progress{
  width:80%;
  margin: 5px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bar{
  flex:1;
  height:4px;
  background:#eee;
  position: relative;
  .icon{
    position: absolute;
    top:50%;
    left:0;
    transform: translate(0,-50%);
    display: block;
     width:12px;
     height:12px;
     border:3px solid #fff;
     background: #d44439;
     border-radius: 50%;
     &::before{
      content: '';
      position: absolute;
      top:-10px;
      left:-10px;
      right:-10px;
      bottom:-10px;
     }
  }

}
.text{
  color: #666;
  font-size: 12px;
  margin: 0 5px;
  width: 25px;
  text-align: center;
}
</style>