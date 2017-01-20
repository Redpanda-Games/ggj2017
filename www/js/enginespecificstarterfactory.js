var EngineSpecificStarterFactory = {
    factorByType: function (type) {
        var starter = null;
        switch (type) {
            case 'Phaser.io':
                starter = new PhaserStarter();
                break;
        }
        return starter;
    }
};