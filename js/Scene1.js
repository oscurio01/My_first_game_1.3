class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }


/*
  ============    =========   ========   =          =====      =======  ======
    =         =    =       =   =         =         =      =    =     =  =     =
    =        =     =       =   =         =        =        =   =     =  =      =
    =========      ========    =======   =        =        =   =======  =       =
    =              =     =     =         =        =        =   =     =  =      =
    =              =      =    =         =         =      =    =     =  =     =
    =              =       =   ========  ========   =====      =     =  ======

*/
preload() {
    //this line is for load the images what you wanna see on your game
    this.load.image('background', 'assets/images/fondo.jpg');

    this.load.image('profundo', 'assets/images/title_bg.jpg');

    this.load.image('plataforma', 'assets/images/platform.png');

    this.load.image('plataforma2_move', 'assets/images/platform.png');

    this.load.image('plataforma_recta', 'assets/images/platform_right.png');

    this.load.image('suelo', 'assets/images/ground.png');

    this.load.image('suelo_medio', 'assets/images/ground_middle.png');

    this.load.image('suelo_largo', 'assets/images/ground_large.png');

    this.load.image('pinchos', 'assets/images/pinchos2.png');

    this.load.image('pinchosmini', 'assets/images/pinchos2mini.png');

    this.load.image('pinchosmini_large', 'assets/images/pinchos2mini_large.png');

    this.load.image('pinchosmini_extra_large', 'assets/images/pinchos2mini_extra_large.png');

    this.load.spritesheet('dude', 'assets/images/woof2.png', { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet("enemy", "assets/images/bee.png", { frameWidth: 37, frameHeight: 39});

    this.load.spritesheet("disparo", "assets/images/41.png", { frameWidth: 32, frameHeight: 32 });

    this.load.image('logo_gamma', 'assets/images/rose1.png');

    this.load.image('bomb', 'assets/images/BolaVa1.png');

    this.load.image('playButton', 'assets/images/play_button.png');

    this.load.image('configButton', 'assets/images/options_button.png');

    this.load.image('menuButton', 'assets/images/Menu_button.png');

    this.load.image('platformnegro', 'assets/images/platformnegro.png');

    this.load.image('tecladoimg', 'assets/images/tecladowasd1.png');

    this.load.spritesheet('tecladow', 'assets/images/tecladow1.png', { frameWidth: 32.5, frameHeight: 30 });

    this.load.spritesheet('tecladoa', 'assets/images/tecladoa1.png', { frameWidth: 32.5, frameHeight: 30 });

    this.load.spritesheet('teclados', 'assets/images/teclados1.png', { frameWidth: 32.5, frameHeight: 30 });

    this.load.spritesheet('tecladod', 'assets/images/tecladod1.png', { frameWidth: 32.5, frameHeight: 30 });


    this.load.spritesheet('snowflakes', 'assets/images/snowflakes.png', { frameWidth: 17, frameHeight: 17 });

    this.load.spritesheet('snowflakes_large', 'assets/images/snowflakes_large.png', { frameWidth: 64, frameHeight: 64 });
    //load the audio for objects
    this.load.audio('Jump1Audio', 'assets/audio/jump_player.mp3');
    this.load.audio('musica_fondo_audio', 'assets/audio/padoru_padoru.mp3');
    this.load.audio('impacto_violin_audio', 'assets/audio/tenso_violinfuerte.mp3');
    this.load.audio('MovePlayer1_audio', 'assets/audio/walkSnowPlayer21.mp3');


    let loadingBar = this.add.graphics({
        fillStyle: {
            color: 0xff0101 //white
    }
    })
    this.load.on("progress", (percent) => {
        loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
    })

    this.load.on("complete", () => {
        console.log("done")
    })

}


create() {
    
    let playButton = this.add.image(this.game.renderer.width / 2.1, this.game.renderer.height / 2, "playButton").setDepth(1);

    let optionButton = this.add.image(this.game.renderer.width / 2.1, this.game.renderer.height / 1.5, "configButton").setDepth(1);

    let hoverSprite = this.add.sprite(100, 100, "dude").setVisible(false);

    this.anims.create({
        key: "walk",
        frameRate: 4,
        repeat: -1, //repeat forever,
        frames: this.anims.generateFrameNumbers("dude", {
            frames: [2, 3]
        })
    });

    this.BetaText = this.add.text(550, 550, 'Beta 1.3.5', { fontSize: '30px', fill: '#0d91fc' }).setDepth(1);;
    //this.scene.start("playGame");

  // this.prefondotry = this.add.tileSprite(0, 0, config.width, config.height, "prefondotry").setOrigin(0);

    this.cameras.main.fadeIn(250); //Para el difuminado del principio
    playButton.setInteractive();

    playButton.on("pointerup", () =>{
        this.scene.stop("bootGame");
        this.scene.start("playGame");
        this.cameras.main.fadeIn(550);
        Vida = 10;
        console.log("ok")
    })

    playButton.on("pointerover", () => {
        hoverSprite.setVisible(true);
        hoverSprite.play("walk");
        hoverSprite.x = playButton.x - playButton.width;
        hoverSprite.y = playButton.y;

    })
    

    playButton.on("pointerout", () => {
        hoverSprite.setVisible(false);
        console.log("adios")
        
    })

    optionButton.setInteractive();

    optionButton.on("pointerup", () =>{
        this.scene.start("optionGame");
        this.scene.stop("bootGame");
        console.log("ok")
    })

    optionButton.on("pointerover", () => {
        hoverSprite.setVisible(true);
        hoverSprite.play("walk");
        hoverSprite.x = optionButton.x - optionButton.width;
        hoverSprite.y = optionButton.y;

    })
    

    optionButton.on("pointerout", () => {
        hoverSprite.setVisible(false);
        
        
    })


    GameText = this.add.text(this.game.renderer.width / 2.1 -155, this.game.renderer.height / 2 - 100, 'The Pink Dog', {
        font: 'bold 48px Arial',
        fill: '#da22d3',

    }).setDepth(1);
}


}