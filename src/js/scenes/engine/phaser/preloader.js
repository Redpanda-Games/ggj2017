var Preloader = function (game) {
    this.background = null;
    this.preloadBar = null;
    this.ready = false;
};
Preloader.prototype = {
    preload: function () {
        this.background = this.add.sprite(0, 0, 'background');
        this.preloadBar = this.add.sprite(400, 500, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('radar_ground', 'src/img/radar_background.png');
        this.load.image('radar_planet', 'src/img/radar_planet.png');
        this.load.image('radar_ship', 'src/img/radar_ship.png');
        this.load.image('radar_scanner', 'src/img/radar_scanner.png');
        this.load.image('credits', 'src/img/credits.jpg');
        this.load.image('highscore', 'src/img/gravcore-highscore.png');

        this.load.image('menu_logo', 'src/img/gravcore-startscreen-logo.png');
        this.load.image('credit_button', 'src/img/gravcore-startscreen-team.png');

        this.load.audio('attack', 'src/audio/laserattack.wav');
        this.load.audio('flysound','src/audio/space_fly.wav');
        this.load.audio('gameover','src/audio/gameover.wav');
         
        this.load.spritesheet('planet', 'src/img/planet.png', 250, 250);
        this.load.spritesheet('ship_01', 'src/img/ship_01.png', 250, 250);
        this.load.spritesheet('bullet_inverse', 'src/img/bullet_inverse.png', 350, 350);
        this.load.spritesheet('bullet_increase', 'src/img/bullet_increase.png', 350, 350);
        this.load.spritesheet('menu_start_button', 'src/img/menu_start_button.png', 900, 900);
        this.load.spritesheet('planet_dead', 'src/img/planet_explosion.png', 1000, 1000);

        this.load.spritesheet('avatar', 'src/img/avatar_happy_kom.png', 600, 376);
        this.load.spritesheet('energie', 'src/img/energieleiste.png', 600, 376);
        this.load.spritesheet('lifebar', 'src/img/lebenleiste.png', 600, 376);
    },
    create: function () {
        this.state.clearCurrentState();
        this.state.start('Menu');
    }
};
