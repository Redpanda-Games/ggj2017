var ElementFactory = function(game) {
    var _game = null;
    var _init = function() {
        _game = game;
    };
    this.factorShip = function(spawn) {
        var sprite = _game.add.sprite(spawn.x, spawn.y, 'ship_01');
        _game.physics.arcade.enable(sprite);
        sprite.anchor.setTo(0.5, 0.5);
        sprite.speedMultiplier = 1;
        sprite.moveForward = function(speed) {
            var angle = Math.atan2(_game.world.centerY - this.y, _game.world.centerX - this.x) * (180 / Math.PI);
            _game.physics.arcade.velocityFromAngle(angle, speed * this.speedMultiplier, this.body.velocity);
        };
        sprite.scale.setTo(_game.world.width/100, _game.world.width/100);
        return sprite;
    };
    this.factorPlanet = function() {
        var sprite = _game.add.sprite(_game.world.centerX, _game.world.centerY, 'planet');
        _game.physics.arcade.enable(sprite);
        sprite.anchor.setTo(0.5, 0.5);
        sprite.body.setCircle(sprite.width/2);
        return sprite;

    };
    this.factorHealthBar = function() {

    };
    this.factorRadar = function() {

    };
    _init();
};
