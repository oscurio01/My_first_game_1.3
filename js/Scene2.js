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
  
    this.contadorSalto = 0;
    //this function is for see the images and more on your game
    //START CODE FROM BACKGROUND

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background").setOrigin(0).setDepth(0).setScrollFactor(0);
    this.profundo = this.add.tileSprite(0, 0, config.width, config.height, "profundo").setOrigin(0).setDepth(-1).setScrollFactor(0);
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
    //Es la variable que enseña cuantos puntos tienes
    var Puntos = 0;
    let contenedor = this.add.container(0, 0);
    contenedor.fixedToCamera = true;
    let PuntosText = this.add.text(10, 10, 'Puntos: ' + Puntos , { fontSize: '30px', fill: '#0d91fc' });
    let Vidatext = this.add.text(10, 35, 'Vida: ' + Vida , { fontSize: '30px', fill: '#0d91fc' });

    contenedor.add([PuntosText, Vidatext]);

    /*contenedor.cameraOffset.x = 10; // Ubicamos el sprite contenedor de la cámara en las coordenadas 10, 10
    contenedor.cameraOffset.y = 10;
    */
    //we have 5 platforms the first is for the base and the others is for jump up

    var platforms = this.physics.add.staticGroup();

    var platforms2_move = this.physics.add.group();

    BolasDeHierro = this.physics.add.group();

    var piso = this.physics.add.staticGroup();

    piso.create(950,568, 'suelo').setSize(46,10);
    piso.create(380, 543, 'suelo_largo').setSize(864, 13);
    

    //borde del mapa en la izquierda
    platforms.create(-30, 145, 'plataforma_recta').setScale(2).refreshBody();
   var murodestruible = platforms.create(840, 145, 'plataforma_recta');
    murodestruible.setScale(2).refreshBody();
    /*
    Plataforma que se mueve
    */
    this.platform_move = platforms2_move.create(3000, 140, 'plataforma2_move').setImmovable(true);
    this.platform_move.body.setAllowGravity(false);

