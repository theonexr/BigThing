<template>
    <div>
        <h1>轮播</h1>
        <div class="focus">
            <ul>
                <li><img src="../assets/87be69d1f703918f292ca8b2463d269758eec460.jpg" alt=""></li>
                <li><img src="../assets/崩.webp" alt=""></li>
                <li><img src="../assets/51162539382770.png" alt=""></li>
                <li><img src="../assets/87be69d1f703918f292ca8b2463d269758eec460.jpg" alt=""></li>
                <li><img src="../assets/崩.webp" alt=""></li>
            </ul>
        
        <ol>
            <li class="current"></li>
            <li></li>
            <li></li>
        </ol>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        
    },
    mounted(){
        window.addEventListener('load',function(){
            var focus=this.document.querySelector('.focus')
            var ul=focus.children[0]

            var w =focus.offsetWidth
            var ol=focus.children[1]

            var index=0
            var timer=setInterval(() => {
                index++
                var translatex=-index*w
                ul.style.transition='all .3s'
                ul.style.transform='translateX('+translatex+'px)'
            }, 2000);
            // 过渡完成，再判断
            ul.addEventListener('transitionend',function(){
                // 无缝滚动
                if(index>=3){
                    index=0
                    ul.style.transition='none'
                    var translatex=-index*w
                    ul.style.transform='translateX('+translatex+'px)'
                }else if(index<0){
                    index=2
                    ul.style.transition='none'
                    var translatex=-index*w
                    ul.style.transform='translateX('+translatex+'px)'
                }
                // 圆点跟随
                ol.querySelector('.current').classList.remove('current')
                ol.children[index].classList.add('current')
            })

            // 4.手指滑动
            var startX=0
            var moveX=0
            ul.addEventListener('touchstart',function(e){
                startX=e.targetTouches[0].pageX
                clearInterval(timer)
            })

            ul.addEventListener('touchmove',function(e){
                moveX=e.targetTouches[0].pageX-startX
                var translatex=-index*w+moveX
                ul.style.transition='none'
                ul.style.transform='translateX('+translatex+'px)'
                // flag=true;
            })
            ul.addEventListener('touchend',function(e){
                // if(flag)
                if(Math.abs(moveX)>50){
                    if(moveX>0){
                        index--
                    }else{
                        index++
                    }
                    var translatex=-index*w
                    ul.style.transition='all .3s'
                    ul.style.transform='translateX('+translatex+'px)'
            }else{
                var translatex= -index*w
                ul.style.transition='all .1s'
                ul.style.transform='translateX('+translatex+'px)'
            }
            clearInterval(timer)
            timer=setInterval(() => {
                index++
                var translatex=-index*w
                ul.style.transition='all .3s'
                ul.style.transform='translateX('+translatex+'px)'
            }, 2000);
            })
        })
    }
}
</script>
<style scoped>
.focus{
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 200px;
    background-color: pink;
    overflow: hidden;
    
}
.focus ul{
    width: 500%;
    overflow: hidden;
    margin-left: -100%;
}
.focus ul li{
    float: left;
    width: 20%;
}
.focus img{
    width: 100%;
    height: 100%;
}
.focus ol{
    position: absolute;
    bottom: 5px;
    right: 5px;
}
.focus ol li{
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: #fff;
    list-style: none;
    border-radius: 15px;
    transition: all .3s;
}
.focus ol li.current{
    width: 15px;
    background-color: red;
}
</style>