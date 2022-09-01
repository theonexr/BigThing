<template>
  <div class="body">
    <div class="masonry">
      <div class="item">
        <img src="http://picsum.photos/360/460?random=1" alt="" />
      </div>
      <div class="item">
        <img src="http://picsum.photos/350/460?random=2" alt="" />
      </div>
      <div class="item">
        <img src="http://picsum.photos/320/460?random=3" alt="" />
      </div>
      <div class="item">
        <img src="http://picsum.photos/330/460?random=4" alt="" />
      </div>
      <div class="item">
        <img src="http://picsum.photos/310/460?random=5" alt="" />
      </div>
      <div class="item">
        <img src="http://picsum.photos/330/460?random=6" alt="" />
      </div>
      <div class="item">
        <img src="http://picsum.photos/370/460?random=7" alt="" />
      </div>
      <div class="item">
        <img src="http://picsum.photos/320/460?random=8" alt="" />
      </div>
      <div class="item">
        <img src="http://picsum.photos/340/460?random=9" alt="" />
      </div>
      <div class="item">
        <img src="http://picsum.photos/330/460?random=10" alt="" />
      </div>
      <div class="item">
        <img src="http://picsum.photos/350/460?random=11" alt="" />
      </div>
      <div class="item">
        <img src="http://picsum.photos/320/460?random=12" alt="" />
      </div>
      <div class="item">
        <img src="http://picsum.photos/330/460?random=13" alt="" />
      </div>
      <div class="item">
        <img src="http://picsum.photos/360/460?random=14" alt="" />
      </div>
      <div class="item">
        <img src="http://picsum.photos/340/460?random=15" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.body {
  margin: 4px;
  font-family:  Helvetica;
}
// // 上下排列

// .masonry {
//   // 一行4图
//   column-count: 4;
//   column-gap: 0;
// }
// .item {
//   position: relative;
//   padding: 2px;
// // 全部图片左上角添加排列序号
//   counter-increment: item-counter;
// }
// .item img {
//   display: block;
//   width: 100%;
//   height: auto;
// }
// .item::after{
//     position: absolute;
//     display: block;
//     top: 2px;
//     left: 2px;
//     width: 24px;
//     height: 24px;
//     text-align: center;
//     line-height: 24px;
//     background-color: #000;
//     color: #fff;
//     content: counter(item-counter);
// }
// 向右排列
.masonry{
    display: flex;
    flex-direction: column;
    // 向下
    flex-wrap: wrap;
    height: 1000px;
}
.item{
    position: relative;
    width: 25%;
    padding: 2px;
    box-sizing: border-box;
    counter-increment: item-counter;
}
.item img{
    display: block;
    width: 100%;
    height: auto;
}
</style>