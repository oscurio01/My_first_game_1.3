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
    //this.myCam.setDeadzone(200,100);
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
    SoundBackground.stop({volume:0.3});
    let SoundProfundo = this.sound.add('impacto_violin_audio');
    SoundProfundo.stop({volume: 0});
    this.SoundProfundo = SoundProfundo;
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
    let VidasubEnemie1text = this.add.text(2200, 4500, 'Vida: ' + VidasubEnemie1, { fontSize: '30px', fill: '#0d91fc' }).setDepth(1);
    this.VidasubEnemie1text = VidasubEnemie1text;
    this.Puntos=Puntos;

    //contenedor.add([PuntosText, Vidatext]);

    /*contenedor.cameraOffset.x = 10; // Ubicamos el sprite contenedor de la cámara en las coordenadas 10, 10
    contenedor.cameraOffset.y = 10;
    */
    //we have 5 platforms the first is for the base and the others is for jump up

    var platforms = this.physics.add.staticGroup();

    var platforms2_move = this.physics.add.group({ allowGravity: false,immovable:true});

    BolasDeHierro = this.physics.add.group();

    var piso = this.physics.add.staticGroup();

    var pisofalso = this.physics.add.staticGroup();

    var pinchos = this.physics.add.staticGroup();//usados al principio

    var pinchos2 = this.physics.add.staticGroup();//Usados mucho más tarde

     var pinchosfalso2 = this.physics.add.staticGroup();//Usados para hacer fake(falso) ilusiones.

    var pinchos_rectos = this.physics.add.group({ allowGravity: false, flipY: false, immovable: true});

    var MurosParaSubEnemie = this.physics.add.staticGroup();

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
    piso.create(1925, 574, 'suelo_medio').setSize(240, 13).setDepth(-1);
    pisofalso.create(2055, 574, 'suelo_medio').setSize(240, 13).setDepth(-1);
    piso.create(2605, 574, 'suelo_largo').setSize(864, 13).setDepth(-1);
    piso.create(3400, 330, 'suelo_medio').setSize(240, 13);
    piso.create(3700, 250, 'suelo_medio').setSize(240, 13);
    piso.create(3930, 250, 'suelo_medio').setSize(240, 13);
    piso.create(4300, 400, 'suelo_medio').setSize(240, 13);
    piso.create(4505, 504, 'suelo_largo').setSize(864, 13);

    var teletransportador = platforms2_move.create(2930, 4792, 'teleport').setSize(30, 20).setScale(0.5);
    //despues de la plataforma movible
    var teletransportador1 = platforms2_move.create(200, 402, 'teleport').setSize(30, 20).setScale(0.5);
    
    var pincho_horizontal1 = pinchos_rectos.create(300, 100, 'pinchosmini_vertical');//pinchos del inicio
                pinchos.create(1845, 555, 'pinchosmini');//Pinchos del Juego
                pinchos.create(1925, 555, 'pinchosmini');
    var pincho1=pinchos.create(2005, 555, 'pinchosmini');
    var pinchooescondido=pinchosfalso2.create(2085, 555, 'pinchosmini');
    var pincho2=pinchos.create(2525, 555, 'pinchosmini_extra_large');
    var pincho3=pinchos2.create(3325, 555, 'pinchosmini_extra_large');
    var pincho3 = pinchos2.create(4125, 555, 'pinchosmini_extra_large');

    platforms.create(-35, 145, 'plataforma_recta').setScale(2).refreshBody();//borde del mapa en la izquierda

   var murodestruible = platforms.create(840, 145, 'plataforma_recta');//Muro que se destruye al conseguir matar al 1 boss o conseguir la llave
    murodestruible.setScale(2).refreshBody();
    this.murodestruible=murodestruible;
    /*
    Plataforma que se mueve
    */
    var platform_move = platforms2_move.create(1650, 140, 'plataforma2_move').setFrictionX(1);
    this.platform_move = platform_move;
    piso.create(980, 130, 'suelo_medio').setSize(240, 13);
    piso.create(1220, 130, 'suelo_medio').setSize(240, 13);
    piso.create(1364, 130, 'suelo').setSize(46, 13);
    piso.create(1410, 130, 'suelo').setSize(46, 13);
    piso.create(1456, 130, 'suelo').setSize(46, 13);

    this.tweens.timeline({
        targets: platform_move.body.velocity,
        loop: -1,
        tweens: [
            { x: 0, y: 0, duration: 1000, ease: 'Stepped' },
            { x: 200, y: 0, duration: 2200, ease: 'Stepped' },
            { x: 200, y: 0, duration: 2200, ease: 'Stepped' },
            { x: 200, y: 0, duration: 2200, ease: 'Stepped' },
            { x: 0, y: 0, duration: 1000, ease: 'Stepped' },
            { x: -200, y: 0, duration: 2200, ease: 'Stepped' },
            { x: -200, y: 0, duration: 2200, ease: 'Stepped' },
            { x: -200, y: 0, duration: 2200, ease: 'Stepped' },
        ]
        });

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

    var SubEnemy1 = subEnemies.create(2800, 4760, 'enemy').setImmovable(true).setSize(25,30);
    SubEnemy1.setScale(2);
    SubEnemy1.setBounce(0.2);
    SubEnemy1.setCollideWorldBounds(false);
    SubEnemy1.body.setAllowGravity(false);
