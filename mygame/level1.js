class level1 extends Phaser.Scene {
  constructor() {
    super({ key: "level1" });
    this.score = 0;
    window.yellow = 0
    window.pink = 0
  }


  
  preload() {
    this.load.tilemapTiledJSON("map1", "assets/forest.tmj");

    // Step 2 : Preload any images here
    this.load.image("pixelimg", "assets/pixel.png");
    this.load.image("houseimg", "assets/house.png");
    this.load.image("heart1", "assets/heart.png"); 
    this.load.image("heart2", "assets/heart.png"); 
    this.load.image("heart3", "assets/heart.png"); 
    this.load.audio('collect', 'assets/collect.mp3');
    this.load.audio('bg1', 'assets/bg1.mp3');
    this.load.spritesheet("enemy1", "assets/enemy.png", {
      frameWidth: 564,
      frameHeight: 564,
    }); 
    this.load.spritesheet("enemy2", "assets/enemy.png", {
      frameWidth: 564,
      frameHeight: 564,
    }); 
    this.load.spritesheet("maincharacter", "assets/maincharacter.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("bigBoss", "assets/bigBoss.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("yellow1", "assets/yellow.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("yellow2", "assets/yellow.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("yellow3", "assets/yellow.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

  } // end of preload //

  create() {

    this.bg1 = this.sound.add('bg1', { loop: true });
    this.bg1.play();
    
    console.log("level1");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "map1" });

    // Step 4 Load the game tiles
    //1st parameter is name in Tiled,
    //2nd parameter is key in Preload
    let pixelTiles = map.addTilesetImage("pixel", "pixelimg");
    let houseTiles = map.addTilesetImage("house", "houseimg");

    //Step 5  create an array of tiles
    let tilesArray = [pixelTiles, houseTiles];

    // Step 6  Load in layers by layers

    this.floorLayer = map.createLayer("floor", tilesArray, 0, 0);
    this.walkingLayer = map.createLayer("walking", tilesArray, 0, 0);
    this.waterLayer1 = map.createLayer("waterLayer1", tilesArray, 0, 0);
    this.waterLayer2 = map.createLayer("waterLayer2", tilesArray, 0, 0);
    this.flowerLayer = map.createLayer("flower", tilesArray, 0, 0);
    this.bridgeLayer = map.createLayer("bridge", tilesArray, 0, 0);
    this.treeLayer2 = map.createLayer("treeLayer2", tilesArray, 0, 0);
    this.treeLayer1 = map.createLayer("treeLayer1", tilesArray, 0, 0);
    this.wallLayer = map.createLayer("wall", tilesArray, 0, 0);

    this.physics.world.bounds.width = this.walkingLayer.width;
    this.physics.world.bounds.height = this.walkingLayer.height;

    this.anims.create({
      key: "maincharacter-up",
      frames: this.anims.generateFrameNumbers("maincharacter", {
        start: 105,
        end: 112,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "maincharacter-left",
      frames: this.anims.generateFrameNumbers("maincharacter", {
        start: 118,
        end: 125,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "maincharacter-down",
      frames: this.anims.generateFrameNumbers("maincharacter", {
        start: 131,
        end: 138,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "maincharacter-right",
      frames: this.anims.generateFrameNumbers("maincharacter", {
        start: 144,
        end: 151,
      }),
      frameRate: 5,
      repeat: -1,
    });

   
    this.player = this.physics.add
      .sprite(48, 297, "maincharacter")
      .play("maincharacter-right");
    window.player = this.player;
    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.7);
    this.player.setCollideWorldBounds(true); // don't go out of the this.map

     //  The score
     this.scoreText = this.add.text(16, 16, 'Energy Drink:', { fontSize: '30px', fill: '#db9200', fontStyle: 'bold'});

      // Make the score text fixed on the screen
    this.scoreText.setScrollFactor(0);

    //var start = map.findObject("objectLayer",obj.name === "start");
    //var end = map.findObject("objectLayer",obj.name === "end");


  //load drone objects
  let enemy1 = map.findObject("objectLayer", (obj) => obj.name === "enemy1")
  let enemy2 = map.findObject("objectLayer", (obj) => obj.name === "enemy2")
  let yellow1 = map.findObject("objectLayer", (obj) => obj.name === "yellow1")
  let yellow2 = map.findObject("objectLayer", (obj) => obj.name === "yellow2")
  let yellow3 = map.findObject("objectLayer", (obj) => obj.name === "yellow3")

    //Add main player here with physics.add.sprite
    this.enemy1 = this.physics.add.sprite(432, 46, "enemy1");
    this.enemy2 = this.physics.add.sprite(145, 700, "enemy2");
    this.yellow1 = this.physics.add.sprite(207, 69, "yellow1");
    this.yellow2 = this.physics.add.sprite(230, 640, "yellow2");
    this.yellow3 = this.physics.add.sprite(786, 99, "yellow3");

    // Set the tint to make the yellow sprite brighter
   this.yellow1.setTint(0xffff00); // Bright yellow tint
   this.yellow2.setTint(0xffff00); // Bright yellow tint
   this.yellow3.setTint(0xffff00); // Bright yellow tint

     // in create, add tweens  
this.tweens.add({
        targets: this.enemy1,
        y: 200,
        //flipX: true,
        yoyo: true,
        duration: 2000,
        repeat: -1
    })
    this.tweens.add({
      targets: this.enemy2,
      y: 550,
      //flipX: true,
      yoyo: true,
      duration: 2000,
      repeat: -1
  })

  this.tweens.add({
    targets: this.yellow1,
    y: '+=5', 
    ease: 'Sine.easeInOut', 
    duration: 1000, 
    yoyo: true, 
    repeat: -1 
});

this.tweens.add({
  targets: this.yellow2,
  y: '+=5', 
  ease: 'Sine.easeInOut', 
  duration: 1000, 
  yoyo: true, 
  repeat: -1 
});

this.tweens.add({
  targets: this.yellow3,
  y: '+=5', 
  ease: 'Sine.easeInOut', 
  duration: 1000, 
  yoyo: true, 
  repeat: -1 
});

  // Create the heart sprite
  this.heart1 = this.add.sprite(945, 13, "heart1");
  this.heart1.setDepth(1); // Set the depth to 1 (or higher if needed) to render it on top

  this.heart2 = this.add.sprite(976, 13, "heart2");
  this.heart2.setDepth(1); // Set the depth to 1 (or higher if needed) to render it on top
  
  this.heart3 = this.add.sprite(945, 13, "heart3");
  this.heart3.setDepth(1); // Set the depth to 1 (or higher if needed) to render it on top


    // When object overlap with player, call the this.collectFire function
    this.physics.add.overlap(this.player,this.enemy1,this.hitEnemy1,null,this);
    this.physics.add.overlap(this.player,this.enemy2,this.hitEnemy2,null,this);
    this.physics.add.overlap(this.player, this.yellow1, this.collectYellow, null, this);
    this.physics.add.overlap(this.player, this.yellow2, this.collectYellow, null, this);
    this.physics.add.overlap(this.player, this.yellow3, this.collectYellow, null, this);

    //Add time event / movement here
    // get the tileIndex number in json, +1
    // mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool
    //What will collider witg what layers
    // this.physics.add.collider(mapLayer, this.player);
    this.floorLayer.setCollisionByExclusion(-1, true);
    this.wallLayer.setCollisionByExclusion(-1, true);
    this.waterLayer1.setCollisionByExclusion(-1, true);

    this.physics.add.collider(this.player, this.floorLayer);
    this.physics.add.collider(this.player, this.wallLayer);
    this.physics.add.collider(this.player, this.waterLayer);



    //create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // make the camera follow the player
    this.cameras.main.startFollow(this.player);


    var level2Down = this.input.keyboard.addKey(50);

    level2Down.on(
      "down",
      function () {
        console.log("50 pressed, jump to level 2");
        this.scene.start("level2");
      },
      this
    );
  } // end of create //

  update() {


 const camera = this.cameras.main;
  const heart1X = camera.scrollX + camera.width - 30;
  const heart1Y = camera.scrollY + 35;
  this.heart1.setPosition(heart1X, heart1Y);  

  const heart2X = camera.scrollX + camera.width - 70;
  const heart2Y = camera.scrollY + 35;
  this.heart2.setPosition(heart2X, heart2Y);  

  const heart3X = camera.scrollX + camera.width - 110;
  const heart3Y = camera.scrollY + 35;
  this.heart3.setPosition(heart3X, heart3Y);  
  
    // In update()
    if (this.player.x > 989 && this.player.y > 342 && this.player.y < 426 && this.score >= 3) {
      console.log("Door1");
      this.room1();
  }
  

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("maincharacter-left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("maincharacter-right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play("maincharacter-up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play("maincharacter-down", true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.stop();
    }
    
  } // end of update //

  hitEnemy1(player, item) {
    console.log("Player hit enemy1"); // Add this line
    this.cameras.main.shake(200);
    item.disableBody(true, true);

    // Hide hearts when hit
    if (this.heart3.visible) {
      this.heart3.visible = false;
  } else if (this.heart2.visible) {
      this.heart2.visible = false;
  } else if (this.heart1.visible) {
      this.heart1.visible = false;
  }
    return false;
}

hitEnemy2(player, item) {
    console.log("Player hit enemy2"); // Add this line
    this.cameras.main.shake(200);
    item.disableBody(true, true);

    // Hide hearts when hit
    if (this.heart3.visible) {
      this.heart3.visible = false;
  } else if (this.heart2.visible) {
      this.heart2.visible = false;
  } else if (this.heart1.visible) {
      this.heart1.visible = false;
  }

    return false;
}

  collectYellow(player, item) {
    console.log("player collect yellow1")
      // Play collect sound
      this.sound.play('collect');
    item.disableBody(true, true)
    this.score += 1;
    this.scoreText.setText('Energy Drink:' + this.score);
    window.yellow++
    return false
  }

  

  

    // outside of update()
  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    this.scene.start("instruction5");
  }

}
