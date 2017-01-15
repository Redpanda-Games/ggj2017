describe('GameObjectGenerator', function() {
    describe('generateByEngineName', function() {
        var game = null;
        beforeEach(function(){
            game = GameObjectGenerator.generateByEngineName('Phaser.io','stage');
        });
        it('should  generate a game object', function () {
            expect(game).not.toBe(null);
        });
    });
});