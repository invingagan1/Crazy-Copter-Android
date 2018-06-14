var storage = {

    storageName: 'crazycopter',
    playerTable: 'player',
    scoreTable: 'scores',
    isAvailable: false,
    tablesCreated: false,
    isPlayerCreated: false,

    init: function() {
        console.log('Init storage');
    },
    createDatabase: function(){},
    createTables: function()(),
    

}
//var storageName = 'crazycopter';
//var playerTable = 'player';
//var scoreTable = 'scores';
//var db = null;
//
//var storage =  {
//
//    isAvailable: false,
//    tablesCreated: false,
//    isPlayerCreated: false,
//
//    init: function() {
//        alert('init storage');
//        db = window.sqlitePlugin.openDatabase({
//            name: storageName,
//            location: "default"
//        }, function () {
//            alert('data base created');
//            storage.isAvailable = true;
//        }, function () {
//            alert('data base not created');
//            storage.isAvailable = false;
//        });
//        this.createTables();
//    }
//    createTables: function() {
//        if (db) {
//            db.transaction(function (tx) {
//                tx.executeSql(`CREATE TABLE IF NOT EXISTS ${playerTable} (name text, facebookId text, id text primary key, score integer, time text)`);
//                tx.executeSql(`CREATE TABLE IF NOT EXISTS ${scoreTable} (score integer, time text)`);
//            }, function (error) {
//                storage.tablesCreated = false;
//                console.log('table not created');
//            }, function () {
//                storage.tablesCreated = true;
//                console.log('table created');
//            });
//        }
//    }
//    createPlayer: function(player) {
//        if (db && db.tablesCreated) {
//            db.transaction(function (tx) {
//                tx.executeSql(
//                    `INSERT INTO ${playerTable} VALUES (?,?,?,?,?)`,
//                    [player.name, player.facebookId, player.id, player.latestScore.score, player.latestScore.time]
//                );
//            }, function (error) {
//                storage.isPlayerCreated = false;
//            }, function () {
//                storage.isPlayerCreated = true;
//            });
//        }
//    }
//    addScore: function(player, score) {
//        if (db && db.tablesCreated) {
//            db.transaction(function (tx) {
//                tx.executeSql(`INSERT INTO ${scoreTable} VALUE (?,?)`, [score.score, score.time]);
//                tx.executeSql(`UPDATE ${playerTable} SET score = ?, time = ? where id = ?`, [score.score, score.time, player.id])
//            }, function (error) {
//                console.error(error);
//            }, function () {
//
//            });
//        }
//    }
//    updatePlayer: function(player) {
//        if (db && db.tablesCreated) {
//            db.transaction(function (tx) {
//                tx.executeSql(
//                    `UPDATE ${playerTable} SET name = ?, facebookId = ? ,score = ?, time = ? where id = ?`,
//                    [player.name, player.facebookId, player.latestScore.score, player.latestScore.time, player.id]
//                )
//            }, function (error) {
//                console.error(error);
//            }, function () {
//
//            });
//        }
//    }
//    getPlayer: function() {
//        return new Promise(function (resolve, reject) {
//            if (db && db.tablesCreated) {
//                db.transaction(function (tx) {
//                    tx.executeSql(`SELECT * FROM ${playerTable}`, [], function (resultSet) {
//                        // TODO: convert result set into player objects
//                        alert('get player');
//                        resolve(resultSet);
//                    }, function (error) {
//                        reject('No information available');
//                    });
//                });
//            } else {
//                reject('No information available');
//            }
//        });
//    }
//    getScores: function() {
//        return new Promise(function (resolve, reject) {
//            if (db && db.tablesCreated) {
//                db.transaction(function (tx) {
//                    tx.executeSql(`SELECT * FROM ${scoreTable}`, [], function (resultSet) {
//                        // TODO: convert result set into score objects
//                        console.log('get score');
//                        resolve(resultSet);
//                    }, function (error) {
//                        reject('No information available');
//                    });
//                });
//            } else {
//                reject('No information available');
//            }
//        });
//    };
//}