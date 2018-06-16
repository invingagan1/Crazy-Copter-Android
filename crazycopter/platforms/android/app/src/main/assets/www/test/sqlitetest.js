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
            alert('Error: ' + JSON.stringify(e));
        }

        // storage.openDatabase().then(function (r) {
        //     // testUpdatePlayer();
        //     storage.getPlayer().then(function (result) {
        //         alert(JSON.stringify(result));
        //         console.log(JSON.stringify(result.latestScore));
        //     }).catch(errorFunction);
        // }).catch(errorFunction);

        // Test is player table exist
        storage.isTableExist(storage.scoreTable).then(function (result) {
            alert(result ? 'Table exists' : 'Table does not exist');
        }).catch(errorFunction);

        // test create Table
        storage
            .openDatabase()
            .then(storage.createScoreTable)
            .then(function () { alert('Score table created') })
            .catch(errorFunction);

        // Test add score
        storage
            .openDatabase()
            .then(function(){return storage.addScore(newScore)})
            .then(function(){alert('Score added to table')})
            .catch(errorFunction);

        // get scores
        storage
            .openDatabase()
            .then(function(){return storage.getScores();})
            .then(function(result){alert(JSON.stringify(result))})
            .catch(errorFunction);
    }
}
document.addEventListener("deviceready", function () {
    sqlite_test.init();
});