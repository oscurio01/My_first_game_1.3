export class UI extends Phaser.Scene {
    actual_life
    constructor() {
        super("UI");}
    
    init(){
        console.log('UI');
    }
    create(){
        this.registry.events.on('vida', (life) =>{
            console.log(life);
        });

    }
}