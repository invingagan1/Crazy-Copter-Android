var CrazyCandy = CrazyCandy || {};
CrazyCandy.Selection = function () {};
CrazyCandy.Selection.prototype = {
    preload: function () {},
    create: function () {
        // Create background
        this.background = this.add.sprite(0, 0, 'background');
        // this.background.scale.setTo(0.6);

        /**
         * Create button
         * 1. Play
         * 2. Settings
         * 3. mute
         * 4. board
         */
        

        this.play = this.add.sprite(140,104,'play');
        this.play.scale.setTo(0.5)
        this.play.inputEnabled = true;
        this.play.events.onInputDown.add(function(){
            this.game.state.start("game");
        }, this);

        this.settings = this.add.sprite(140,158,'settings');
        this.settings.scale.setTo(0.5);
        
        this.facebook = this.add.sprite(314,11,'facebook');
        this.facebook.scale.setTo(0.5);

        this.mute = this.add.sprite(354,11,'mute')
        this.mute.scale.setTo(0.5);
        this.volume = this.add.sprite(354,11,'volume');
        this.volume.scale.setTo(0.5);
        // TODO: Remove this once game is ready;
        //this.game.state.start('game')
    }
};