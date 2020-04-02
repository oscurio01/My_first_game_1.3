var balaSubenemie = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function balaSubenemie(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'SubEnemieDisparo');
            this.balaSubenemie = new Scene2(balaSubenemie);
            
            this.speed = Phaser.Math.GetSpeed(400, 0.7);
            
            /*if(subEnemies.y<=4800){this.speed = Phaser.Math.GetSpeed(200, 0.7);}else{*///}
        },

    fire: function (x, y) {
        this.setPosition(x -10, y);
        balaSubenemie.flipX = true;
        this.setActive(true);
        this.setVisible(true);
    },

    update: function (time, delta) {
        
        this.x -= this.speed * delta;//TODO:retocar esto para mover el disparo enemigo de dercha a izquierda

    }

}); 