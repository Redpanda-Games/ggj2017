var GameObjectGenerator = {
    generateByEngineName : function(nameString, rootElementIdString) {
        var game = null;
        if(!nameString || !rootElementIdString){
            return game;
        }
        switch (nameString) {
            case 'Phaser.io':
                game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, rootElementIdString);
                break;
            default:
                game =null;
                break;
        }
        return game;
    }
};