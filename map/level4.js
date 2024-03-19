class level4 extends Phaser.Scene {
  constructor() {
    super({ key: "level4" });
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
    this.load.spritesheet("maincharacter", "assets/maincharacter.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("bigBoss", "assets/bigBoss.png", {
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

   
    this.player = this.physics.add
      .sprite(48, 707, "maincharacter")
      .play("maincharacter-right");
    window.player = this.player;
    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.7);
    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    //var start = map.findObject("objectLayer",obj.name === "start");
    //var end = map.findObject("objectLayer",obj.name === "end");

  //load drone objects
  let bigBoss = map.findObject("objectLayer", (obj) => obj.name === "bigBoss")

    //Add main player here with physics.add.sprite
    this.bigBoss = this.physics.add.sprite(386, 842, "bigBoss");
    
  

     // in create, add tweens  
this.tweens.add({
        targets: this.bigBoss,
        y: 349,
        flipY: true,
        yoyo: true,
        duration: 2000,
        repeat: -1
    })
   

  // Create the heart sprite
  this.heart1 = this.add.sprite(945, 13, "heart1");
  this.heart1.setDepth(1); // Set the depth to 1 (or higher if needed) to render it on top

  this.heart2 = this.add.sprite(976, 13, "heart2");
  this.heart2.setDepth(1); // Set the depth to 1 (or higher if needed) to render it on top
  
  this.heart3 = this.add.sprite(945, 13, "heart3");
  this.heart3.setDepth(1); // Set the depth to 1 (or higher if needed) to render it on top


    // When object overlap with player, call the this.collectFire function
    this.physics.add.overlap(this.player,this.bigBoss,this.hitBigBoss,null,this);
   

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
    if (this.player.x > 1000 && this.player.y > 342 && this.player.y < 426) {
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

  hitBigBoss(player, item) {
    console.log("Player hit bigBoss"); // Add this line
    this.cameras.main.shake(200);

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

}
