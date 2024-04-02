class level3 extends Phaser.Scene {
  constructor() {
    super({ key: "level3" });
    this.lives = 3; // Initialize player lives
    window.yellow = 0
    this.score = 0;

  }

  preload() {
    this.load.tilemapTiledJSON("map3", "assets/town.tmj");

    // Step 2 : Preload any images here
    this.load.image("pixelimg", "assets/pixel.png");
    this.load.image("houseimg", "assets/house.png");
    this.load.image("buildingimg", "assets/building.png");
    this.load.image("statueimg", "assets/statue.png");
    this.load.image("bulletimg", "assets/bullet.png");
    this.load.audio('collect', 'assets/collect.mp3');
    this.load.spritesheet("maincharacter", "assets/maincharacter.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image("heart1", "assets/heart.png");
    this.load.image("heart2", "assets/heart.png");
    this.load.image("heart3", "assets/heart.png");
    this.load.spritesheet("enemy1", "assets/enemy.png", {
      frameWidth: 564,
      frameHeight: 564,
    });
    this.load.spritesheet("enemy2", "assets/enemy.png", {
      frameWidth: 564,
      frameHeight: 564,
    });

    this.load.spritesheet("enemy3", "assets/enemy.png", {
      frameWidth: 564,
      frameHeight: 564,
    });

    this.load.spritesheet("enemy4", "assets/enemy.png", {
      frameWidth: 564,
      frameHeight: 564,
    });

    this.load.spritesheet("enemy5", "assets/enemy.png", {
      frameWidth: 564,
      frameHeight: 564,
    });

    this.load.spritesheet("enemy6", "assets/enemy.png", {
      frameWidth: 564,
      frameHeight: 564,
    });

    this.load.spritesheet("enemy7", "assets/enemy.png", {
      frameWidth: 564,
      frameHeight: 564,
    });

    this.load.spritesheet("enemy8", "assets/enemy.png", {
      frameWidth: 564,
      frameHeight: 564,
    });

    this.load.spritesheet("enemy9", "assets/enemy.png", {
      frameWidth: 564,
      frameHeight: 564,
    });

    this.load.spritesheet("enemy10", "assets/enemy.png", {
      frameWidth: 564,
      frameHeight: 564,
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
    console.log("level3");

          // Reset player lives to initial value
          this.lives = 3;
          
    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "map3" });

    // Step 4 Load the game tiles
    //1st parameter is name in Tiled,
    //2nd parameter is key in Preload
    let pixelTiles = map.addTilesetImage("pixel", "pixelimg");
    let houseTiles = map.addTilesetImage("house", "houseimg");
    let buildingTiles = map.addTilesetImage("building", "buildingimg");
    let statueTiles = map.addTilesetImage("statue", "statueimg");

    // var fire = map.findObject("ObjectLayer", obj => obj.name === "fire");

    //  this.anims.create({
    //      key:'firespin',
    //     frames:this.anims.generateFrameNumbers('fire',
    //     { start:0, end:10 }),
    //      frameRate:5,
    //      repeat:-1
    //  });

    //  this.add.sprite(fire.x, fire.y, 'fire').play('firespin')

    //Step 5  create an array of tiles
    let tilesArray = [pixelTiles, houseTiles, buildingTiles, statueTiles];

    // Step 6  Load in layers by layers

    this.floorLayer = map.createLayer("floor", tilesArray, 0, 0);
    this.walkingLayer = map.createLayer("walking", tilesArray, 0, 0);
    this.grassLayer = map.createLayer("grass", tilesArray, 0, 0);
    this.wallLayer = map.createLayer("wall", tilesArray, 0, 0);
    this.treeLayer2 = map.createLayer("treeLayer2", tilesArray, 0, 0);
    this.thingLayer = map.createLayer("thing", tilesArray, 0, 0);
    this.treeLayer1 = map.createLayer("treeLayer1", tilesArray, 0, 0);
    this.houseLayer = map.createLayer("house", tilesArray, 0, 0);
    this.waterLayer2 = map.createLayer("waterLayer2", tilesArray, 0, 0);
    this.waterLayer1 = map.createLayer("waterLayer1", tilesArray, 0, 0);
    this.sideLayer2 = map.createLayer("sideLayer2", tilesArray, 0, 0);
    this.sideLayer1 = map.createLayer("sideLayer1", tilesArray, 0, 0);
    this.bridgeFlowerLayer = map.createLayer("bridgeFlower", tilesArray, 0, 0);

    this.physics.world.bounds.width = this.floorLayer.width;
    this.physics.world.bounds.height = this.floorLayer.height;

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
      .sprite(48, 745, "maincharacter")
      .play("maincharacter-right");
    window.player = this.player;
    this.player.body.setSize(this.player.width * 0.4, this.player.height * 0.7);
    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    //  The score
    this.scoreText = this.add.text(16, 16, "Energy Drink:", {
      fontSize: "30px",
      fill: "#db9200",
      fontStyle: "bold",
    });

    // Make the score text fixed on the screen
    this.scoreText.setScrollFactor(0);

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
  
      // Play shooting animation or sound if desired
  
      // Add collision detection code here
  
      // Destroy the bullet after a certain time if it doesn't hit anything
      this.time.delayedCall(2000, () => {
          bullet.destroy();
      });
  

      // Add collision detection between bullet and enemy
      this.physics.add.collider(bullet, this.enemy2, (bullet, enemy) => {
        console.log("Bullet collided with enemy");
        bullet.destroy(); // Destroy the bullet

        // Destroy the enemy
        enemy.destroy();
      });

      // Add collision detection between bullet and enemy
      this.physics.add.collider(bullet, this.enemy3, (bullet, enemy) => {
        console.log("Bullet collided with enemy");
        bullet.destroy(); // Destroy the bullet

        // Destroy the enemy
        enemy.destroy();
      });

      // Add collision detection between bullet and enemy
      this.physics.add.collider(bullet, this.enemy4, (bullet, enemy) => {
        console.log("Bullet collided with enemy");
        bullet.destroy(); // Destroy the bullet

        // Destroy the enemy
        enemy.destroy();
      });


      // Add collision detection between bullet and enemy
      this.physics.add.collider(bullet, this.enemy5, (bullet, enemy) => {
        console.log("Bullet collided with enemy");
        bullet.destroy(); // Destroy the bullet

        // Destroy the enemy
        enemy.destroy();
      });


      // Add collision detection between bullet and enemy
      this.physics.add.collider(bullet, this.enemy6, (bullet, enemy) => {
        console.log("Bullet collided with enemy");
        bullet.destroy(); // Destroy the bullet

        // Destroy the enemy
        enemy.destroy();
      });


      // Add collision detection between bullet and enemy
      this.physics.add.collider(bullet, this.enemy7, (bullet, enemy) => {
        console.log("Bullet collided with enemy");
        bullet.destroy(); // Destroy the bullet

        // Destroy the enemy
        enemy.destroy();
      });


      // Add collision detection between bullet and enemy
      this.physics.add.collider(bullet, this.enemy8, (bullet, enemy) => {
        console.log("Bullet collided with enemy");
        bullet.destroy(); // Destroy the bullet

        // Destroy the enemy
        enemy.destroy();
      });


      // Add collision detection between bullet and enemy
      this.physics.add.collider(bullet, this.enemy9, (bullet, enemy) => {
        console.log("Bullet collided with enemy");
        bullet.destroy(); // Destroy the bullet

        // Destroy the enemy
        enemy.destroy();
      });


      // Add collision detection between bullet and enemy
      this.physics.add.collider(bullet, this.enemy10, (bullet, enemy) => {
        console.log("Bullet collided with enemy");
        bullet.destroy(); // Destroy the bullet

        // Destroy the enemy
        enemy.destroy();
      });


      // Add collision detection between bullet and enemy
      this.physics.add.collider(bullet, this.enemy1, (bullet, enemy) => {
        console.log("Bullet collided with enemy");
        bullet.destroy(); // Destroy the bullet

        // Destroy the enemy
        enemy.destroy();
      });


      // Destroy the bullet after a certain time if it doesn't hit anything
      this.time.delayedCall(2000, () => {
        bullet.destroy();
      });
    };
    

    // Bind shooting function to the W key press event
    this.input.keyboard.on("keydown-W", this.shoot);

    //load drone objects
    let enemy1 = map.findObject("objectLayer", (obj) => obj.name === "enemy1");
    let enemy2 = map.findObject("objectLayer", (obj) => obj.name === "enemy2");
    let enemy3 = map.findObject("objectLayer", (obj) => obj.name === "enemy3");
    let enemy4 = map.findObject("objectLayer", (obj) => obj.name === "enemy4");
    let enemy5 = map.findObject("objectLayer", (obj) => obj.name === "enemy5");
    let enemy6 = map.findObject("objectLayer", (obj) => obj.name === "enemy6");
    let enemy7 = map.findObject("objectLayer", (obj) => obj.name === "enemy7");
    let enemy8 = map.findObject("objectLayer", (obj) => obj.name === "enemy8");
    let enemy9 = map.findObject("objectLayer", (obj) => obj.name === "enemy9");
    let enemy10 = map.findObject(
      "objectLayer",
      (obj) => obj.name === "enemy10"
    );
    let yellow1 = map.findObject(
      "objectLayer",
      (obj) => obj.name === "yellow1"
    );
    let yellow2 = map.findObject(
      "objectLayer",
      (obj) => obj.name === "yellow2"
    );
    let yellow3 = map.findObject(
      "objectLayer",
      (obj) => obj.name === "yellow3"
    );

    
    //Add main player here with physics.add.sprite
    this.enemy1 = this.physics.add.sprite(1516, 140, "enemy1");
    this.enemy2 = this.physics.add.sprite(1716, 240, "enemy2");
    this.enemy3 = this.physics.add.sprite(1516, 340, "enemy3");
    this.enemy4 = this.physics.add.sprite(1716, 440, "enemy4");
    this.enemy5 = this.physics.add.sprite(1516, 540, "enemy5");
    this.enemy6 = this.physics.add.sprite(1716, 640, "enemy6");
    this.enemy7 = this.physics.add.sprite(1516, 740, "enemy7");
    this.enemy8 = this.physics.add.sprite(1716, 840, "enemy8");
    this.enemy9 = this.physics.add.sprite(1516, 940, "enemy9");
    this.enemy10 = this.physics.add.sprite(1716, 1040, "enemy10");
    this.yellow1 = this.physics.add.sprite(750, 174, "yellow1");
    this.yellow2 = this.physics.add.sprite(1168, 182, "yellow2");
    this.yellow3 = this.physics.add.sprite(782, 1012, "yellow3");

    // Set the tint to make the yellow sprite brighter
    this.yellow1.setTint(0xffff00); // Bright yellow tint
    this.yellow2.setTint(0xffff00); // Bright yellow tint
    this.yellow3.setTint(0xffff00); // Bright yellow tint

    // in create, add tweens
    this.tweens.add({
      targets: this.enemy1,
      x: 0,
      //flipX: true,
      yoyo: true,
      duration: 5000,
      repeat: -1,
    });
    this.tweens.add({
      targets: this.enemy2,
      x: 0,
      //flipX: true,
      yoyo: true,
      duration: 7000,
      repeat: -1,
    });
    this.tweens.add({
      targets: this.enemy3,
      x: 0,
      //flipX: true,
      yoyo: true,
      duration: 5000,
      repeat: -1,
    });
    this.tweens.add({
      targets: this.enemy4,
      x: 0,
      //flipX: true,
      yoyo: true,
      duration: 7000,
      repeat: -1,
    });
    this.tweens.add({
      targets: this.enemy5,
      x: 0,
      //flipX: true,
      yoyo: true,
      duration: 5000,
      repeat: -1,
    });
    this.tweens.add({
      targets: this.enemy6,
      x: 0,
      //flipX: true,
      yoyo: true,
      duration: 7000,
      repeat: -1,
    });
    this.tweens.add({
      targets: this.enemy7,
      x: 0,
      //flipX: true,
      yoyo: true,
      duration: 5000,
      repeat: -1,
    });
    this.tweens.add({
      targets: this.enemy8,
      x: 0,
      //flipX: true,
      yoyo: true,
      duration: 7000,
      repeat: -1,
    });
    this.tweens.add({
      targets: this.enemy9,
      x: 0,
      //flipX: true,
      yoyo: true,
      duration: 5000,
      repeat: -1,
    });
    this.tweens.add({
      targets: this.enemy10,
      x: 0,
      //flipX: true,
      yoyo: true,
      duration: 7000,
      repeat: -1,
    });

    this.tweens.add({
      targets: this.yellow1,
      y: "+=5",
      ease: "Sine.easeInOut",
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: this.yellow2,
      y: "+=5",
      ease: "Sine.easeInOut",
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: this.yellow3,
      y: "+=5",
      ease: "Sine.easeInOut",
      duration: 1000,
      yoyo: true,
      repeat: -1,
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
      this.enemy1,
      this.hitEnemy1,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy2,
      this.hitEnemy2,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy3,
      this.hitEnemy3,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy4,
      this.hitEnemy4,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy5,
      this.hitEnemy5,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy6,
      this.hitEnemy6,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy7,
      this.hitEnemy7,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy8,
      this.hitEnemy8,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy9,
      this.hitEnemy9,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy10,
      this.hitEnemy10,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.yellow1,
      this.collectYellow,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.yellow2,
      this.collectYellow,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.yellow3,
      this.collectYellow,
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
    this.treeLayer1.setCollisionByExclusion(-1, true);
    this.treeLayer2.setCollisionByExclusion(-1, true);
    this.thingLayer.setCollisionByExclusion(-1, true);
    this.sideLayer1.setCollisionByExclusion(-1, true);
    this.sideLayer2.setCollisionByExclusion(-1, true);
    this.waterLayer1.setCollisionByExclusion(-1, true);
    this.waterLayer2.setCollisionByExclusion(-1, true);
    this.wallLayer.setCollisionByExclusion(-1, true);
    this.grassLayer.setCollisionByExclusion(-1, true);

    this.thingLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.floorLayer);
    this.physics.add.collider(this.player, this.treeLayer1);
    this.physics.add.collider(this.player, this.treeLayer2);
    this.physics.add.collider(this.player, this.thingLayer);
    this.physics.add.collider(this.player, this.sideLayer1);
    this.physics.add.collider(this.player, this.sideLayer2);
    this.physics.add.collider(this.player, this.waterLayer1);
    this.physics.add.collider(this.player, this.waterLayer2);
    this.physics.add.collider(this.player, this.wallLayer);
    this.physics.add.collider(this.player, this.grassLayer);

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

    var level4Down = this.input.keyboard.addKey(52);

    level4Down.on(
      "down",
      function () {
        console.log("52 pressed, jump to level 4");
        this.scene.start("level4");
      },
      this
    );

    // this.cursors = this.input.keyboard.createCursorKeys();

    // make the camera follow the player
    //   this.cameras.main.startFollow(this.player);
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
    if (this.player.x > 1472 && this.player.y > 1078 && this.player.y < 1150 && this.score >= 3) {
      console.log("Door3");
      this.room3();
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

    // Deduct a life
    this.deductLife();

    return false;
}

deductLife() {
  this.lives--; // Decrease life count

  if (this.lives <= 0) {
      // If no more lives, go to gameOver scene
      this.scene.start('gameOver', { level: 3 });
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

  hitEnemy2(player, item) {
    console.log("Player hit enemy2"); // Add this line
    this.cameras.main.shake(200);
    item.disableBody(true, true);

     // Deduct a life
     this.deductLife();

    return false;
  }

  hitEnemy3(player, item) {
    console.log("Player hit enemy2"); // Add this line
    this.cameras.main.shake(200);
    item.disableBody(true, true);

    // Deduct a life
    this.deductLife();

    return false;
  }
  hitEnemy4(player, item) {
    console.log("Player hit enemy2"); // Add this line
    this.cameras.main.shake(200);
    item.disableBody(true, true);

     // Deduct a life
     this.deductLife();

    return false;
  }

  hitEnemy5(player, item) {
    console.log("Player hit enemy2"); // Add this line
    this.cameras.main.shake(200);
    item.disableBody(true, true);

    // Deduct a life
    this.deductLife();

    return false;
  }
  hitEnemy6(player, item) {
    console.log("Player hit enemy2"); // Add this line
    this.cameras.main.shake(200);
    item.disableBody(true, true);

     // Deduct a life
     this.deductLife();

    return false;
  }
  hitEnemy7(player, item) {
    console.log("Player hit enemy2"); // Add this line
    this.cameras.main.shake(200);
    item.disableBody(true, true);

     // Deduct a life
     this.deductLife();

    return false;
  }
  hitEnemy8(player, item) {
    console.log("Player hit enemy2"); // Add this line
    this.cameras.main.shake(200);
    item.disableBody(true, true);

     // Deduct a life
     this.deductLife();

    return false;
  }
  hitEnemy9(player, item) {
    console.log("Player hit enemy2"); // Add this line
    this.cameras.main.shake(200);
    item.disableBody(true, true);

    // Deduct a life
    this.deductLife();

    return false;
  }
  hitEnemy10(player, item) {
    console.log("Player hit enemy2"); // Add this line
    this.cameras.main.shake(200);
    item.disableBody(true, true);

    // Deduct a life
    this.deductLife();

    return false;
  }

  collectYellow(player, item) {
    console.log("player collect yellow1");
    this.sound.play('collect');
    item.disableBody(true, true);
    this.score += 1;
    this.scoreText.setText("Energy Drink:" + this.score);
    window.yellow++
    return false;
  }


  // outside of update()
  // Function to jump to room1
  room3(player, tile) {
    console.log("room3 function");
    this.scene.start("instruction7");
  }
}
