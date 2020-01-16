class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

/*
  =======    =========    ========    =======    ===============    ========
  =          =       =    =           =     =           =           =
  =          =       =    =           =     =           =           =
  =          ========     =======     =======           =           =======
  =          =     =      =           =     =           =           =
  =          =      =     =           =     =           =           =
  =======    =       =    ========    =     =           =           ========
*/

create() {
 

    //this function is for see the images and more on your game
    //START CODE FROM BACKGROUND

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background").setOrigin(0).setDepth(0).setScrollFactor(0);
    //FOR PUT MUSIC ON THE BACKGROUND
    let SoundBackground = this.sound.add('musica_fondo_audio', { loop: true });
    /*WITH THAT YOU CAN CHOICE IF YOU WANNA START DE SOUND OR STOPED
    FOR EXAMPLE
    SoundBackground.play(); FOR START THE SOUND
    SoundBackground.stop(); FOR STOP THE SOUND
    SoundBackground.pause(); FOR PAUSE THE SOUND
    SoundBackground.resume(); FOR CONTINUE THE SOUND */
    SoundBackground.stop();
    this.input.keyboard.on('keydown_LEFT', () => {
        SoundBackground.volume -= 0.1;
    });

    this.input.keyboard.on('keydown_DOWN', () => {
        SoundBackground.pause();
    });

    this.input.keyboard.on('keydown_UP', () => {
        SoundBackground.resume();
    });

    this.input.keyboard.on('keydown_RIGHT', () => {
        SoundBackground.volume = 1;
    });



    //THE FINAL CODE FOR BACKGROUND

    /* THIS CODE WAS MADE
       FOR PUT TEXT ON
       THE GAME*/
    PuntosText = this.add.text(10, 10, 'Puntos: 0', { fontSize: '38px', fill: '#0d91fc' });


   
    //we have 5 platforms the first is for the base and the others is for jump up

    var platforms = this.physics.add.staticGroup();

    BolasDeHierro = this.physics.add.group();

    var piso = this.physics.add.staticGroup();
    
    piso.create(950,568, 'suelo');

    platforms.create(400, 568, 'plataforma').setScale(2).refreshBody();
    platforms.create(600, 420, 'plataforma');
    platforms.create(50, 330, 'plataforma');
    platforms.create(640, 260, 'plataforma');
    platforms.create(75, 150, 'plataforma');
    platforms.create(880, 140, 'plataforma');
    platforms.create(1100, 140, 'plataforma');

    //START CODE PLAYER
    var player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(false);
    player.body.setGravityY(300);

    this.physics.add.collider(player, piso);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(BolasDeHierro, platforms);




    //You can see the player animated to move on the letf(izquierda)
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 2 }],
        frameRate: 20
    });

    //You can see the player animated to move on the right(derecha)
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    //FOR MOVE THE PLAYER WITH W A D
    this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    this.player = player;
    //FINAL FROM CREATE PLAYER

    /*
      THE START STORM snowFLAKES :D
    */
    var particles = this.add.particles('snowflakes');

    var emitter = particles.createEmitter({
        //POSITION FROM THE SNOW
        x: 900,
        y: -150,
        angle: { min: 180, max: 0 },
        speed: 400,
        gravityY: -30,
        lifespan: 3000,
        quantity: 2,
        scale: { start: 1.0, end: 1 },
        blendMode: 'ADD'
    });



    var particles2 = this.add.particles('snowflakes_large');

    var emitter2 = particles2.createEmitter({
        x: 900,
        y: -150,
        angle: { min: 280, max: 0 },
        speed: 400,
        gravityY: -30,
        lifespan: 3000,
        quantity: 2,
        scale: { start: 0.2, end: 1 },
        blendMode: 'ADD'
    });
    /*
      FINAL CODE WHERE THE STORM SNOW WORKS
    */
    /*
    THIS CODE IS MADE TO CREATE A CHARACTER
    THAT MOVES RANDOMLY AND MAKE IT MOVE
    */
    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var bomb = BolasDeHierro.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(300, 100), 20);

    let SoundJumpPlayer1 = this.sound.add('Jump1Audio');
    SoundJumpPlayer1.volume -= 80;
    /*
    FOR MAKE THE GAME STOP WHEN YOU TOUCH THE ENEMIE
    */
    var GolpePelota = function GolpePelota(player, BolasDeHierro,){
        this.physics.pause();
        GameText = this.add.text(250, 250, 'Game Over', {
            font: 'bold 48px Arial',
            fill: '#ff0000',

        });
        emitter.stop(); 
        emitter2.stop();
        player.setTint(0xff0000);
        gameOver = true;}

        this.physics.add.overlap(BolasDeHierro, player, GolpePelota, null, this);
        
        //TODO: CAMARA QUE SIGUE AL PERSONAJE
        this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, game.config.width * 100, game.config.height);

    // making the camera follow the player
    this.myCam.startFollow(this.player);
}


/*

 =        =   ==========     ========     =======    =============    ========
 =        =    =        =    =       =    =     =          =          =
 =        =    =        =    =        =   =     =          =          =
 =        =    =========     =        =   =======          =          ======
 =        =    =             =        =   =     =          =          =
 =        =    =             =       =    =     =          =          =
  ========     =             ========     =     =          =          ========

*/
update(time, delta) {
    //THIS LET IS FOR THE AUDIO WORKING ALL THE TIME
    let SoundJumpPlayer1 = this.sound.add('Jump1Audio');
    

    this.input.keyboard.on('keydown_LEFT', () => {
        SoundJumpPlayer1.volume = 0.1;

    });

  //  this.physics.add.overlap(BolasDeHierro, player, GolpePelota, null, this);

    var cursors = this.cursors;
    var player = this.player;

    if (gameOver) {

        return;
    }

    if (this.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
        //this.background.tilePositionX -= 1.5;
    }
    else if (this.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
        //this.background.tilePositionX += 1.5;
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (this.up.isDown /*&& player.body.touching.down*/) {
        player.setVelocityY(-430);
        //SOUND OF THE PLAYER WHEN JUMP
        SoundJumpPlayer1.play();

    }
    //START CODE AUDIO WHILE YOU MOVE
    if (this.right.isDown && player.body.touching.down) {

  
    }

    if (this.left.isDown && player.body.touching.down) {
      
    }
    //FINAL FROM CODE AUDIO WHILE YOU MOVE
   // this.background.tilePositionX -= 0.5;

    
   // TODO: MOVIMIENTO DE CAMARA CON FONDO
    this.background.tilePositionX = this.myCam.scrollX * .10;

}
/*
GolpePelota(player, BolasDeHierro) {
    this.physics.pause();
    GameText = this.add.text(250, 250, 'Game Over', {
        font: 'bold 48px Arial',
        fill: '#ff0000',

    });

    player.setTint(0xff0000);
    gameOver = true;
}*/
}