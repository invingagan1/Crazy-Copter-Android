var Player = function (name, facebookId, score, time) {
    this.name = name;
    this.id = utils.createId();
    this.facebookId = facebookId;
    this.latestScore = {
        score: 0,
        time: new Date()
    };
    this.latestScore.score = score;
    this.latestScore.time = new Date(time);
};

var ScoreData = function (score, time) {
    this.score = score;
    this.time = new Date(time);
}