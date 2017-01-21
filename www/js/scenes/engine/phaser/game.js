var Game = function (game) {
    this.debug = false;
};
Game.prototype = {
    create: function () {
        var width = this.game.world.width;
        var height = this.game.world.height;
        this.game.spawnBoundaries = {};
        this.game.spawnBoundaries.minX = width / 2 * -1;
        this.game.spawnBoundaries.maxX = width * 1.5;
        this.game.spawnBoundaries.minY = (((width * 2) - height) / 2) * -1;
        this.game.spawnBoundaries.maxY = height + Math.abs(this.game.spawnBoundaries.minY);

        this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'game_background');
        this.background.anchor.setTo(0.5, 0.5);
        this.game.highscore = 0;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.elementFactory = new ElementFactory(this.game);
        this.planet = this.elementFactory.factorPlanet();
        this.healthBar = this.elementFactory.factorHealthBar();
        this.radar = this.elementFactory.factorRadar();
        this.enemies = [];
        this.bullets = [];
        this.maxEnemyCount = 0;
        this.baseEnemySpeed = 250;
        this.enemySpeed = 0;
        this.baseTime = this.game.time.totalElapsedSeconds();
        this.highscore = this.elementFactory.factorHighscore();
        this.lastfire = 0;
        this.cooldown = 0.25 * 1000; // seconds
    },
    update: function () {
        var timegone = (this.game.time.totalElapsedSeconds() - this.baseTime) < 0 ? 0 : (this.game.time.totalElapsedSeconds() - this.baseTime);
        this.maxEnemyCount = 1 + Math.round(timegone / 10);
        this.enemySpeed = this.baseEnemySpeed + timegone / 10;
        this.generateShipIfNeeded();
        this.fireBullet();
        this.updateEnemies();
        this.updateBullet();
        this.updateRadar();
        this.updateHealthBar();
        this.updateHighscore();
        this.planet.regenerate();
    },
    updateHighscore: function () {
        this.game.highscore += this.game.time.elapsed / 1000;
        this.highscore.setText(Math.floor(this.game.highscore).toString());
    },
    updateEnemies: function () {
        this.game.physics.arcade.collide(this.enemies, this.planet);
        this.game.physics.arcade.collide(this.bullets, this.enemies);
        for (var j = 0; j < this.enemies.length; j++) {
            if (this.enemies[j].body !== null) {
                this.enemies[j].moveForward(this.enemySpeed);
            } else {
                this.enemies.splice(j, 1);
            }
        }
    },
    updateHealthBar: function () {
        if (this.planet.health < 0.5) {
            this.game.state.start('Menu');
        }
        for (var i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].drainLife) {
                this.enemies[i].drainLife = false;
                this.planet.health -= 0.5;
                this.healthBar.update(this.planet.health);
            }
        }
    },
    updateRadar: function () {
        this.radar.updateScanner();
        this.radar.updateShips(this.enemies);
    },
    updateBullet: function () {
        for (var k = 0; k < this.bullets.length; k++) {
            if (this.bullets[k].body !== null) {
                this.bullets[k].moveForward(this.bullets[k].bulletangle);
            } else {
                this.bullets.splice(k, 1);
            }
        }
    },
    generateShipIfNeeded: function () {
        if (this.enemies.length < this.maxEnemyCount) {
            for (var i = 0; i < this.maxEnemyCount - this.enemies.length; i++) {
                var ship = this.elementFactory.factorShip(this.createRandomEnemyPosition());
                this.enemies.push(ship);
            }
        }
    },
    fireBullet: function () {
        if (new Date() - this.lastfire > this.cooldown && this.planet.energy > 0) {
            var bullet = null;
            if (this.game.input.activePointer.leftButton.isDown) {
                bullet = this.elementFactory.factorBullet('increase');
            }
            if (this.game.input.activePointer.rightButton.isDown) {
                bullet = this.elementFactory.factorBullet('inverse');
            }
            if (bullet !== null) {
                this.lastfire = new Date();
                this.bullets.push(bullet);
                this.planet.energy--;
            }
        }
    },
    createRandomEnemyPosition: function () {
        var point = {};
        if (Math.random() < 0.5) {
            point.x = Math.random() < 0.5 ? this.game.spawnBoundaries.minX : this.game.spawnBoundaries.maxX;
            point.y = this.game.rnd.integerInRange(this.game.spawnBoundaries.minY, this.game.spawnBoundaries.maxY);
        } else {
            point.x = this.game.rnd.integerInRange(this.game.spawnBoundaries.minX, this.game.spawnBoundaries.maxX);
            point.y = Math.random() < 0.5 ? this.game.spawnBoundaries.minY : this.game.spawnBoundaries.maxY;
        }
        return point;
    },
    render: function () {
        if (this.debug) {
            this.game.debug.body(this.planet);
            for (var i = 0; i < this.enemies.length; i++) {
                this.game.debug.body(this.enemies[i]);
            }
            for (var l = 0; l < this.bullets.length; l++) {
                this.game.debug.body(this.bullets[l]);
            }
        }
    }
};
