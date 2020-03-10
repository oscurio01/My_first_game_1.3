var balaSubenemie = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function balaSubenemie(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'SubEnemieDisparo');

            
            /*if(subEnemies.y<=4800){this.speed = Phaser.Math.GetSpeed(200, 0.7);}else{*/this.speed = Phaser.Math.GetSpeed(400, 0.7);//}
        },

    fire: function (x, y) {
        this.setPosition(x -10, y);

        this.setActive(true);
        this.setVisible(true);
    },

    update: function (time, delta) {
        this.x -= this.speed * delta;

    }

});