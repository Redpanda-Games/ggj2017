var Preloader = function (game) {
    this.background = null;
    this.preloadBar = null;
    this.ready = false;
};
Preloader.prototype = {
    preload: function () {
        this.background = this.add.sprite(0, 0, 'preloaderBackground');
        this.preloadBar = this.add.sprite(400, 500, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);
    },
    create: function () {
        this.state.clearCurrentState();
        this.state.start('Menu');
    }
};
