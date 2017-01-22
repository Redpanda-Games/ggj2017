var Credit = function (game) {
    this.background = null;
    this.text = null;
    this.keys = {};
};
Credit.prototype = {
    create: function () {
        this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'credits');
        this.background.anchor.setTo(0.5, 0.5);
        this.background.width = this.game.world.width;
        this.background.height = this.game.world.height;

        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.ESC]);
        this.keys.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    },
    update: function () {
        if (this.keys.esc.isDown || this.game.input.activePointer.isDown) {
            this.game.state.clearCurrentState();
            this.game.state.start('Menu');
            return true;
        }
    }
};