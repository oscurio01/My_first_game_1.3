
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
    scene: [Scene1, Scene2, optionplay, DifficutlyModes],
};

var game = new Phaser.Game(config);
//Es la variable del text gameover
var GameText;

var murodestruible;

var BolasDeHierro;
//es la variable de las balas
var disparonavSprites;

var lastFired = 0;//EL delay puesto en la bala

var BalaConseguida = false;//es la variable que indica que has recogido el objeto bala y podras empezar a disparar
//es la variable del tiempo que tarda la bala en salir 
var tiempobala = 0;
//var contadorSalto = 0;
//Es la variable del gameover
var gameOver = false;
//es la variable del text puntos
var PuntosText = null;
//Es la variable que pone la vida
var Vida = 10;
//vida de la bola
var Vidabola=5;
//
var doblesalto= false;
//Es la variable del texto vida
var Vidatext = null;
//Es la variable de la pelota que mata al jugador
var bomba;
//Es la variable del muro que se destruye para pasar a siguiente escena
var murodestruido = false;
//Es la variable para ver la imagen  del WASD sin presionarse
var tecladoimg;
//Es la variable para que el sprite de opciones "A" detecte que se esta presionando
var lefteclado;
//Es la variable para que el sprite de opciones "D" detecte que se esta presionando
var righteclado;
//Es la variable para que el sprite de opciones "W" detecte que se esta presionando
var upteclado;
//Es la variable donde se crea el enemigo
var enemy;
//Es el grupo donde va enemy
var grupoEnemy;
//Vidas de un sub boss
var VidasubEnemie=20;
//es la variable de las balas
var disparonavSprites;
//es la variable del tiempo que tarda la bala en salir 
var tiempobala = 0;


