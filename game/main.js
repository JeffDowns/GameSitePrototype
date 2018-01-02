
    //VARIABLES
    var gameCanvas = document.getElementById("graphics");
    var grafx = gameCanvas.getContext('2d');
    var maxBlock = 1000;
    var player = new Object("../game/assets/sprites/idle.gif", 100, 100, 19, 34);
    var block = new Array();
    for(let i = 0; i <= maxBlock; i++){
        block[i] = new Object("../game/assets/sprites/Other Vegetation/plx-5.png", i*32+100, 300, 93, 89)
    }
    isLeft = false;
    isRight = false;
    var isSpace = false;
    player.Gravity = 20;
    player.Weight = 0.1;
    
    //EVENTS
    function keyDown(e){
        if(String.fromCharCode(e.keyCode) == "%") isLeft = true;
        if(String.fromCharCode(e.keyCode) == "'") isRight = true;
        if(String.fromCharCode(e.keyCode) == " ") isSpace = true;     
    }
    function keyUp(e){
        if(String.fromCharCode(e.keyCode) == "%") isLeft = false;
        if(String.fromCharCode(e.keyCode) == "'") isRight = false;
        if(String.fromCharCode(e.keyCode) == " ") isSpace = false;
    }
    
    //MAIN LOOP
    mainLoop();
    function mainLoop(){
    
    //PRE VARIABLE ADJUSTMENTS
    for(let i = 0; i <= maxBlock; i++){
            block[i].X += -player.Velocity_X;
        }
    player.Y += player.Velocity_Y;
    
    //LOGIC
    if (isLeft) player.Velocity_X = -3;
    if(isRight) player.Velocity_X = 3;
    if(!isLeft && !isRight) player.Velocity_X = 0;

    if(player.Velocity_Y < player.Gravity) player.Velocity_Y += player.Weight;
    for(let i = 0; i <= maxBlock; i++){
        if(player.isColliding(block[i]) && player.Y + player.Height < block[i].Y + player.Velocity_Y) {
            player.Y = block[i].Y - player.Height;
            player.Velocity_Y = 0;
        }
    }
    if(isSpace && player.Velocity_Y == 0){
        player.Velocity_Y = -3;
    }
    //POST VARIABLE ADJUSTMENTS
    
    //RENDERING
        grafx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        grafx.drawImage(player.Sprite, player.X, player.Y);
        for(let i = 0; i <= maxBlock; i++){grafx.drawImage(block[i].Sprite, block[i].X, block[i].Y);}
        setTimeout(mainLoop, 1000/60); //fps
    }
    
    function Object(img, x, y, width, height){
        this.Sprite = new Image();
        this.Sprite.src = img;
        this.X = x;
        this.Y = y;
        this.Width = width;
        this.Height = height;
        this.Previous_X;
        this.Previous_Y;
        this.Velocity_X = 0;
        this.Velocity_Y = 0;
        this.Gravity = 0;
        this.Weight = 0;

        this.isColliding = function(obj){
            if(this.X > obj.X + obj.Width) return false;
            if(this.X + this.Width < obj.X) return false;
            if(this.Y > obj.Y + obj.Height) return false;
            if(this.Y + this.Height < obj.Y) return false;
            return true;
        }
    }