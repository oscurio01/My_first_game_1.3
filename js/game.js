
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Scene1, Scene2],
};

var game = new Phaser.Game(config);
var GameText;
var BolasDeHierro;
var Puntos = 0;
var gameOver = false;
var PuntosText;
