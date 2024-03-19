// instruction6.js
class instruction6 extends Phaser.Scene {
    constructor() {
        super('instruction6');
    }

    preload() {
        // Preload the instruction image
        this.load.image('instruction6', 'assets/instruction06.jpg');
    }

    create() {
        // Display the instruction image
        const instructionImg = this.add.image(0, 0, 'instruction6');

        // Scale the image to fit the screen
        const scaleX = this.game.config.width / instructionImg.width;
        const scaleY = this.game.config.height / instructionImg.height;
        instructionImg.setScale(scaleX, scaleY);

        // Center the image on the screen
        instructionImg.setOrigin(0.5); // Set the origin to the center of the image
        instructionImg.setPosition(this.game.config.width / 2, this.game.config.height / 2);

        // Listen for the spacebar press to start instruction2
        this.input.keyboard.on('keydown-SPACE', function () {
            console.log("Spacebar pressed, goto level3");
            this.scene.start('level3');
        }, this);
    }
}
