var GlobalConfig = {
    gameName: 'GravCore',
    version: '0.0.1',
    gameEngineName: 'Phaser.io',
    rootElementId: 'gameStage',
    scenes: [
        'Achivement',
        'Boot',
        'Credit',
        'Game',
        'Menu',
        'Preloader',
        'ScoreScreen'
    ],
    menuConfig: {
        entries: [
            {
                title: '',
                img: 'menu_start_button',
                scene: 'Game'
            }/*,
             {
             title: 'Achivements',
             scene: 'Achivement'
             },
             {
             title: 'Credits',
             scene: 'Credit'
             }*/
        ],
        backgroundImage: null
    },
    javaScriptDependencies: [
        'src/js/lib/phaser.js',
        'src/js/mgame.js',
        'src/js/elementfactory.js',
        'src/js/phaserstarter.js',
        'src/js/gameobjectgenerator.js',
        'src/js/enginespecificstarterfactory.js',
        'src/js/scenes/engine/phaser/boot.js',
        'src/js/scenes/engine/phaser/game.js',
        'src/js/scenes/engine/phaser/achivements.js',
        'src/js/scenes/engine/phaser/credits.js',
        'src/js/scenes/engine/phaser/menu.js',
        'src/js/scenes/engine/phaser/preloader.js',
        'src/js/scenes/engine/phaser/scorescreen.js'
    ]
};