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

        //Phase 1 Normale Sounds
        this.load.audio('ingame_01_00', ['src/audio/MUSIK_P1_01.mp3', 'src/audio/MUSIK_P1_01.ogg']);
        this.load.audio('ingame_01_01', ['src/audio/MUSIK_P1_02.mp3', 'src/audio/MUSIK_P1_02.ogg']);
        this.load.audio('ingame_01_02', ['src/audio/MUSIK_P1_03.mp3', 'src/audio/MUSIK_P1_03.ogg']);
        this.load.audio('ingame_01_03', ['src/audio/MUSIK_P1_04.mp3', 'src/audio/MUSIK_P1_04.ogg']);
        this.load.audio('ingame_01_04', ['src/audio/MUSIK_P1_05.mp3', 'src/audio/MUSIK_P1_05.ogg']);
        this.load.audio('ingame_01_05', ['src/audio/MUSIK_P1_06.mp3', 'src/audio/MUSIK_P1_06.ogg']);
        this.load.audio('ingame_01_06', ['src/audio/MUSIK_P1_07.mp3', 'src/audio/MUSIK_P1_07.ogg']);

        //Phase 2 Wenn die Schiffe angedockt sind
        this.load.audio('ingame_02_00', ['src/audio/MUSIK_P2_01.mp3', 'src/audio/MUSIK_P2_01.ogg']);
        this.load.audio('ingame_02_01', ['src/audio/MUSIK_P2_02.mp3', 'src/audio/MUSIK_P2_02.ogg']);
        this.load.audio('ingame_02_02', ['src/audio/MUSIK_P2_03.mp3', 'src/audio/MUSIK_P2_03.ogg']);
        this.load.audio('ingame_02_03', ['src/audio/MUSIK_P2_04.mp3', 'src/audio/MUSIK_P2_04.ogg']);
        this.load.audio('ingame_02_04', ['src/audio/MUSIK_P2_05.mp3', 'src/audio/MUSIK_P2_05.ogg']);
        this.load.audio('ingame_02_05', ['src/audio/MUSIK_P2_06.mp3', 'src/audio/MUSIK_P2_06.ogg']);
        this.load.audio('ingame_02_06', ['src/audio/MUSIK_P2_07.mp3', 'src/audio/MUSIK_P2_07.ogg']);

        //Phase 3
        this.load.audio('ingame_03_00', ['src/audio/MUSIK_P3_01.mp3', 'src/audio/MUSIK_P3_01.ogg']);
        this.load.audio('ingame_03_01', ['src/audio/MUSIK_P3_02.mp3', 'src/audio/MUSIK_P3_02.ogg']);
        this.load.audio('ingame_03_02', ['src/audio/MUSIK_P3_03.mp3', 'src/audio/MUSIK_P3_03.ogg']);
        this.load.audio('ingame_03_03', ['src/audio/MUSIK_P3_04.mp3', 'src/audio/MUSIK_P3_04.ogg']);
        this.load.audio('ingame_03_04', ['src/audio/MUSIK_P3_05.mp3', 'src/audio/MUSIK_P3_05.ogg']);
        this.load.audio('ingame_03_05', ['src/audio/MUSIK_P3_06.mp3', 'src/audio/MUSIK_P3_06.ogg']);
        this.load.audio('ingame_03_06', ['src/audio/MUSIK_P3_07.mp3', 'src/audio/MUSIK_P3_07.ogg']);

        this.load.spritesheet('planet', 'src/img/planet.png', 250, 250);
        this.load.spritesheet('ship_01', 'src/img/ship_01.png', 250, 250);
        this.load.spritesheet('bullet_inverse', 'src/img/bullet_inverse.png', 350, 350);
        this.load.spritesheet('bullet_increase', 'src/img/bullet_increase.png', 350, 350);
        this.load.spritesheet('menu_start_button', 'src/img/menu_start_button.png', 900, 900);
        this.load.spritesheet('planet_dead', 'src/img/planet_explosion.png', 1000, 1000);

        this.load.spritesheet('avatar', 'src/img/avatar_happy_kom.png', 600, 374);
        this.load.spritesheet('energie', 'src/img/lebenleiste.png', 600, 374);
        this.load.spritesheet('lifebar', 'src/img/energieleiste.png', 600, 374);
    },
    create: function () {
        this.state.clearCurrentState();
        this.state.start('Menu');
    }
};
