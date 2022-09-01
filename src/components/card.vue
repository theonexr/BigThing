<template>
    <div class="body">
        <div class="a">
            <div class="b">
                <a href="#">只属于我的世界</a>
                <h2>XR:happy</h2>
                <span>I`m XR <br>I love the world</span>
            </div>
            <div class="c">
                <!-- --i用于计算平面圆柱的动效延迟和距离，--w计算宽度 -->
                <div class="d" style="--i:1;--w:1.5"></div>
                <div class="d" style="--i:2;--w:1.6"></div>
                <div class="d" style="--i:3;--w:1.4"></div>
                <div class="d" style="--i:4;--w:1.7"></div>
                <div class="e" style="--i:1;"></div>
            </div>
            <!-- 设置图片 -->
            <div class="f">
                <button @click="Go">GO</button>
                <!-- 插槽 -->
                <slot name="ID" msg="hello"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        Go(){
            this.$router.push('/Login')
        }
    }
}
</script>
<style  scoped>
.body{
    margin: 0;
    min-height: 100vh;
    background-color: rgb(204, 212, 230);
    display:flex;
    justify-content: center;
}
.a{
    position: relative;
    width: 700px;
    height: 400px;
    border: #fff 10px solid;
    background-color: rgb(120,140,200);
    top: 120px;
    border-radius: 20px;
    overflow: hidden;
}
.b{
    position: absolute;
    width: 200px;
    height: 300px;
    left: 0;
    margin: 75px 50px;
    transition: 1s;
}
.b a{
    text-decoration: none;
    color: #fff;
    font: 900 28px '';
}
.b h2{
    transition: .5s 1s;
    opacity: 0;
    color: rgb(30,210,200);
}
.b span{
    transition: .5s 1s;
    color: #fff;
    font:500 15px '';
    position: absolute;
    top: 70px;
}
.c{
    position: absolute;
    top: -130px;
    right: -240px;
}
.d,.e{
    position: absolute;
    right: calc(var(--i)*100px);
    width: calc(var(--w)*40px);
    height: 500px;
    overflow: hidden;
    border-radius: 100px;
    transform: rotateZ(220deg) translate(0,0);
    background: rgb(240,220,150);
    transition: .5s .5s;
}
.d:nth-child(2){
    background: rgb(240,190,230);
}
.e{
    left: -470px;
    top: -140px;
    width: 70px;
    background-color: rgb(90,220,150);
}
.a:hover .c div{
    /* 动画延迟 */
    transition: .5s calc(var(--i)*.1s);
    /* 动画轨迹 */
    transform: rotateZ(220deg) translate(-200px,400px);
}
.a:hover .b{
    transition: 1s .5s;
    left: 370px;
}
.a:hover .b span{
    transition: 1s .5;
    top: 105px;
}
.a:hover .b h2{
    transition: 1s .5;
    opacity: 1;
}
.f{
    width: 250px;
    height: 250px;
    background-color: red;
    margin: 70px;
    opacity: 0;
    transition: .5s;
}
.a:hover .f{
    opacity: 1;
    transition: 1.2s 1.3s;
}
</style>