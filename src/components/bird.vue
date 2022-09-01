<template>
    <div class="body">
        <div class="bird_box">
            <div class="bird">
                <div class="bird_body">
                    <div class="bird_head"></div>
                    <div class="bird_wing_left">
                        <div class="bird_wing_left_top"></div>
                    </div>
                    <div class="bird_wing_right">
                        <div class="bird_wing_right_top"></div>
                    </div>
                    <div class="bird_tail_left"></div>
                    <div class="bird_tail_right"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.body{
    /* margin: 0;
    height: 100vh; */
    display: flex;
    /* background-color: rgba(1, 109, 172, 0.568); */
    align-items: center;
    justify-content: center;
    /* overflow: hidden; */
}
/* 倒影 */
.bird_box{
    margin-top: -40px;
    perspective: 400px;
    filter: drop-shadow(0px 150px 10px rgba(0,0,0,.2));
}
/* 3d模式 */
.bird_box div{
    transform-style: preserve-3d;
}
.bird{
    position: absolute;
    top: 400px;
    
    transform: rotateX(60deg) rotateY(90deg) rotateZ(90deg);
    animation:fly 30s linear infinite
}
.bird_body{
    position: relative;
    width: 30px;
    height: 40px;
    background-color: #f9f6f3;
}
.bird_head{
    position: absolute;
    top: -20px;
    border-right: 15px solid transparent;
    border-bottom: 30px solid #f9f6f3;
    border-left: 15px solid transparent;

    transform: rotateX(-20deg);
    transform: 50% 100%;
}
.bird_wing_left{
    position: absolute;
    left: -30px;
    height: 30px;
    border-right: 30px solid #f9f6f3;
    border-bottom: 10px solid transparent;
    transform-origin:100% 0;
    animation: wingleft 1s cubic-bezier(0.39, 0.575, 0.565, 1) alternate infinite;
}
.bird_wing_left_top{
    position: absolute;
    left: -30px;
    border-right: 30px solid #f9f6f3;
    border-bottom: 30px solid transparent;
    transform-origin:100% 0;
    animation: wingleft 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) alternate infinite;
}
.bird_wing_right{
    position: absolute;
    left: 30px;
    height: 30px;
    border-left: 30px solid #f9f6f3;
    border-bottom: 10px solid transparent;
    transform-origin:0 0;
    animation: wingright 1s cubic-bezier(0.39, 0.575, 0.565, 1) alternate infinite;
}
.bird_wing_right_top{
    position: absolute;
    border-left: 30px solid #f9f6f3;
    border-bottom: 30px solid transparent;
    transform-origin:0 0;
    animation: wingright 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) alternate infinite;
}
.bird_tail_left{
    position: absolute;
    top: 40px;
    border-right: 30px solid transparent;
    border-top: 40px solid #f9f6f3;
    transform-origin: 50% 0;
    transform: rotateX(-20deg);
}
.bird_tail_right{
    position: absolute;
    top: 40px;
    border-left: 30px solid transparent;
    border-top: 40px solid #f9f6f3;
    transform-origin: 50% 0;
    transform: rotateX(-20deg);
}
@keyframes wingleft{
    0%{
        transform: rotateY(-40deg);
    }
    100%{
        transform: rotateY(40deg);
    }
}
@keyframes wingright{
    0%{
        transform: rotateY(40deg);
    }
    100%{
        transform: rotateY(-40deg);
    }
}
@keyframes fly{
    0%{
        transform:translateY(-500px) rotateX(-120deg) rotateZ(0deg) rotateY(10deg);
    }
    25%{
        transform:translateY(200px) rotateX(-120deg) rotateZ(0deg) rotateY(10deg);
    }
    50%{
        transform:translateX(-200px) translateY(280px) rotateX(-110deg) rotateZ(180deg) rotateY(10deg);
    }
    55%{
        transform:translateX(-200px) translateY(200px) rotateX(-120deg) rotateZ(180deg) rotateY(10deg);
    }
    100%{
        transform:translateX(-200px) translateY(-500px) rotateX(-190deg) rotateZ(180deg) rotateY(10deg);
    }
}
</style>