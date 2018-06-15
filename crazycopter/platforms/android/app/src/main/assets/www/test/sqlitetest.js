var sqlite_test = {
    player: null,
    init: function () {

        // init storage
        var debug = $("#debug");
        var player = new Player('Gagan', 'f-123', '123', 12, Date.now());
        var newScore = new ScoreData(123, Date.now());

        function testDatabaseExist() {
            storage.isDatabaseExist().then(function (result) {
                alert(result ? 'Database exist' : 'Database does not exist');
            }).catch(errorFunction);
        }

        function testCreateDatabase() {
            storage.openDatabase().then(function (result) {
                alert(result ? "Database created" : "Could not create Database");
            }).catch(errorFunction);
        }

        function testPlayerTableExist() {
            storage.isTableExist(storage.playerTable).then(function (t_result) {
                alert(t_result ? "Table exist" : "Table does not exist");
            }).catch(errorFunction);
        }

        function testCreatePlayerTable() {
            storage.createPlayerTable().then(function (t_result) {
                alert(t_result ? "Table created" : "could not create table");
            }).catch(errorFunction);
        }

        function testCreatePlayer() {
            storage.createPlayer(player).then(function (result) {
                alert(result ? "Player created" : "Could not create player");
            }).catch(errorFunction);
        }

        function testUpdatePlayer() {
            player.latestScore = new ScoreData(9, Date.now());
            storage.updatePlayer(player).then(function (result) {
                alert(result ? "Player updated" : "Could not update player");
            }).catch(errorFunction);
        }

        function testGetPlayer() {
            storage.getPlayer().then(function (player) {
                alert(JSON.stringify(player));
            }).catch(errorFunction);
        }

        function errorFunction(e) {
            console.error(e);
        }

        storage.openDatabase().then(function (r) {
            // testUpdatePlayer();
            storage.getPlayer().then(function (result) {
                alert(JSON.stringify(result));
                console.log(JSON.stringify(result.latestScore));
            }).catch(errorFunction);
        }).catch(errorFunction);

        //        $('#save_player').click(function(){
        //            // save player
        //            var name = $("#name").val();
        //            var time = new  Date();
        //            sqlite_test.player = new Player(name,'12','',-1, Date.now());
        //            storage.createPlayer(sqlite_test.player);
        //        });
        //        $('#save_score').click(function(){
        //            // save player
        //            var score = $("#score").val();
        //            var latestScore = new ScoreData(score, Date.now());
        //            sqlite_test.player.latestScore = latestScore;
        //            storage.updatePlayer(sqlite_test.player);
        //            storage.addScore(latestScore);
        //        });
        //        $('#get_player').click(function(){
        //            // Get player
        //            storage.getPlayer().then(function(data){
        //                alert(JSON.stringify(data))
        //            }).catch(function(e){
        //                alert(e.toString());
        //            });
        //        });
        //        $('#get_score').click(function(){
        //            // get scores
        //            storage.getScores().then(function(data){
        //                alert(JSON.stringify(data))
        //            }).catch(console.error);
        //        });
    }
}
document.addEventListener("deviceready", function () {
    sqlite_test.init();
});