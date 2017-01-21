var Credit = function (game) {
    this.background = null;
    this.text = null;
    this.keys = {};
};
Credit.prototype = {
    create: function () {
        this.background = this.game.add.graphics();
        this.background.beginFill(0x00aa00, 0.5);
        this.background.drawRect(0, 100, this.game.width, this.game.height - 200);

        this.text = this.game.add.text(0, 0, "Credits\n\nMike Gehrhardt\nTom Witkowski\nMalte Zimmermann", {
            font: "bold 32px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            align: "center"
        });
        this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.text.setTextBounds(0, 100, this.background.width, this.background.height);

        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.ESC]);
        this.keys.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    },
    update: function () {
        if (this.keys.esc.isDown) {
            this.game.state.clearCurrentState();
            this.game.state.start('Menu');
            return true;
        }
    }
};