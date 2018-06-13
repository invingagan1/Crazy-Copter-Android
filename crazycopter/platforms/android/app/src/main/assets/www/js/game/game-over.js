var CrazyCandy = CrazyCandy || {};
CrazyCandy.GameOver = function () { }
CrazyCandy.GameOver.prototype = {
    preload: function () { },
    create: function () {

        this.background = this.add.sprite(0, 0, 'background');
        // this.background.scale.setTo(0.6);        
        
        // Game-over text image
        this.gameOver = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 102, 'game-over');
        this.gameOver.anchor.setTo(0.5);
        this.gameOver.scale.setTo(0.5);

        //Score Text
        this.scoreText = this.add.text(this.game.world.centerX, this.game.world.centerY - 51, 'Score: ' + ((CrazyCandy.score === undefined) ? 0 : CrazyCandy.score), {
            font: '24px Roboto',
            fill: '#000',
            fontWeight: 'bold'
        });
        this.scoreText.anchor.setTo(0.5);
        
        // Replay button
        this.replay = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'replay');
        this.replay.scale.setTo(0.5);
        this.replay.anchor.setTo(0.5);

        this.replay.inputEnabled = true;
        this.replay.events.onInputDown.add(function () {
            this.game.state.start('game')
        }, this);

        // Leader image
        this.leaders = this.add.sprite(this.game.world.centerX - 76, this.game.world.centerY + 76, 'leaders');
        this.leaders.anchor.setTo(0.5);
        this.leaders.scale.setTo(0.5);

        // Settings image
        this.share = this.add.sprite(this.game.world.centerX + 76, this.game.world.centerY + 76, 'share');
        this.share.anchor.setTo(0.5);
        this.share.scale.setTo(0.5);


    },
    update: function () {
    }
}