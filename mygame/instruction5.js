// instruction5.js
class instruction5 extends Phaser.Scene {
    constructor() {
        super('instruction5');
    }

    preload() {
        // Preload the instruction image
        this.load.image('instruction5', 'assets/instruction05.jpg');
    }

    create() {
        // Display the instruction image
        const instructionImg = this.add.image(0, 0, 'instruction5');

        // Scale the image to fit the screen
        const scaleX = this.game.config.width / instructionImg.width;
        const scaleY = this.game.config.height / instructionImg.height;
        instructionImg.setScale(scaleX, scaleY);

        // Center the image on the screen
        instructionImg.setOrigin(0.5); // Set the origin to the center of the image
        instructionImg.setPosition(this.game.config.width / 2, this.game.config.height / 2);

        // Listen for the spacebar press to start instruction2
        this.input.keyboard.on('keydown-SPACE', function () {
            console.log("Spacebar pressed, goto level2");
            this.scene.start('level2');
        }, this);
    }
}
