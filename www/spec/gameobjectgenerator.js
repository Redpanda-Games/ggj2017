describe('GameObjectGenerator', function() {
    describe('generateByEngineName', function() {
        var game = null;
        beforeEach(function(){
            game = GameObjectGenerator.generateByEngineName('Phaser.io','page');
        });
        it('should  generate a game object', function () {
            expect(game).not.toBe(null);
        });
        it('should add game view on root element', function () {
            var stage = document.getElementById('stag');
            expect(game).not.toBe(null);
            expect(stage.innerHTML).not.toBeFalsy();
        });
    });
});