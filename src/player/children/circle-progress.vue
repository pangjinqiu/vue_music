<!--圆形进度条-->
<template>
  <div class="circle-progress">
        <!-- 环形进度条 ref设置引用相当于el,也可以实现子到父传递 这里是前者-->
        <canvas class="canvas" ref="canvas"></canvas>
      <i class="iconfont" :class="{'icon-bofang':value,'icon-stop':!value}" @click="changeCircle" >
      <img  class="icon-bofang" src='../../iconfont/stop.png' style="width:100%;height:100%;" v-if="value" >
      <img  class="icon-stop" src='../../iconfont/bofang.png' style="width:100%;height:100%;"  v-else>
      </i>
      
          
  </div>
</template>

<script>
export default {

    props:{
        value:Boolean,
        progress:Number

    },
     watch:{
           progress(){
               this.renderAction();
           }

        },
     methods:{
            changeCircle(){
                // 触发定义
                this.$emit('input',!this.value)
            },
            renderAction(){
                //清除上一次的绘制
                this.context.clearRect(0,0,60,60);
                this.context.save();
                this.context.beginPath();
                //    大圆
                this.context.moveTo(30,30);
                this.context.arc(30,30,30,0,2 * Math.PI *2 ,false);
                this.context.lineTo(15,15);
                
                    // 绘制小圆
                this.context.moveTo(30,30);
                this.context.arc(30,30,24,0,2 * Math.PI *2,false);
                this.context.lineTo(30,30);
                this.context.closePath();
                this.context.fillStyle='rgba(212,68,57,0.3)';
                //去掉重叠
                this.context.fill('evenodd');
                this.context.restore();
                
                //小圆弧

                this.context.save();
                this.context.beginPath();
                const startAng = Math.PI / 180 *(-90);
                const endAng = startAng+ Math.PI / 180 *360 * this.progress;

                //    大圆
                this.context.moveTo(30,30);
                this.context.arc(30,30,30,startAng,endAng,false);
                this.context.lineTo(30,30);
                // 绘制小圆
                this.context.moveTo(30,30);
                this.context.arc(30,30,24,startAng,endAng,false);
                this.context.lineTo(30,30);
                this.context.closePath();
                this.context.fillStyle='rgba(212,68,57,1)';
                //去掉重叠
                this.context.fill('evenodd');
                this.context.restore();
           
            }





        },
       
        mounted(){
            const canvas = this.$refs.canvas;
            // 设置画布大小
            canvas.width=60;
            canvas.height=60;
            this.context = canvas.getContext('2d');

           this.renderAction();

         

        }
}
</script>

<style scoped lang="scss">
.circle-progress{
    width:30px;
    height:30px;
    position: relative;
    
    .iconfont{
        width:100%;height:100%;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
    // 不能在css中设置画布的大小,因为设置大小是对画布进行了拉伸
    .canvas{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;

}
}

</style>