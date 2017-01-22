var Intro = function (game) {
    this.video = null;
    this.game = game;
};
Intro.prototype = {
    create: function () {
        this.video = null;
        this.video = this.game.add.video('intro');
        this.video.onComplete.addOnce(this.videoEnd, this);
        this.video.play();
        this.video.addToWorld();
    },
    update: function () {
        var that = this;
        this.game.input.keyboard.onPressCallback = function () {
            that.videoEnd(that.video);
        }
    },
    videoEnd: function (myVideo) {
        myVideo.stop();
        myVideo.destroy();
        this.game.state.start('Game');
    },
    shutdown: function () {
        this.game.input.keyboard.onPressCallback = null;
    }
};