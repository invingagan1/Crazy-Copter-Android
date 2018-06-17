var firebaseHandler = {
    db: null,
    playerCollection: null,
    player: null,

    init: function () {
        var config = {
            apiKey: "AIzaSyDQ_2nhath3NJprpxdiOzd9sW2dY5frEFg",
            authDomain: "copter-169f5.firebaseapp.com",
            databaseURL: "https://copter-169f5.firebaseio.com",
            projectId: "copter-169f5",
            storageBucket: "copter-169f5.appspot.com",
            messagingSenderId: "779700610769"
        };
        firebase.initializeApp(config);
        this.db = firebase.firestore()
        this.playerCollection = this.db.collection('player');
    },


    savePlayer: function (player) {
        var that = this;
        return new Promise(function (resolve, reject) {
            that
                .playerCollection
                .doc(player.id)
                .set({
                    name: player.name,
                    facebookId: player.facebookId,
                    score: player.latestScore.score,
                    time: player.latestScore.time
                })
                .then(resolve)
                .catch(reject);
        });
    },
    getPlayer: function (id) {
        var that = this;
        return new Promise(function (resolve, reject) {
            if (id === undefined || id === null) {
                reject('incorrect id');
            }
            if (that.player) {
                resolve(that.player);
            } else {
                that.playerCollection.doc(id).get().then(function (result) {
                    if (result.exists) {
                        var playerData = result.data();
                        that.player = new Player(playerData.name, playerData.facebookId, playerData.score, playerData.time);
                        that.player.id = id;
                        resolve(that.player);
                    } else {
                        reject('player does not exist');
                    }
                }).catch(reject)
            }
        });
    },
    updatePlayer: function (player) {
        var that = this;
        return new Promise(function (resolve, reject) {
            if (player === null || player === undefined) {
                reject('Player is not defined');
            } else {
                that.getPlayer(player.id).then(function () {
                    that.playerCollection.doc(player.id).set({
                        name: player.name,
                        facebookId: player.facebookId,
                        score: player.latestScore.score,
                        time: player.latestScore.time
                    }).then(function () {
                        resolve('Player updated');
                    }).catch(reject);
                }).catch(reject);
            }
        });
    },

    getLeaders: function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            that
                .playerCollection
                .orderBy('score', 'desc')
                .limit(20)
                .get()
                .then(function(result){
                    var leaders = [];
                    result.docs.forEach(function(doc){
                        var leaderData = doc.data();
                        var leader  = new Player(leaderData.name, leaderData.facebookId, leaderData.score, leaderData.time);
                        leader.id = doc.id;
                        leaders.push(leader);
                    });
                    resolve(leaders)
                })
                .catch(reject);
        });
    }
};