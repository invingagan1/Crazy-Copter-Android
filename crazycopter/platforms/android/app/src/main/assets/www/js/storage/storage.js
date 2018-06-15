var storage = {
    databaseName: 'crazycopter.db',
    playerTable: 'player',
    scoreTable: 'score',

    db: null,

    isDatabaseExist: function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            if (that.db === null) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    },
    openDatabase: function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.db = window.sqlitePlugin.openDatabase({
                name: that.databaseName,
                location: "default"
            }, function () {
                resolve(true);
            }, function (e) {
                reject(e);
            });
        });
    },


    isTableExist: function (table) {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.db.transaction(function (tx) {
                var query = `SELECT COUNT(*) AS tableCount FROM sqlite_master WHERE TYPE = "table" AND NAME = ?`;
                tx.executeSql(query, [table], function (tx, rs) {
                    resolve(rs.rows.item(0).tableCount > 0);
                }, function (e) {
                    reject(e);
                });
            });
        });
    },
    createPlayerTable: function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.db.transaction(function (tx) {
                var query = `CREATE TABLE IF NOT EXISTS ${that.playerTable} (name text, facebookId text, id text primary key, score integer, time text)`;
                tx.executeSql(query, [], function () {
                    resolve(true);
                }, reject);
            });
        });
    },

    createPlayer: function (player) {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.db.transaction(function (tx) {
                var query = `INSERT INTO ${that.playerTable} VALUES (?,?,?,?,?)`;
                var values = [player.name, player.facebookId, player.id, player.latestScore.score, player.latestScore.time];
                tx.executeSql(query, values, function () {
                    resolve(true);
                }, reject);
            });
        });
    },
    updatePlayer: function (player) {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.db.transaction(function (tx) {
                var query = `UPDATE ${that.playerTable} SET name=?, facebookId = ?, score = ?, time = ? WHERE id = ?`;
                var values = [player.name, player.facebookId, player.latestScore.score, player.latestScore.time, player.id];
                tx.executeSql(query, values, function () {
                    resolve(true);
                }, reject);
            });
        });
    },
    getPlayer: function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.db.transaction(function (tx) {
                var query = `SELECT * FROM ${that.playerTable} `;
                tx.executeSql(query, [], function (tx, rs) {
                    var players = [];
                    for (var i = 0; i < rs.rows.length; i++) {
                        var rowItem = rs.rows.item(0);
                        players.push(new Player(
                            rowItem.name,
                            rowItem.facebookId,
                            rowItem.id,
                            rowItem.score,
                            rowItem.time
                        ));
                    }
                    resolve(players);
                }, function (e) {
                    reject(e);
                });
            });
        });
    }
};





//var storage = {
//
//    storageName: 'crazycopter',
//    playerTable: 'player',
//    scoreTable: 'scores',
//    isAvailable: false,
//    tablesCreated: false,
//    isPlayerCreated: false,
//    db: null,
//
//    init: function() {
//        this.createDatabase();
//    },
//    createDatabase: function(){
//        this.db = window.sqlitePlugin.openDatabase({
//                name: this.storageName,
//                location: "default"
//        }, (function () {
//            this.isAvailable = true;
//            this.createTables();
//        }).bind(this),(function () {
//            this.isAvailable = false;
//        }).bind(this));
//    },
//    createTables: function(){
//        var self = this;
//        if(this.isAvailable){
//            this.db.transaction(function (tx) {
//                tx.executeSql(`CREATE TABLE IF NOT EXISTS ${self.playerTable} (name text, facebookId text, id text primary key, score integer, time text)`);
//                tx.executeSql(`CREATE TABLE IF NOT EXISTS ${self.scoreTable} (score integer, time text)`);
//            }, (function (error) {
//                this.tablesCreated = false;
//            }).bind(this), (function () {
//                this.tablesCreated = true;
//            }).bind(this));
//        }
//    },
//
//    createPlayer: function(player) {
//        var self = this;
//        if (this.isAvailable && this.tablesCreated && this.db) {
//            var query = `INSERT INTO ${self.playerTable} VALUES (?,?,?,?,?)`;
//            alert(query);
//            this.db.transaction(function (tx) {
//                tx.executeSql(
//                    query,
//                    [player.name, player.facebookId, player.id, player.latestScore.score, player.latestScore.time]
//                );
//            }, (function (error) {
//                this.isPlayerCreated = false;
//                alert('could not create player');
//            }).bind(this), (function () {
//                this.isPlayerCreated = true;
//                alert('player created');
//            }).bind(this));
//        }
//    },
//    updatePlayer: function(player){
//        var self = this;
//        if (this.isAvailable && this.tablesCreated && this.db) {
//            this.db.transaction(function (tx) {
//                var query = `UPDATE ${self.playerTable} SET name = ?, facebookId = ? ,score = ?, time = ? where id = ?`;
//                tx.executeSql(
//                    query,
//                    [player.name, player.facebookId, player.latestScore.score, player.latestScore.time, player.id]
//                )
//            }, function (error) {
//                alert('could not update player');
//                console.error(error);
//            }, function () {
//                alert('player updated');
//                console.log('player updated');
//            });
//        }
//    },
//    getPlayer: function(){
//        var self = this;
//        return new Promise(function (resolve, reject) {
//            if (self.isAvailable && self.tablesCreated && self.db) {
//                self.db.transaction(function (tx) {
//                    tx.executeSql(`SELECT * FROM ${self.playerTable}`, [], function (resultSet) {
//                        // TODO: convert result set into player objects
//                        alert(`isAvailable ${self.isAvailable} tablesCreated ${self.tablesCreated} table ${self.playerTable} `);
//                        resolve(resultSet.rows);
//                    }, function (error) {
//                        reject('No information available - 1');
//                    });
//                });
//            } else {
//                reject('No information available - 2');
//            }
//        });
//    },
//
//    addScore: function(player, score) {
//        var self = this;
//        if (this.isAvailable && this.tablesCreated && this.db) {
//            this.db.transaction(function (tx) {
//                tx.executeSql(`INSERT INTO ${self.scoreTable} VALUE (?,?)`, [score.score, score.time]);
//                tx.executeSql(`UPDATE ${self.playerTable} SET score = ?, time = ? where id = ?`, [score.score, score.time, player.id])
//            }, function (error) {
//                console.error(error);
//            }, function () {
//                console.log('score added.');
//            });
//        }
//    },
//    getScores: function(){
//        var self = this;
//        return new Promise(function (resolve, reject) {
//            if (self.isAvailable && self.tablesCreated && self.db) {
//                self.db.transaction(function (tx) {
//                    tx.executeSql(`SELECT * FROM ${self.scoreTable}`, [], function (resultSet) {
//                        // TODO: convert result set into score objects
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
//}