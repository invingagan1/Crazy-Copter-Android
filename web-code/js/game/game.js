var CrazyCandy = CrazyCandy || {};
CrazyCandy.Game = function () { };
CrazyCandy.Game.prototype = {
    velocity: 5,
    gravity: 400,
    velocityY: 200,
    enemyRate: 1,
    enemyRateChangeTimer: 0,
    timerCheck: 0,
    score: 0,
    preload: function () { },
    create: function () {

        this.game.physics.setBoundsToWorld();
        this.score = 0;

        //Add scrolling background image tile.
        this.backgroundTile = this.add.tileSprite(0, 0, 400, 312, 'background');
        // this.backgroundTile.tileScale.setTo(0.5)

        //Add helicopter
        this.helicopter = this.add.sprite(50, this.game.world.centerY, 'helicopter');
        this.helicopter.anchor.setTo(0.5);
        this.helicopterAnimation = this.helicopter.animations.add('fly');
        this.helicopter.animations.play('fly', 60, true);

        // crate.
        this.crateGroup = this.game.add.group();
        this.addRowOfCrates();

        this.timer = this.game.time.events.loop(1500, function () {
            this.addRowOfCrates();
            this.score++;
            this.updateScore();
        }, this);

        //Add physics to helicopter
        this.game.physics.arcade.enable(this.helicopter);
        this.helicopter.body.allowGravity = true;
        this.helicopter.body.gravity.y = this.gravity;
        this.helicopter.checkWorldBounds = true;
        this.helicopter.events.onOutOfBounds.add(function () {
            this.gameOver();
        }, this);

        //Add Score section here
        this.scoreText = this.add.text(this.game.world.width - 150, 10, 'Score: 0', {
            font: '24px Roboto',
            fill: '#000',
            fontWeight: 'bold'
        });

        // Add Game Controls
        this.playButton = this.add.sprite(10, 10, 'play-button');
        this.playButton.scale.setTo(0.5);
        this.playButton.visible = false;

        this.pauseButton = this.add.sprite(10, 10, 'pause-button');
        this.pauseButton.scale.setTo(0.5);
        this.pauseButton.visible = true;
        this.pauseButton.inputEnabled = true;
        this.pauseButton.events.onInputUp.add(function () {
            this.pauseButton.visible = false;
            this.playButton.visible = true;
            this.game.paused = true;
        }, this);

        // Add input listeners
        this.game.input.onDown.add(function () {
            this.helicopter.body.velocity.y = this.velocityY * -1;
            this.helicopter.body.gravity.y = 0;
        }, this);
        this.game.input.onUp.add(function () {
            this.helicopter.body.velocity.y = 0;
            this.helicopter.body.gravity.y = this.gravity;
            if(this.game.paused){
                this.game.paused = !this.game.paused;
                this.playButton.visible = false;
                this.pauseButton.visible = true;
            }
        }, this)
    },
    update: function () {
        this.backgroundTile.tilePosition.x -= 0.5;

        this.game.physics.arcade.overlap(
            this.helicopter, this.crateGroup, function () {
                this.game.state.start('game-over');
            }, null, this
        )
    },
    gameOver: function () {
        this.game.state.start('game-over');
    },
    updateScore: function () {
        CrazyCandy.score = this.score;
        this.scoreText.setText('Score: ' + this.score);
    },
    addCrate: function (x, y) {
        var crate = this.game.add.sprite(x, y, 'crate');
        this.crateGroup.add(crate);
        this.game.physics.arcade.enable(crate);
        // crate.scale.setTo(0.2);
        crate.body.velocity.x = -200;
        crate.checkWorldBounds = true;
        crate.ouOfBoundsKill = true;
    },
    addRowOfCrates: function () {
        var holePosition = Math.floor(Math.random() * 10) + 1;

        // Add the 13 pipes 
        // With one big hole at position 'hole' and 'hole + 1'
        for (var i = 0; i < 14; i++) {
            if (i != holePosition &&
                i != holePosition + 1 &&
                i != holePosition + 2 &&
                i != holePosition + 3 &&
                i != holePosition + 4) {
                this.addCrate(400, i * 24);
            }
        }
    }
};