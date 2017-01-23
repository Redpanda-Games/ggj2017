var Credit = function (game) {
    this.background = null;
    this.text = null;
};
Credit.prototype = {
    create: function () {
        this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'credits');
        this.background.anchor.setTo(0.5, 0.5);
        this.background.width = this.game.world.width;
        this.background.height = this.game.world.height;
    },
    update: function () {
        var that = this;
        if(this.game.input.activePointer.isDown) {
            this.game.state.start('Menu');
        }
        this.game.input.keyboard.onPressCallback = function () {
            that.game.state.start('Menu');
        }
    },
    shutdown: function () {
        this.game.input.keyboard.onPressCallback = null;
    }
};