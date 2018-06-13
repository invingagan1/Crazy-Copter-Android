/**
 * Preload the assets for game. 
 * 1. Player
 * 2. Enemies
 * 3. Background
 * 4. UI-Elements
 */

var CrazyCandy = CrazyCandy || {};
CrazyCandy.Preload = function () {};
CrazyCandy.Preload.prototype = {
    preload: function () {
        // this.game.stage.backgroundColor = '#00FF00';

        // Background
        this.background = this.add.sprite(0, 0, 'background');
        // this.background.scale.setTo(0.6);

        // this.game.stage.backgroundColor = '#CDCDCD';
        //Game logo
        this.gameLogo = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 42, 'logo');
        this.gameLogo.anchor.setTo(0.5);
        // this.gameLogo.scale.setTo(0.25);

        // Loading bar
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loading');
        this.preloadBar.anchor.setTo(0.5);
        this.preloadBar.scale.setTo(0.5);

        //Loading text
        this.loadingText = this.add.text(this.game.world.centerX, this.game.world.centerY + 30, '', {
            font: "18px Roboto",
            fill: "#000"
        });
        this.loadingText.anchor.setTo(0.5);
    },
    create: function () {
        // Add loading events
        this.game.load.onLoadStart.add(this.startLoadingAssets, this);
        this.game.load.onFileComplete.add(function (progress, cacheKey, success, totalLoaded, totalFiles) {
            this.loadingText.setText('Loading ' + progress);
        }, this);
        this.game.load.onLoadComplete.add(this.loadingFinished, this);

        this.startLoadingAssets();
    },
    startLoadingAssets: function () {
        //Background
        this.load.spritesheet('helicopter','assets/helicopter.png',96,32,8);
        this.load.image('candy', 'assets/candy-small.png');
        this.load.image('pop','assets/lollipop-21.png');
        this.load.image('crate','assets/crate.png');
        // this.load.image('missile', 'assets/bullets/missile.png');
        // this.load.image('bomb', 'assets/bullets/bombs.png')
        // this.load.spritesheet('gamepad','assets/gamepad/gamepad_spritesheet.png',100,100);

        //UI elements to be preloaded
        this.load.image('leaders','assets/ui-elements/leaders.png');
        this.load.image('share','assets/ui-elements/share.png');
        this.load.image('play','assets/ui-elements/play.png');
        this.load.image('settings','assets/ui-elements/settings.png');
        this.load.image('facebook','assets/ui-elements/facebook.png');
        this.load.image('volume','assets/ui-elements/volume.png');
        this.load.image('mute','assets/ui-elements/mute.png');
        this.load.image('game-over','assets/ui-elements/game-over.png');
        this.load.image('replay','assets/ui-elements/replay.png');
        this.load.image('play-button','assets/ui-elements/play-button.png');
        this.load.image('pause-button','assets/ui-elements/pause-button.png');

        this.game.load.start();
        this.loadingText.setText('Loading...');

    },
    loadingFinished: function () {
        this.game.state.start('register');
    }
};