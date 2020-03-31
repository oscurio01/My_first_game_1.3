
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

var lastFired2 = 0;

var delay1= 0;

var BalaConseguida = false;//es la variable que indica que has recogido el objeto bala y podras empezar a disparar

var tiempobala = 0;//es la variable del tiempo que tarda la bala en salir 

var Deslizconseguido= false; //La variable para poder hacer un Dash(desliz)

var gameOver = false;//Es la variable del gameover

var PuntosText = null;//es la variable del text puntos

ParteDeLLave1Adquirida =true;

ParteDeLLave2Adquirida = true;

ParteDeLLave3Adquirida = false;

var Vida = 10;//Es la variable que pone la vida

var Vidabola=5;//vida de la bola

var doblesalto= false;//la variable para poder hacer doble salto
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
var VidasubEnemie1 = 20;
var VidaBossEnemie1 = 10;
var VidaBossEnemie2 = 15;
var VidaBossEnemie3 = 20;
var VidaBossEnemie4 = 25;

//es la variable del tiempo que tarda la bala en salir 
var tiempobala = 0;
