class level2 extends Phaser.Scene {
  constructor() {
    super({ key: "level2" });
    this.lives = 3; // Initialize player lives
    this.score = 0;
    window.yellow = 0
  }

  preload() {
    this.load.tilemapTiledJSON("map2", "assets/cavern.tmj");

    // Step 2 : Preload any images here
    this.load.image("pixelimg", "assets/pixel.png");
    this.load.image("houseimg", "assets/house.png");
    this.load.image("heart1", "assets/heart.png"); 
    this.load.image("heart2", "assets/heart.png"); 
    this.load.image("heart3", "assets/heart.png"); 
    this.load.audio('collect', 'assets/collect.mp3');
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
    this.load.spritesheet("maincharacter", "assets/maincharacter.png", {
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
    }); this.load.spritesheet("yellow4", "assets/yellow.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("yellow5", "assets/yellow.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("pink", "assets/pink.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

  } // end of preload //

  create() {
    console.log("level2");

      // Reset player lives to initial value
      this.lives = 3;

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "map2" });

    // Step 4 Load the game tiles
    //1st parameter is name in Tiled,
    //2nd parameter is key in Preload
    let pixelTiles = map.addTilesetImage("pixel", "pixelimg");
    let houseTiles = map.addTilesetImage("house", "houseimg");


    //Step 5  create an array of tiles
    let tilesArray = [pixelTiles, houseTiles];

    // Step 6  Load in layers by layers

    this.floorLayer = map.createLayer("floor", tilesArray, 0, 0);
    this.decorationLayer = map.createLayer("decoration", tilesArray, 0, 0);
    this.wallLayer1 = map.createLayer("wallLayer3", tilesArray, 0, 0);
    this.wallLayer2 = map.createLayer("wallLayer2", tilesArray, 0, 0);
    this.wallLayer3 = map.createLayer("wallLayer1", tilesArray, 0, 0);

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
      .sprite(50, 320, "maincharacter")
      .play("maincharacter-right");
    window.player = this.player;
    this.player.body.setSize(this.player.width * 0.4, this.player.height * 0.7);
    this.player.setCollideWorldBounds(true); // don't go out of the this.map
    //var start = map.findObject("objectLayer",obj.name === "start");
    //var end = map.findObject("objectLayer",obj.name === "end");

    //var fire1 = map.findObject("objectLayer", obj => obj.name === "fire1");

    //Add main player here with physics.add.sprite

    //Add time event / movement here

    // get the tileIndex number in json, +1
    // mapLayer.setTileIndexCallback(11, this.room1, this);

   //  The score
   this.scoreText = this.add.text(16, 16, 'Energy Drink:', { fontSize: '30px', fill: '#db9200', fontStyle: 'bold'});

  // Make the score text fixed on the screen
  this.scoreText.setScrollFactor(0);

  //load drone objects
  let enemy1 = map.findObject("objectLayer", (obj) => obj.name === "enemy1")
  let enemy2 = map.findObject("objectLayer", (obj) => obj.name === "enemy2")
  let enemy3 = map.findObject("objectLayer", (obj) => obj.name === "enemy3")
  let enemy4 = map.findObject("objectLayer", (obj) => obj.name === "enemy4")
  let enemy5 = map.findObject("objectLayer", (obj) => obj.name === "enemy5")
  let enemy6 = map.findObject("objectLayer", (obj) => obj.name === "enemy6")
  let yellow1 = map.findObject("objectLayer", (obj) => obj.name === "yellow1")
  let yellow2 = map.findObject("objectLayer", (obj) => obj.name === "yellow2")
  let yellow3 = map.findObject("objectLayer", (obj) => obj.name === "yellow3")
  let yellow4 = map.findObject("objectLayer", (obj) => obj.name === "yellow4")
  let yellow5 = map.findObject("objectLayer", (obj) => obj.name === "yellow5")
  let pink1 = map.findObject("objectLayer", (obj) => obj.name === "pink")


  
    //Add main player here with physics.add.sprite
    this.enemy1 = this.physics.add.sprite(776, 211, "enemy1");
    this.enemy2 = this.physics.add.sprite(561, 153, "enemy2");
    this.enemy3 = this.physics.add.sprite(85, 232, "enemy3");
    this.enemy4 = this.physics.add.sprite(50, 498, "enemy4");
    this.enemy5 = this.physics.add.sprite(274, 469, "enemy5");
    this.enemy6 = this.physics.add.sprite(562, 469, "enemy6");
    this.yellow1 = this.physics.add.sprite(55, 152, "yellow1");
    this.yellow2 = this.physics.add.sprite(159, 586, "yellow2");
    this.yellow3 = this.physics.add.sprite(347, 122, "yellow3");
    this.yellow4 = this.physics.add.sprite(456, 552, "yellow4");
    this.yellow5 = this.physics.add.sprite(832, 566, "yellow5");
    this.pink1 = this.physics.add.sprite(845, 94, "pink");

    // Set the tint to make the yellow sprite brighter
   this.yellow1.setTint(0xffff00); // Bright yellow tint
   this.yellow2.setTint(0xffff00); // Bright yellow tint
   this.yellow3.setTint(0xffff00); // Bright yellow tint
   this.yellow4.setTint(0xffff00); // Bright yellow tint
   this.yellow5.setTint(0xffff00); // Bright yellow tint

     // in create, add tweens  
this.tweens.add({
        targets: this.enemy1,
        x: 912,
        //flipX: true,
        yoyo: true,
        duration: 1000,
        repeat: -1
    })
    this.tweens.add({
      targets: this.enemy2,
      x: 688,
      //flipX: true,
      yoyo: true,
      duration: 1000,
      repeat: -1
  })

  this.tweens.add({
    targets: this.enemy3,
    x: 176,
    //flipX: true,
    yoyo: true,
    duration: 2000,
    repeat: -1
})

this.tweens.add({
  targets: this.enemy4,
  x: 204,
  //flipX: true,
  yoyo: true,
  duration: 2000,
  repeat: -1
})

this.tweens.add({
  targets: this.enemy5,
  x: 400,
  //flipX: true,
  yoyo: true,
  duration: 2000,
  repeat: -1
})

this.tweens.add({
  targets: this.enemy6,
  x: 442,
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

this.tweens.add({
  targets: this.yellow4,
  y: '+=5', 
  ease: 'Sine.easeInOut', 
  duration: 1000, 
  yoyo: true, 
  repeat: -1 
});

this.tweens.add({
  targets: this.yellow5,
  y: '+=5', 
  ease: 'Sine.easeInOut', 
  duration: 1000, 
  yoyo: true, 
  repeat: -1 
});

this.tweens.add({
  targets: this.pink,
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
  this.physics.add.overlap(this.player,this.enemy3,this.hitEnemy3,null,this);
  this.physics.add.overlap(this.player,this.enemy4,this.hitEnemy4,null,this);
  this.physics.add.overlap(this.player,this.enemy5,this.hitEnemy5,null,this);
  this.physics.add.overlap(this.player,this.enemy6,this.hitEnemy6,null,this);
  this.physics.add.overlap(this.player, this.yellow1, this.collectYellow, null, this);
  this.physics.add.overlap(this.player, this.yellow2, this.collectYellow, null, this);
  this.physics.add.overlap(this.player, this.yellow3, this.collectYellow, null, this);
  this.physics.add.overlap(this.player, this.yellow4, this.collectYellow, null, this);
  this.physics.add.overlap(this.player, this.yellow5, this.collectYellow, null, this);
  this.physics.add.overlap(this.player, this.pink1, this.collectPink, null, this);



    // Add custom properties in Tiled called "mouintain" as bool
    //What will collider witg what layers
    // this.physics.add.collider(mapLayer, this.player);
    this.wallLayer1.setCollisionByExclusion(-1, true);
    this.wallLayer2.setCollisionByExclusion(-1, true);
    this.wallLayer3.setCollisionByExclusion(-1, true);
    this.decorationLayer.setCollisionByExclusion(-1, true);

    this.physics.add.collider(this.player, this.wallLayer1);
    this.physics.add.collider(this.player, this.wallLayer2);
    this.physics.add.collider(this.player, this.wallLayer3);
    this.physics.add.collider(this.player, this.decorationLayer);

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

    var level3Down = this.input.keyboard.addKey(51);

    level3Down.on(
      "down",
      function () {
        console.log("51 pressed, jump to level 3");
        this.scene.start("level3");
      },
      this
    );

    // this.cursors = this.input.keyboard.createCursorKeys();

    // make the camera follow the player
    //   this.cameras.main.startFollow(this.player);
  } // end of create //

  update() {

      // In update()
   if (this.player.x > 920 && this.player.y > 270 && this.player.y < 393 && this.score >= 7) {
    console.log("Door2");
    this.room2();
  }

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

   // outside of update()
  // Function to jump to room1
  room2(player, tile) {
    console.log("room2 function");
    this.scene.start("instruction6");
  }

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
      this.scene.start('gameOver', { level: 2 });
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
  console.log("Player hit enemy3"); // Add this line
  this.cameras.main.shake(200);
  item.disableBody(true, true);

   // Deduct a life
   this.deductLife();

   return false;
}



hitEnemy4(player, item) {
  console.log("Player hit enemy4"); // Add this line
  this.cameras.main.shake(200);
  item.disableBody(true, true);

   // Deduct a life
   this.deductLife();

   return false;
}




hitEnemy5(player, item) {
  console.log("Player hit enemy5"); // Add this line
  this.cameras.main.shake(200);
  item.disableBody(true, true);

   // Deduct a life
   this.deductLife();

   return false;
}




hitEnemy6(player, item) {
  console.log("Player hit enemy6"); // Add this line
  this.cameras.main.shake(200);
  item.disableBody(true, true);

  // Deduct a life
  this.deductLife();

  return false;
}


  collectYellow(player, item) {
    console.log("player collect yellow1")
    this.sound.play('collect');
    item.disableBody(true, true)
    this.score += 1;
    this.scoreText.setText('Energy Drink:' + this.score);
    window.yellow++
    return false
  }


  collectPink(player, item) {
    console.log("player collect pink1")
    this.sound.play('collect');
    item.disableBody(true, true)
    this.score += 2;
    this.scoreText.setText('Energy Drink:' + this.score);
    return false
  }


}
