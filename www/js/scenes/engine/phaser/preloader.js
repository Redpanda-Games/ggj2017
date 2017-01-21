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

        this.load.image('radar_ground', 'img/radar_background.png');
        this.load.image('radar_planet', 'img/radar_planet.png');
        this.load.image('radar_ship', 'img/radar_ship.png');
        this.load.image('radar_scanner', 'img/radar_scanner.png');
        this.load.image('energybar', 'img/Energie-Bar.png');
        this.load.image('healthbar', 'img/HP-BAR.png');
        this.load.image('game_background', 'img/game_background.jpg');
        this.load.image('charackter', 'img/Char.png');
        this.load.image('planet', 'img/planet.png');
        this.load.image('ship_01', 'img/ship_01.png');
    },
    create: function () {
        this.state.clearCurrentState();
        this.state.start('Menu');
    }
};
