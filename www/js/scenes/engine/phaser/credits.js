var Credit = function (game) {
};
Credit.prototype = {
    create: function () {
        var bar = game.add.graphics();
        bar.beginFill(0x000000, 0.2);
        bar.drawRect(0, 100, 800, 100);

        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        var text = game.add.text(0, 0, "Credits\n\nMike Gehrhardt\nTom Witkowski\nMalte Zimmermann", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 100, 800, 100);
    }
};