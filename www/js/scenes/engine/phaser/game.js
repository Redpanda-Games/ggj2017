var Game = function (game) {

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
        this.maxEnemyCount = 0;
        this.baseEnemySpeed = 100;
        this.enemySpeed = 0;
        this.baseTime = this.game.time.totalElapsedSeconds();
        this.highscore = this.elementFactory.factorHighscore();
    },
    update: function () {
        var timegone = (this.game.time.totalElapsedSeconds() - this.baseTime) < 0 ? 0 : (this.game.time.totalElapsedSeconds() - this.baseTime);
        this.maxEnemyCount = 1 + Math.round(timegone / 10);
        this.enemySpeed = this.baseEnemySpeed + timegone / 10;
        this.generateShipIfNeeded();
        this.updateEnemies();
        this.updateRadar();
        this.updateHealthBar();
        if (this.game.input.activePointer.isDown) {
            this.fireBullet();
        }
        this.updateHighscore();
    },
    updateHighscore: function () {
        this.game.highscore += this.game.time.elapsed / 1000;
        this.highscore.setText(Math.floor(this.game.highscore).toString());
    },
    updateEnemies: function () {
        for (var j = 0; j < this.enemies.length; j++) {
            this.game.physics.arcade.collide(this.enemies[j], this.planet);
            this.enemies[j].moveForward(this.enemySpeed);
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
        this.radar.updateShips(this.enemies);
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
        //this.game.physics.arcade.moveToPointer(this.elementFactory.factorBullet(), 300);

        console.log('PEW PEW PEW', this.game.input.activePointer.x, this.game.input.activePointer.y);
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
        this.game.debug.body(this.planet);
        for (var i = 0; i < this.enemies.length; i++) {
            this.game.debug.body(this.enemies[i]);
        }
    }
};