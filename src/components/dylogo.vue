<template>
    <div class="body">
        <div class="logo">
            
        </div>
    </div>
</template>
<style scoped>
:root{
    --bg-color:#060715;
    --logo-color1:#fff;
    --logo-color2:#ea3355;
    --logo-color3:#72f6ef;
}
.body{
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #060715;
    }
    .logo{
        position: relative;
        width: 40px;
        height: 220px;
        background-color: #fff;
        box-shadow:10px 10px 0 #ea3355;
        filter:drop-shadow(-10px -10px 0 #72f6ef);
    }
    .logo::before,
    .logo::after{
        position: absolute;
        content: '';
    }
    .logo::before{
        top: 125px;
        right: 0;
        width: 100px;
        height: 100px;
        transform: rotate(45deg);

        border: 40px solid #fff;
        border-top-color: transparent;
        border-radius: 50%;

        filter: drop-shadow(14px 0 0 #ea3355);
    }
    .logo::after{
        top: -100px;
        left: 10px;
        width: 140px;
        height: 140px;

        transform: rotate(45deg);

        border: 30px solid transparent;
        border-bottom-color: #fff;
        border-radius: 50%;
        filter: drop-shadow(14px 0 0 #ea3355);
    }
</style>