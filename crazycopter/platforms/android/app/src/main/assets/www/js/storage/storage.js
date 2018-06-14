var storage = {

    storageName: 'crazycopter',
    playerTable: 'player',
    scoreTable: 'scores',
    isAvailable: false,
    tablesCreated: false,
    isPlayerCreated: false,
    db: null,

    init: function() {
        alert('init storage');
        this.createDatabase();
    },
    createDatabase: function(){
        this.db = window.sqlitePlugin.openDatabase({
                name: this.storageName,
                location: "default"
        }, (function () {
            this.isAvailable = true;
            alert('database created');
            this.createTables();
        }).bind(this),(function () {
            alert('database not created');
            this.isAvailable = false;
        }).bind(this));
    },
    createTables: function(){
        if (this.isAvailable) {
            this.db.transaction(function (tx) {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS ${playerTable} (name text, facebookId text, id text primary key, score integer, time text)`);
                tx.executeSql(`CREATE TABLE IF NOT EXISTS ${scoreTable} (score integer, time text)`);
            }, (function (error) {
                alert('database created');
                this.tablesCreated = false;
            }).bind(this), (function () {
                this.tablesCreated = true;
            }).bind(this));
        }
    },

    createPlayer: function(player) {
        if (this.db.isAvailable && this.db.tablesCreated) {
            this.db.transaction(function (tx) {
                tx.executeSql(
                    `INSERT INTO ${playerTable} VALUES (?,?,?,?,?)`,
                    [player.name, player.facebookId, player.id, player.latestScore.score, player.latestScore.time]
                );
            }, (function (error) {
                this.isPlayerCreated = false;
            }).bond(this), (function () {
                this.isPlayerCreated = true;
            }).bind(this));
        }
    },
    updatePlayer: function(player){
        if (this.db.isAvailable && this.db.tablesCreated) {
            this.db.transaction(function (tx) {
                tx.executeSql(
                    `UPDATE ${playerTable} SET name = ?, facebookId = ? ,score = ?, time = ? where id = ?`,
                    [player.name, player.facebookId, player.latestScore.score, player.latestScore.time, player.id]
                )
            }, function (error) {
                console.error(error);
            }, function () {
                console.log('player updated');
            });
        }
    },
    getPlayer: function(){
        var self = this;
        return new Promise(function (resolve, reject) {
            if (self.db.isAvailable && self.db.tablesCreated) {
                self.db.transaction(function (tx) {
                    tx.executeSql(`SELECT * FROM ${playerTable}`, [], function (resultSet) {
                        // TODO: convert result set into player objects
                        alert('get player');
                        resolve(resultSet);
                    }, function (error) {
                        reject('No information available');
                    });
                });
            } else {
                reject('No information available');
            }
        });
    },

    addScore: function(player, score) {
        if (this.db.isAvailable && this.db.tablesCreated) {
            this.db.transaction(function (tx) {
                tx.executeSql(`INSERT INTO ${scoreTable} VALUE (?,?)`, [score.score, score.time]);
                tx.executeSql(`UPDATE ${playerTable} SET score = ?, time = ? where id = ?`, [score.score, score.time, player.id])
            }, function (error) {
                console.error(error);
            }, function () {
                console.log('score added.');
            });
        }
    },
    getScores: function(){
        var self = this;
        return new Promise(function (resolve, reject) {
            if (self.db.isAvailable && self.db.tablesCreated) {
                self.db.transaction(function (tx) {
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
    };
    }

}