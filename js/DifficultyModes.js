class DifficutlyModes extends Phaser.Scene {
    constructor() {
        super("SelectDifficulty");
    }


create(){

    console.log('hola');

    let Easy = this.add.image(this.game.renderer.width / 2.1, this.game.renderer.height / 4, "easyButton").setDepth(1);

    let Medium = this.add.image(this.game.renderer.width / 2.1, this.game.renderer.height / 2.5, "mediumButton").setDepth(1);

    let Hard = this.add.image(this.game.renderer.width / 2.1, this.game.renderer.height / 1.9, "hardButton").setDepth(1);

    let MeatBoy = this.add.image(this.game.renderer.width / 2.1, this.game.renderer.height / 1.5, "MeatboyButton").setDepth(1);

    let hoverSprite2 = this.add.sprite(100, 100, "dude").setVisible(false);

    this.anims.create({
        key: "walk",
        frameRate: 4,
        repeat: -1, //repeat forever,
        frames: this.anims.generateFrameNumbers("dude", {
            frames: [2, 3]
        })
    });

    this.DifficultyText = this.add.text(150, 50, 'Set the difficulty', { fontSize: '30px', fill: '#0d91fc' }).setDepth(1);;
  
    this.cameras.main.fadeIn(250); //Para el difuminado del principio
    Easy.setInteractive();

    Easy.on("pointerup", () => {
        this.scene.stop("SelectDifficulty");
        this.scene.start("playGame");
        this.cameras.main.fadeIn(550);
        Vida=10;
        console.log("ok")
    })

    Easy.on("pointerover", () => {
        hoverSprite2.setVisible(true);
        hoverSprite2.play("walk");
        hoverSprite2.x = Easy.x - Easy.width;
        hoverSprite2.y = Easy.y;

    })


    Easy.on("pointerout", () => {
        hoverSprite2.setVisible(false);
        console.log("adios")

    })

    Medium.setInteractive();

    Medium.on("pointerup", () => {
        this.scene.stop("SelectDifficulty");
        this.scene.start("playGame");
        console.log("ok");
        Vida=5;
    })

    Medium.on("pointerover", () => {
        hoverSprite2.setVisible(true);
        hoverSprite2.play("walk");
        hoverSprite2.x = Medium.x - Medium.width;
        hoverSprite2.y = Medium.y;

    })


    Medium.on("pointerout", () => {
        hoverSprite2.setVisible(false);


    })

    Hard.setInteractive();

    Hard.on("pointerup", () => {
        this.scene.stop("SelectDifficulty");
        this.scene.start("playGame");
        console.log("ok");
        Vida=3;
    })

    Hard.on("pointerover", () => {
        hoverSprite2.setVisible(true);
        hoverSprite2.play("walk");
        hoverSprite2.x = Hard.x - Hard.width;
        hoverSprite2.y = Hard.y;

    })


    Hard.on("pointerout", () => {
        hoverSprite2.setVisible(false);


    })

    MeatBoy.setInteractive();

    MeatBoy.on("pointerup", () => {
        this.scene.stop("SelectDifficulty");
        this.scene.start("playGame");
        console.log("ok");
        Vida=1;
    })

    MeatBoy.on("pointerover", () => {
        hoverSprite2.setVisible(true);
        hoverSprite2.play("walk");
        hoverSprite2.x = MeatBoy.x - MeatBoy.width;
        hoverSprite2.y = MeatBoy.y;

    })


    MeatBoy.on("pointerout", () => {
        hoverSprite2.setVisible(false);


    })


}

}
