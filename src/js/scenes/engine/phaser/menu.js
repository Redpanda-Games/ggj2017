var Menu = function (game) {
};
Menu.prototype = {
    create: function () {
        this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'menu_background');
        this.background.anchor.setTo(0.5, 0.5);
        this.background.width = this.game.world.width;
        this.background.height = this.game.world.height;
        var that = this;
        var style = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
        var yPosition = 0;
        for (var i in GlobalConfig.menuConfig.entries) {
            if (GlobalConfig.menuConfig.entries.hasOwnProperty(i)) {
                var ent = GlobalConfig.menuConfig.entries[i];
                if(ent.img){
                    var button = this.add.sprite(this.game.world.width*0.3, this.game.world.centerY, 'menu_start_button');
                    var heightOld = button.height;
                    button.height = this.game.world.height*0.9;
                    button.width = button.width * (button.height/heightOld);
                    button.anchor.setTo(0, 1);
                    button.animations.add('hover', [0,1,2], 6);
                    button.animations.add('out', [0,1,2], 3);
                    button.inputEnabled = true;
                    button.animations.stop(null,true);
                    button.animations.play('out', null, true);
                    button.events.onInputDown.add(function(){
                        that.game.state.start(ent.scene);
                    }, this);
                    button.events.onInputOver.add(function(){
                        button.animations.stop(null,true);
                        button.animations.play('hover', null, true);
                    }, this);
                    button.events.onInputOut.add(function(){
                        button.animations.stop(null,true);
                        button.animations.play('out', null, true);
                    }, this);

                    button.anchor.setTo(0.5, 0.5);
                } else {
                    var text = this.game.add.text(that.game.world.centerX, that.game.world.centerY, ent.title, style);
                    text.inputEnabled = true;
                    text.input.useHandCursor = true;
                    text.target = ent.scene;
                    text.events.onInputUp.add(function (mytext) {
                        that.game.state.start(mytext.target);
                    });
                    yPosition += 40;
                    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
                    text.anchor.setTo(0.5, 0.5);
                }
            }
        }
    }
};
