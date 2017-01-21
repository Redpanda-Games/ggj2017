var ElementFactory = function(game) {
    var _game = null;
    var _init = function() {
        _game = game;
    };
    this.factorShip = function(spawn) {
        var sprite = _game.add.sprite(spawn.x, spawn.y, 'alien_ship');
        _game.physics.arcade.enable(sprite);
        sprite.anchor.setTo(0.5, 0.5);
        sprite.speedMultiplier = 1;
        sprite.moveForward = function(speed) {
            var p = this.center;
            var t = _game.center;
            var angle = Math.atan2(t.y - p.y, t.x - p.x) * (180 / Math.PI);
            _game.physics.arcade.velocityFromAngle(angle, speed * this.speedMultiplier, this.body.velocity);
        };
        return sprite;
    };
    this.factorPlanet = function() {

    };
    this.factorHealthBar = function() {

    };
    this.factorRadar = function() {

    };
    _init();
};