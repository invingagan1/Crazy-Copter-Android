var Player = function () {

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