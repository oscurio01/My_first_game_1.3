
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [Scene1, Scene2, optionplay],
};

var game = new Phaser.Game(config);
var GameText;
var BolasDeHierro;
var Puntos = 0;
var contadorSalto = 0;
var gameOver = false;
var PuntosText = null;
var Vida = 10;
var Vidatext = null;
var bomba;
var tecladoimg;
var lefteclado;
var righteclado;
var upteclado;
var enemy;
var grupoEnemy;



