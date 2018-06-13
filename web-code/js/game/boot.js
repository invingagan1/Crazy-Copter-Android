/**
 * Load assets for preload screen.
 * 1. Preload bar
 * 2. Game icon 
 */
var CrazyCandy = CrazyCandy || {};
CrazyCandy.Boot = function () {};
CrazyCandy.Boot.prototype = {
    preload: function () {
    
        this.game.load.image('background', 'assets/background-1.png');
        this.game.load.image('logo', 'assets/logo.png');
        this.game.load.image('loading', 'assets/loading.jpg');
    },
    create: function () {
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.background = this.add.sprite(0, 0, 'background');
        // this.background.scale.setTo(0.6);

        // this.game.scale.forceOrientation(true, false);

        // this.game.scale.enterIncorrectOrientation.add(function(){
        //     var incorrectMode = document.querySelector('#incorrectMode');
        //     incorrectMode.style.display = 'flex';
        // }, this);

        // this.game.scale.leaveIncorrectOrientation.add(function(){
            
        //     var incorrectMode = document.querySelector('#incorrectMode');
        //     incorrectMode.style.display = 'none';
        // }, this);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.state.start('preload');
    }
};