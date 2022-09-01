<template>
  <div class="body">
    <div class="cube">
      <div class="top"></div>
      <div>
        <span style="--i: 0"></span>
        <span style="--i: 1"></span>
        <span style="--i: 2"></span>
        <span style="--i: 3"></span>
      </div>
    </div>
    <div class="cube1">
      <div class="top top1"></div>
      <div>
        <span style="--i: 0"></span>
        <span style="--i: 1"></span>
        <span style="--i: 2"></span>
        <span style="--i: 3"></span>
      </div>
    </div>
    <div class="cube2">
      <div class="top top2"></div>
      <div>
        <span style="--i: 0"></span>
        <span style="--i: 1"></span>
        <span style="--i: 2"></span>
        <span style="--i: 3"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #050505;
}
.cube {
  position: relative;
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  transform: rotateX(-30deg);
  animation: animate 4s linear infinite;
}
.cube1{
  position:absolute;
  width: 200px;
  height: 200px;
  top: 150px;
  right: 100px;
  transform-style: preserve-3d;
  transform:rotateX(-30deg) translateZ(-300px);
  animation: animate 4s linear infinite;
 div{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  span{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(#151515, #660985);
  transform: rotateY(calc(90deg * var(--i))) translateZ(100px);
  }
 }
}
.cube2{
  position:absolute;
  width: 200px;
  height: 200px;
  bottom: 150px;
  left: 100px;
  transform-style: preserve-3d;
  transform:rotateX(-30deg) translateZ(-300px);
  animation: animate 4s linear infinite;
 div{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  span{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(#151515, #b70a0a);
  transform: rotateY(calc(90deg * var(--i))) translateZ(100px);
  }
 }
}
@keyframes animate {
  0% {
    transform: rotateX(-30deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(-30deg) rotateY(360deg);
  }
}
.cube div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}
.cube div span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(#151515, #00ec00);
  transform: rotateY(calc(90deg * var(--i))) translateZ(100px);
}
.top {
  position: absolute;
  top: 0;
  left: 0;
  height: 200px;
  width: 200px;
  background-color: #222;
  transform: rotateX(90deg) translateZ(100px);
}
.top::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  background: #0f0;
  transform: translateZ(-300px);
  filter: blur(20px);
  box-shadow: 0 0 120px rgba(0, 255, 0, 0.2), 0 0 200px rgba(0, 255, 0, 0.4),
    0 0 300px rgba(0, 255, 0, 0.6), 0 0 400px rgba(0, 255, 0, 0.8),
    0 0 500px rgba(0, 255, 0, 1);
}
.top1::before {
  background: rgb(97, 6, 154);
  box-shadow: 0 0 120px rgba(127, 0, 185, 0.2), 0 0 200px rgba(136, 0, 163, 0.4),
    0 0 300px rgba(151, 0, 181, 0.6), 0 0 400px rgba(143, 0, 195, 0.8),
    0 0 500px rgba(187, 0, 255, 0.942);
}
.top2::before {
  background: rgb(154, 5, 5);
  box-shadow: 0 0 120px rgba(57, 0, 0, 0.2), 0 0 200px rgba(136, 0, 0, 0.4),
    0 0 300px rgba(151, 0, 0, 0.6), 0 0 400px rgba(143, 0, 0, 0.8),
    0 0 500px rgba(187, 0, 0, 0.942);
}
</style>