var GameObjectGenerator = {
    generateByEngineName: function (nameString, rootElementIdString) {
        var game = null;
        if (!nameString || !rootElementIdString) {
            return game;
        }
        switch (nameString) {
            case 'Phaser.io':
                game = new Phaser.Game(1920, 1080, Phaser.AUTO, rootElementIdString);
                break;
            default:
                game = null;
                break;
        }
        return game;
    }
};