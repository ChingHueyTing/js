class level4 extends Phaser.Scene {
  constructor() {
    super({ key: "level4" });
    this.lives = 3; // Initialize player lives
    this.bossShootInterval = null;
  }

  preload() {
    this.load.tilemapTiledJSON("map4", "assets/factory.tmj");

    // Step 2 : Preload any images here
    this.load.image("pixelimg", "assets/pixel.png");
    this.load.image("machineimg", "assets/machine.png");
    this.load.image("labimg", "assets/lab.png");
    this.load.image("factoryimg", "assets/factory.png");
    this.load.image("heart1", "assets/heart.png");
    this.load.image("heart2", "assets/heart.png");
    this.load.image("heart3", "assets/heart.png");
    
    this.load.spritesheet("boss", "assets/boss.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("maincharacter", "assets/maincharacter.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  } // end of preload //

  create() {
    console.log("level4");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "map4" });

    // Step 4 Load the game tiles
    //1st parameter is name in Tiled,
    //2nd parameter is key in Preload
    let pixelTiles = map.addTilesetImage("pixel", "pixelimg");
    let machineTiles = map.addTilesetImage("machine", "machineimg");
    let labTiles = map.addTilesetImage("lab", "labimg");
    let factoryTiles = map.addTilesetImage("factory", "factoryimg");

    //Step 5  create an array of tiles
    let tilesArray = [pixelTiles, machineTiles, labTiles, factoryTiles];

    // Step 6  Load in layers by layers

    this.floorLayer = map.createLayer("floor", tilesArray, 0, 0);
    this.walkingLayer = map.createLayer("walking", tilesArray, 0, 0);
    this.wallLayer = map.createLayer("wall", tilesArray, 0, 0);
    this.houseLayer1 = map.createLayer("houseLayer1", tilesArray, 0, 0);
    this.houseLayer2 = map.createLayer("houseLayer2", tilesArray, 0, 0);

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

    this.anims.create({
      key: "boss-up",
      frames: this.anims.generateFrameNumbers("boss", {
        start: 105,
        end: 112,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "boss-left",
      frames: this.anims.generateFrameNumbers("boss", {
        start: 118,
        end: 125,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "boss-down",
      frames: this.anims.generateFrameNumbers("boss", {
        start: 131,
        end: 138,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "boss-right",
      frames: this.anims.generateFrameNumbers("boss", {
        start: 144,
        end: 151,
      }),
      frameRate: 5,
      repeat: -1,
    });

    //Add main player here with physics.add.sprite
    this.player = this.physics.add
      .sprite(48, 707, "maincharacter")
      .play("maincharacter-right");
    window.player = this.player;
    this.player.body.setSize(this.player.width * 0.4, this.player.height * 0.7);
    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    //player
    this.shoot = () => {
        // Create a bullet sprite at the player's position
        const bullet = this.physics.add.sprite(
            this.player.x,
            this.player.y,
            "bulletimg"
        );
    
        // Determine the direction the player is facing
      let velocityX = 0;
      let velocityY = 0;

        if (this.cursors.left.isDown) {
          velocityX = -300; // Move bullet to the left
      } else if (this.cursors.right.isDown) {
          velocityX = 300; // Move bullet to the right
      } else if (this.cursors.up.isDown) {
          velocityY = -300; // Move bullet up
      } else if (this.cursors.down.isDown) {
          velocityY = 300; // Move bullet down
      } else {
          // If no arrow keys are pressed, default to moving the bullet to the right
          velocityX = 300;
      }
      
       // Set velocity for the bullet based on the determined direction
       bullet.setVelocity(velocityX, velocityY);
  
    
        // Add collision detection between bullet and enemy
        this.physics.add.collider(bullet, this.boss, (bullet, boss) => {
            console.log("Bullet collided with enemy");
            bullet.destroy(); // Destroy the bullet
    
            // Destroy the enemy
            boss.destroy();
    
            // Stop the boss tweens when destroyed
            this.tweens.killTweensOf(this.boss);
        });
    
        // Destroy the bullet after a certain time if it doesn't hit anything
        this.time.delayedCall(2000, () => {
            bullet.destroy();
        });
    }


      // // Bind shooting function to the W key press event
      // this.input.keyboard.on("keydown-W", this.shoot);

    ////////////////end 

    //boss shooting
// Add bullet group to store boss bullets
this.bossBullets = this.physics.add.group();

// Define a function to make the boss shoot bullets
this.bossShoot = () => {
    // Create a bullet sprite at the boss's position
    const bullet = this.bossBullets.create(this.boss.x, this.boss.y, 'bulletimg');

    // Set velocity for the bullet to move towards the player
    this.physics.moveToObject(bullet, this.player, 200);

    // Add collider between bullet and player
    this.physics.add.collider(this.player, bullet, this.hitPlayer, null, this);
};

// Call bossShoot function repeatedly using Phaser's update loop
this.time.addEvent({
    delay: 500, // Shoot every 1 second
    callback: this.bossShoot,
    callbackScope: this,
    loop: true
});

    
    
    //var start = map.findObject("objectLayer",obj.name === "start");
    //var end = map.findObject("objectLayer",obj.name === "end");

    this.boss = this.physics.add
      .sprite(309, 430, "boss")
      .play("boss-down");

    //load drone objects
    //load drone objects
this.tweens.add({
  targets: this.boss,
  y: 870,
  flipY: false,
  yoyo: true,
  duration: 4000,
  repeat: -1,

  onYoyo: () => {
      console.log('onYoyo');
      this.boss.play("boss-up");
  },
  onRepeat: () => {
      console.log('onRepeat');
      this.boss.play("boss-down");
  },
});

    


    // Create the heart sprite
    this.heart1 = this.add.sprite(945, 13, "heart1");
    this.heart1.setDepth(1); // Set the depth to 1 (or higher if needed) to render it on top

    this.heart2 = this.add.sprite(976, 13, "heart2");
    this.heart2.setDepth(1); // Set the depth to 1 (or higher if needed) to render it on top

    this.heart3 = this.add.sprite(945, 13, "heart3");
    this.heart3.setDepth(1); // Set the depth to 1 (or higher if needed) to render it on top

    // When object overlap with player, call the this.collectFire function
    this.physics.add.overlap(
      this.player,
      this.boss,
      this.hitBoss,
      null,
      this
    );

    

    //Add time event / movement here
    // get the tileIndex number in json, +1
    // mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool
    //What will collider witg what layers
    // this.physics.add.collider(mapLayer, this.player);
    this.floorLayer.setCollisionByExclusion(-1, true);
    this.wallLayer.setCollisionByExclusion(-1, true);
    this.houseLayer1.setCollisionByExclusion(-1, true);

    
    this.physics.add.collider(this.player, this.floorLayer);
    this.physics.add.collider(this.player, this.wallLayer);
    this.physics.add.collider(this.player, this.houseLayer);

    //create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    var level1Down = this.input.keyboard.addKey(49);

    level1Down.on(
      "down",
      function () {
        console.log("49 pressed, jump to level 1");
        this.scene.start("level1");
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
    if (this.player.x > 816 && this.player.x < 880 && this.player.y > 800 && this.player.y < 820) {
      console.log("Door4");
      this.room4();
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

  hitBoss(player, boss) {
    console.log("Player hit Boss");
    this.cameras.main.shake(200);

    // Deduct a life
    this.deductLife();

    // Stop the boss from shooting
    clearInterval(this.bossShootInterval);

    // Destroy the boss
    boss.destroy();

    return false;
  }
  
  hitPlayer(player, bullet) {
    console.log('Player hit by bullet');
    this.cameras.main.shake(200);
    bullet.destroy(); // Destroy the bullet
    this.deductLife(); // Deduct a life from player
}

  hitBoss(player, item) {
    console.log("Player hit Boss"); // Add this line
    this.cameras.main.shake(200);

   // Deduct a life
   this.deductLife();

   

    return false;
  }

  deductLife() {
    this.lives--; // Decrease life count
  
    if (this.lives <= 0) {
        // If no more lives, go to gameOver scene
        this.scene.start('gameOver', { level: 4 });
    } else {
        // Otherwise, update UI or perform other actions
        switch (this.lives) {
            case 2:
                this.heart3.visible = false;
                break;
            case 1:
                this.heart2.visible = false;
                break;
            case 0:
                this.heart1.visible = false;
                break;
        }
    }
  }

   // outside of update()
  // Function to jump to room1
  room4(player, tile) {
    console.log("room4 function");
    this.scene.start("youWin");
}
}