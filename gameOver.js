class gameOver extends Phaser.Scene {
    constructor() {
        super('gameOver');
    }

    preload() {
        this.load.image('gameOver', 'assets/gameOver.jpg');
    }

    create(data) {
        console.log("gameOver scene created. Received data:", data); // Debugging

        const instructionImg = this.add.image(0, 0, 'gameOver');
        const scaleX = this.game.config.width / instructionImg.width;
        const scaleY = this.game.config.height / instructionImg.height;
        instructionImg.setScale(scaleX, scaleY);
        instructionImg.setOrigin(0.5);
        instructionImg.setPosition(this.game.config.width / 2, this.game.config.height / 2);

        // Listen for the spacebar press to restart the current level
        this.input.keyboard.on('keydown-SPACE', function () {
            console.log("Spacebar pressed, restart level " + data.level);
            this.scene.start('level' + data.level);
        }, this);
        
        console.log("Spacebar event listener added."); // Debugging
    }
}
