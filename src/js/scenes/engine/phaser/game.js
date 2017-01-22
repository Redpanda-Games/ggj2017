var Game = function (game) {
    this.debug = false;
    this.filter = null;
    this.starSprite = null;
};
Game.prototype = {
    create: function () {
        var width = this.game.world.width;
        var height = this.game.world.height;
        this.game.gameOver = false;
        this.game.spawnBoundaries = {};
        this.game.spawnBoundaries.minX = width / 2 * -1;
        this.game.spawnBoundaries.maxX = width * 1.5;
        this.game.spawnBoundaries.minY = (((width * 2) - height) / 2) * -1;
        this.game.spawnBoundaries.maxY = height + Math.abs(this.game.spawnBoundaries.minY);
        this.createStarFilter();
        this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
        this.background.anchor.setTo(0.5, 0.5);
        this.background.width = this.game.world.width;
        this.background.height = this.game.world.height;
        this.background.alpha = 0.8;
        this.game.highscore = 0;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.elementFactory = new ElementFactory(this.game);
        this.game.planet = this.elementFactory.factorPlanet();
        this.hud = this.elementFactory.factorHud();
        this.radar = this.elementFactory.factorRadar();
        this.enemies = [];
        this.bullets = [];
        this.maxEnemyCount = 0;
        this.baseEnemySpeed = 500;
        this.enemySpeed = 0;
        this.baseTime = this.game.time.totalElapsedSeconds();
        this.highscore = this.elementFactory.factorHighscore();
        this.lastfire = 0;
        this.cooldown = 0.25 * 1000; // seconds
        this.lastship = 0;
        this.shipCooldown = 150;
    },
    update: function () {
        var timegone = (this.game.time.totalElapsedSeconds() - this.baseTime) < 0 ? 0 : (this.game.time.totalElapsedSeconds() - this.baseTime);
        this.maxEnemyCount = Math.min(1 + Math.round(timegone / 10), 25);
        this.enemySpeed = this.baseEnemySpeed + timegone;
        this.generateShipIfNeeded();
        this.fireBullet();
        this.updateEnemies();
        this.updateBullet();
        this.updateRadar();
        this.updateHud();
        this.updateHighscore();
        this.filter.update(this.game.input.mousePointer);
        this.game.planet.regenerate();
    },
    updateHighscore: function () {
        this.game.highscore += this.game.time.elapsed / 1000;
        this.highscore.text.setText(Math.floor(this.game.highscore).toString());
    },
    updateEnemies: function () {
        this.game.physics.arcade.collide(this.enemies, this.game.planet);
        this.game.physics.arcade.collide(this.bullets, this.enemies);
        for (var j = 0; j < this.enemies.length; j++) {
            if (this.enemies[j].body !== null) {
                this.enemies[j].moveForward(this.enemySpeed);
            } else {
                this.enemies.splice(j, 1);
            }
        }
    },
    updateHud: function () {
        if (this.game.planet.health <= 0 && !this.game.gameOver) {
            this.gameOver();
        }
        this.hud.setLife(this.game.planet.health);
        this.hud.setEnergy(this.game.planet.energy);
        for (var i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].drainLife) {
                this.enemies[i].drainLife = false;
                this.game.planet.health--;
                this.hud.update(this.game.planet.health);
            }
        }
    },
    gameOver: function () {
        this.hud.remove();
        this.radar.remove();
        this.highscore.remove();
        this.game.gameOver = true;
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].destroy();
        }
        this.game.planet.destroy();
        this.game.planet = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'planet_dead');
        this.game.planet.anchor.setTo(0.5, 0.5);
        this.game.planet.animations.add('death', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 16);
        this.game.planet.animations.play('death');
        var _this = this;
        this.game.planet.regenerate = function () {
        };
        this.game.planet.animations.currentAnim.onComplete.add(function () {
            _this.game.state.start('Menu');
        });
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
        if (new Date() - this.lastship > this.shipCooldown && this.enemies.length < this.maxEnemyCount && !this.game.gameOver) {
            var ship = this.elementFactory.factorShip(this.createRandomEnemyPosition());
            this.enemies.push(ship);
            this.lastship = new Date();
        }
    },
    fireBullet: function () {
        if (new Date() - this.lastfire > this.cooldown && this.game.planet.energy > 0) {
            var bullet = null;
            if (this.game.input.activePointer.leftButton.isDown) {
                bullet = this.elementFactory.factorBullet('increase');
            } else if (this.game.input.activePointer.rightButton.isDown) {
                bullet = this.elementFactory.factorBullet('inverse');
            }
            if (bullet !== null) {
                this.lastfire = new Date();
                this.bullets.push(bullet);
                this.game.planet.energy--;
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
            this.game.debug.body(this.game.planet);
            this.game.debug.geom(this.game.planet.getBounds());
            for (var i = 0; i < this.enemies.length; i++) {
                this.game.debug.body(this.enemies[i]);
            }
            for (var l = 0; l < this.bullets.length; l++) {
                this.game.debug.body(this.bullets[l]);
            }
        }
    },
    createStarFilter: function () {
        var fragmentSrc = [
            "precision mediump float;",

            "uniform float     time;",
            "uniform vec2      resolution;",
            "uniform vec2      mouse;",

            "#define MAX_ITER 4",

            "void main( void )",
            "{",
            "vec2 v_texCoord = gl_FragCoord.xy / resolution;",

            "vec2 p =  v_texCoord * 8.0 - vec2(20.0);",
            "vec2 i = p;",
            "float c = 1.0;",
            "float inten = .05;",

            "for (int n = 0; n < MAX_ITER; n++)",
            "{",
            "float t = time * (1.0 - (3.0 / float(n+1)));",

            "i = p + vec2(cos(t - i.x) + sin(t + i.y),",
            "sin(t - i.y) + cos(t + i.x));",

            "c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),",
            "p.y / (cos(i.y+t)/inten)));",
            "}",

            "c /= float(MAX_ITER);",
            "c = 1.5 - sqrt(c);",

            "vec4 texColor = vec4(0.03, 0.01, 0.015, 1.0);",

            "texColor.rgb *= (1.0 / (1.0 - (c + 0.05)));",

            "gl_FragColor = texColor;",
            "}"
        ];

        this.filter = new Phaser.Filter(this.game, null, fragmentSrc);
        this.filter.setResolution(this.game.world.width, this.game.world.height);
        this.starSprite = this.game.add.sprite();
        this.starSprite.width = this.game.world.width;
        this.starSprite.height = this.game.world.height;

        this.starSprite.filters = [this.filter];
    }
};
