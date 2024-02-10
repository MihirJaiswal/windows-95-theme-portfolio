// import platform from './images/platform.png'

const canvas=document.querySelector('.canvas')
const c=canvas.getContext('2d')
canvas.width=900
canvas.height=576

const gravity=2

function imageCreation(imageSrc){
    const image=new Image()
    image.src=imageSrc
    return image
}

const platform='./images/platform.png'
const bg='./images/background.png'
const hills='./images/hills.png'
const platformST='./images/platformSmallTall.png'
const spriteRunLeft='./images/spriteRunLeft.png'
const spriteRunRight='./images/spriteRunRight.png'
const spriteStandLeft='./images/spriteStandLeft.png'
const spriteStandRight='./images/spriteStandRight.png'

class Player{
    constructor(){
        this.speed=10
        this.position={
            x:100,
            y:100
        }

        this.velocity={
            x:0,
            y:0
        }
        this.width=66;
        this.height=150;
        this.image=imageCreation(spriteStandRight)
        this.frame=0
        this.sprites={
            stand:{
                right:imageCreation(spriteStandRight),
                left:imageCreation(spriteStandLeft),
                cropWidth:177,
                width:66
            },
            run:{
                right:imageCreation(spriteRunRight),
                left:imageCreation(spriteRunLeft),
                cropWidth:341,
                width:127.875
            }
        }
        this.currentSprite=this.sprites.stand.right
        this.currentCropWidth=177
    }

    draw(){
        c.drawImage(
            this.currentSprite,
            this.currentCropWidth*this.frame,
            0,
            this.currentCropWidth ,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height)
    }

    update(){
        this.frame++
        if(this.frame>29 && (this.currentSprite==this.sprites.run.right || this.currentSprite==this.sprites.run.left) )this.frame=0
        else if(this.frame>59 && (this.currentSprite==this.sprites.stand.right || this.currentSprite==this.sprites.stand.left))this.frame=0
        this.draw()
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y

        if(this.position.y+this.height+this.velocity.y <=canvas.height)
        this.velocity.y+=gravity
         
        
        
    }
}

class Platform{
    constructor({x,y,image}){
        this.position={
            x,
            y
        }

        this.image=image
        this.width=image.width
        this.height=image.height
        
    }

    draw(){
        c.drawImage(this.image,this.position.x,this.position.y)
        
    }
}




class GenericObject{
    constructor({x,y,image}){
        this.position={
            x,
            y
        }

        this.image=image
        this.width=image.width
        this.height=image.height
        
    }

    draw(){
        c.drawImage(this.image,this.position.x,this.position.y)
        
    }
}



let genericObjects=[]







let currentKey
let player=new Player()
let platImage=imageCreation(platform)


 
let platforms=[]


const keys={
    right:{
        pressed:false
    },
    left:{
        pressed:false
    }
}

let scrollLength=0

function reload(){
     genericObjects=[
        new GenericObject({
            x:-1,
            y:-1,
            image:imageCreation(bg)
    
        }), new GenericObject({
            x:-1,
            y:-1,
            image:imageCreation(hills)
    
        })
    ]
    
    
    
    
    
    
    
    
     player=new Player()
     platImage=imageCreation(platform)
    
    
     
     platforms=[new Platform( {x:-1,
        y:470,
        image:platImage }),
        new Platform({x:platImage.width-3,y:470,image:platImage}),
        new Platform({x:platImage.width*2 +100,y:470,image:platImage}),
        new Platform({x:platImage.width*3 +300,y:470,image:platImage}),
        new Platform({x:platImage.width*4 +500,y:470,image:platImage}),
        new Platform({x:platImage.width*5 +100,y:470,image:platImage}),,
        new Platform({x:platImage.width*6 +100-3 + imageCreation(platformST).width-1,y:300,image:imageCreation(platformST)}),
        new Platform({x:platImage.width*6 +100-3,y:470,image:platImage}),
        new Platform({x:platImage.width*7 +400-3,y:470,image:platImage})]
    
    
   
    
     scrollLength=0
}


