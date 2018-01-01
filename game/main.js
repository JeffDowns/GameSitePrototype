
    //VARIABLES
    var gameCanvas = document.getElementById("graphics");
    var grafx = gameCanvas.getContext('2d');
    var player = new Object("../game/assets/sprites/player/idle/anim1.png", 100, 100, 22, 32);
    var block = new Object("../game/assets/sprites/Other Vegetation/plx-5.png", 100, 132, 384, 216)
    isLeft = false;
    isRight = false;
    
    //EVENTS
    function keyDown(e){
        if(String.fromCharCode(e.keyCode) == "%") isLeft = true;
        if(String.fromCharCode(e.keyCode) == "'") isRight = true;    
    }
    function keyUp(e){
        if(String.fromCharCode(e.keyCode) == "%") isLeft = false;
        if(String.fromCharCode(e.keyCode) == "'") isRight = false;
    }
    
    //MAIN LOOP
    mainLoop();
    function mainLoop(){
    
    //PRE VARIABLE ADJUSTMENTS
    player.X += player.Velocity_X;
    player.Y += player.Velocity_Y;
    
    //LOGIC
    if (isLeft) player.Velocity_X = -3;
    if(isRight) player.Velocity_X = 3;
    if(!isLeft && !isRight) player.Velocity_X = 0;
    
    //POST VARIABLE ADJUSTMENTS
    
    //RENDERING
        grafx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        grafx.drawImage(player.Sprite, player.X, player.Y);
        grafx.drawImage(block.Sprite, block.X, block.Y);
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
    }