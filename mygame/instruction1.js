// instruction1.js
class instruction1 extends Phaser.Scene {
    constructor() {
        super('instruction1');
    }

    init() {
        // Stop any playing music when entering instruction1
        this.sound.stopAll();
    }

    preload() {
        // Preload the instruction image
        this.load.image('instruction1', 'assets/instruction01.jpg');
        this.load.audio('bg1', 'assets/bg1.mp3');
    }

    create() {
        // Play the background music for instruction1
        this.bg1 = this.sound.add('bg1', { loop: true });
        this.bg1.play();
    
        // Display the instruction image
        const instructionImg = this.add.image(0, 0, 'instruction1');

        // Scale the image to fit the screen
        const scaleX = this.game.config.width / instructionImg.width;
        const scaleY = this.game.config.height / instructionImg.height;
        instructionImg.setScale(scaleX, scaleY);

        // Center the image on the screen
        instructionImg.setOrigin(0.5); // Set the origin to the center of the image
        instructionImg.setPosition(this.game.config.width / 2, this.game.config.height / 2);

        // Listen for the spacebar press to start instruction2
        this.input.keyboard.on('keydown-SPACE', function () {
            console.log("Spacebar pressed, goto instruction2");
            this.scene.start('instruction2');
        }, this);
    }
}
