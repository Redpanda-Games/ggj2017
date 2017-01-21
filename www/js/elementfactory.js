var ElementFactory = function (game) {
    var _game = null;
    var _init = function () {
        _game = game;
    };
    this.factorShip = function (spawn) {
        var sprite = _game.add.sprite(spawn.x, spawn.y, 'ship_01');
        sprite.anchor.setTo(0.5, 0.5);
        sprite.scale.setTo(0.5, 0.5);
        sprite.animations.add('fly', [0,1,2,3,4,5,6,7], 12);
        sprite.animations.add('dock', [8,9,10,11,12,13,14,15,16,17,18], 12);
        sprite.animations.play('fly', null, true);
        _game.physics.arcade.enable(sprite);
        var radius = sprite.width / 2;
        sprite.body.setCircle(radius, radius, radius);
        sprite.speedMultiplier = 1;
        sprite.docked = false;
        sprite.isShip = true;
        sprite.dockedTime = 0;
        sprite.moveForward = function (speed) {
            if (!this.docked) {
                if (_game.physics.arcade.distanceToXY(this.position, _game.world.centerX, _game.world.centerY) > _game.world.width * 2) {
                    !this.dockedTime ? this.destroy() : this.kill();
                }
                if (this.body == null) {
                    return;
                }
                var angle = Math.atan2(_game.world.centerY - this.y, _game.world.centerX - this.x) * (180 / Math.PI);
                this.angle = angle + 180;
                _game.physics.arcade.velocityFromAngle(angle, speed * this.speedMultiplier, this.body.velocity);
            }
        };
        sprite.kill = function () {
            _game.highscore += 8;
            this.destroy();
        };
        sprite.addMultiplier = function (multiplier) {
            this.speedMultiplier *= multiplier;
            this.speedMultiplier = Math.max(-2, Math.min(6, this.speedMultiplier));
        };
        sprite.body.onCollide = new Phaser.Signal();
        sprite.body.onCollide.add(function (sprite1, sprite2) {
            var planet = null;
            planet = sprite1.isPlanet !== undefined ? sprite1 : planet;
            planet = sprite2.isPlanet !== undefined ? sprite2 : planet;
            var ship = null;
            ship = sprite1.isShip !== undefined ? sprite1 : ship;
            ship = sprite2.isShip !== undefined ? sprite2 : ship;
            var bullet = null;
            bullet = sprite1.isbullet !== undefined ? sprite1 : bullet;
            bullet = sprite2.isbullet !== undefined ? sprite2 : bullet;
            if (planet !== null && ship !== null && !ship.docked) {
                ship.animations.play('dock', null, false);
                ship.speedMultiplier = 0;
                ship.docked = true;
                ship.dockedTime = new Date();
                ship.drainLife = true;
                ship.drainInterval = setInterval(function () {
                    ship.drainLife = ship.docked;
                }, 2000);
            }
            if (bullet !== null && ship !== null) {
                if(bullet.multiplier < 0 && ship.docked){
                    ship.speedMultiplier = 1;
                    ship.docked = false;
                }
                ship.addMultiplier(bullet.multiplier);
                bullet.destroy();
            }
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
        sprite.energy = 10;
        sprite.isPlanet = true;
        sprite.lastRegen = 0;
        sprite.cooldown = 3 * 1000;
        sprite.regenerate = function () {
            if(new Date() - this.lastRegen > this.cooldown) {
                this.energy++;
            }
        };
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
        var sprite = _game.add.sprite(_game.world.width - 10, _game.world.height - 10, 'radar_ground');
        sprite.anchor.setTo(1, 1);
        sprite.scale.setTo(0.5, 0.5);
        sprite.planet = _game.add.sprite(sprite.position.x - sprite.width / 2, sprite.position.y - sprite.height / 2, 'radar_planet');
        sprite.planet.anchor.setTo(0.5, 0.5);
        var planetScaleFactor = (_game.planet.width/_game.world.width)/(sprite.planet.width/sprite.width);
        console.log(planetScaleFactor);
        sprite.planet.scale.setTo(planetScaleFactor, planetScaleFactor);
        sprite.scanner = _game.add.sprite(sprite.position.x - sprite.width / 2, sprite.position.y - sprite.height / 2, 'radar_scanner');
        sprite.scanner.anchor.setTo(0.5, 0.5);
        sprite.scanner.scale.setTo(0.56, 0.56);

        var fullWidth = _game.spawnBoundaries.maxX + Math.abs(_game.spawnBoundaries.minX);
        var fullHeight = _game.spawnBoundaries.maxY + Math.abs(_game.spawnBoundaries.minY);

        var graphics = _game.add.graphics();
        graphics.lineStyle(1, 0xFFFFFF, 1);
        var camWidth = (_game.camera.width / fullWidth) * sprite.width;
        var camHeight = (_game.camera.height / fullHeight) * sprite.height;
        graphics.drawRect(sprite.position.x - (sprite.width + camWidth) / 2, sprite.position.y - (sprite.height + camHeight) / 2, camWidth, camHeight);

        sprite.ships = [];
        sprite.updateShips = function (ships) {
            sprite.ships.forEach(function (oldRadarShip) {
                oldRadarShip.destroy();
            });
            var radarWidth = this.width;
            var radarHeight = this.height;
            for (var i = 0; i < ships.length; i++) {
                var ship = ships[i];
                if (_game.physics.arcade.distanceToXY(ship.position, _game.world.centerX, _game.world.centerY) < fullWidth / 2) {
                    var x = ship.position.x + Math.abs(_game.spawnBoundaries.minX);
                    var y = ship.position.y + Math.abs(_game.spawnBoundaries.minY);
                    var offX = fullWidth - x;
                    var offY = fullHeight - y;
                    var relX = offX / fullWidth;
                    var relY = offY / fullHeight;
                    var radX = radarWidth * relX;
                    var radY = radarHeight * relY;
                    var shipRadar = _game.add.sprite(this.position.x - radX, this.position.y - radY, 'radar_ship');
                    shipRadar.anchor.setTo(0.5, 0.5);
                    shipRadar.scale.setTo(0.25, 0.25);
                    sprite.ships.push(shipRadar);
                }
            }
        };
        sprite.updateScanner = function () {
            this.scanner.angle += 3;
        };
        return sprite;
    };

    this.factorBullet = function (type) {
        var bullet = _game.add.sprite(_game.world.centerX, _game.world.centerY, 'bullet_' + type);
        bullet.anchor.setTo(0.5, 0.5);
        bullet.scale.setTo(0.5, 0.5);
        _game.physics.arcade.enable(bullet);
        var radius = bullet.width / 2;
        bullet.body.setCircle(radius, radius, radius);
        bullet.isbullet = true;
        bullet.multiplier = type == 'inverse' ? -1 : 2;
        bullet.bulletangle = _game.physics.arcade.angleBetween({
                x: _game.world.centerX,
                y: _game.world.centerY
            }, {x: _game.input.activePointer.x, y: _game.input.activePointer.y}) * (180 / Math.PI);
        bullet.moveForward = function (angle) {
            if (_game.physics.arcade.distanceToXY(this.position, _game.world.centerX, _game.world.centerY) > _game.world.width * 2) {
                this.destroy();
            }
            if (this.body == null) {
                return;
            }
            _game.physics.arcade.velocityFromAngle(angle, 1000, this.body.velocity);
        };
        return bullet;
    };

    this.factorHighscore = function () {
        return _game.add.text(10, 10, "0", {
            font: "22px Arial",
            fill: "#fff"
        });
    };
    _init();
};
