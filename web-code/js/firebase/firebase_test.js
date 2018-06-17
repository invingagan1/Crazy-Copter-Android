var firebaseTest = {
    start: function () {
        firebaseHandler.init();
        player = new Player('Gagan', 'f-123', 12, new Date());
        player.id = '78a68033-0fd7-4675-8b7b-df76bf594184';

        //this.testGetPlayer(this.player.id);
        player.latestScore.score = 210;
        player.latestScore.time = new Date();

        // this.testGetPlayer(player.id);
        // this.testUpdatePlayer(player);
        this.testGetLeaders();
    },
    testCreatePlayer: function (p) {
        firebaseHandler.savePlayer(p);
    },
    testGetPlayer: function (id) {
        firebaseHandler.getPlayer(id).then(console.log).catch(console.error);
    },
    testUpdatePlayer: function (player) {
        firebaseHandler.updatePlayer(player).then(console.log).catch(console.error);
    },
    testGetLeaders: function () {
        // for (var i = 0; i < 20; i++) {
        //     firebaseHandler.savePlayer(new Player(
        //         'leader ' + i,
        //         i,
        //         Math.ceil(Math.random() * 1000),
        //         new Date()
        //     ));
        // }
        // setTimeout(function(){
            firebaseHandler.getLeaders().then(console.log).catch(console.error);
        // },5000)

    }
}
window.onload = firebaseTest.start();