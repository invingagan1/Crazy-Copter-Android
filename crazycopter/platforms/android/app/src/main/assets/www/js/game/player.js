var Player = function (name,id, facebookId, score, time) {
    this.name = name;
    this.id = id;
    this.facebookId = facebookId;
    this.latestScore.score = score,
    this.latestScore.time = (new Date(time)).getTime();
};
Player.prototype = {
    name: "",
    facebookId: "",
    id: "",
    latestScore: {}
}

var ScoreData = function (score, time) {
    this.score = score;
    this.time = (new Date(date)).getTime();
}
ScoreData.prototype = {
    score: 0,
    time: ''
}