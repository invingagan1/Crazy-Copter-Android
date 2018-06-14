var sqlite_test = {
    player: null,
    init: function(){
        $('#save_player').click(function(){
            // save player
            var name = $("#name").val();
            var time = new  Date();
            sqlite_test.player = new Player(name,'12','',-1, Date.now());
            storage.createPlayer(sqlite_test.player);
        });
        $('#save_score').click(function(){
            // save player
            var score = $("#score").val();
            var latestScore = new ScoreData(score, Date.now());
            sqlite_test.player.latestScore = latestScore;
            storage.updatePlayer(sqlite_test.player);
            storage.addScore(latestScore);
        });
        $('#get_player').click(function(){
            // Get player
            storage.getPlayer().then(console.log).catch(console.error);
        });
        $('#get_score').click(function(){
            // get scores
            storage.getScores().then(console.log).catch(console.error);
        });
    }
}
document.addEventListener("deviceready", function() {
    storage.init();
    sqlite_test.init();
});