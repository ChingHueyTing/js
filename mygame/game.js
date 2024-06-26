var config = {
    type: Phaser.AUTO,
    ////// pixel size * tile map size 
    width: 32 * 20,
    height:32 * 20,
    /////////////////////////////////////////
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    //// Add all scenes below in the array
    scene: [instruction1, instruction2, instruction3, instruction4, gameOver, level1, instruction5, level2, instruction6, instruction6no2, level3, instruction7, level4, youWin]
};

var game = new Phaser.Game(config);


window.yellow=0
window.pink=0
