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
                    var button = that.game.add.button(that.game.world.centerX, that.game.world.centerY, ent.img, function () {
                        that.game.state.start(ent.scene);
                    }, this, 0, 0, 0);
                    button.anchor.setTo(0.5, 0.5);
                    button.scale.setTo(0.4, 0.4);
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
