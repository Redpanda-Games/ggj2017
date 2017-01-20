var MGame = function (globalConfig) {

    var _game = null;
    var _config = null;

    var _init = function () {
        _config = !globalConfig ? GlobalConfig : globalConfig;
        _game = GameObjectGenerator.generateByEngineName(_config.gameEngineName, _config.rootElementId);
    };

    var _start = function () {
        var starter = EngineSpecificStarterFactory.factorByType(_config.gameEngineName);
        //TODO better use a connector
        starter.start(_game);
    };

    this.getEngineSpezificGameObject = function () {
        return _game;
    };

    this.getConfig = function () {
        return _config;
    };

    this.start = function () {
        _start();
    };
    _init();
};