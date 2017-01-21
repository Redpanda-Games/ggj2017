var GameObjectGenerator = {
    generateByEngineName: function (nameString, rootElementIdString) {
        var game = null;
        if (!nameString || !rootElementIdString) {
            return game;
        }
        switch (nameString) {
            case 'Phaser.io':
                game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, rootElementIdString);
                break;
            default:
                game = null;
                break;
        }
        return game;
    }
};