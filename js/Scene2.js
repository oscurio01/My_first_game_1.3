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

    this.cameras.main.fadeIn(550);//Para el difuminado del principio

    this.myCam = this.cameras.main;
    //this.myCam.setBounds(0, 0, game.config.width * 100, game.config.height * 20);
    this.myCam.setBounds(0, 0, 21000, 5000);

    this.contadorSalto = 0;
    //this function is for see the images and more on your game
    //START CODE FROM BACKGROUND

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background").setOrigin(0).setDepth(-1).setScrollFactor(0);
    this.profundo = this.add.tileSprite(0, 0, config.width, config.height, "profundo").setOrigin(0).setDepth(-2).setScrollFactor(0);
    //FOR PUT MUSIC ON THE BACKGROUND
    let SoundBackground = this.sound.add('musica_fondo_audio', { loop: true });
    this.SoundBackground = SoundBackground;
    /*WITH THAT YOU CAN CHOICE IF YOU WANNA START DE SOUND OR STOPED
    FOR EXAMPLE
    SoundBackground.play(); FOR START THE SOUND
    SoundBackground.stop(); FOR STOP THE SOUND
    SoundBackground.pause(); FOR PAUSE THE SOUND
    SoundBackground.resume(); FOR CONTINUE THE SOUND */
    SoundBackground.play({volume:0.3});
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
    let PuntosText = this.add.text(10, 10, 'Puntos: ' + Puntos , { fontSize: '30px', fill: '#0d91fc' }).setScrollFactor(0).setDepth(1);
    let Vidatext = this.add.text(10, 35, 'Vida: ' + Vida , { fontSize: '30px', fill: '#0d91fc' }).setScrollFactor(0).setDepth(1);
    this.Vidatext = Vidatext;

    this.Puntos=Puntos;

    //contenedor.add([PuntosText, Vidatext]);

    /*contenedor.cameraOffset.x = 10; // Ubicamos el sprite contenedor de la cámara en las coordenadas 10, 10
    contenedor.cameraOffset.y = 10;
    */
    //we have 5 platforms the first is for the base and the others is for jump up

    var platforms = this.physics.add.staticGroup();

    var platforms2_move = this.physics.add.group();

    BolasDeHierro = this.physics.add.group();

    var piso = this.physics.add.staticGroup();

    var pisofalso = this.physics.add.staticGroup();

    var pinchos = this.physics.add.staticGroup();//usados al principio

    var pinchos2 = this.physics.add.staticGroup();//Usados mucho más tarde

     var pinchosfalso2 = this.physics.add.staticGroup();//Usados para hacer fake(falso) ilusiones.

     var pinchos_rectos = this.physics.add.group();

    piso.create(380, 543, 'suelo_largo').setSize(864, 13);//Suelo del juego
    piso.create(560, 250, 'suelo_medio').setSize(240, 13);
    piso.create(780, 250, 'suelo_medio').setSize(240, 13);
    piso.create(520, 410, 'suelo_medio').setSize(240, 13);
    piso.create(760, 410, 'suelo_medio').setSize(240, 13);
    piso.create(130, 330, 'suelo_medio').setSize(240, 13);
    piso.create(0, 330, 'suelo').setSize(48, 13);
    piso.create(-85, 140, 'suelo_medio').setSize(240, 13);
    piso.create(155, 140, 'suelo_medio').setSize(240, 13); 
    piso.create(130, 330, 'suelo_medio').setSize(240, 13);
    var teletransportador = platforms2_move.create(2930, 4792, 'teleport').setSize(30, 20).setScale(0.5);teletransportador.body.setAllowGravity(false);
    //despues de la plataforma movible
    var teletransportador = platforms2_move.create(200, 402, 'teleport').setSize(30, 20).setScale(0.5); teletransportador.body.setAllowGravity(false);
    piso.create(3400, 330, 'suelo_medio').setSize(240, 13);
    var pincho_horizontal1 = pinchos_rectos.create(300, 100, 'pinchosmini_vertical'); pincho_horizontal1.body.setAllowGravity(false); pincho_horizontal1.flipY = false;

                pinchos.create(1845, 555, 'pinchosmini');//Pinchos del Juego
                pinchos.create(1925, 555, 'pinchosmini');
    var pincho1=pinchos.create(2005, 555, 'pinchosmini');
    var pinchooescondido=pinchosfalso2.create(2085, 555, 'pinchosmini');
    piso.create(1925, 574, 'suelo_medio').setSize(240, 13).setDepth(-1);
    pisofalso.create(2055, 574, 'suelo_medio').setSize(240, 13).setDepth(-1);
    piso.create(2605, 574, 'suelo_largo').setSize(864, 13).setDepth(-1);
    var pincho2=pinchos.create(2525, 555, 'pinchosmini_extra_large');
    var pincho3=pinchos2.create(3325, 555, 'pinchosmini_extra_large');

    platforms.create(-35, 145, 'plataforma_recta').setScale(2).refreshBody();//borde del mapa en la izquierda

   var murodestruible = platforms.create(840, 145, 'plataforma_recta');//Muro que se destruye al conseguir matar al 1 boss o conseguir la llave
    murodestruible.setScale(2).refreshBody();
    this.murodestruible=murodestruible;
    /*
    Plataforma que se mueve
    */
    this.platform_move = platforms2_move.create(3000, 140, 'plataforma2_move').setImmovable(true).setFrictionX(1);
    this.platform_move.body.setAllowGravity(false);
    this.platform_move.setFrictionX(1);
    piso.create(980, 130, 'suelo_medio').setSize(240, 13);
    piso.create(1220, 130, 'suelo_medio').setSize(240, 13);
    piso.create(1364, 130, 'suelo').setSize(46, 13);
    piso.create(1410, 130, 'suelo').setSize(46, 13);
    piso.create(1456, 130, 'suelo').setSize(46, 13);

    let timeline1 = this.tweens.timeline({
        targets: this.platform_move,
        ease: 'lineal',
        duration: 9000,
        loop: -1,
        yoyo:true,
        tweens: [
            { x: 1650, }, { x: 3000 },]});

    let pincho_movimiento_recto1 = this.tweens.timeline({
        targets: pincho_horizontal1, ease: 'lineal', duration: 4000,
        loop: -1,
        tweens: [{ y: 450, }, { y: 100 },]});

    /*
    PARTE del "las profundidades, es la parte del juego donde caes hacia abajo y peleas en un lugar más oscuro"
    */
    piso.create(1020, 5000, 'plataforma');
    piso.create(2525, 4800, 'suelo_largo').setSize(864, 13).setDepth(-1);
    piso.create(2085, 4800, 'suelo_medio').setSize(240, 13);
    

    //START CODE PLAYER
    var player = this.physics.add.sprite(100, 450, 'dude');

    player.setSize(20,30);
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);
    player.body.setGravityY(300);

    //variable de enemigos
    var enemies = this.physics.add.group();//Grupo de enemigos

    var subEnemies = this.physics.add.group();//Grupo de enemigos

    var enemy = enemies.create(1800, 100, 'enemy').setImmovable(true);
    enemy.setSize(20, 30);
    enemy.setBounce(0.2);
    enemy.setCollideWorldBounds(false);
    enemy.body.setAllowGravity(false);

    var enemie1 = enemies.create(800,380,'enemy').setImmovable(true);//primer enemigo
    enemie1.setSize(20, 30);
    enemie1.setCollideWorldBounds(false);
    enemie1.body.setAllowGravity(false);

    var enemie2 = enemies.create(420,350,'enemy').setImmovable(true);
    enemie2.body.setAllowGravity(false);
    enemie2.setCollideWorldBounds(false);
    enemie2.setSize(20, 30);

    var enemie3 = enemies.create(2500, 100, 'enemy').setImmovable(true);
    enemie3.body.setAllowGravity(false);
    enemie3.setCollideWorldBounds(false);
    enemie3.setSize(20, 30);
  
    var enemy2 = enemies.create(50,300,'enemy').setImmovable(true);
    enemy2.setSize(20, 30);
    enemy2.setBounce(0.2);
    enemy2.setCollideWorldBounds(false);
    enemy2.body.setAllowGravity(false);

    /*TODO: Crear un sub enemigo en la parte secreta que cuando muera 
    te permita moverte a un teletransportador*/
    var SubEnemy1 = subEnemies.create(2800, 4700, 'enemy').setImmovable(true).setSize(25,30);
    SubEnemy1.setScale(3);
    SubEnemy1.setBounce(0.2);
    SubEnemy1.setCollideWorldBounds(false);
    SubEnemy1.body.setAllowGravity(false);


    // create an animation for the player

    this.anims.create({
        key: 'fly',
        frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.enemy = enemy;
    this.enemy2=enemy2;
    this.enemie1 = enemie1;
    this.enemie2 = enemie2;
    this.enemie3 = enemie3;
    enemy.play('fly', true);
    enemy2.play('fly', true);
    enemie1.play('fly', true);
    enemie2.play('fly', true);
    enemie3.play('fly', true);
    SubEnemy1.play('fly', true);
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

    this.anims.create({
        key: 'CogerDisparoSeMueve',
        frames: this.anims.generateFrameNumbers("CogerDisparo", { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });

    //Variable de la accion coger la bala
    var CogerDisparo = this.physics.add.sprite(50, 100, 'CogerDisparo');
    CogerDisparo.play('CogerDisparoSeMueve', true);
    CogerDisparo.setSize(20, 20);
    CogerDisparo.setBounce(0.2);
    CogerDisparo.setCollideWorldBounds(false);
    CogerDisparo.body.setAllowGravity(false);

    //variable de conseguir doble salto
    var CogerDobleSalto = this.physics.add.sprite(100, 400, 'objetoDobleSalto');
    CogerDobleSalto.setSize(20, 20);
    CogerDobleSalto.setBounce(0.2);
    CogerDobleSalto.setCollideWorldBounds(false);
    CogerDobleSalto.body.setAllowGravity(false);

//Inicio del movimiento de los enemigos
    let movenemy1 = this.tweens.timeline({
        targets: enemy,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { x: 2100, }, { x: 1800 },]
    });

    let movenemy2 = this.tweens.timeline({
        targets: enemy2,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { x: 300,  }, { x: 50 },]
    });

    let movenemy3 = this.tweens.timeline({
        targets: enemie1,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { x: 600, }, { x: 800 },]
    });

    let movenemy4 = this.tweens.timeline({
        targets: enemie2,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { x: 600, }, { x: 420 },]
    });

    let movenemy5 = this.tweens.timeline({
        targets: enemie3,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { x: 3000, }, { x: 2500 },]
    });
