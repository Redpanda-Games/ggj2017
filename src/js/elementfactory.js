var ElementFactory = function (game) {
    var _game = null;
    var _init = function () {
        _game = game;
    };
    this.factorShip = function (spawn) {
        var sprite = _game.add.sprite(spawn.x, spawn.y, 'ship_01');
        sprite.anchor.setTo(0.5, 0.5);
        sprite.scale.setTo(0.5, 0.5);
        sprite.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7], 12);
        sprite.animations.add('dock', [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 12);
        sprite.animations.add('attack', [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33], 24);
        sprite.animations.add('death-push', [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48], 12);
        sprite.animations.add('death-pull', [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63], 24);
        sprite.animations.play('fly', null, true);
        _game.physics.arcade.enable(sprite);
        var radius = sprite.width / 2;
        sprite.body.setCircle(radius, radius, radius);
        sprite.speedMultiplier = 1;
        sprite.docked = false;
        sprite.isShip = true;
        sprite.dockedTime = 0;
        sprite.deathSound = _game.add.audio('alien_explode');
        sprite.dockSound = _game.add.audio('alien_dock');
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
            _game.highscore += 5;
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
                ship.dockSound.play();
                ship.animations.play('dock', null, false);
                ship.docked = true;
                ship.dockedTime = new Date();
                ship.drainLife = true;
                ship.drainInterval = setInterval(function () {
                    ship.drainLife = ship.docked;
                    ship.animations.play('attack', null, false);
                }, 1000);
                if (ship.speedMultiplier > 2) {
                    planet.health--;
                }
                if (ship.speedMultiplier > 1) {
                    clearInterval(ship.drainInterval);
                    // sprite.deathSound.play(); // too long
                    ship.animations.play('death-pull', null, false);
                    ship.animations.currentAnim.onComplete.add(function () {
                        ship.kill();
                    });
                }
                ship.speedMultiplier = 0;
            }
            if (bullet !== null && ship !== null) {
                if (bullet.multiplier < 0 && ship.docked) {
                    clearInterval(ship.drainInterval);
                    ship.speedMultiplier = 1;
                    ship.docked = false;
                    ship.animations.play('death-push', null, false);
                    ship.animations.currentAnim.onComplete.add(function () {
                        ship.kill();
                    });
                }
                ship.addMultiplier(bullet.multiplier);
                bullet.destroy();
            }
        });
        return sprite;
    };

    this.factorPlanet = function () {
        var sprite = _game.add.sprite(_game.world.centerX, _game.world.centerY, 'planet');
        sprite.anchor.setTo(0.5, 0.5);
        _game.physics.arcade.enable(sprite);
        sprite.body.setCircle(sprite.width / 2);
        sprite.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 6);
        sprite.animations.play('idle', null, true);
        sprite.body.immovable = true;
        sprite.health = 100;
        sprite.energy = 10;
        sprite.isPlanet = true;
        sprite.lastRegen = 0;
        sprite.cooldown = 1000;
        sprite.regenSound = _game.add.audio('load_energy');
        sprite.regenerate = function () {
            if (new Date() - this.lastRegen > this.cooldown && this.energy < 50) {
                // sprite.regenSound.play(); // sound is too long
                this.lastRegen = new Date();
                this.energy++;
            }
        };
        return sprite;
    };

    this.factorHud = function () {
        var hud = _game.add.sprite(40, _game.world.height - 10, 'avatar');
        hud.anchor.setTo(0, 1);
        hud.animations.add('idle', [0, 1, 2, 3], 3);
        hud.animations.play('idle', null, true);
        hud.lifeSprite = _game.add.sprite(40, _game.world.height - 10, 'lifebar');
        hud.lifeSprite.anchor.setTo(0, 1);
        hud.energieSprite = _game.add.sprite(40, _game.world.height - 10, 'energie');
        hud.energieSprite.anchor.setTo(0, 1);
        var heightOld = hud.height;
        hud.height = _game.world.height * 0.3;
        hud.width = hud.width * (hud.height / heightOld);

        hud.lifeSprite.height = _game.world.height * 0.3;
        hud.lifeSprite.width = hud.lifeSprite.width * (hud.lifeSprite.height / heightOld);

        hud.energieSprite.height = _game.world.height * 0.3;
        hud.energieSprite.width = hud.energieSprite.width * (hud.energieSprite.height / heightOld);

        hud.setLife = function (life) {
            if (life > 0) {
                hud.lifeSprite.frame = Math.ceil(life / 10);
            }
        };
        hud.setEnergy = function (energy) {
            if (Math.ceil(energy / 5) <= 10) {
                hud.energieSprite.frame = Math.ceil(energy / 5);
            }
        };
        hud.remove = function () {
            this.lifeSprite.destroy();
            this.energieSprite.destroy();
            this.destroy();
        };
        return hud;
    };

    this.factorRadar = function () {
        var sprite = _game.add.sprite(_game.world.width - 10, _game.world.height - 10, 'radar_ground');
        sprite.anchor.setTo(1, 1);
        sprite.scale.setTo(0.4, 0.4);
        sprite.planet = _game.add.sprite(sprite.position.x - sprite.width / 2, sprite.position.y - sprite.height / 2, 'radar_planet');
        sprite.planet.anchor.setTo(0.5, 0.5);
        var planetScaleFactor = (_game.planet.width / _game.world.width) / (sprite.planet.width / sprite.width);
        sprite.planet.scale.setTo(planetScaleFactor, planetScaleFactor);
        sprite.scanner = _game.add.sprite(sprite.position.x - sprite.width / 2, sprite.position.y - sprite.height / 2, 'radar_scanner');
        sprite.scanner.anchor.setTo(0.5, 0.5);
        sprite.scanner.scale.setTo(0.45, 0.45);

        var fullWidth = _game.spawnBoundaries.maxX + Math.abs(_game.spawnBoundaries.minX);
        var fullHeight = _game.spawnBoundaries.maxY + Math.abs(_game.spawnBoundaries.minY);

        sprite.camera = _game.add.graphics();
        sprite.camera.lineStyle(1, 0xFFFFFF, 1);
        var camWidth = (_game.camera.width / fullWidth) * sprite.width;
        var camHeight = (_game.camera.height / fullHeight) * sprite.height;
        sprite.camera.drawRect(sprite.position.x - (sprite.width + camWidth) / 2, sprite.position.y - (sprite.height + camHeight) / 2, camWidth, camHeight);

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
        sprite.remove = function () {
            this.scanner.destroy();
            this.planet.destroy();
            this.camera.destroy();
            for (var i = 0; i < this.ships.length; i++) {
                this.ships[i].destroy();
            }
            this.destroy();
        };
        return sprite;
    };

    this.factorBullet = function (type) {
        var bullet = _game.add.sprite(_game.world.centerX, _game.world.centerY, 'bullet_' + type);
        bullet.btnSound = null;
        if (type == 'increase') {
            bullet.btnSound = _game.add.audio('gravity_plus');
        } else {
            bullet.btnSound = _game.add.audio('gravity_minus');
        }
        _game.sound.setDecodedCallback([bullet.btnSound], function () {
        }, this);
        bullet.btnSound.play();
        bullet.anchor.setTo(0.5, 0.5);
        bullet.scale.setTo(0.4, 0.4);
        bullet.animations.add('loop', [0, 1, 2], 9);
        _game.physics.arcade.enable(bullet);
        var radius = bullet.width / 2;
        bullet.body.setCircle(radius, radius, radius);
        bullet.isbullet = true;
        bullet.multiplier = type == 'inverse' ? -1 : 2;
        bullet.bulletangle = _game.physics.arcade.angleBetween({
                x: _game.world.centerX,
                y: _game.world.centerY
            }, game.input.activePointer) * (180 / Math.PI);
        bullet.moveForward = function (angle) {
            if (_game.physics.arcade.distanceToXY(this.position, _game.world.centerX, _game.world.centerY) > _game.world.width * 2) {
                this.destroy();
            }
            if (this.body == null) {
                return;
            }
            _game.physics.arcade.velocityFromAngle(angle, 800, this.body.velocity);
        };
        bullet.animations.play('loop', null, true);
        bullet.angle = bullet.bulletangle;
        return bullet;
    };

    this.factorHighscore = function () {
        var sprite = _game.add.sprite(_game.world.width - 310, 10, 'highscore');
        sprite.text = _game.add.text(0, 0, "0", {
            font: "36px Raleway",
            fill: "#ffffff",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            align: "center"
        });
        sprite.text.setTextBounds(sprite.position.x, sprite.position.y + sprite.height, sprite.width, sprite.height);
        sprite.remove = function () {
            this.text.destroy();
            this.destroy();
        };
        return sprite;
    };
    _init();
};
