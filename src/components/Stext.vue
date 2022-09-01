<template>
    <div>
        <section>
            <p class="text" ref="text" @mouseover="onmouseover">
                qiwheuoiqhfwhywjioooooooooooooooooooooooqcwwwwwwwwwwwwwwwwwwuihqeqihr e
            </p>
        </section>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    created(){},
    
    mounted(){
        let text =this.$refs.text
        text.innerHTML=text.textContent.replace(/\S/g,"<span>$&</span>")

        

    },
    methods:{
        onmouseover(){
            const letters=document.querySelectorAll('span')
            for(let i=0;i<letters.length;i++){
                letters[i].classList.add('active')
            }
        }
    }
}
</script>
<style lang="less" scoped>
section{
    position: relative;
    display:flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #111;
    overflow: hidden;
}
section .text{
    position: absolute;
    color: #fff;
    margin: 20px;
    max-width: 800px;
    user-select: none;
}
section .text span{
    position: relative;
    display: inline-block;
    cursor: pointer;
}
section .text span.active{
    animation:smoke 2s linear forwards;
}
@keyframes amoke{
    0%{
        opacity: 1;
        filter: blur(0);
        transform: translateX(0) translateY(0) rotate(0deg) scale(1);
    }
    100%{
        opacity: 0;
        filter: blur(20px);
        transform: translateX(300) translateY(-300) rotate(720deg) scale(4);
    }
}
</style>