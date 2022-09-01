<template>
    <div class="body">
        <h1 align='center'>Hello</h1>
        <div class="card" ref="cardref" @mousemove="movelimit($event)">
            <div class="card-shine"></div>

            <div class="card-shadow"></div>

            <div class="card-layer"></div>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        
    },
    mounted(){
        const movelimit=this.$refs.cardref  
        const card=this.$refs.cardref
        movelimit.addEventListener('mousemove',(e)=>{
            window.requestAnimationFrame(function(){
                movecard(e.clientX,e.clientY)
            })
            // console.log(e);
        })
    },

    watch:{},
    methods:{
        // movelimit($event){
        //     var _this = this;
        //     var card=_this.$refs.cardref  
        //     // console.log($event.clientX);
        //     window.requestAnimationFrame(function(){
        //         movecard($event.clientX,$event.clientY)
        //     })
        // },
        movecard(x,y){

         let box=card.getBoundingClientRect();
         let calcX =(x-box.x-(box.height/2))
         let calcY =(y-box.y-(box.width/2))

         card.style.transfrom="rotateX"+"("+calcX+"deg"+")"
        }
    }

    
}
</script>
<style scoped>
body{
    transform-style: preserve-3d;
    perspective: 439px;
}
div{
    transform-style: preserve-3d;
    cursor: pointer;
}
.card{
    width: 200px;
    height: 350px;
    margin: 0 auto;
    position: relative;
    top: 150px;
    transform: rotateX(20deg);
}
.card-shine{

}
.card-shadow{

}
.card-layer{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #363636;
    border-radius: 20px;
    /* background-image: url(); */
}
</style>