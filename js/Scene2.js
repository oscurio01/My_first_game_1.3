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
    let VidasBossEnemie1text = this.add.text(7000, 4500, 'Vida: ' + VidaBossEnemie1, { fontSize: '30px', fill: '#0d91fc' }).setDepth(1);
    this.VidasBossEnemie1text = VidasBossEnemie1text;
    let VidasBossEnemie2text = this.add.text(9000, 4500, 'Vida: ' + VidaBossEnemie2, { fontSize: '30px', fill: '#0d91fc' }).setDepth(1);
    this.VidasBossEnemie2text = VidasBossEnemie2text;
    let VidasBossEnemie3text = this.add.text(10000, 4500, 'Vida: ' + VidaBossEnemie3, { fontSize: '30px', fill: '#0d91fc' }).setDepth(1);
    this.VidasBossEnemie3text = VidasBossEnemie3text;
    this.Puntos = Puntos;

    //contenedor.add([PuntosText, Vidatext]);

    //we have 5 platforms the first is for the base and the others is for jump up

    var platforms = this.physics.add.staticGroup();

    var platforms2_move = this.physics.add.group({ allowGravity: false,immovable:true});

    var teletransport = this.physics.add.group({ allowGravity: false, immovable: true });

    this.lever = this.physics.add.group({ allowGravity: false, immovable: true });

    var BolasDeHierro = this.physics.add.group();

    var piso = this.physics.add.staticGroup(); this.piso=piso;

    var pisofalso = this.physics.add.staticGroup();

    var pinchos = this.physics.add.staticGroup();//usados al principio

    var pinchos2 = this.physics.add.staticGroup();//Usados mucho más tarde

     var pinchosfalso2 = this.physics.add.staticGroup();//Usados para hacer fake(falso) ilusiones.

    var pinchos_rectos = this.physics.add.group({ allowGravity: false, flipY: false, immovable: true,});

    var MurosParaSubEnemie = this.physics.add.staticGroup();

    piso.create(380, 543, 'suelo_largo').setSize(864, 13);//Suelo del juego
    piso.create(560, 250, 'suelo_medio').setSize(260, 13);
    piso.create(780, 250, 'suelo_medio').setSize(260, 13);
    piso.create(520, 410, 'suelo_medio').setSize(260, 13);
    piso.create(760, 410, 'suelo_medio').setSize(260, 13);
    piso.create(130, 330, 'suelo_medio').setSize(260, 13);
    piso.create(0, 330, 'suelo').setSize(68, 13);
    piso.create(-85, 140, 'suelo_medio').setSize(260, 13);
    piso.create(155, 140, 'suelo_medio').setSize(260, 13);
    piso.create(130, 330, 'suelo_medio').setSize(260, 13);
    piso.create(1925, 574, 'suelo_medio').setSize(260, 13).setDepth(-1);
    pisofalso.create(2055, 574, 'suelo_medio').setSize(240, 13).setDepth(-1);
    piso.create(2605, 574, 'suelo_largo').setSize(864, 13).setDepth(-1);
    piso.create(3400, 330, 'suelo_medio').setSize(260, 13);
    piso.create(3700, 250, 'suelo_medio').setSize(260, 13);
    piso.create(3930, 250, 'suelo_medio').setSize(260, 13);
    piso.create(4300, 400, 'suelo_medio').setSize(260, 13);
    piso.create(4550, 330, 'suelo').setSize(68, 13);
    piso.create(4800, 400, 'suelo_medio').setSize(260, 13);
    piso.create(4505, 504, 'suelo_largo').setSize(864, 13);
    piso.create(5369, 504, 'suelo_largo').setSize(864, 13);
    piso.create(6233, 504, 'suelo_largo').setSize(864, 13);
    piso.create(5700, 436, 'suelo').setSize(68, 13);
    piso.create(5600, 336, 'suelo').setSize(68, 13);
    piso.create(7069, 3310, 'suelo_largo').setSize(864, 13);
    piso.create(7930, 3310, 'suelo_largo').setSize(864, 13);
    piso.create(8790, 3310, 'suelo_largo').setSize(864, 13);
    piso.create(9490, 3310, 'suelo_largo').setSize(864, 13);
    piso.create(10550, 3310, 'suelo_largo').setSize(864, 13);
    piso.create(9908, 3410, 'tierra_lateral');//parte de la 2 llave
    piso.create(9908, 3600, 'tierra_lateral');
    piso.create(10042, 3700, 'suelo_medio').setSize(240, 13);
    piso.create(10148, 3803, 'tierra_lateral');
    piso.create(10148, 3993, 'tierra_lateral');
    piso.create(10148, 4183, 'tierra_lateral');
    piso.create(10148, 4373, 'tierra_lateral');
    piso.create(10148, 4563, 'tierra_lateral');
    piso.create(10148, 4753, 'tierra_lateral');
    piso.create(10148, 4783, 'tierra_lateral');
    piso.create(10593, 4850, 'suelo_largo').setSize(864, 13);
    piso.create(11457, 4850, 'suelo_largo').setSize(864, 13);
    piso.create(9950, 2810, 'suelo_medio').setSize(240, 13);//parte de la 3 llave
    piso.create(10639, 2600, 'suelo_largo').setSize(864, 13);
    piso.create(11503, 2600, 'suelo_largo').setSize(864, 13);

    this.lever1 = this.lever.create(7575, 3288, 'lever');

    var teletransportador = platforms2_move.create(2930, 4792, 'teleport').setSize(30, 20).setScale(0.5);
    //despues de la plataforma movible
    var teletransportador2 = teletransport.create(11836, 4840, 'teleport').setSize(30, 20).setScale(0.5);

    var teletransportador3 = teletransport.create(11894, 2590, 'teleport').setSize(30, 20).setScale(0.5);

    var teletransportEnd = platforms2_move.create(10930, 3289, 'teleport').setSize(30, 20).setScale(0.5);

    var pincho_horizontal1 = pinchos_rectos.create(300, 100, 'pinchosmini_vertical');//pinchos del inicio
    var pincho_horizontal2 = pinchos_rectos.create(4600, 300, 'pinchos_vertical'); pincho_horizontal2.flipX = true;
    var pincho_horizontal3 = pinchos_rectos.create(5800, 300, 'pinchos_vertical'); pincho_horizontal3.flipX = true;
    var pincho_horizontal4 = pinchos_rectos.create(6655, 910, 'pinchosmini_extra_large').setSize(20, 800); pincho_horizontal4.angle = 90;
    var pincho_horizontal5 = pinchos_rectos.create(6655, 1710, 'pinchosmini_extra_large').setSize(20, 800); pincho_horizontal5.angle = 90;
    var pincho_horizontal6 = pinchos_rectos.create(6655, 2510, 'pinchosmini_extra_large').setSize(20, 800); pincho_horizontal6.angle = 90;
    var pincho_horizontal7 = pinchos_rectos.create(6655, 2910, 'pinchosmini_extra_large').setSize(20, 800); pincho_horizontal7.angle = 90;
                pinchos.create(1845, 555, 'pinchosmini');//Pinchos del Juego
                pinchos.create(1925, 555, 'pinchosmini');
    pinchos.create(2005, 555, 'pinchosmini');
    var pinchooescondido=pinchosfalso2.create(2085, 555, 'pinchosmini');
    pinchos.create(2525, 555, 'pinchosmini_extra_large');
    pinchos2.create(3325, 555, 'pinchosmini_extra_large');
    pinchos2.create(4125, 555, 'pinchosmini_extra_large');


    platforms.create(-35, 145, 'plataforma_recta').setScale(2).refreshBody();//borde del mapa en la izquierda

    this.murodestruible = platforms.create(840, 145, 'plataforma_recta');//Muro que se destruye al conseguir matar al 1 boss o conseguir la llave
    this.murodestruible.setScale(2).refreshBody();
    this.murodestruible2 = platforms.create(8330, 2910, 'plataforma_recta');//Muro que se destruye al conseguir matar al 1 boss o conseguir la llave
    this.murodestruible2.setScale(2).refreshBody();

    platforms.create(5740, 370, 'Semiplataforma_recta');
    platforms.create(7515, 3240, 'MiniPlataforma_recta');
    platforms.create(7700, 3190, 'plataforma');
    platforms.create(8000, 3190, 'plataforma');
    this.Murofinal = platforms.create(10234, 2963, 'plataforma_recta').setScale(1.7).refreshBody();//Muro que se destruye al conseguir matar al 1 boss o conseguir la llave

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

    this.tweens.timeline({
        targets: pincho_horizontal1, ease: 'lineal', duration: 4000,
        loop: -1,
        tweens: [{ y: 450, }, { y: 100 },]});
    this.tweens.timeline({
        targets: pincho_horizontal2, ease: 'lineal', duration: 1000,
        loop: -1,
        tweens: [{ y: pincho_horizontal2.y + 120, }, { y: pincho_horizontal2.y+1 },]});
    this.tweens.timeline({
        targets: pincho_horizontal3, ease: 'lineal', duration: 1000,
        loop: -1,
        tweens: [{ y: pincho_horizontal3.y + 120, }, { y: pincho_horizontal3.y + 1 },]
    });
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
    var enemies = this.physics.add.group({ allowGravity: false, collideWorldBounds: false, bounce:0.2, });//Grupo de enemigos

    var enemies_rotatorios = this.physics.add.group({ allowGravity: false, collideWorldBounds: false, bounce: 0.2, });//Grupo de enemigos

    var enemies_saltantes = this.physics.add.group({ collideWorldBounds: false, bounce: 0.2, });//Grupo de enemigos

    var subEnemies = this.physics.add.group({ allowGravity: false, collideWorldBounds: false, bounce: 0.2, });//Grupo de enemigos

    var enemy = enemies.create(1800, 100, 'enemy').setImmovable(true);
    enemy.setSize(20, 30);

    var enemie1 = enemies.create(800,380,'enemy').setImmovable(true);//primer enemigo
    enemie1.setSize(20, 30);

    var enemy2 = enemies.create(50, 300, 'enemy').setImmovable(true);
    enemy2.setSize(20, 30);

    var enemie2 = enemies.create(420,350,'enemy').setImmovable(true);
    enemie2.setSize(20, 30);

    var enemie3 = enemies.create(2500, 100, 'enemy').setImmovable(true);
    enemie3.setSize(20, 30);

    var enemie4 = enemies.create(4200, 370, 'enemy').setImmovable(true);
    enemie4.setSize(20, 30);

    var enemie5 = enemies.create(4900, 370, 'enemy').setImmovable(true);
    enemie5.setSize(20, 30);

    var enemie6 = enemies.create(4400, 480, 'enemy').setImmovable(true);
    enemie6.setSize(20, 30);

    var enemie7 = enemies.create(4700, 480, 'enemy').setImmovable(true);
    enemie7.setSize(20, 30);

    var enemie8 = enemies.create(4500, 300, 'enemy').setImmovable(true); enemie8.setSize(20, 30);

    var enemie10 = enemies_rotatorios.create(7725, 3228, 'enemigo_saltador').setImmovable(true); enemie10.setSize(35, 33); enemie10.setScale(.7);
    enemie10.body.angularVelocity = 200;
    var enemie11 = enemies_rotatorios.create(7760, 3228, 'enemigo_saltador').setImmovable(true); enemie11.setSize(35, 33); enemie11.setScale(.7);
    enemie11.body.angularVelocity = 200;
    var enemie12 = enemies_rotatorios.create(7820, 3298, 'enemigo_saltador').setImmovable(true); enemie12.setSize(35, 33); enemie12.setScale(.7);
    enemie12.body.angularVelocity = 200;
    var enemie13 = enemies_rotatorios.create(7870, 3228, 'enemigo_saltador').setImmovable(true); enemie13.setSize(35, 33); enemie13.setScale(.7);
    enemie13.body.angularVelocity = 200;
    var enemie14 = enemies_rotatorios.create(7930, 3298, 'enemigo_saltador').setImmovable(true); enemie14.setSize(35, 33); enemie14.setScale(.7);
    enemie14.body.angularVelocity = 200;
    var enemie15 = enemies_rotatorios.create(8005, 3228, 'enemigo_saltador').setImmovable(true); enemie15.setSize(35, 33); enemie15.setScale(.7);
    enemie15.body.angularVelocity = 200;
    var enemie16 = enemies_rotatorios.create(8055, 3298, 'enemigo_saltador').setImmovable(true); enemie16.setSize(35, 33); enemie16.setScale(.7);
    enemie16.body.angularVelocity = 200;
    var enemie17 = enemies_rotatorios.create(8105, 3228, 'enemigo_saltador').setImmovable(true); enemie17.setSize(35, 33); enemie17.setScale(.7);
    enemie17.body.angularVelocity = 200;

    this.enemie1_salta = enemies_saltantes.create(5000, 300, 'enemigo_saltador').setImmovable(true); this.enemie1_salta.setSize(45, 50);
    this.enemie1_salta.body.angularVelocity = 200;
    this.enemie2_salta = enemies_saltantes.create(5300, 300, 'enemigo_saltador').setImmovable(true); this.enemie2_salta.setSize(45, 50);
    this.enemie2_salta.body.angularVelocity = 200;
    this.enemie3_salta = enemies_saltantes.create(7169, 3210, 'enemigo_saltador').setImmovable(true); this.enemie3_salta.setSize(45, 50);
    this.enemie3_salta.body.angularVelocity = 200;


    var SubEnemy1 = subEnemies.create(2800, 4760, 'enemy').setImmovable(true).setSize(25,30);
    SubEnemy1.setScale(2); this.SubEnemy1=SubEnemy1;
    this.bombBoss1 = BolasDeHierro.create(9050, 2800, 'bomb');
    this.bombBoss1.setScale(2);
    this.bombBoss1.setBounce(1);
    //this.bombBoss1.setCircle(18);
    this.bombBoss1.setCollideWorldBounds(false);

    this.bombBoss2 = subEnemies.create(11331, 4625, 'enemy').setImmovable(true).setSize(25, 30);
    this.bombBoss2.setScale(2);

    this.bombBoss3 = subEnemies.create(11382, 2382, 'enemy').setImmovable(true).setSize(25, 30);
    this.bombBoss3.setScale(2);