this.SubEnemy1=SubEnemy1;

var MurosParaSubEnemie2 = MurosParaSubEnemie.create(2870, 4595, 'plataforma_recta');this.MurosParaSubEnemie2=MurosParaSubEnemie2;

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
        key: 'ObjectDisparoSeMueve',
        frames: this.anims.generateFrameNumbers("ObjectDisparo", { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });

    //Variable de la accion coger la bala
    var ObjectDisparo = this.physics.add.sprite(50, 100, 'ObjectDisparo');
    ObjectDisparo.play('ObjectDisparoSeMueve', true);
    ObjectDisparo.setSize(20, 20);
    ObjectDisparo.setBounce(0.2);
    ObjectDisparo.setCollideWorldBounds(false);
    ObjectDisparo.body.setAllowGravity(false);

    //variable de conseguir doble salto
    var CogerDobleSalto = this.physics.add.sprite(100, 400, 'objetoDobleSalto');
    CogerDobleSalto.setSize(20, 20);
    CogerDobleSalto.setBounce(0.2);
    CogerDobleSalto.setCollideWorldBounds(false);
    CogerDobleSalto.body.setAllowGravity(false);

    //variable de conseguir doble salto
    var CogerDash = this.physics.add.sprite(400, 400, 'objetoDash');
    CogerDash.setSize(60, 20);
    CogerDash.setBounce(0.2);
    CogerDash.setCollideWorldBounds(false);
    CogerDash.body.setAllowGravity(false);

    this.Dash =  this.add.image(50, 550, 'Dash').setDepth(1).setScrollFactor(0);

    

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
            { x: enemy2.x+200,  }, { x: enemy2.x-5 },]
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

    let movesubenemy1 = this.tweens.timeline({
        targets: SubEnemy1,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { y: SubEnemy1.y -150, }, { y: SubEnemy1.y+1 },]
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
    
    this.tweens.timeline({
        targets: CogerDash,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { y: CogerDash.y - 12, }, { y: CogerDash.y+1 },]
    });

    let moveobjShoot= this.tweens.timeline({
        targets: ObjectDisparo,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { y: ObjectDisparo.y - 12, }, { y: ObjectDisparo.y + 1 },]
    });
