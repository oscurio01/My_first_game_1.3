class optionplay extends Phaser.Scene {
    constructor() {
        super("optionGame");
    }

    create(){
    var player2 = this.add.sprite(100, 200, 'dude');

player2.setSize(20, 30);
//player2.setBounce(0.2);
//player2.setCollideWorldBounds(false);
//player2.body.setGravityY(300);
        var tecladoimg = this.add.group();

        tecladoimg.create(100, 400, 'tecladoimg').setScale(1);;
        
    }
}