var MurosParaSubEnemie2 = MurosParaSubEnemie.create(2870, 4595, 'plataforma_recta');this.MurosParaSubEnemie2=MurosParaSubEnemie2;
var MurosParaSubEnemie4 = MurosParaSubEnemie.create(9230, 2910, 'plataforma_recta'); this.MurosParaSubEnemie4 = MurosParaSubEnemie4;
this.MurosParaSubEnemie4.setScale(2).refreshBody();
var MurosParaSubEnemie5 = MurosParaSubEnemie.create(11400, 4529, 'plataforma_recta'); this.MurosParaSubEnemie5 = MurosParaSubEnemie5;
this.MurosParaSubEnemie5.setScale(2).refreshBody();
this.MurosParaSubEnemie6 = platforms.create(11445, 2193, 'plataforma_recta');//Muro que se destruye al conseguir matar al 1 boss o conseguir la llave
this.MurosParaSubEnemie6.setScale(2).refreshBody();
    this.muroParaSoporteBoss1 = MurosParaSubEnemie.create(9050, 2900, 'plataforma_recta');
    this.muroParaSoporteBoss2 = MurosParaSubEnemie.create(9200, 3000, 'plataforma');
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
    this.enemie4 = enemie4;
    this.enemie5 = enemie5;
    this.enemie6 = enemie6;
    this.enemie7 = enemie7;
    this.enemie8 = enemie8;
    enemy.play('fly', true);
    enemy2.play('fly', true);
    enemie1.play('fly', true);
    enemie2.play('fly', true);
    enemie3.play('fly', true);
    enemie4.play('fly', true);
    enemie5.play('fly', true);
    enemie6.play('fly', true);
    enemie7.play('fly', true);
    enemie8.play('fly', true);
    SubEnemy1.play('fly', true);
    this.bombBoss2.play('fly', true);
    this.bombBoss3.play('fly', true);
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
    var CogerDobleSalto = this.physics.add.sprite(11766, 4820, 'objetoDobleSalto');
    CogerDobleSalto.setSize(20, 20);
    CogerDobleSalto.setBounce(0.2);
    CogerDobleSalto.setCollideWorldBounds(false);
    CogerDobleSalto.body.setAllowGravity(false);

    //variable de conseguir doble salto
    var CogerDash = this.physics.add.sprite(11825, 2579, 'objetoDash');
    CogerDash.setSize(60, 20);
    CogerDash.setBounce(0.2);
    CogerDash.setCollideWorldBounds(false);
    CogerDash.body.setAllowGravity(false);