//Final del movimiento de los enemigos

/*Para el ligero movimiento de los objetos*/
    let moveobjDoubleJump = this.tweens.timeline({
        targets: CogerDobleSalto,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { y: CogerDobleSalto.y - 12, }, { y: CogerDobleSalto.y+1 },]
    });

    let moveobjShoot= this.tweens.timeline({
        targets: CogerDisparo,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { y: CogerDisparo.y - 12, }, { y: CogerDisparo.y + 1 },]
    });
/*Final de los ligeros movimientos de los objetos */

var platforms1 = this.physics.add.group({
    key: 'plataforma',
    frameQuantity: 1,
    setXY: { x: 400, y: 150},
    velocityX: 60,
    duration: 2000,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true,
    immovable: true,
    gravityY:-300,
});

platforms1.getChildren()[0].setFrictionX(1);



    this.physics.add.collider(player, piso);
    this.physics.add.collider(player, platforms);this.physics.add.collider(player, platforms1);
    this.physics.add.collider(player, this.platform_move);
    this.physics.add.collider(player, RecogerDisparo);
   // this.physics.add.collider(player, MurosParaSubEnemie);
    this.physics.add.collider(player, GolpeDePinchoVertical);
    this.physics.add.collider(player, GolpePelota);
    this.physics.add.collider(player, hitEnemy);
    this.physics.add.collider(player, GolpePincho1);
    this.physics.add.collider(player, GolpePincho2);
    this.physics.add.collider(player, hitEnemy);
    this.physics.add.collider(player, Pelotarecibedisparo);
    this.physics.add.collider(BolasDeHierro, platforms);
    this.physics.add.collider(BolasDeHierro, piso);
    
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


    this.anims.create({
        key: 'turnConDobleSalto',
        frames: [{ key: 'dudeWithDoubleJump', frame: 2 }],
        frameRate: 20
    });

    //You can see the player animated to move on the right(derecha)
    this.anims.create({
        key: 'rightConDobleSalto',
        frames: this.anims.generateFrameNumbers('dudeWithDoubleJump', { start: 2, end: 3 }),
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
    //bomb.setCircle(18);
    bomb.setCollideWorldBounds(false);
    bomb.setVelocity(Phaser.Math.Between(300, 100), 20);

    /*
    FOR MAKE THE GAME STOP WHEN YOU TOUCH THE ENEMIE
    */
   // making the camera follow the player
   this.myCam.startFollow(player, true, 0.1, 0.1);
//   PuntosText.fixedToCamera = true;
   //Vidatext.fixedToCamera = true;

    var GolpePelota = function GolpePelota(player, bomb,){
       Vida -=1;
       Vidatext.text = "Vida: " + Vida;
        player.setVelocityY(-220);
       if(this.left){player.x += 50;bomb.x -= 100;}else{player.x -= 50;bomb.x += 100;}
       console.log(Vida);
    }

    var Golpeaenemigo = function Golpeaenemigo(player, enemies ) {
        Vida -= 1;
        player.setVelocityY(-220);
        Vidatext.text = "Vida: " + Vida;

        if (this.left) { player.x += 50; } else { player.x -= 50; }
        console.log(Vida);
    }

    var GolpeaSubEnemigo = function GolpeaSubEnemigo(player, subEnemies) {
        Vida -= 1;
        player.setVelocityY(-220);
        Vidatext.text = "Vida: " + Vida;

        player.x -= 100;
        console.log(Vida);
    }
//primera escena donde hay pinchos
    var GolpePincho1 = function GolpePincho1(player, pinchos) {
        Vida -= 1;
        Vidatext.text = "Vida: " + Vida;
        player.setVelocityY(-220);
        console.log(Vida);
        if(player.x >= 1765||player.x == 2000){
            player.x = 1450;
            player.y = 100;
        } 
        console.log('pinchado');
    }
//segunda escena lejana donde hay pinchos
    var GolpePincho2 = function GolpePincho2(player, pinchos2) {
        Vida -= 1;
        Vidatext.text = "Vida: " + Vida;
        player.setVelocityY(-220);
        console.log(Vida);
        if (player.x >= 3000 || player.x == 5000) {
            player.x = 3300;
            player.y = 240;
        }
        console.log('pinchado2');
    }
    var GolpeDePinchoVertical = function GolpeDePinchoVertical(pincho_horizontal1, player) {
        Vida -= 1;
        Vidatext.text = "Vida: " + Vida;
        if (this.left) { player.x += 60; }  if (this.right){ player.x -= 120;console.log('esta') }
        console.log(Vida);
        console.log('pinchahorizontal');
    }
    
   
    var RecogerDisparo = function RecogerDisparo(CogerDisparo, player) {
        
        CogerDisparo.destroy();
        BalaConseguida =true;
        alert('Balas adquiridas');
        console.log('Balas adquiridas');
    }

    var RecogerDoblesalto = function RecogerDoblesalto(CogerDobleSalto, player) {

        CogerDobleSalto.destroy();
        doblesalto = true;
        alert('Doble salto adquirido');
        console.log('Doble salto adquirido');
    }

    var activarteletranstporte = function activarteletranstporte(teletransportador, player) {

        player.x=2500;player.y=4500;
        
        console.log('Teletransportado');
    }
    

    var hitEnemy = function hitprojectil(beam, enemy) {
        enemy.destroy();
        beam.destroy();
        Puntos +=15;
        PuntosText.text = "Puntos: " + Puntos ;
    }
    var hitSubEnemy = function hitprojectil(beam, subEnemy) {
        VidasubEnemie -=1
        beam.destroy();
        Puntos += 15;
        PuntosText.text = "Puntos: " + Puntos;
        Vida +=3;
        console.log(VidasubEnemie);
    }
    var Pelotarecibedisparo = function Pelotarecibedisparo(beam, bomb, ) {
        bomb.setTint(0xff0000);
        beam.destroy();
        Puntos += 15;
        Vidabola -=1;
        PuntosText.text = "Puntos: " + Puntos;
        console.log(Vidabola);
    
    }
    var coliderbeam = function coliderbeam(beam, platforms, MurosParaSubEnemie) {
        beam.destroy();
        console.log('destruida');

    }

  
    
    this.bomb= bomb;
    this.disparo = disparo
    this.physics.add.overlap(CogerDisparo, player, RecogerDisparo, null, this);
    this.physics.add.overlap(teletransportador, player, activarteletranstporte, null, this);
    this.physics.add.overlap(pincho_horizontal1, player, GolpeDePinchoVertical, null, this);
    this.physics.add.overlap(CogerDobleSalto, player, RecogerDoblesalto, null, this);
    this.physics.add.overlap(pinchos, player, GolpePincho1, null, this);
    this.physics.add.overlap(pinchos2, player, GolpePincho2, null, this);
    this.physics.add.overlap(enemies, player, Golpeaenemigo, null, this);
    this.physics.add.overlap(BolasDeHierro, player, GolpePelota, null, this);
    this.physics.add.overlap(subEnemies, player, GolpeaSubEnemigo, null, this);
    
    this.projectiles = this.add.group();
    this.physics.add.overlap(this.projectiles, BolasDeHierro, Pelotarecibedisparo, null, this);
    this.physics.add.overlap(this.projectiles, platforms, coliderbeam, null, this);
    this.physics.add.overlap(this.projectiles, enemy, hitEnemy, null, this);
    this.physics.add.overlap(this.projectiles, null, this);
    this.physics.add.overlap(this.projectiles, enemies, hitEnemy, null, this);
    this.physics.add.overlap(this.projectiles, subEnemies, hitSubEnemy, null, this);

    this.platforms1=platforms1;
  //  this.physics.add.overlap(enemy, this.hitprojectil, null, this);
}
salta(){
        if(this.contadorSalto <2){
            this.player.setVelocityY(-425);
            this.contadorSalto++;
            console.log('contadorsalta',this.contadorSalto);
        }
    

}

MurosParaSubEnemie(){
    var MurosParaSubEnemie = this.physics.add.staticGroup();
    var MurosParaSubEnemie1 = MurosParaSubEnemie.create(2870, 4595, 'plataforma_recta');
    var MurosParaSubEnemie2 = MurosParaSubEnemie.create(2100, 4595, 'plataforma_recta');
    var MurosParaSubEnemie3 = MurosParaSubEnemie.create(2500, 4370, 'plataforma').setScale(2).refreshBody();

    var coliderbeam2 = function coliderbeam2(beam, platforms, MurosParaSubEnemie) {
        beam.destroy();
        console.log('destruida');

    }
    this.physics.add.collider(this.player, MurosParaSubEnemie);
    this.physics.add.overlap(this.projectiles, MurosParaSubEnemie, coliderbeam2, null, this);
   
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
    let SoundBeam = this.sound.add('MovePlayer1_audio');
   let SoundBackground = this.SoundBackground;

var contadorSalto = this.contadorSalto;


    var cursors = this.cursors;
    var player = this.player;
    var emitter = this.emitter;
    var emitter2 = this.emitter2;
    var bomb = this.bomb;
    var murodestruible = this.murodestruible;
  //  var BalaConseguida = this.BalaConseguida;
   var Puntos = this.Puntos;
    if (Phaser.Input.Keyboard.JustDown(this.T)) {
        console.log('la x del jugador es ' + player.x)
        console.log('la y del jugador es ' + player.y)
    }

   // if(this.platforms1.getChildren()[0].x >= 2000){this.platforms1.getChildren()[0].x.setVelocityX(-70);}

    if (player.x >= 2400 && this.player.y >= 4600) {
        this.MurosParaSubEnemie();

    }




/*TODO:hacer que la bala desaparezca cuando se salga de pantalla*/ 
    if (beam > this.myCam.width) {
        beam.destroy();
        console.log('bala desaparecida')
    }
    if (Vidabola <= 0) {
        bomb.destroy();
    }

    if (Vidabola <= 0) {
        murodestruible.destroy();
    }
//Cambios de tamaño a medida del cambio de vida
    if(Vida == 10){
        player.setScale(1);
    }

    if (Vida == 9) {
        player.setScale(0.9);
    }
    if (Vida == 8) {
        player.setScale(0.8);
    }

//Fin del cambio de tamaño
    if (Vida <= 0) {//cuando tengas 0 vidas
        this.gameOver = true;
        
        this.physics.pause();


        GameText = this.add.text(250, 250, 'Game Over', {
            font: 'bold 48px Arial',
            fill: '#ff0000',

        });
        GameText.setPosition(player.x-100, player.y -120);

        emitter.stop();
        emitter2.stop();
        player.setTint(0xff0000);

        bomb.destroy();
        if (time > lastFired){
            lastFired = time + 1000;
      console.log('zawardo');
        }

    }

    if(player.y >= 5000){//cuando el jugador llegue más abajo que la camara en 5000
        Vida=0;
        console.log(Vida);
    }
    if (this.gameOver ==true && this.R.isDown) {
    
            SoundBackground.stop();
            this.R.reset();
            this.scene.stop("playGame");
            this.scene.start("bootGame");
            console.log("reinicia");
            doblesalto = false;
            Vidabola = 5;
            BalaConseguida = false;
            this.gameOver=false;
        

    }
    var platform_move = this.platform_move;
    this.playerax = player.x;


   /* if (player.body.touching.down && platform_move.body.touching.up){
        //TODO: Hacer que el personaje se mueva con la plataforma cuando se ponga encima(mediohecho pero aun no.)
        player.x += 2.5;
        if (player.x >= 3000)
        {
            player.x -=2.5;
        }
       
    }*/

    if(player.y > 2000){
        this.profundo.setDepth(-1);
        this.background.setDepth(-2);
    }
    else if (player.y < 2000){
        this.profundo.setDepth(-2);
        this.background.setDepth(-1);

    }
    //El rastro que deja el personaje al moverse
    var partticulamovimiento1 = this.add.particles('porprobar'); partticulamovimiento1.setDepth(-1);
    var emittermovimiento1 = partticulamovimiento1.createEmitter({x:-100,y: 150,angle: { min: 240, max: 180 },
    speed: 400,lifespan: 50,scale: { start: 0.5, end: 1 },blendMode: 'ADD',on: false,});
    emittermovimiento1.setPosition(player.x-17, player.y+12);  

    var partticulamovimiento2 = this.add.particles('porprobar'); partticulamovimiento2.setDepth(-1);
    var emittermovimiento2 = partticulamovimiento2.createEmitter({x: 100,y: 450, angle: { min: 300, max: 360 },
        speed: 400, lifespan: 50, scale: { start: 0.5, end: 1 }, blendMode: 'ADD', on: false,});
    emittermovimiento2.setPosition(player.x - 17, player.y + 12);  
    //La accion que se ejecuta cuando el personaje se mueve a la izquierda
    if (this.left.isDown) {
        player.setVelocityX(-160);
        if (doblesalto == false) {
        player.flipX = true;
        player.anims.play('right', true);}

        if (doblesalto == true){
            player.flipX = true;
            player.anims.play('rightConDobleSalto', true);}

        if(player.body.touching.down){
            emittermovimiento2.setPosition(player.x + 21, player.y + 12);  
            emittermovimiento2.emitParticle(6);}

        //this.background.tilePositionX -= 1.5;
    }
    else if (this.right.isDown) {//La accion que se ejecuta cuando el personaje se mueve a la derecha
        player.setVelocityX(160);
        if (doblesalto == false){
            player.flipX = false;
            player.anims.play('right', true);}
        else if (doblesalto == true) {
            player.flipX = false;
            player.anims.play('rightConDobleSalto', true);
        }
        if (player.body.touching.down) {emittermovimiento1.emitParticle(6);}
        //this.background.tilePositionX += 1.5;
    }
    else {//La accion que se ejecuta cuando el personaje se queda quieto
        player.setVelocityX(0);
        
        if (doblesalto == false) {
            //player.flipX = false;
            player.anims.play('turn');}

        if (doblesalto == true) {
            //player.flipX = false;
            player.anims.play('turnConDobleSalto', true);
        }
    }
    // Si el jugador toca una plataforma el contador de saltos se resetea en cero otra vez
    if (this.player.body.touching.down) { 
        this.contadorSalto = 0;
        console.log('contadorsalta1', this.contadorSalto);
    }

    if(doblesalto ==true){
        if (Phaser.Input.Keyboard.JustDown(this.up)) {
            this.salta();
        }}

    if (this.up.isDown &&(player.body.touching.down|| this.contadorSalto == 0)) {
        player.setVelocityY(-425);
        //SOUND OF THE PLAYER WHEN JUMP
        SoundJumpPlayer1.play({ volume: 0.2 });      
    }
    /* TODO:Intentar que ademas de que baje lento en paredes pueda saltar otra vez desde la pared(hecho)*/
    if (player.body.touching.right) {
        this.player.setVelocityY(20);
        this.contadorSalto = 0;
        console.log('ese =', this.contadorSalto);
    }
    if (player.body.touching.left) {
        this.player.setVelocityY(20);
        this.contadorSalto = 0;
        console.log('ese =', this.contadorSalto);
    }

    if (player.velocity < 0) {//Parar el emiter cuando te detengas
        emittermovimiento1.setPosition(emittermovimiento1.x.propertyValue += (player.flipX) ? 16 : -16, emittermovimiento1.y.propertyValue);
        emittermovimiento1.setSpeed(player.x / 2); 
    }
    else if (player.velocity > 0) {
        emittermovimiento1.setPosition(emittermovimiento1.x.propertyValue += (player.flipX) ? 16 : -16, emittermovimiento1.y.propertyValue);
        emittermovimiento1.setSpeed(player.x / 2);    
    }
    
    
    
    if (this.enemy.x >= 2100) {this.enemy.flipX = false;}
    if (this.enemy.x <= 1800) {this.enemy.flipX = true;}
    if (this.enemy2.x <= 50) {this.enemy2.flipX = true;}
    if(this.enemy2.x >= 300){this.enemy2.flipX = false;}
    if (this.enemie1.x <= 600) { this.enemie1.flipX = true; }
    if (this.enemie1.x >= 800) { this.enemie1.flipX = false; }
    if (this.enemie2.x <= 420) { this.enemie2.flipX = true; }
    if (this.enemie2.x >= 600) { this.enemie2.flipX = false; }
    if (this.enemie3.x <= 2500) { this.enemie3.flipX = true; }
    if (this.enemie3.x >= 3000) { this.enemie3.flipX = false; }


    //FINAL FROM CODE AUDIO WHILE YOU MOVE
   // this.background.tilePositionX -= 0.5;

   // TODO: MOVIMIENTO DE CAMARA CON FONDO(Hecho)
    this.background.tilePositionX = this.myCam.scrollX * .10;
    this.profundo.tilePositionX = this.myCam.scrollX * .10;

    if (Phaser.Input.Keyboard.JustDown(this.spacebar) &&BalaConseguida == true && time > lastFired) {
        /*TODO:cambiar esto por "false" y crear un
    objeto que al tocarlo permita volverlo "true"(Hecho)    */
        // call a function to create a beam instance
        /*  var o[0,1]
            0 =positionderecha ==true, positionizquierda ==false;
            1 = positionizquierda==true, positionderecha == false;*/
        SoundBeam.play({ volume: 0.4 });
        var beam = new disparo(this);
        player.flipX=false;
        if(beam){
            lastFired = time + 500;
        }
        if(this.left.isDown){
            beam.flipX = true;
            beam.body.velocity.x = -250;
        }
    }
    for (var i = 0; i < this.projectiles.getChildren().length; i++) {
        var beam = this.projectiles.getChildren()[i];
        beam.update();}

}
//Final del Update
}
