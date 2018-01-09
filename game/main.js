/****************************************************************************************************************
                                    d8b                                                                 d8b      
   d8P                           ?88                                                             d8P ?88      
d888888P                          88b                                                         d888888P88b     
  ?88'  88bd88b d888b8b   .d888b, 888888b       88bd8b,d88b  d8888b d888b8b    88bd88b d888b8b  ?88'  888888b 
  88P   88P'  `d8P' ?88   ?8b,    88P `?8b      88P'`?8P'?8bd8P' `Pd8P' ?88    88P'  `d8P' ?88  88P   88P `?8b
  88b  d88     88b  ,88b    `?8b d88   88P     d88  d88  88P88b    88b  ,88b  d88     88b  ,88b 88b  d88   88P
  `?8bd88'     `?88P'`88b`?888P'd88'   88b    d88' d88'  88b`?888P'`?88P'`88bd88'     `?88P'`88b`?8bd88'   88b
                                                                          )88                                 
                                                                         ,88P                                 
                                                                     `?8888P                                                               
 *******************************************************************************************************************/
    
    
    //VARIABLES
    var theme = new Audio("assets/audio/theme.mp3")
    var gameCanvas = document.getElementById("graphics");
    var grafx = gameCanvas.getContext('2d');
    var maxBlock = 255;
    var player = new Object("../game/assets/sprites/idle.gif", 100, 100, 19, 34);
    var block = new Array();
    for(let i = 0; i <= maxBlock; i++){
        block[i] = new Object("../game/assets/sprites/Other Vegetation/grassRect.png", i * 86 + 100, 720, 431, 87)
        block[1] = new Object("../game/assets/sprites/Other Vegetation/grassRect.png", 0,  720, 431, 8)

    }

    isLeft = false;
    isRight = false;
    var isSpace = false;
    player.Gravity = 10;
    player.Weight = 0.08;
    
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
        setTimeout(mainLoop, 1000/120); //fps
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