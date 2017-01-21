var Game = function (game) {

};
Game.prototype = {
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.elementFactory = new ElementFactory(this.game);
        this.planet = this.elementFactory.factorPlanet();
        this.healthBar = this.elementFactory.factorHealthBar();
        this.radar = this.elementFactory.factorRadar();
        this.enemies = [];
        this.points = 0;
        this.maxEnemyCount = 0;
        this.baseEnemySpeed = 100;
        this.enemySpeed = 0;
        this.baseTime = this.game.time.totalElapsedSeconds();
    },
    update: function () {
        var timegone = (this.game.time.totalElapsedSeconds() - this.baseTime) < 0 ? 0 : (this.game.time.totalElapsedSeconds() - this.baseTime);
        this.maxEnemyCount = 1 + Math.round(timegone/10);
        this.enemySpeed = this.baseEnemySpeed + timegone/10;
        this.generateShipIfNeeded();
        this.updateEnemies();
        this.updateRadar();
        this.updateHealthBar();
        if (this.game.input.activePointer.isDown) {
            this.fireBullet();
        }
    },
    updateEnemies: function() {
        for(var j=0; j < this.enemies.length; j++) {
            this.enemies[j].moveForward(this.enemySpeed);
        }
    },
    updateHealthBar: function() {
        this.healthBar.update();
    },
    updateRadar: function() {
        this.radar.update(this.enemies);
    },
    generateShipIfNeeded: function(){
      if(this.enemies.length < this.maxEnemyCount) {
          for (var i = 0; i < this.maxEnemyCount-this.enemies.length; i++) {
              this.enemies.push(this.elementFactory.factorShip(this.createRandomEnemyPosition()));
          }
      }
    },
    fireBullet: function(event) {
        console.log('PEW PEW PEW', event);
    },
    createRandomEnemyPosition: function() {
        var maxH = this.game.world.height;
        var maxW = this.game.world.width;
        var point = {};
        if(Math.random() < 0.5) {
            point.x = (0-(Math.floor(Math.random()*100)));
            point.y = Math.floor(Math.random()*(maxH + (Math.random() < 0.5 ? 100 : -100)));
        } else {
            point.x = (maxW+(Math.floor(Math.random()*100)));
            point.y = Math.floor(Math.random()*(maxH + (Math.random() < 0.5 ? 100 : -100)));
        }

        if(Math.random() < 0.5) {

            point.x = Math.floor(Math.random()*(maxW + (Math.random() < 0.5 ? 100 : -100)));
            point.y = (0-(Math.floor(Math.random()*100)));
        } else {
            point.x = Math.floor(Math.random()*(maxW + (Math.random() < 0.5 ? 100 : -100)));
            point.y = (maxH+(Math.floor(Math.random()*100)));
        }
        return point;
    },
    render: function() {
        this.game.debug.body(this.planet);
        for (var i = 0; i < this.enemies.length; i++) {
            this.game.debug.body(this.enemies[i]);
        }
    }
};