function animate(){
    requestAnimationFrame(animate)
    c.fillStyle='white'
    c.fillRect(0,0,canvas.width,canvas.height)

    genericObjects.forEach(object=>{
        object.draw()
    })
    
    platforms.forEach(platform=>{
        platform.draw()
    })
    player.update()

    if(keys.right.pressed && player.position.x<400){
        player.velocity.x=player.speed
    }else if((keys.left.pressed && player.position.x>100)
     || keys.left.pressed && scrollLength==0 && player.position.x>0){
        player.velocity.x=-player.speed
    }else{
        player.velocity.x=0

        if(keys.right.pressed){
            scrollLength+=player.speed
            platforms.forEach(platform=>{
                platform.position.x-=player.speed
            })

            genericObjects.forEach(object=>{
                object.position.x-=player.speed*0.66
            })

        }else if(keys.left.pressed && scrollLength>0){
            scrollLength-=player.speed
            platforms.forEach(platform=>{
                platform.position.x+=player.speed
            })

            genericObjects.forEach(object=>{
                object.position.x+=player.speed*0.66
            })
        }
    }

    

    platforms.forEach(platform=>{
        if(player.position.y +player.height <= platform.position.y &&
            player.position.y+player.height+player.velocity.y>=platform.position.y &&
            player.position.x+player.width>=platform.position.x &&
            player.position.x<=platform.position.x+platform.width){
            player.velocity.y=0
        }
    })

    if(keys.right.pressed && currentKey=='right' && player.currentSprite!=player.sprites.run.right){
        player.frame=1
        
        player.currentSprite=player.sprites.run.right
        player.currentCropWidth=player.sprites.run.cropWidth
        player.width=player.sprites.run.width
    }else if(keys.left.pressed && currentKey=='left' && player.currentSprite!=player.sprites.run.left){
        player.frame=1
        player.currentSprite=player.sprites.run.left
        player.currentCropWidth=player.sprites.run.cropWidth
        player.width=player.sprites.run.width
    }else if(!keys.left.pressed && currentKey=='left' && player.currentSprite!=player.sprites.stand.left){
        
        player.currentSprite=player.sprites.stand.left
        player.currentCropWidth=player.sprites.stand.cropWidth
        player.width=player.sprites.stand.width
    }else if(!keys.right.pressed && currentKey=='right' && player.currentSprite!=player.sprites.stand.right){
        player.frame=1
        
        player.currentSprite=player.sprites.stand.right
        player.currentCropWidth=player.sprites.stand.cropWidth
        player.width=player.sprites.stand.width
    }


    // winning condition
    if(scrollLength>=5000){
        reload()
    }
    //losing condition
    if(player.position.y  > canvas.height){
        reload() 
        
    }
}

reload()

animate()

window.addEventListener('keydown',({keyCode})=>{
    // console.log(keyCode)
    switch(keyCode){
        case 65:
        case 37: 
            console.log('left')
            keys.left.pressed=true
            currentKey='left'
            
            break;
        case 68:
        case 39:
            console.log('right')
            keys.right.pressed=true
            currentKey='right'
            break;
        case 83:
        case 40:
            console.log('down')
            break;
        case 87:
        case 38:
            console.log('up')
            player.velocity.y-=25
            break;
        
    }
})

window.addEventListener('keyup',({keyCode})=>{
    // console.log(keyCode)
    switch(keyCode){
        case 65:
        case 37:
            console.log('left')
            keys.left.pressed=false
            // player.currentSprite=player.sprites.stand.left
            // player.currentCropWidth=player.sprites.stand.cropWidth
            // player.width=player.sprites.stand.width
            break;
        case 68:
        case 39:
            console.log('right')
            keys.right.pressed=false
            // player.currentSprite=player.sprites.stand.right
            // player.currentCropWidth=player.sprites.stand.cropWidth
            // player.width=player.sprites.stand.width
            break;
        case 83:
        case 40:
            console.log('down')
            break;
        case 87:
        case 38:
            console.log('up')
            
            break;
        
    }
})