//Inicio del movimiento de los enemigos
    this.tweens.timeline({
        targets: enemy,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { x: 2100, }, { x: 1800 },]
    });

    this.tweens.timeline({
        targets: enemy2,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { x: enemy2.x+200,  }, { x: enemy2.x-5 },]
    });

    this.tweens.timeline({
        targets: enemie1,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { x: 600, }, { x: 800 },]
    });

    this.tweens.timeline({
        targets: enemie2,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { x: 600, }, { x: 420 },]
    });

    this.tweens.timeline({
        targets: enemie3,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { x: 3000, }, { x: 2500 },]
    });

    this.tweens.timeline({
        targets: enemie4,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { x: enemie4.x + 200, }, { x: enemie4.x - 5 }]
    });

    this.tweens.timeline({
        targets: enemie5,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { x: enemie5.x - 200 },{ x: enemie5.x + 5, }]
    });

    this.tweens.timeline({
        targets: enemie6,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { x: enemie6.x - 200, }, { x: enemie6.x + 5 }]
    });

    this.tweens.timeline({
        targets: enemie7,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { x: enemie7.x + 200 }, { x: enemie7.x - 5, }]});

    this.tweens.timeline({
        targets: enemie8,
        ease: 'lineal',
        duration: 2000,
        loop: -1,

        tweens: [
            { x: enemie8.x + 100 }, { x: enemie8.x - 5, }]
    });

    this.tweens.timeline({
        targets: enemie10,
        ease: 'lineal',
        duration: 1000,
        loop: -1,

        tweens: [
            { y: enemie10.y + 70 }, { y: enemie10.y - 5, }]
    });

    this.tweens.timeline({
        targets: enemie11,
        ease: 'lineal',
        duration: 1000,
        loop: -1,

        tweens: [
            { y: enemie11.y + 70   }, { y: enemie11.y - 5, }]
    });

    this.tweens.timeline({
        targets: enemie12,
        ease: 'lineal',
        duration: 1000,
        loop: -1,

        tweens: [
            { y: enemie12.y - 70 }, { y:enemie12.y + 5, }]
    });

    this.tweens.timeline({
        targets: enemie13,
        ease: 'lineal',
        duration: 1000,
        loop: -1,

        tweens: [
            { y: enemie13.y + 70 }, { y: enemie13.y - 5, }]
    });

    this.tweens.timeline({
        targets: enemie14,
        ease: 'lineal',
        duration: 1000,
        loop: -1,

        tweens: [
            { y: enemie14.y - 70 }, { y: enemie14.y + 5, }]
    });

    this.tweens.timeline({
        targets: enemie15,
        ease: 'lineal',
        duration: 1000,
        loop: -1,

        tweens: [
            { y: enemie15.y + 70  }, { y: enemie15.y - 5, }]
    });

    this.tweens.timeline({
        targets: enemie16,
        ease: 'lineal',
        duration: 1000,
        loop: -1,

        tweens: [
            { y: enemie16.y - 70 }, { y: enemie16.y + 5, }]
    });

    this.tweens.timeline({
        targets: enemie17,
        ease: 'lineal',
        duration: 1000,
        loop: -1,

        tweens: [
            { y: enemie17.y + 70 }, { y: enemie17.y - 5, }]
    });

    let movesubenemy1 = this.tweens.timeline({
        targets: SubEnemy1,
        ease: 'lineal',
        duration: 2000,
        loop: -1,
        tweens: [{ y: SubEnemy1.y -150, }, { y: SubEnemy1.y+1 },]});

    this.tweens.timeline({
        targets: this.bombBoss2,
        ease: 'lineal',
        duration: 1000,
        loop: -1,
        tweens: [
            { y: this.bombBoss2.y + 180, }, { y: this.bombBoss2.y - 1 },
            { y: this.bombBoss2.y + 180, }, { y: this.bombBoss2.y - 1 },
            { y: this.bombBoss2.y + 180, }, { y: this.bombBoss2.y - 1 },
            { x: this.bombBoss2.x - 750, },
            { y: this.bombBoss2.y + 180, }, { y: this.bombBoss2.y - 1 },
            { y: this.bombBoss2.y + 180, }, { y: this.bombBoss2.y - 1 },
            { y: this.bombBoss2.y + 180, }, { y: this.bombBoss2.y - 1 },
            { x: this.bombBoss2.x + 1, },
            { y: this.bombBoss2.y + 180, }, { y: this.bombBoss2.y - 1 },
            { y: this.bombBoss2.y + 180, }, { y: this.bombBoss2.y - 1 },
            { y: this.bombBoss2.y + 180, }, { y: this.bombBoss2.y - 1 },
            { x: this.bombBoss2.x - 750, },
            { y: this.bombBoss2.y + 180, }, { y: this.bombBoss2.y - 1 },
            { y: this.bombBoss2.y + 180, }, { y: this.bombBoss2.y - 1 },
            { y: this.bombBoss2.y + 180, }, { x: this.bombBoss2.x + 1, },
            { y: this.bombBoss2.y - 1 },
        ]
    });
    this.tweens.timeline({
        targets: this.bombBoss3,
        ease: 'lineal',
        duration: 1000,
        loop: -1,
        tweens: [
            { y: this.bombBoss3.y + 150, }, { y: this.bombBoss3.y - 1 },
            { y: this.bombBoss3.y + 150, }, { y: this.bombBoss3.y - 1 },
            { y: this.bombBoss3.y + 150, }, { y: this.bombBoss3.y - 1 },
            { x: this.bombBoss3.x - 650, },
            { y: this.bombBoss3.y + 150, }, { y: this.bombBoss3.y - 1 },
            { y: this.bombBoss3.y + 150, }, { y: this.bombBoss3.y - 1 },
            { x: this.bombBoss3.x + 1, },
            { y: this.bombBoss3.y + 150, }, { y: this.bombBoss3.y - 1 },
            { y: this.bombBoss3.y + 150, }, { y: this.bombBoss3.y - 1 },
            { y: this.bombBoss3.y + 150, }, { y: this.bombBoss3.y - 1 },
            { x: this.bombBoss3.x - 650, },
            { y: this.bombBoss3.y + 150, }, { y: this.bombBoss3.y - 1 },
            { y: this.bombBoss3.y + 150, }, { y: this.bombBoss3.y - 1 },
            { y: this.bombBoss3.y + 180, }, { x: this.bombBoss3.x + 1, },
            { y: this.bombBoss3.y - 1 },
        ]
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
    this.physics.add.collider(enemies_saltantes, piso);
    this.physics.add.collider(enemies_saltantes, platforms);
    this.physics.add.collider(platform_move,player);
    this.physics.add.collider(player, RecogerDisparo);
    this.physics.add.collider(player, GolpeDePinchoVertical);
    this.physics.add.collider(player, GolpePelota);
    this.physics.add.collider(player, hitEnemy);
    this.physics.add.collider(player, GolpePincho1);
    this.physics.add.collider(player, GolpePincho2);
    this.physics.add.collider(player, Pelotarecibedisparo);
    this.physics.add.collider(player, MurosParaSubEnemie);
    this.physics.add.collider(BolasDeHierro, platforms);
    this.physics.add.collider(BolasDeHierro, MurosParaSubEnemie);
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
        maxSize: -1,
        runChildUpdate: true
    });


    this.balasdeSubenemie=balasdeSubenemie;

   // making the camera follow the player
   this.myCam.startFollow(player, true, 0.1, 0.1);

    var GolpePelota = function GolpePelota(player, bomb,){
       Vida -= 1;
       Vidatext.text = "Vidas: " + Vida;
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
        Vidatext.text = "Vidas: " + Vida;

        if (this.left) { player.x += 50; } else { player.x -= 50; }
        player.setAlpha(0);
        this.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }

    var Golpeaenemigo_rotatorios = function Golpeaenemigo_rotatorios(player, enemies_rotatorios) {
        Vida -= 1;
        player.setVelocityY(-220);
        Vidatext.text = "Vidas: " + Vida;

        if (this.left) { player.x += 50; } else { player.x -= 50; }
        player.setAlpha(0);
        this.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }

    var Golpeaenemigo_saltante = function Golpeaenemigo_saltante(player, enemies_saltantes) {
        Vida -= 1;
        player.setVelocityY(-220);
        Vidatext.text = "Vidas: " + Vida;

        if (this.left) { player.x += 50; } else { player.x -= 50; }
        player.setAlpha(0);
        this.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }

    var SeguroDeEnemigo_Saltante = function SeguroDeEnemigo_Saltante(enemies_saltantes, platforms) {
        enemies_saltantes.x -= 50;

    }
    var SeguroDeEnemigo_Saltante2 = function SeguroDeEnemigo_Saltante2(enemies_saltantes, pinchos_rectos) {

        enemies_saltantes.x += 100;

    };


    var GolpeaSubEnemigo = function GolpeaSubEnemigo(player, subEnemies) {
        Vida -= 1;
        player.setVelocityY(-220);
        Vidatext.text = "Vidas: " + Vida;
        player.x -= 100;
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
        Vidatext.text = "Vidas: " + Vida;
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
        Vidatext.text = "Vidas: " + Vida;
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
        Vidatext.text = "Vidas: " + Vida;
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

    var GolpeDePinchoVertical = function GolpeDePinchoVertical(player, pinchos_rectos) {
        Vida -= 1;
        Vidatext.text = "Vidas: " + Vida;
        if (this.left) { player.x += 120; } else if (this.right) { player.x -= 120; console.log('esta') }
        console.log('pinchahorizontal');
        player.setAlpha(0);
        let tw6 = this.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });};


    var RecogerDisparo = function RecogerDisparo(ObjectDisparo, player) {

        ObjectDisparo.destroy();
        BalaConseguida =true;
        alert('Balas adquiridas');
        console.log('Balas adquiridas');
    }

    var RecogerDoblesalto = function RecogerDoblesalto(CogerDobleSalto, player) {

        CogerDobleSalto.destroy();
        doblesalto = true;
        alert('Doble salto y agarre a las paredes adquirido');
        console.log('Doble salto adquirido');
    }
    var RecogerCogerDash = function RecogerCogerDash(CogerDash, player) {

        CogerDash.destroy();
        Deslizconseguido = true;
        alert('Dash adquirido');
        console.log('Dash adquirido');
    }
    this.RecogerCogerDash = RecogerCogerDash;


    var activarteletranstporte = function activarteletranstporte(teletransportador, player) {

        player.x = 6839; player.y = 3289;

    }

    var activarteletranstporte2 = function activarteletranstporte1(player, teletransport) {

        player.x = 9813; player.y = 3200;

    }

    var activarteletranstporte3 = function activarteletranstporte3(player, teletransportEnd) {

        this.scene.start("EndGame");
        this.scene.stop("playGame");
    }

    this.spaceteclado = this.add.sprite(this.lever1.x, this.lever1.y - 50, 'teclado_space');
   this.anims.create({
        key: 'spaceteclado1',
        frames: this.anims.generateFrameNumbers('teclado_space', { start: 0, end: 1 }),
        frameRate: 1,
        repeat: -1
    });


    this.spaceteclado.alpha = 0;
    var activarlever = function activarlever(lever1, player) {

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){this.lever1.flipX=true;
            this.murodestruible2.destroy();
            this.myCam.shake(500);
        }
        this.spaceteclado.alpha = 1;
        if (activarlever){
            this.spaceteclado.anims.play('spaceteclado1', true);
        } else { this.spaceteclado.anims.play('spaceteclado1', false);}
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


    var hitBossEnemy1 = function hitprojectil1(beam, bombBoss1) {
        VidaBossEnemie1 -= 1
        beam.destroy();
        Puntos += 15;
        PuntosText.text = "Puntos: " + Puntos;
        VidasBossEnemie1text.text = 'Vida: ' + VidaBossEnemie1;
        console.log(VidaBossEnemie1);
        this.bombBoss1.setAlpha(0);
        this.tweens.add({
            targets: this.bombBoss1,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });

    }
    var hitBossEnemy2 = function hitprojectil1(beam, bombBoss2) {
        VidaBossEnemie2 -= 1
        beam.destroy();
        Puntos += 15;
        PuntosText.text = "Puntos: " + Puntos;
        VidasBossEnemie2text.text = 'Vida: ' + VidaBossEnemie2;
        console.log(VidaBossEnemie2);
        this.bombBoss2.setAlpha(0);
        this.tweens.add({
            targets: this.bombBoss2,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }
    var hitBossEnemy3 = function hitprojectil1(beam, bombBoss3) {
        VidaBossEnemie3 -= 1
        beam.destroy();
        Puntos += 15;
        PuntosText.text = "Puntos: " + Puntos;
        VidasBossEnemie3text.text = 'Vida: ' + VidaBossEnemie3;
        console.log(VidaBossEnemie3);
        this.bombBoss3.setAlpha(0);
        this.tweens.add({
            targets: this.bombBoss3,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
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
    var coliderbeamPinchos = function coliderbeamPinchos(beam, pincho_horizontal1) {
        beam.destroy();console.log('destruida');}
    var coliderbeamPinchos2 = function coliderbeamPinchos2(beam, pincho_horizontal2) {
        beam.destroy(); console.log('destruida');
    }
    var coliderbeamPinchos3 = function coliderbeamPinchos3(beam, pincho_horizontal3) {
        beam.destroy(); console.log('destruida');
    }

    var coliderbeam2 = function coliderbeam2(beam, MurosParaSubEnemie) { beam.destroy(); }; this.coliderbeam2 = coliderbeam2;

    this.bomb= bomb;
    this.disparo = disparo;
    this.physics.add.overlap(ObjectDisparo, player, RecogerDisparo, null, this);
    this.physics.add.overlap(teletransportador, player, activarteletranstporte, null, this);
    this.physics.add.overlap(teletransport, player, activarteletranstporte2, null, this);
    this.physics.add.overlap(teletransportEnd, player, activarteletranstporte3, null, this);
    this.physics.add.overlap(this.lever1, player, activarlever, null, this);
    this.physics.add.overlap(pinchos_rectos, player, GolpeDePinchoVertical, null, this);
    this.physics.add.overlap(CogerDobleSalto, player, RecogerDoblesalto, null, this);
    this.physics.add.overlap(CogerDash, player, RecogerCogerDash, null, this);
    this.physics.add.overlap(pinchos, player, GolpePincho1, null, this);
    this.physics.add.overlap(pinchos2, player, GolpePincho2, null, this);
    this.physics.add.overlap(enemies, player, Golpeaenemigo, null, this);
    this.physics.add.overlap(enemies_rotatorios, player, Golpeaenemigo_rotatorios, null, this);
    this.physics.add.overlap(enemies_saltantes, player, Golpeaenemigo_saltante, null, this);
    this.physics.add.overlap(enemies_saltantes, platforms, SeguroDeEnemigo_Saltante, null, this);
    this.physics.add.overlap(enemies_saltantes, pinchos_rectos, SeguroDeEnemigo_Saltante2, null, this);
    this.physics.add.overlap(BolasDeHierro, player, GolpePelota, null, this);
    this.physics.add.overlap(subEnemies, player, GolpeaSubEnemigo, null, this);
    this.physics.add.overlap(balasdeSubenemie, player, GolpeaDisparoDeSubEnemigo, null, this);

    this.projectiles = this.add.group();
    this.physics.add.overlap(this.projectiles, bomb, Pelotarecibedisparo, null, this);
    this.physics.add.overlap(this.projectiles, platforms, coliderbeam, null, this);
    this.physics.add.overlap(this.projectiles, pincho_horizontal1, coliderbeamPinchos, null, this);
    this.physics.add.overlap(this.projectiles, pincho_horizontal2, coliderbeamPinchos2, null, this);
    this.physics.add.overlap(this.projectiles, pincho_horizontal3, coliderbeamPinchos3, null, this);
    this.physics.add.overlap(this.projectiles, enemy, hitEnemy, null, this);
    this.physics.add.overlap(this.projectiles, null, this);
    this.physics.add.overlap(this.projectiles, enemies, hitEnemy, null, this);
    this.physics.add.overlap(this.projectiles, SubEnemy1, hitSubEnemy1, null, this);
    this.physics.add.overlap(this.projectiles, this.bombBoss1, hitBossEnemy1, null, this);
    this.physics.add.overlap(this.projectiles, this.bombBoss2, hitBossEnemy2, null, this);
    this.physics.add.overlap(this.projectiles, this.bombBoss3, hitBossEnemy3, null, this);
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

MurosParaBossEnemie1() {
    var MurosParaSubEnemie = this.physics.add.staticGroup();
    this.murodestruible2 = MurosParaSubEnemie.create(8330, 2910, 'plataforma_recta');
    this.murodestruible2.setScale(2).refreshBody();
    var MurosParaBossEnemie3 = MurosParaSubEnemie.create(8760, 2610, 'plataforma');MurosParaBossEnemie3.setScale(2).refreshBody();
    var MurosParaBossEnemie4 = MurosParaSubEnemie.create(8860, 2610, 'plataforma'); MurosParaBossEnemie4.setScale(2).refreshBody();
     this.physics.add.collider(this.player, MurosParaSubEnemie);
     this.physics.add.collider(this.bombBoss1, MurosParaSubEnemie);
     this.physics.add.overlap(this.projectiles, MurosParaSubEnemie, this.coliderbeam2, null, this);
}

MurosParaBossEnemie2() {
    var MurosParaSubEnemie = this.physics.add.staticGroup();
    this.murodestruible2 = MurosParaSubEnemie.create(10519, 4529, 'plataforma_recta');
    this.murodestruible2.setScale(2).refreshBody();
    var MurosParaBossEnemie3 = MurosParaSubEnemie.create(10949, 4229, 'plataforma');MurosParaBossEnemie3.setScale(2).refreshBody();
    var MurosParaBossEnemie4 = MurosParaSubEnemie.create(11049, 4229, 'plataforma'); MurosParaBossEnemie4.setScale(2).refreshBody();
     this.physics.add.collider(this.player, MurosParaSubEnemie);
     this.physics.add.overlap(this.projectiles, MurosParaSubEnemie, this.coliderbeam2, null, this);
     this.physics.add.overlap(this.balasdeSubenemie, MurosParaSubEnemie, this.coliderbeam2, null, this);
}

MurosParaBossEnemie3() {
    var MurosParaSubEnemie = this.physics.add.staticGroup();
    this.murodestruible2 = MurosParaSubEnemie.create(10670, 2193, 'plataforma_recta');
    this.murodestruible2.setScale(2).refreshBody();
    var MurosParaBossEnemie3 = MurosParaSubEnemie.create(11009, 2079, 'plataforma');MurosParaBossEnemie3.setScale(2).refreshBody();
     this.physics.add.collider(this.player, MurosParaSubEnemie);
     this.physics.add.overlap(this.projectiles, MurosParaSubEnemie, this.coliderbeam2, null, this);
     this.physics.add.overlap(this.balasdeSubenemie, MurosParaSubEnemie, this.coliderbeam2, null, this);
}

PartesDeLLave() {
    this.PartedeLLaveNegra = this.add.image(200, 550, 'llavesnegra').setDepth(1).setScrollFactor(0);
    this.PartedeLLaveNegra = this.add.image(10234, 3157, 'llavesnegra').setDepth(1);
    if(ParteDeLLave1Adquirida==true){
        this.PartedeLLave1 = this.add.image(200, 550, 'llaves1').setDepth(1).setScrollFactor(0);
      this.llaveMuro1 = this.add.image(10234, 3157, 'llaves1').setDepth(1);
    }
    if (ParteDeLLave2Adquirida == true){
        this.PartedeLLave2 = this.add.image(200, 550, 'llaves2').setDepth(1).setScrollFactor(0);
        this.llaveMuro2 = this.add.image(10234, 3157, 'llaves2').setDepth(1);
    }
    if (ParteDeLLave3Adquirida == true) {
        this.PartedeLLave3 = this.add.image(200, 555, 'llaves3').setDepth(1).setScrollFactor(0);
        this.llaveMuro3 = this.add.image(10234, 3162, 'llaves3').setDepth(1);
        this.PartedeLLaveNegra.destroy();
    }

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
    this.VidasBossEnemie1text.setPosition(this.bombBoss1.x - 100, this.bombBoss1.y - 70);
    this.VidasBossEnemie2text.setPosition(this.bombBoss2.x - 100, this.bombBoss2.y - 70);
    this.VidasBossEnemie3text.setPosition(this.bombBoss3.x - 100, this.bombBoss3.y - 70);
    var cursors = this.cursors;
    var player = this.player;
    var emitter = this.emitter;
    var bomb = this.bomb;
    var murodestruible = this.murodestruible;
    var MurosParaSubEnemie1 = this.MurosParaSubEnemie1;
    var coliderbeam2 = this.coliderbeam2;
    var platform_move = this.platform_move;
    var piso=this.piso;

  //  var BalaConseguida = this.BalaConseguida;
   var Puntos = this.Puntos;
    if (Phaser.Input.Keyboard.JustDown(this.T)) {
        console.log('la x del jugador es ' + player.x)
        console.log('la y del jugador es ' + player.y)
    }


    if (player.x >=2200 && player.x <3000 && player.y>=4600 && player.y <5000) {
      this.MurosParaSubEnemie1();

    }

    if (player.x >= 8738 && player.x < 9200) { //para this.bombBoss1
    //this.myCam.stopFollow(player, true, 0.1, 0.1);
        this.MurosParaBossEnemie1();
    } if (player.x >= 8738) { //para this.bombBoss1
        this.muroParaSoporteBoss1.destroy();
        this.muroParaSoporteBoss2.destroy();}
    if (player.x <= 8368) { //para this.bombBoss1
        this.bombBoss1.setVelocityX(400);}

    if (player.x >= 10560 && player.x < 11949 && player.y >= 4829 && player.y < 5000) { //para this.bombBoss2
        //this.myCam.stopFollow(player, true, 0.1, 0.1);
        this.MurosParaBossEnemie2();
    }

    if (player.x >= 10716 && player.x < 11417 && player.y >= 2579 && player.y < 2829) { //para this.bombBoss3
        //this.myCam.stopFollow(player, true, 0.1, 0.1);
        this.MurosParaBossEnemie3();
    }


    if (Vidabola <= 0) {
        bomb.destroy();
    }

    if (Vidabola <= 0) {
        murodestruible.destroy();
    }
    if (VidasubEnemie1 == 0 ) {
        this.SubEnemy1.destroy();
        this.MurosParaSubEnemie2.destroy();
        VidasubEnemie1text.destroy();
        Vida ++;
        this.Vidatext.text = "Vidas: " + Vida;
        this.myCam.shake(500);
        VidasubEnemie1=-1;
    }

     if (VidaBossEnemie1 == 0) {
        this.bombBoss1.destroy();
        this.MurosParaSubEnemie4.destroy();
        this.VidasBossEnemie1text.destroy();
        Vida+=3;
        this.Vidatext.text = "Vidas: " + Vida;
        this.myCam.shake(500);
        VidaBossEnemie1 = -1;
        ParteDeLLave1Adquirida = true;
        ParteDeLLave2Adquirida = false;
        this.PartesDeLLave();


    }

    if (VidaBossEnemie2 == 0) {
        this.bombBoss2.destroy();
        this.MurosParaSubEnemie5.destroy();
        this.VidasBossEnemie2text.destroy();
        Vida+=3;
        this.Vidatext.text = "Vidas: " + Vida;
        this.myCam.shake(500);
        VidaBossEnemie2 = -1;
        ParteDeLLave2Adquirida = true;
        this.PartesDeLLave();

    }

    if (VidaBossEnemie3 == 0) {
        this.bombBoss3.destroy();
        this.MurosParaSubEnemie6.destroy();
        this.VidasBossEnemie3text.destroy();
        Vida+=3;
        this.Vidatext.text = "Vidas: " + Vida;
        this.myCam.shake(500);
        VidaBossEnemie3 = -1;
        ParteDeLLave2Adquirida = true;
        ParteDeLLave1Adquirida = true;
        ParteDeLLave2Adquirida = true;
        ParteDeLLave3Adquirida = true;
        this.PartesDeLLave();
    }

    if (ParteDeLLave3Adquirida == true && player.x >= 10196 && player.x <= 10197 && player.y <= 3289 && player.y >= 2800 ){
        this.Murofinal.destroy();
        this.llaveMuro1.destroy();
        this.llaveMuro2.destroy();
        this.llaveMuro3.destroy();
        this.myCam.shake(500);
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

    if (VidaBossEnemie3 <= 0 && this.RecogerCogerDash){
        this.Dash = this.add.image(50, 550, 'Dash').setDepth(1).setScrollFactor(0);
    }

    if(player.y >= 4975){//cuando el jugador llegue más abajo que la camara en 5000
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
            VidaBossEnemie1 = 10;
            VidaBossEnemie2 = 15;
            VidaBossEnemie3 = 20;
            Deslizconseguido=false;


    }

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
    //Teclado de espacio sigue al jugador


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
    if (Phaser.Input.Keyboard.JustDown(this.up) && player.body.touching.down) {
        player.setVelocityY(-425);
        //SOUND OF THE PLAYER WHEN JUMP
        SoundJumpPlayer1.play({ volume: 0.2 });
    }
    if (player.body.touching.right && doblesalto==true) {
        this.player.setVelocityY(20);
        this.contadorSalto = 0;
        console.log('ese =', this.contadorSalto);
        SoundJumpPlayer1.stop();
    }
    if (player.body.touching.left && doblesalto == true) {
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

    if(player.x>=5000){
        this.enemie1_salta.setGravity(0, 0);
        this.enemie2_salta.setGravity(0, 0);

    }else{
        this.enemie1_salta.setGravity(0, -300);
        this.enemie2_salta.setGravity(0, -300);
    }
    if (player.x >= 6800) {
        this.enemie3_salta.setGravity(0, 0);
    } else {
        this.enemie3_salta.setGravity(0, -300);
    }





    if (this.enemie1_salta.body.touching.down){
        const randomVelocity = (Math.random() * 150);
        const headsOrTails = (Math.random() > 0.5);
        this.enemie1_salta.setVelocityY(-300);
        if (headsOrTails) {
            this.enemie1_salta.body.setVelocityX(randomVelocity);}
        else{
            this.enemie1_salta.body.setVelocityX(-randomVelocity);}
    }
    if (this.enemie2_salta.body.touching.down) {
        const randomVelocity2 = (Math.random() * 100);
        const headsOrTails2 = (Math.random() > 0.5);
        this.enemie2_salta.setVelocityY(-300);
        if (headsOrTails2) {
            this.enemie2_salta.body.setVelocityX(randomVelocity2);
        }
        else {
            this.enemie2_salta.body.setVelocityX(-randomVelocity2);
        }
    }
    if (this.enemie3_salta.body.touching.down) {
        const randomVelocity3 = (Math.random() * 150);
        const headsOrTails3 = (Math.random() > 0.5);
        this.enemie3_salta.setVelocityY(-300);
        if (headsOrTails3) {
            this.enemie3_salta.body.setVelocityX(-randomVelocity3);
        }
        else {
            this.enemie3_salta.body.setVelocityX(randomVelocity3);
        }
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
    if (this.enemie4.x <= 4200) { this.enemie4.flipX = true; }
    if (this.enemie4.x >= 4400) { this.enemie4.flipX = false; }
    if (this.enemie5.x <= 4700) { this.enemie5.flipX = true; }
    if (this.enemie5.x >= 4900) { this.enemie5.flipX = false; }
    if (this.enemie6.x <= 4200) { this.enemie6.flipX = true; }
    if (this.enemie6.x >= 4400) { this.enemie6.flipX = false; }
    if (this.enemie7.x <= 4700) { this.enemie7.flipX = true; }
    if (this.enemie7.x >= 4900) { this.enemie7.flipX = false; }
    if (this.enemie8.x <= 4500) { this.enemie8.flipX = true; }
    if (this.enemie8.x >= 4600) { this.enemie8.flipX = false; }
    if (this.bombBoss2.x <= 10600) { this.bombBoss2.flipX = true; }
    if (this.bombBoss2.x >= 11331) { this.bombBoss2.flipX = false; }
    if (this.bombBoss3.x <= 10732) { this.bombBoss3.flipX = true; }
    if (this.bombBoss3.x >= 11382) { this.bombBoss3.flipX = false; }

    this.background.tilePositionX = this.myCam.scrollX * .10;
    //this.profundo.tilePositionX = this.myCam.scrollX * .10;

    if( player.x >=2300 && player.x <2850 && player.y>=4500 && player.y <5000 && time > lastFired2&&VidasubEnemie1>=1){
        var balaSubenemie = this.balasdeSubenemie.get();balaSubenemie.body.setGravityY(-150);

        if(balaSubenemie){
            balaSubenemie.fire(this.SubEnemy1.x,this.SubEnemy1.y);
            lastFired2 = time + 1000;

        }

    }

    if (player.x >= 10519 && player.x < 11949 && player.y >= 4500 && player.y < 5000 && time > lastFired3 && VidaBossEnemie2 >= 1) {
        var balaSubenemie = this.balasdeSubenemie.get(); balaSubenemie.body.setGravityY(-150);
        if (balaSubenemie) {
            balaSubenemie.fire(this.bombBoss2.x, this.bombBoss2.y);
            lastFired3 = time + 1000;
            if (this.bombBoss2.x <= 11220) {
            balaSubenemie.flipX = true;
                balaSubenemie.body.velocity.x = 850;
                balaSubenemie.fire(this.bombBoss2.x + 30, this.bombBoss2.y);
            }

        }

    }
    if (player.x >= 10716 && player.x < 11417 && player.y >= 2579 && player.y < 2829 && time > lastFired3 && VidaBossEnemie3 >= 1) {
        var balaSubenemie = this.balasdeSubenemie.get(); balaSubenemie.body.setGravityY(-150);
        if (balaSubenemie) {
            balaSubenemie.fire(this.bombBoss3.x, this.bombBoss3.y);
            lastFired3 = time + 1000;
            if (this.bombBoss3.x <= 11220) {
                balaSubenemie.flipX = true;
                balaSubenemie.body.velocity.x = 850;
                balaSubenemie.fire(this.bombBoss3.x + 30, this.bombBoss3.y);
            }

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
            lastFired = time + 250;

           // time.add(100,resetbala, this);
        }
        if(this.left.isDown){
            beam.flipX = true;
            beam.body.velocity.x = -250;
        }
        tiempobala=setTimeout(()=>{
          beam.destroy();
        },1000);

    }

   // var resetbala=function resetbala(){beam.destroy(); }
    for (var i = 0; i < this.projectiles.getChildren().length; i++) {
        var beam = this.projectiles.getChildren()[i];
        beam.update();}
    if (beam <= player.x + 100) {
        beam.destroy();
        console.log('funciono');
    }

}
//Final del Update
}