/*Final de los ligeros movimientos de los objetos */



    this.physics.add.collider(player, piso);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(platform_move,player);
    this.physics.add.collider(player, RecogerDisparo);
    this.physics.add.collider(player, GolpeDePinchoVertical);
    this.physics.add.collider(player, GolpePelota);
    this.physics.add.collider(player, hitEnemy);
    this.physics.add.collider(player, GolpePincho1);
    this.physics.add.collider(player, GolpePincho2);
    this.physics.add.collider(player, hitEnemy);
    this.physics.add.collider(player, Pelotarecibedisparo);
    this.physics.add.collider(player, MurosParaSubEnemie);
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
    this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

    this.player = player;

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

    var balasdeSubenemie = this.physics.add.group({
        classType: balaSubenemie,
        maxSize: 200,
        runChildUpdate: true
    });
 

    this.balasdeSubenemie=balasdeSubenemie;

   // making the camera follow the player
   this.myCam.startFollow(player, true, 0.1, 0.1);

    var GolpePelota = function GolpePelota(player, bomb,){
       Vida -= 1;
       Vidatext.text = "Vida: " + Vida;
        player.setVelocityY(-220);
       if(this.left){player.x += 50;bomb.x -= 100;}else{player.x -= 50;bomb.x += 100;}
        player.setAlpha(0);
        let tw1 = this.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }

    var Golpeaenemigo = function Golpeaenemigo(player, enemies ) {
        Vida -= 1;
        player.setVelocityY(-220);
        Vidatext.text = "Vida: " + Vida;

        if (this.left) { player.x += 50; } else { player.x -= 50; }
        player.setAlpha(0);
        let tw2 = this.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }

    var GolpeaSubEnemigo = function GolpeaSubEnemigo(player, subEnemies) {
        Vida -= 1;
        player.setVelocityY(-220);
        Vidatext.text = "Vida: " + Vida;
        player.x -= 200;
        player.setAlpha(0);
        let tw3 = this.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }

    var GolpeaDisparoDeSubEnemigo = function GolpeaDisparoDeSubEnemigo(player,balasubenemie) {
        Vida -= 1;
        balasubenemie.destroy();
        player.setVelocityY(-220);
        Vidatext.text = "Vida: " + Vida;
        player.x -= 200;
        player.setAlpha(0);
        let tw3 = this.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }
//primera escena donde hay pinchos
    var GolpePincho1 = function GolpePincho1(player, pinchos) {
        Vida -= 1;
        Vidatext.text = "Vida: " + Vida;
        player.setVelocityY(-220);
        if(player.x >= 1765||player.x == 2000){
            player.x = 1450;
            player.y = 100;
        } 
        console.log('pinchado');
        player.setAlpha(0);
        let tw4 = this.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }
