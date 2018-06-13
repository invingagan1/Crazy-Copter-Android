var storage = (function () {
    var storageName = 'crazycopter';
    var playerTable = 'player';
    var scoreTable = 'scores';
    var db = null;

    var storageObject = {
        isAvailable: false,
        tablesCreated: false,
        isPlayerCreated: false,
        init: init,
        createPlayer: createPlayer,
        addScore: addScore,
        updatePlayer: updatePlayer,
        getPlayer: getPlayer,
        getScores: gerScores
    }
    return storageObject;

    function init() {
        db = window.sqlitePlugin.openDatabase({
            name: storageName,
            location: "default"
        }, function () {
            storageObject.isAvailable = true;
        }, function () {
            storageObject.isAvailable = false;
        });
        createTables();
    }
    function createTables() {
        if (db) {
            db.transaction(function (tx) {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS ${playerTable} (name text, facebookId text, id text primary key, score integer, time text)`);
                tx.executeSql(`CREATE TABLE IF NOT EXISTS ${scoreTable} (score integer, time text)`);
            }, function (error) {
                storageObject.tablesCreated = false;
            }, function () {
                storageObject.tablesCreated = true;
            });
        }
    }
    function createPlayer(player) {
        if (db && db.tablesCreated) {
            db.transaction(function (tx) {
                tx.executeSql(
                    `INSERT INTO ${playerTable} VALUES (?,?,?,?,?)`,
                    [player.name, player.facebookId, player.id, player.latestScore.score, player.latestScore.time]
                );
            }, function (error) {
                storageObject.isPlayerCreated = false;
            }, function () {
                storageObject.isPlayerCreated = true;
            });
        }
    }
    function addScore(player, score) {
        if (db && db.tablesCreated) {
            db.transaction(function (tx) {
                tx.executeSql(`INSERT INTO ${scoreTable} VALUE (?,?)`, [score.score, score.time]);
                tx.executeSql(`UPDATE ${playerTable} SET score = ?, time = ? where id = ?`, [score.score, score.time, player.id])
            }, function (error) {
                console.error(error);
            }, function () {

            });
        }
    }
    function updatePlayer(player) {
        if (db && db.tablesCreated) {
            db.transaction(function (tx) {
                tx.executeSql(
                    `UPDATE ${playerTable} SET name = ?, facebookId = ? ,score = ?, time = ? where id = ?`,
                    [player.name, player.facebookId, player.latestScore.score, player.latestScore.time, player.id]
                )
            }, function (error) {
                console.error(error);
            }, function () {

            });
        }
    }
    function getPlayer() {
        return new Promise(function (resolve, reject) {
            if (db && db.tablesCreated) {
                db.transaction(function (tx) {
                    tx.executeSql(`SELECT * FROM ${playerTable}`, [], function (resultSet) {
                        // TODO: convert result set into player objects
                        resolve(resultSet);
                    }, function (error) {
                        reject('No information available');
                    });
                });
            } else {
                reject('No information available');
            }
        });
    }
    function getScores() {
        return new Promise(function (resolve, reject) {
            if (db && db.tablesCreated) {
                db.transaction(function (tx) {
                    tx.executeSql(`SELECT * FROM ${scoreTable}`, [], function (resultSet) {
                        // TODO: convert result set into score objects
                        resolve(resultSet);
                    }, function (error) {
                        reject('No information available');
                    });
                });
            } else {
                reject('No information available');
            }
        });
    });
}
}) ();