//TODO: Hacer que la primera parte y todo el suelo se transforme en la plataforma pequeña que tiene detalles y esta mejor que la linea verde.
  //  platforms.create(401, 568, 'plataforma').setScale(2).refreshBody();
    platforms.create(600, 420, 'plataforma');
    platforms.create(50, 330, 'plataforma');
    platforms.create(640, 260, 'plataforma');
    platforms.create(75, 150, 'plataforma');
    platforms.create(880, 140, 'plataforma');
    platforms.create(1280, 140, 'plataforma');

    //manera más limpia
    let timeline1 = this.tweens.timeline({
        targets: this.platform_move,
        ease: 'lineal',
        duration: 9000,
        loop: -1,
        yoyo:true,
        tweens: [
            { x: 1650, }, { x: 3000 },]});

    /*
    PARTE del "las profundidades, es la parte del juego donde caes hacia abajo y peleas en un lugar más oscuro"
    */
    platforms.create(1020, 5000, 'plataforma');
    platforms.create(830, 4800, 'plataforma_recta');

    //START CODE PLAYER
    var player = this.physics.add.sprite(100, 450, 'dude');

    player.setSize(20,30);
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);
    player.body.setGravityY(300);
    var disparo = this.physics.add.sprite(100, 450, 'disparo').setImmovable(true);
    disparo.body.setAllowGravity(false);
    disparo.setSize(25, 15);

    var enemy = this.physics.add.group();
    var enemy = this.physics.add.sprite(2100, 100, 'enemy').setImmovable(true);
    var enemy2 = this.physics.add.sprite(200, 300, 'enemy').setImmovable(true);
    enemy2.setSize(20, 30);
    enemy2.setBounce(0.2);
    enemy2.setCollideWorldBounds(false);
    enemy2.body.setAllowGravity(false);

    enemy.setSize(20, 30);
    enemy.setBounce(0.2);
    enemy.setCollideWorldBounds(false);
    enemy.body.setAllowGravity(false);
    // create an animation for the player

    this.anims.create({
        key: 'fly',
        frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.enemy = enemy;
    enemy.play('fly', true);
    enemy2.play('fly', true);

    this.anims.create({
        key: 'vueladerecho',
        frames: this.anims.generateFrameNumbers("disparo", { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });

   this.anims.create({
        key: 'vuelaizquierda',
        frames: this.anims.generateFrameNumbers("disparo", { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    let disparoderecho = this.tweens.timeline({
        targets: disparo,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { x: 450, }, { x: 100, },]
    });

    let movenemy1 = this.tweens.timeline({
        targets: enemy,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { x: 1800,  }, { x: 2100 },]
    });


    this.physics.add.collider(player, piso);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, murodestruido);
    this.physics.add.collider(player, GolpePelota);
    this.physics.add.collider(player, this.platform_move);
    this.physics.add.collider(BolasDeHierro, platforms);
    this.physics.add.collider(BolasDeHierro, piso);
    this.physics.add.collider(player, enemy);
    this.physics.add.collider(player, enemy2);
    this.physics.add.collider(player, hitEnemy);



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

    var cursors = this.input.keyboard.createCursorKeys();
    //FOR MOVE THE PLAYER WITH W A D
    this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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

    this.emitter = emitter;



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
    this.emitter2 = emitter2;
    /*
      FINAL CODE WHERE THE STORM SNOW WORKS
    */
    /*
    THIS CODE IS MADE TO CREATE A CHARACTER
    THAT MOVES RANDOMLY AND MAKE IT MOVE
    */
    var x = (player.x < 300) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var bomb = BolasDeHierro.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setSize(28, 28);
    bomb.setCollideWorldBounds(false);
    bomb.setVelocity(Phaser.Math.Between(300, 100), 20);

    let SoundJumpPlayer1 = this.sound.add('Jump1Audio');
    SoundJumpPlayer1.volume = 0.5;
    /*
    FOR MAKE THE GAME STOP WHEN YOU TOUCH THE ENEMIE
    */
    var GolpePelota = function GolpePelota(player, bomb,){

       Vida -=1;
        Vidatext.text = "Vida: " + Vida;
      
       if(this.left){
           player.x += 50;
           bomb.x -= 100;   
       }else{
           player.x -= 50;
           bomb.x += 100;
       }
        
       console.log(Vida);
        
    }


    var murodestruido = function murodestruido(player,  murodestruible, ) {
        murodestruible.destroy();
        player.x -= 50;
        Vida -= 1;
        console.log('destruido');
        console.log(Vida);

    }


        this.physics.add.overlap(BolasDeHierro, player, GolpePelota, null, this);
    this.physics.add.collider(murodestruido, player, platforms, null, this);


        //TODO: CAMARA QUE SIGUE AL PERSONAJE
        this.myCam = this.cameras.main;
    //this.myCam.setBounds(0, 0, game.config.width * 100, game.config.height * 20);
    this.myCam.setBounds(0, 0, 21000, 5000);

    // making the camera follow the player
    this.myCam.startFollow(player, true, 0.1, 0.1);
    var hitEnemy = function hitprojectil(beam, enemy) {
        enemy.destroy();
        Puntos +=15;
        PuntosText.text = "Puntos: " + Puntos ;
    }
    this.bomb= bomb;
    this.murodestruido = murodestruido;
    this.disparo = disparo
    this.projectiles = this.add.group();
    this.physics.add.overlap(this.projectiles, enemy, hitEnemy, null, this);
    this.physics.add.overlap(this.projectiles, enemy2, hitEnemy, null, this);
    
  //  this.physics.add.overlap(enemy, this.hitprojectil, null, this);
}

    hitpared(player, murodestruible) {
        this.murodestruible.visible = false;
        this.murodestruible.exists = false;

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
var contadorSalto = this.contadorSalto;
   var dispar2 = this.disparo;
    var cursors = this.cursors;
    var player = this.player;
    var emitter = this.emitter;
    var emitter2 = this.emitter2;
    var bomb = this.bomb;
    var murodestruido = this.murodestruido;

    

    if (dispar2.x >= 450) {
        dispar2.play('vuelaizquierda', true);
    }

    if (dispar2.x <= 100) {
        dispar2.play('vueladerecho', true);
    }
 

    if (Vida <= 0) {
        this.gameOver = true;
        console.log('gola');
        this.physics.pause();


        GameText = this.add.text(250, 250, 'Game Over', {
            font: 'bold 48px Arial',
            fill: '#ff0000',

        });
        emitter.stop();
        emitter2.stop();
        player.setTint(0xff0000);

        bomb.destroy();
        
        
        

    }

    if(player.y == 4500){
        Vida = 0;
        console.log(Vida);
    }
    if (this.gameOver ==true && this.R.isDown) {
    

            this.scene.stop("playGame");
            this.scene.start("bootGame");
            console.log("reinicia");        


    }
    var platform_move = this.platform_move;
    this.playerax = player.x;


 /*if(player.body.touching.right && murodestruido.body.touching.left){
        this.contadorSalto = 0;
        murodestruible.destroy();
       
    }*/

    if (player.body.touching.down && platform_move.body.touching.up){
        //TODO: Hacer que el personaje se mueva con la plataforma cuando se ponga encima
        player.x = platform_move.x;

    }

    if(player.y > 2000){
        this.profundo.setDepth(0);
        this.background.setDepth(-1);

    }
    else if (player.y < 2000){
        this.profundo.setDepth(-1);
        this.background.setDepth(0);

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
    

    if (this.up.isDown && (player.body.touching.down || contadorSalto == 1)) {

        player.setVelocityY(-430);
        //SOUND OF THE PLAYER WHEN JUMP
        SoundJumpPlayer1.play();
        if (contadorSalto == 1) {
            contadorSalto = 2;
     };


    }

    if (this.up.isDown && (player.body.touching.right || contadorSalto == 1)) {

        player.setVelocityY(-430);
        //SOUND OF THE PLAYER WHEN JUMP
        SoundJumpPlayer1.play();
        if (contadorSalto == 1) {
            contadorSalto = 2;
        };


    }

    if (this.up.isDown && (player.body.touching.left || contadorSalto == 1)) {

        player.setVelocityY(-430);
        //SOUND OF THE PLAYER WHEN JUMP
        SoundJumpPlayer1.play();
        if (contadorSalto == 1) {
            contadorSalto = 2;
        };


    }
    
    
    if (this.enemy.x >= 2100) {
        this.enemy.flipX = false;
    }

    if (this.enemy.x <= 1800) {
        this.enemy.flipX = true;
    
    }

    if (player.body.touching.down) { // Si el jugador toca una plataforma el contador de saltos se setea en cero otra vez
        contadorSalto = 0;


    }
    //FINAL FROM CODE AUDIO WHILE YOU MOVE
   // this.background.tilePositionX -= 0.5;

   // TODO: MOVIMIENTO DE CAMARA CON FONDO
    this.background.tilePositionX = this.myCam.scrollX * .10;
    this.profundo.tilePositionX = this.myCam.scrollX * .10;

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        // 2.1 call a function to create a beam instance
        this.shootBeam();
        if(this.left.isDown){
            var beam = new disparo(this);
            beam.flipX = true;
            beam.body.velocity.x = -250;
        }else{
            var beam = new disparo(this);
            beam.flipX = false;
            beam.body.velocity.x = 250;
        }
     
    }
    for (var i = 0; i < this.projectiles.getChildren().length; i++) {
        var beam = this.projectiles.getChildren()[i];
        beam.update();
    }
}


    shootBeam() {
        // 4.2 add the beam to the croup
        var beam = new disparo(this);
    }

}
