var ElementFactory = function (game) {
    var _game = null;
    var _init = function () {
        _game = game;
    };
    this.factorShip = function (spawn) {
        var sprite = _game.add.sprite(spawn.x, spawn.y, 'ship_01');
        sprite.anchor.setTo(0.5, 0.5);
        sprite.scale.setTo(0.5, 0.5);
        _game.physics.arcade.enable(sprite);
        var radius = sprite.width / 2;
        sprite.body.setCircle(radius, radius, radius);
        sprite.speedMultiplier = 1;
        sprite.docked = false;
        sprite.dockedTime = 0;
        sprite.moveForward = function (speed) {
            if (!this.docked) {
                var angle = Math.atan2(_game.world.centerY - this.y, _game.world.centerX - this.x) * (180 / Math.PI);
                this.angle = angle + 180;
                _game.physics.arcade.velocityFromAngle(angle, speed * this.speedMultiplier, this.body.velocity);
            }
        };
        sprite.kill = function () {
            _game.highscore += 1;
            this.destroy();
        };
        sprite.body.onCollide = new Phaser.Signal();
        sprite.body.onCollide.add(function (sprite1, sprite2) {
            var sprite = sprite1.docked !== undefined ? sprite1 : sprite2;
            sprite.docked = true;
            sprite.dockedTime = new Date();
            sprite.drainLife = false;
            setInterval(function () {
                sprite.drainLife = true;
            }, 2000);
        });
        return sprite;
    };
    this.factorPlanet = function () {
        var sprite = _game.add.sprite(_game.world.centerX, _game.world.centerY, 'planet');
        _game.physics.arcade.enable(sprite);
        sprite.anchor.setTo(0.5, 0.5);
        sprite.body.setCircle(sprite.width / 2);
        sprite.body.immovable = true;
        sprite.health = 100;
        return sprite;
    };
    this.factorHealthBar = function () {
        var text = _game.add.text(_game.world.width - 50, 10, '100', {
            font: "22px Arial",
            fill: "#fff"
        });
        return {
            update: function (health) {
                text.setText(health);
            }
        }
    };
    this.factorRadar = function () {
        var sprite = _game.add.sprite(_game.world.width-10, _game.world.height-10, 'radar_ground');
        sprite.anchor.setTo(1, 1);
        sprite.planet = _game.add.sprite(sprite.position.x - sprite.width / 2, sprite.position.y - sprite.height / 2, 'radar_planet');
        sprite.planet.anchor.setTo(0.5, 0.5);
        sprite.ships = [];
        sprite.updateShips = function(ships) {
            sprite.ships.forEach(function(oldRadarShip) {
                oldRadarShip.destroy();
            });
            var radarWidth = this.width;
            var radarHeight = this.height;
            for (var i = 0; i < ships.length; i++) {
                var ship = ships[i];
                var x = ship.position.x + _game.world.width / 2;
                var y = ship.position.y + _game.world.height / 2;
                var fullWidth = _game.spawnBoundaries.maxX + Math.abs(_game.spawnBoundaries.minX);
                var fullHeight = _game.spawnBoundaries.maxY + Math.abs(_game.spawnBoundaries.minY);
                //  offset to bottom-right corner
                var offX = fullWidth - x;
                var offY = fullHeight - y;
                // relative from bottom-right corner (not percentage)
                var relX = offX / fullWidth;
                var relY = offY / fullHeight;
                var radX = radarWidth * relX;
                var radY = radarHeight * relY;
                var shipRadar = _game.add.sprite(this.position.x - radX, this.position.y - radY, 'radar_ship');
                shipRadar.anchor.setTo(0.5, 0.5);
                sprite.ships.push(shipRadar);
            }
        };
        return sprite;
    };
    this.factorBullet = function () {

    };
    this.factorHighscore = function () {
        return _game.add.text(10, 10, "0", {
            font: "22px Arial",
            fill: "#fff"
        });
    };
    _init();
};
