var ElementFactory = function(game) {
    var _game = null;
    var _init = function() {
        _game = game;
    };
    this.factorShip = function(spawn) {
        var sprite = _game.add.sprite(spawn.x, spawn.y, 'ship_01');
        sprite.anchor.setTo(0.5, 0.5);
        sprite.scale.setTo(0.5, 0.5);
        _game.physics.arcade.enable(sprite);
        var radius = sprite.width/2;
        sprite.body.setCircle(radius, radius, radius);
        sprite.speedMultiplier = 1;
        sprite.docked = false;
        sprite.moveForward = function(speed) {
            if(!this.docked) {
                var angle = Math.atan2(_game.world.centerY - this.y, _game.world.centerX - this.x) * (180 / Math.PI);
                this.angle = angle + 180;
                _game.physics.arcade.velocityFromAngle(angle, speed * this.speedMultiplier, this.body.velocity);
            }
        };
        sprite.body.onCollide = new Phaser.Signal();
        sprite.body.onCollide.add(function(sprite1, sprite2) {
            if(sprite1.docked !== undefined) {
                sprite1.docked = true;
            } else {
                sprite2.docked = true;
            }
        });
        return sprite;
    };
    this.factorPlanet = function() {
        var sprite = _game.add.sprite(_game.world.centerX, _game.world.centerY, 'planet');
        _game.physics.arcade.enable(sprite);
        sprite.anchor.setTo(0.5, 0.5);
        sprite.body.setCircle(sprite.width/2);
        sprite.body.immovable = true;
        return sprite;
    };
    this.factorHealthBar = function() {
        return {
            update: function() {}
        }
    };
    this.factorRadar = function() {
        return {
            update: function() {}
        }
    };
    this.factorBullet = function() {

    };
    _init();
};