//segunda escena lejana donde hay pinchos
    var GolpePincho2 = function GolpePincho2(player, pinchos2) {
        Vida -= 1;
        Vidatext.text = "Vida: " + Vida;
        player.setVelocityY(-220);
        if (player.x >= 3000 || player.x == 5000) {
            
            player.y = player.y -=300;
        }
        console.log('pinchado2');
        player.setAlpha(0);
        let tw5 = this.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }

    var GolpeDePinchoVertical = function GolpeDePinchoVertical(pincho_horizontal1, player) {
        Vida -= 1;
        Vidatext.text = "Vida: " + Vida;
        if (this.left) { player.x += 120; } else if (this.right){ player.x -= 120;console.log('esta') }else{player.x += 120;}
        console.log('pinchahorizontal');
        player.setAlpha(0);
        let tw6 = this.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }   
   
    var RecogerDisparo = function RecogerDisparo(ObjectDisparo, player) {
        
        ObjectDisparo.destroy();
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
    var RecogerCogerDash = function RecogerCogerDash(CogerDash, player) {

        CogerDash.destroy();
        Deslizconseguido = true;
        alert('Dash adquirido');
        console.log('Dash adquirido');
    }
    

    var activarteletranstporte = function activarteletranstporte(teletransportador, player) {

        player.x=3300;player.y=500;
        
    }

    var activarteletranstporte1 = function activarteletranstporte1(teletransportador1, player) {

        player.x=2500;player.y=4500;
        
    }

    var hitEnemy = function hitprojectil(beam, enemy) {
        enemy.destroy();
        beam.destroy();
        Puntos +=15;
        PuntosText.text = "Puntos: " + Puntos ;
        
    }
    var hitSubEnemy1 = function hitprojectil(beam, SubEnemy1) {
        VidasubEnemie1 -=1
        beam.destroy();
        Puntos += 15;
        PuntosText.text = "Puntos: " + Puntos;
        VidasubEnemie1text.text = 'Vida: ' + VidasubEnemie1;
        console.log(VidasubEnemie1);
    }
    var Pelotarecibedisparo = function Pelotarecibedisparo(beam, bomb, ) {
        beam.destroy();
        Puntos += 15;
        Vidabola -=1;
        PuntosText.text = "Puntos: " + Puntos;
        console.log(Vidabola);
        bomb.setAlpha(0);
        let tw7 = this.tweens.add({
            targets: bomb,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }
    var coliderbeam = function coliderbeam(beam, platforms) {
        beam.destroy();
        console.log('destruida');

    }  


    var coliderbeam2 = function coliderbeam2(beam, MurosParaSubEnemie) { beam.destroy(); }; this.coliderbeam2 = coliderbeam2;
    

   
    this.bomb= bomb;
    this.disparo = disparo
    this.physics.add.overlap(ObjectDisparo, player, RecogerDisparo, null, this);
    this.physics.add.overlap(teletransportador, player, activarteletranstporte, null, this);
    this.physics.add.overlap(teletransportador1, player, activarteletranstporte1, null, this);
    this.physics.add.overlap(pincho_horizontal1, player, GolpeDePinchoVertical, null, this);
    this.physics.add.overlap(CogerDobleSalto, player, RecogerDoblesalto, null, this);
    this.physics.add.overlap(CogerDash, player, RecogerCogerDash, null, this);
    this.physics.add.overlap(pinchos, player, GolpePincho1, null, this);
    this.physics.add.overlap(pinchos2, player, GolpePincho2, null, this);
    this.physics.add.overlap(enemies, player, Golpeaenemigo, null, this);
    this.physics.add.overlap(BolasDeHierro, player, GolpePelota, null, this);
    this.physics.add.overlap(subEnemies, player, GolpeaSubEnemigo, null, this); 
    this.physics.add.overlap(balasdeSubenemie, player, GolpeaDisparoDeSubEnemigo, null, this);

    this.projectiles = this.add.group();
    this.physics.add.overlap(this.projectiles, BolasDeHierro, Pelotarecibedisparo, null, this);
    this.physics.add.overlap(this.projectiles, platforms, coliderbeam, null, this);
    this.physics.add.overlap(this.projectiles, enemy, hitEnemy, null, this);
    this.physics.add.overlap(this.projectiles, null, this);
    this.physics.add.overlap(this.projectiles, enemies, hitEnemy, null, this);
    this.physics.add.overlap(this.projectiles, subEnemies, hitSubEnemy1, null, this);
    this.physics.add.overlap(this.projectiles, MurosParaSubEnemie, coliderbeam2, null, this);



  //  this.physics.add.overlap(enemy, this.hitprojectil, null, this);

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

MurosParaSubEnemie1(){
   var MurosParaSubEnemie = this.physics.add.staticGroup();
   var MurosParaSubEnemie1 = MurosParaSubEnemie.create(2100, 4595, 'plataforma_recta');
   var MurosParaSubEnemie3 = MurosParaSubEnemie.create(2485, 4370, 'plataforma').setScale(2).refreshBody();
    this.physics.add.collider(this.player, MurosParaSubEnemie);
    this.physics.add.overlap(this.projectiles, MurosParaSubEnemie, this.coliderbeam2, null, this);
    this.physics.add.overlap(this.balasdeSubenemie, MurosParaSubEnemie, this.coliderbeam2, null, this);
    
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
    let SoundBackground = this.SoundBackground;
    let SoundProfundo = this.SoundProfundo;
    var VidasubEnemie1text = this.VidasubEnemie1text;
    VidasubEnemie1text.setPosition(this.SubEnemy1.x - 100, this.SubEnemy1.y - 50);

    var cursors = this.cursors;
    var player = this.player;
    var emitter = this.emitter;
    var bomb = this.bomb;
    var murodestruible = this.murodestruible;
    var MurosParaSubEnemie1 = this.MurosParaSubEnemie1;
    var MurosParaSubEnemie2 = this.MurosParaSubEnemie2;
    var coliderbeam2 = this.coliderbeam2;
    var platform_move = this.platform_move;

  //  var BalaConseguida = this.BalaConseguida;
   var Puntos = this.Puntos;
    if (Phaser.Input.Keyboard.JustDown(this.T)) {
        console.log('la x del jugador es ' + player.x)
        console.log('la y del jugador es ' + player.y)
    }

    
    if (player.x >=2200 && player.x <3000 && player.y>=4600 && player.y <5000) {
      this.MurosParaSubEnemie1();
      //this.myCam.stopFollow(player, true, 0.1, 0.1);
    
      
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
    if (VidasubEnemie1 == 0 ) {
        this.SubEnemy1.destroy();
        MurosParaSubEnemie2.destroy();
        VidasubEnemie1text.destroy();
        Vida ++;
        this.Vidatext.text = "Vida: " + Vida;
        this.myCam.shake(500);
        VidasubEnemie1=-1;
       
        
    }
//Cambios de tamaño a medida del cambio de vida
    if(Vida == 10){
        player.setScale(1);
    }

    if (Vida == 9) {
        player.setScale(0.9);
    }
    if (Vida <= 8) {
        player.setScale(0.8);
    }

//Fin del cambio de tamaño
    if (Vida <= 0) {//cuando tengas 0 vidas
        this.gameOver = true;
        this.physics.pause();
        GameText = this.add.text(250, 250, 'Game Over', {
            font: 'bold 48px Arial',
            fill: '#ff0000',});

        GameText.setPosition(player.x-100, player.y -120);
       // emitter.stop();
        player.setTint(0xff0000);

        bomb.destroy();

    }


    if(player.y >= 4955){//cuando el jugador llegue más abajo que la camara en 5000
        Vida=0;
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
            VidasubEnemie1=true;
            Deslizconseguido=false;


    }

    this.playerax = player.x;



    if(player.y > 2000){
        this.profundo.setDepth(-1);
        this.background.setDepth(-2);
        SoundBackground.pause();
        SoundProfundo.volume = 0.3;
        emitter.stop();
    }
    else if (player.y < 2000){
        this.profundo.setDepth(-2);
        this.background.setDepth(-1);
        SoundBackground.resume();
        SoundProfundo.resume();
        emitter.start();
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
 
    if (this.left.isDown) {   //La accion que se ejecuta cuando el personaje se mueve a la izquierda
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
        if (Phaser.Input.Keyboard.JustDown(this.shift)&& time > delay1 &&Deslizconseguido==true){
            delay1 = time + 1750;
            this.Dash.setAlpha(0);
            this.tweens.add({
                targets: this.Dash,
                alpha: 1,
                duration:200,
                ease: 'Linear',
                repeat: 5,
            });
            player.x = player.x-100;
            }
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
        if (Phaser.Input.Keyboard.JustDown(this.shift)&& time > delay1 && Deslizconseguido==true){
            this.physics.add.overlap(murodestruible, player, null, this);
            
            delay1 = time + 1750;
            this.Dash.setAlpha(0);
            this.tweens.add({
                targets: this.Dash,
                alpha: 1,
                duration:200,
                ease: 'Linear',
                repeat: 5,
            });
            player.x = player.x+100;
        }
        if (player.body.touching.down) {emittermovimiento1.emitParticle(6);}
        //this.background.tilePositionX += 1.5;
    }
    else {//La accion que se ejecuta cuando el personaje se queda quieto
        player.setVelocityX(0);
        
        if (doblesalto == false) {
            player.anims.play('turn');}

        if (doblesalto == true) {
            player.anims.play('turnConDobleSalto', true);
        }
    }
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
    
    if (player.body.touching.right) {
        this.player.setVelocityY(20);
        this.contadorSalto = 0;
        console.log('ese =', this.contadorSalto);
        SoundJumpPlayer1.stop();
    }
    if (player.body.touching.left) {
        this.player.setVelocityY(20);
        this.contadorSalto = 0;
        console.log('ese =', this.contadorSalto);
        SoundJumpPlayer1.stop();
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
    if(this.enemy2.x >= 245){this.enemy2.flipX = false;}
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

    if( player.x >=2300 && player.x <2850 && player.y>=4500 && player.y <5000 && time > lastFired2&&VidasubEnemie1>=1){
        var balaSubenemie = this.balasdeSubenemie.get();balaSubenemie.body.setGravityY(-150);

        if(balaSubenemie){
            balaSubenemie.fire(this.SubEnemy1.x,this.SubEnemy1.y);
            lastFired2 = time + 1000;
            
        }
        
    }
   

    if (this.spacebar.isDown &&BalaConseguida == true && time > lastFired) {
        // call a function to create a beam instance
        /*  var o[0,1]
            0 =positionderecha ==true, positionizquierda ==false;
            1 = positionizquierda==true, positionderecha == false;*/

        var beam = new disparo(this);
        player.flipX=false;
        if(beam){
            lastFired = time + 750;
            
           // time.add(100,resetbala, this);
        }
        if(this.left.isDown){
            beam.flipX = true;
            beam.body.velocity.x = -250;
        }

    }
                
   // var resetbala=function resetbala(){beam.destroy(); }
    for (var i = 0; i < this.projectiles.getChildren().length; i++) {
        var beam = this.projectiles.getChildren()[i];
        beam.update();}

        if(beam<player.x+50){
            beam.destroy();
            console.log('funciono');
        }

        
}
//Final del Update
}
