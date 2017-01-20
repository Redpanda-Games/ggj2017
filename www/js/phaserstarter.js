var PhaserStarter = function () {
    var _phasergame = null;
    var _appendScenes = function () {
        if (GlobalConfig.scenes && _phasergame) {
            for (var i in GlobalConfig.scenes) {
                if (GlobalConfig.scenes.hasOwnProperty(i)) {
                    _phasergame.state.add(GlobalConfig.scenes[i], window[GlobalConfig.scenes[i]]);
                }
            }
        }
    };
    //TODO Better use a connector to connect specific game object with starter
    this.start = function (gameObject) {
        _phasergame = gameObject;
        _appendScenes();
        _phasergame.state.start('Boot');
    };
};