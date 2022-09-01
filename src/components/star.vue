<template>
  <div class="yemian">
    <div class="stars">
      <div
        v-for="(item, index) in starsCount"
        :key="index"
        class="star"
        ref="star"
      ></div>
    </div>
    <!-- <div class="bear1"></div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      starsCount: 800,
      distance: 800,
    };
  },
  mounted() {
    let _this = this;
    let starArr = _this.$refs.star;
   
    starArr.forEach((item) => {
      var speed = 0.2 + Math.random() * 1;
      var thisDistance = _this.distance + Math.random() * 300;
      item.style.transformOrigin = `0 0 ${thisDistance}px`;
      item.style.transform = `translate3d(0,0,-${thisDistance}px) rotateY(${
        Math.random() * 360
      }deg) rotateX(${Math.random() * -50}deg) scale(${speed},${speed})`;
    });
  },
};
</script>
<style lang="less" scoped>


:root{
    font-size: 15px;
}
.yemian {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92);
  background: radial-gradient(
    220% 105% at top center,
    #1b2947 10%,
    #75517d 40%,
    #e96f92 65%,
    #f7f7b6 100%
  );
  background-attachment: fixed;
}
.stars {
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: absolute;
  perspective-origin: 50% 100%;
  left: 50%;
  animation: rotate 90s infinite linear;
  bottom: 0;
}
.star {
  width: 2px;
  height: 2px;
  background: #f7f7b8;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
}
@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
      rotateY(-360deg);
  }
}
/* .bear1 {
  position: absolute;
  margin: 500px auto;
  width: 200px;
  height: 100px;
  background: url(@/assets/fb4731cdac144713866ea3d6f79a4105.png) no-repeat;
  animation: bear 0.5s steps(8) infinite;
  transition: 5s;
}
@keyframes bear {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -1600px 0;
  }
}
.rain {
  position: fixed;
  height: 150px;
  width: 2px;
  background-color: aqua;
  top: 0;
} */
</style>