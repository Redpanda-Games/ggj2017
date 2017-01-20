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
        'Preload',
        'ScoreScreen'
    ],
    menuConfig: {
        entries: [
            {
                title: 'Start New Game',
                scene: 'Game'
            },
            {
                title: 'Achivements',
                scene: 'Achivement'
            },
            {
                title: 'Credits',
                scene: 'Credit'
            }
        ],
        backgroundImage: null
    },
    javaScriptDependencies: [
        'js/lib/phaser.js',
        'js/mgame.js',
        'js/phaserstarter.js',
        'js/gameobjectgenerator.js',
        'js/enginespecificstarterfactory.js',
        'js/scenes/engine/phaser/boot.js',
        'js/scenes/engine/phaser/game.js',
        'js/scenes/engine/phaser/achivements.js',
        'js/scenes/engine/phaser/credits.js',
        'js/scenes/engine/phaser/menu.js',
        'js/scenes/engine/phaser/preloader.js',
        'js/scenes/engine/phaser/scorescreen.js'
    ]
};