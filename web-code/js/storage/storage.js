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
            if (that.db === null) {
                that.db = window.sqlitePlugin.openDatabase({
                    name: that.databaseName,
                    location: "default"
                }, function () {
                    resolve(true);
                }, function (e) {
                    reject(e);
                });
            } else {
                resolve(true);
            }
        });
    },
    closeDatabase: function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            if (that.db === null) {
                resolve(true);
            } else {
                that.db.close(function () {
                    that.db = null;
                    resolve();
                }, reject);
            }
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
                    resolve();
                }, reject);
            });
        });
    },

    createScoreTable: function () {
        var that = this;
        return new Promise(function () {
            that.db.transaction(function (tx) {
                var query = `CREATE TABLE IF NOT EXISTS ${that.scoreTable} (score text, time text)`;
                tx.executeSql(query, [], function () {
                    resolve();
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
    },

    addScore: function (scoreData) {
        var that = this;
        return new Promise(function () {
            that.db.transaction(function (tx) {
                var query = `INSERT INTO ${that.scoreTable} VALUES (?,?)`;
                var values = [scoreData.score, scoreData.time];
                tx.executeSql(query, values, function () {
                    resolve();
                }, reject);
            })
        });
    },
    getScores: function () {
        var that = this;
        return new Promise(function () {
            that.db.transaction(function (tx) {
                var query = `SELECT * FROM ${that.scoreTable}`;
                tx.executeSql(query, [], function (tx, rs) {
                    var scores = [];
                    for (var i = 0; i < rs.rows.length; i++) {
                        var scoreItem = rs.rows.item(0);
                        scores.push(new ScoreData(scoreItem.score, scoreItem.time));
                    }
                    resolve(scores)
                }, reject);
            });
        });
    }
};

var storageHandler = {
    storage: {
        player: {},
        score: []
    },
    storageName: 'crazycopter',
    savePlayer: function (player) {
        var that = this;
        return new Promise(function (resolve, reject) {
            if (player === undefined || player === null) {
                reject('player is not defined');
            } else {
                try {
                    that.storage.player = player;
                    window.localStorage.setItem(that.storageName, JSON.stringify(that.storage));
                    resolve();
                } catch (e) {
                    reject(e);
                }
            }
        });
    },
    updatePlayer: function (player) {
        var that = this;
        return new Promise(function (resolve, reject) {
            if (player === undefined || player === null) {
                reject('player is not defined');
            } else {
                try {
                    that.storage.player = player;
                    window.localStorage.setItem(that.storageName, JSON.stringify(that.storage));
                    resolve();
                } catch (e) {
                    reject(e);
                }
            }
        });
    },
    getPlayer: function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            try {
                var players = [];
                var localData = JSON.parse(window.localStorage.getItem(that.storageName));
                that.storage.player = localData.player;
                var p = new Player(that.storage.player.name, that.storage.player.facebookId, that.storage.player.latestScore.score, that.storage.player.latestScore.time);
                p.id = that.storage.player.id;
                players.push(p);
                resolve(players);
            } catch (e) {
                reject(e);
            }
        });
    },

    addScore: function (scoreData) {
        var that = this;
        return new Promise(function (resolve, reject) {
            if (scoreData === undefined || scoreData === null) {
                reject('score data is not defined');
            } else {
                try {
                    that.storage.score.push(scoreData);
                    window.localStorage.setItem(that.storageName, JSON.stringify(that.storage));
                    resolve();
                } catch (e) {
                    reject(e);
                }
            }
        });
    },
    getScores: function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            try {
                var localData = JSON.parse(window.localStorage.getItem(that.storageName));
                that.storage.score = localData.score.map(function (data) {
                    return new ScoreData(data.score, new Date(data.time));
                });
                resolve(that.storage.score);
            } catch (e) {
                reject(e);
            }
        });
    }
};