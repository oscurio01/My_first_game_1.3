class optionplay extends Phaser.Scene {
    constructor() {
        super("optionGame");
    }
 create(){
    var VELOCIDAD=10;
    this.VELOCIDAD = VELOCIDAD;
     let MenuButton = this.add.image(this.game.renderer.width / 10, this.game.renderer.height / 1.2, "menuButton").setDepth(1);
    
     MenuButton.setInteractive();

     MenuButton.on("pointerup", () => {
         this.scene.stop("optionGame");
         this.scene.start("bootGame");
         console.log("ok")
     })

     var player = this.physics.add.sprite(100, 200, 'dude');

     player.setSize(20, 30);
     player.setBounce(0.2);
     player.setCollideWorldBounds(true);
     player.body.setGravityY(300);

     
     
     var tecladoimg = this.physics.add.staticGroup();

    tecladoimg.create(100, 400, 'tecladoimg').setScale(1);

    var platformnegro = this.physics.add.staticGroup();
     platformnegro.create(400, 230, 'platformnegro').setOrigin(0);

     this.physics.add.collider(player, platformnegro);

     this.anims.create({
         key: 'left',
         frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 1 }),
         frameRate: 10,
         repeat: -1
     });

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


     var lefteclado = this.add.sprite(68, 415, 'tecladoa');
     var righteclado = this.add.sprite(135, 415, 'tecladod');
     var upteclado = this.add.sprite(100, 385, 'tecladow');
     /*
     Para la animación del teclado de movimiento
     */
     this.anims.create({
         key: 'lefteclado1',
         frames: [{ key: 'tecladoa', frame: 0 }],
         frameRate: 20
     });
     this.anims.create({
         key: 'lefteclado2',
         frames: [{ key: 'tecladoa', frame: 1 }],
         frameRate: 20
     });

     this.anims.create({
         key: 'righteclado1',
         frames: [{ key: 'tecladod', frame: 0 }],
         frameRate: 20
     });
     this.anims.create({
         key: 'righteclado2',
         frames: [{ key: 'tecladod', frame: 1 }],
         frameRate: 20
     });

     this.anims.create({
         key: 'upteclado1',
         frames: [{ key: 'tecladow', frame: 0 }],
         frameRate: 20
     });
     this.anims.create({
         key: 'upteclado2',
         frames: [{ key: 'tecladow', frame: 1 }],
         frameRate: 20
     });

     // add player
     var enemy = this.physics.add.sprite(100, 150, 'enemy')/*.setScale(2)*/;

     enemy.setSize(20, 30);
     enemy.setBounce(0.2);
     enemy.setCollideWorldBounds(true);
     enemy.body.setGravityY(-300);
     // create an animation for the player

     this.anims.create({
         key: 'fly',
         frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 3 }),
         frameRate: 10,
         repeat: -1
     });

     //this.enemy = enemy;
     enemy.play('fly', true);

     let movenemy1 = this.tweens.timeline({
         targets: enemy,
         ease: 'lineal',
         duration: 2000,
         loop: -1,

         tweens: [
             { x: 500, }, { x: 100, },]
     });
     this.enemy= enemy;


     this.cursors = this.input.keyboard.createCursorKeys();

     this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
     this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
     this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
     this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
     this.player = player;

     this.lefteclado = lefteclado;
     this.righteclado = righteclado;
     this.upteclado = upteclado;


     let contenedor2 = this.add.container(150, 400);
     contenedor2.fixedToCamera = true;
     let Instrucion = this.add.text(10, 10, 'saltar presiona W', { fontSize: '30px', fill: '#0d91fc' });
     let movetederecha = this.add.text(10, 60, 'moverte a la derecha presiona D', { fontSize: '30px', fill: '#0d91fc' });
     let moveteizquierda = this.add.text(10, 120, 'moverte a la izquierda presiona A', { fontSize: '30px', fill: '#0d91fc' });

     contenedor2.add([Instrucion, movetederecha, moveteizquierda]);

     this.projectiles = this.add.group();
 }

    update(time, delta) {
    var enemy = this.enemy;
     var cursors = this.cursors;
     var player = this.player;
     var lefteclado = this.lefteclado;
     var righteclado = this.righteclado;
     var upteclado = this.upteclado;
     //var VELOCIDAD = this.VELOCIDAD;
    if(enemy.x>=500){
        this.enemy.flipX = false;
        console.log('derecha');
     }
    
      if(enemy.x<=100){
          this.enemy.flipX = true;
        console.log('izquierda');
      }
      //enemy.x+=VELOCIDAD;


        let SoundJumpPlayer1 = this.sound.add('Jump1Audio');

        if (this.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play('left', true);
            lefteclado.anims.play('lefteclado2', true);
            //this.background.tilePositionX -= 1.5;
        }
        else if (this.right.isDown) {
            player.setVelocityX(160);

            player.anims.play('right', true);
            righteclado.anims.play('righteclado2', true);
            //this.background.tilePositionX += 1.5;
        }
        else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (this.up.isDown && player.body.touching.down) {
            player.setVelocityY(-430);
            //SOUND OF THE PLAYER WHEN JUMP
            SoundJumpPlayer1.play();
            upteclado.anims.play('upteclado2', true);

        }

        if (this.left.isUp) {
            lefteclado.anims.play('lefteclado1', true);
        }

        if (this.right.isUp) {
            righteclado.anims.play('righteclado1', true);
        }

        if (this.up.isUp) {
            upteclado.anims.play('upteclado1', true);
        }
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            // 2.1 call a function to create a beam instance
            this.shootBeam();

        }
        for (var i = 0; i < this.projectiles.getChildren().length; i++) {
            var beam = this.projectiles.getChildren()[i];
            beam.update();
        }
 }
    shootBeam() {
        // 4.2 add the beam to the croup
        var beam = new disparo(this);
    }

}