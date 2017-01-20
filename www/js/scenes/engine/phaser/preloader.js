var Preloader = function (game) {
    this.background = null;
    this.preloadBar = null;
    this.ready = false;
};
Preloader.prototype = {
    preload: function () {
        //    These are the assets we loaded in Boot.js
        //    A nice sparkly background and a loading progress bar
        this.background = this.add.sprite(0, 0, 'preloaderBackground');
        this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
        //    This sets the preloadBar sprite as a loader sprite.
        //    What that does is automatically crop the sprite from 0 to full-width
        //    as the files below are loaded in.
        this.load.setPreloadSprite(this.preloadBar);
        //    Here we load the rest of the assets our game needs.
        //    As this is just a Project Template I've not provided these assets, swap them for your own.
        this.load.image('titlepage', 'images/title.jpg');
        this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
        this.load.audio('titleMusic', ['audio/main_menu.mp3']);
        this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
        //    + lots of other required assets here
    },
    create: function () {
        //    Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        this.preloadBar.cropEnabled = false;
        this.state.clearCurrentState();
        this.state.start('Menu');
    }
};