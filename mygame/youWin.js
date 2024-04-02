// youWin.js
class youWin extends Phaser.Scene {
    constructor() {
        super('youWin');
    }

    preload() {
        // Preload the instruction image
        this.load.image('youWin', 'assets/youWin.jpg');
    }

    create() {
        // Display the instruction image
        const instructionImg = this.add.image(0, 0, 'youWin');
    
        // Scale the image to fit the screen
        const scaleX = this.game.config.width / instructionImg.width;
        const scaleY = this.game.config.height / instructionImg.height;
        instructionImg.setScale(scaleX, scaleY);
    
        // Center the image on the screen
        instructionImg.setOrigin(0.5); // Set the origin to the center of the image
        instructionImg.setPosition(this.game.config.width / 2, this.game.config.height / 2);
    
        // Generate a random code
        const randomCode = this.generateRandomCode();
    
        // Display the random code on the screen
        const codeText = this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 2 + 15,
            `${randomCode}`,
            { fontFamily: 'Arial', fontSize: '70px', color: '#2A72B9' }
        );
        codeText.setOrigin(0.5); // Set the origin to the center of the text
    
        // Listen for the spacebar press to start instruction2
        this.input.keyboard.on('keydown-SPACE', function () {
            console.log("Spacebar pressed, goto instruction1");
            this.scene.start('instruction1');
        }, this);
    }
    
    generateRandomCode() {
        // Generate a random code (e.g., a random number or string)
        // For example, you can use Math.random() to generate a random number
        // Convert it to a string if needed
        const randomCode = Math.floor(Math.random() * 1000000).toString();
        return randomCode;
    }
}    
