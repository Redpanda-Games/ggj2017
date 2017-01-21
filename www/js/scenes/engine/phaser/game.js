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
    },
    update: function () {
        var timegone = this.game.time.totalElapsedSeconds();
        this.maxEnemyCount = 1 + Math.round(timegone/10);
        this.enemySpeed = this.baseEnemySpeed + timegone/10;
        this.generateShipIfNeeded();
        this.updateEnemies();
    },
    updateEnemies: function() {
        for(var j=0; j < this.enemies.length; j++) {
            this.enemies[j].moveForward(this.enemySpeed);
        }
    },
    generateShipIfNeeded: function(){
      if(this.enemies.length < this.maxEnemyCount) {
          for (var i = 0; i < this.maxEnemyCount-this.enemies.length; i++) {
              this.enemies.push(this.elementFactory.factorShip(this.createRandomEnemyPosition()));
          }
      }
    },
    createRandomEnemyPosition: function() {
        var maxH = this.game.world.height;
        var maxW = this.game.world.width;
        return {
            x:  Math.random() < 0.5 ? (0-(Math.floor(Math.random()*100))) : (maxW+(Math.floor(Math.random()*100))),
            y:  Math.random() < 0.5 ? (0-(Math.floor(Math.random()*100))) : (maxH+(Math.floor(Math.random()*100)))
        }
    }
};