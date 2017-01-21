var Game = function (game) {
    this.debug = false;
    this.filter = null;
    this.starSprite = null;
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
        this.createStarFilter();
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
        this.filter.update(this.game.input.mousePointer);
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
    },
    createStarFilter: function() {
        var fragmentSrc = [

            "precision mediump float;",
            "uniform float     time;",
            "uniform vec2      resolution;",
            "uniform vec2      mouse;",

            "// Posted by Trisomie21",
            "// modified by @hintz",

            "// from http://glsl.heroku.com/e#5248.0",
            "#define BLADES 6.0",
            "#define BIAS 0.1",
            "#define SHARPNESS 3.0",

            "vec3 star(vec2 position, float t)",
            "{",
            "float d2D = 4.0 / length(position) + t * 5.0;",
            "float a2D = atan(position.y, position.x);",
            "float qq = d2D * 0.1 + sin(d2D) * 0.2 * cos(a2D * 3.0) + sin(d2D * 0.2) * 0.3 * cos(a2D * 8.0)",
            "+ max(0.0, sin(d2D * 0.1 + 10.0) - 0.5) * cos(a2D * 20.0 + sin(d2D * 0.2) * 5.0)",
            "+ max(0.0, sin(d2D * 0.03 + 18.0) - 0.5) * cos(a2D * 5.0 + sin(d2D * 0.2) * 5.0);",
            "vec3 color = vec3(sin(qq * 2.0), sin(qq * 3.0), sin(qq * 5.0));",

            "color = color * 0.2;",

            "float blade = clamp(pow(sin(atan(position.y,position.x )*BLADES)+BIAS, SHARPNESS), 0.0, 1.0);",

            "color += mix(vec3(-0.34, -0.5, -1.0), vec3(0.0, -0.5, -1.0), (position.y + 1.0) * 0.25);",
            "color += (vec3(0.95, 0.65, 0.30) * 1.0 / distance(vec2(0.0), position) * 0.075);",
            "color += vec3(0.95, 0.45, 0.30) * min(1.0, blade *0.7) * (1.0 / distance(vec2(0.0, 0.0), position)*0.075);",

            "return color;",
            "}",


            "// Tweaked from http://glsl.heroku.com/e#4982.0",
            "float hash(float n) { return fract(sin(n)*43758.5453); }",

            "float noise(in vec2 x)",
            "{",
            "vec2 p = floor(x);",
            "vec2 f = fract(x);",
            "f = f*f*(3.0-2.0*f);",
            "float n = p.x + p.y*57.0;",
            "float res = mix(mix(hash(n+0.0), hash(n+1.0),f.x), mix(hash(n+57.0), hash(n+58.0),f.x),f.y);",

            "return res;",
            "}",

            "vec3 cloud(vec2 p)",
            "{",
            "float f = 0.0;",
            "f += 0.50000*noise(p*1.0*10.0);",
            "f += 0.25000*noise(p*2.0*10.0);",
            "f += 0.12500*noise(p*4.0*10.0);",
            "f += 0.06250*noise(p*8.0*10.0);",
            "f *= f;",

            "return vec3(f*.65, f*.45, f)*.6;",
            "}",

            "const float LAYERS = 7.0;",
            "const float SPEED  = 0.005;",
            "const float SCALE  = 8.0;",
            "const float DENSITY    = 0.5;",
            "const float BRIGHTNESS = 2.0;",
            "vec2 ORIGIN    = resolution.xy*.5;",

            "float rand(vec2 co){ return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453); }",

            "void main(void)",
            "{",
            "vec2   pos = gl_FragCoord.xy - ORIGIN;",
            "float dist = length(pos) / resolution.y;",
            "vec2 coord = vec2(pow(dist, 0.1), atan(pos.x, pos.y) / (3.1415926*2.0));",

            "// Nebulous cloud",
            "vec3 color = cloud(pos/resolution);",

            "// Background stars",
            "float a = pow((1.0-dist), 20.0);",
            "float t = time*-0.05;",
            "float r = coord.x - (t*SPEED);",
            "float c = fract(a+coord.y + 0.0*0.543);",
            "vec2  p = vec2(r, c*0.5)*4000.0;",
            "vec2 uv = fract(p)*2.0-1.0;",
            "float m = clamp((rand(floor(p))-0.9)*BRIGHTNESS, 0.0, 1.0);",
            "color +=  clamp((1.0-length(uv*2.0))*m*dist, 0.0, 1.0);",

            "// Flying stars into black hole",
            "for (float i = 1.0; i < (LAYERS+1.0); ++i)",
            "{",
            "float a = pow((1.0-dist),20.0);",
            "float t = i*10.0 + time*i*i;",
            "float r = coord.x - (t*SPEED);",
            "float c = fract(a+coord.y + i*.543);",
            "vec2  p = vec2(r, c*.5)*SCALE*(LAYERS/(i*i));",
            "vec2 uv = fract(p)*2.0-1.0;",
            "float m = clamp((rand(floor(p))-DENSITY/i)*BRIGHTNESS, 0.0, 1.0);",
            "color +=  clamp(star(uv*0.5, time+i*10.0)*m*dist, 0.0, 1.0);",
            "}",


            "gl_FragColor = vec4(color, 1.0);",
            "}"
        ];

        this.filter = new Phaser.Filter(this.game, null, fragmentSrc);
        this.filter.setResolution(800, 600);

        this.starSprite = this.game.add.sprite();
        this.starSprite.width = this.game.world.width;
        this.starSprite.height = this.game.world.height;

        this.starSprite.filters = [ this.filter ];
    }
};
