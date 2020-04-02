class GameEnd extends Phaser.Scene {
    constructor() {
        super("EndGame");
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

    this.cameras.main.fadeIn(550);//Para el difuminado del principio

    this.profundo = this.add.tileSprite(0, 0, config.width, config.height, "profundo").setOrigin(0).setDepth(-2).setScrollFactor(0);
    //FOR PUT MUSIC ON THE BACKGROUND
    let SoundBackground2 = this.sound.add('GameEndSong', { loop: true });
    this.SoundBackground2 = SoundBackground2;
    /*WITH THAT YOU CAN CHOICE IF YOU WANNA START DE SOUND OR STOPED
    FOR EXAMPLE
    SoundBackground2.play(); FOR START THE SOUND
    SoundBackground2.stop(); FOR STOP THE SOUND
    SoundBackground2.pause(); FOR PAUSE THE SOUND
    SoundBackground2.resume(); FOR CONTINUE THE SOUND */
    SoundBackground2.play({volume:.2});


    var platforms = this.physics.add.staticGroup();

    var locked = this.physics.add.group({ allowGravity: false, immovable: true });

    var piso = this.physics.add.staticGroup();
    piso.create(380, 543, 'suelo_largo').setSize(864, 13);//Suelo del juego

    piso.create(120, 400, 'suelo_medio').setSize(240, 13);

    piso.create(680, 400, 'suelo_medio').setSize(240, 13);

    piso.create(390, 200, 'suelo_medio').setSize(240, 13);

    var MotherPinkDog = locked.create(390, 170, 'MotherLocked');

    this.tweens.timeline({
        loop:-1,
        targets: MotherPinkDog, ease: 'lineal', duration: 2000,
        tweens: [{ y: MotherPinkDog.y - 150, }, { y: MotherPinkDog.y +1, }]
    });

    //START CODE PLAYER
    var player = this.physics.add.sprite(100, 450, 'dude');

    player.setSize(20,30);
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);
    player.body.setGravityY(300);

    this.physics.add.collider(player, piso); 
    this.physics.add.collider(player, platforms);

   this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 2 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'turnMother',
        frames: [{ key: 'MotherWoofFree', frame: 2 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'rightMother',
        frames: this.anims.generateFrameNumbers('MotherWoofFree', { start: 2, end: 3 }),
        frameRate: 5,
        repeat: -1
    });


    //You can see the player animated to move on the right(derecha)
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

   var cursors = this.input.keyboard.createCursorKeys();
    //FOR MOVE THE PLAYER WITH W A D
    this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.T = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

    this.player = player;

    var DestruirPrision = function DestruirPrision(MotherPinkDog, player) {
        MotherPinkDog.destroy();
        this.MotherPinkDog2 = locked.create(420, 160, 'MotherWoofFree');
        this.MotherPinkDog2.flipX=true;
        this.MotherPinkDog2.setScale(1.7);
        this.cameras.main.shake(500);
        this.MotherPinkDog2.anims.play('rightMother');
        if(player.body.touching.down){
        this.physics.pause();}
        var GameEndText = this.add.text(230, 250, 'Congratulations', {
            font: 'bold 48px Arial',
            fill: '#ff00ff',
        });
        var GameEndText2 = this.add.text(230, 320, 'You safe the MOTHER', {
            font: 'bold 48px Arial',
            fill: '#ff00ff',
        });
    } 

    this.physics.add.overlap(MotherPinkDog, player, DestruirPrision, null, this);

    //FINAL FROM CREATE PLAYER

    /*
      THE START STORM snowFLAKES :D
    */
    var particles = this.add.particles('snowflakes');
    var emitter = particles.createEmitter({
        //POSITION FROM THE SNOW
        x: { min: -100, max: 800 },
        y: 0,
        lifespan: 1300,
        speedY: { min: 200, max: 400 },
        gravityY: 100,
        gravityX: Phaser.Math.Between(-100, -100),
        scale: { start: 0.2, end: 0.6 },
        quantity: 1,
        blendMode: 'ADD'
    }).setScrollFactor(0);

    this.emitter = emitter;

    /*
      FINAL CODE WHERE THE STORM SNOW WORKS
    */

}//Final del create
salta(){
    let SoundJumpPlayer1 = this.sound.add('Jump1Audio');
        if(this.contadorSalto <2){
            this.player.setVelocityY(-425);
            this.contadorSalto++;
            console.log('contadorsalta',this.contadorSalto);
            SoundJumpPlayer1.play({ volume: 0.2 });}

        if(this.player.body.touching.right){
            SoundJumpPlayer1.stop();}    
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
    var cursors = this.cursors;
    var player = this.player;
    var piso=this.piso;
    var doblesalto = true;
    var Puntos = this.Puntos;
  // Si el jugador toca una plataforma el contador de saltos se resetea en cero otra vez
    if (this.player.body.touching.down) { 
        this.contadorSalto = 0;
    }

    if(doblesalto ==true){
        if (Phaser.Input.Keyboard.JustDown(this.up)) {
            this.salta();
        }}

    if (Phaser.Input.Keyboard.JustDown(this.up) &&(player.body.touching.down|| this.contadorSalto == 0)) {
        player.setVelocityY(-425);
        //SOUND OF THE PLAYER WHEN JUMP
        SoundJumpPlayer1.play({ volume: 0.2 });      
    }

    if (this.left.isDown) {   //La accion que se ejecuta cuando el personaje se mueve a la izquierda
        player.setVelocityX(-160);
            player.flipX = true;
            player.anims.play('right', true);

    }
    else if (this.right.isDown) {//La accion que se ejecuta cuando el personaje se mueve a la derecha
        player.setVelocityX(160);
            player.flipX = false;
            player.anims.play('right', true);
    }
    else {//La accion que se ejecuta cuando el personaje se queda quieto
           player.setVelocityX(0);
            player.anims.play('turn');
    }
    
    
}
//Final del Update
}
