var CrazyCandy = CrazyCandy || {};

var start = function(){

    // var height = window.innerHeight;
    // var width = window.innerWidth;
    // var ratio = Math.ceil(width/height);
    CrazyCandy.game = new Phaser.Game(400, 312, Phaser.AUTO, '');

    /**
     * Add Game states here.
        1. Boot: Boot of the game. it will load the preload bar and game icon. 
        2. Preload: It will load the assets used in game. Audio/images/Sprites/tile maps. It will show the progress bar if loading of assets.
        3. Selection: It will have selection options of game.
        4. Game: It will have game logic
     */
    
    CrazyCandy.game.state.add('boot', CrazyCandy.Boot);
    CrazyCandy.game.state.add('preload', CrazyCandy.Preload);
    CrazyCandy.game.state.add('register', CrazyCandy.Register);
    CrazyCandy.game.state.add('selection', CrazyCandy.Selection);
    CrazyCandy.game.state.add('game', CrazyCandy.Game);
    CrazyCandy.game.state.add('game-over', CrazyCandy.GameOver);
    
    CrazyCandy.game.state.start('boot');
}
document.addEventListener('deviceready', start);
window.addEventListener('load',start);