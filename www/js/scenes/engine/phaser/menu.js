var Menu = function (game) {
};
Menu.prototype = {
    create: function () {
        this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'menu_background');
        this.background.anchor.setTo(0.5, 0.5);
        var that = this;
        var bg = this.game.add.graphics();
        bg.beginFill(0x000000, 0.2);
        bg.drawRect(0, 100, this.game.width, this.game.height - 200);


        var style = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
        var yPosition = 0;
        for (var i in GlobalConfig.menuConfig.entries) {
            if (GlobalConfig.menuConfig.entries.hasOwnProperty(i)) {
                var ent = GlobalConfig.menuConfig.entries[i];
                var text = this.game.add.text(that.game.world.centerX, that.game.world.centerY + yPosition, ent.title, style);
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
};
