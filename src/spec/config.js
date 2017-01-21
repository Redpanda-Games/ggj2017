describe('GlobalConfig', function(){
    it('should be defined',function(){
        expect(GlobalConfig).not.toBe(null);
    });
    it('should contain a version string',function(){
        expect(GlobalConfig.version).not.toBe(null);
        expect(typeof GlobalConfig.version).toBe('string');
    });
    it('should contain a gameName string',function(){
        expect(GlobalConfig.gameName).not.toBe(null);
        expect(typeof GlobalConfig.gameName).toBe('string');
    });
    it('should contain a gameEngineName string',function(){
        expect(GlobalConfig.gameEngineName).not.toBe(null);
        expect(typeof GlobalConfig.gameEngineName).toBe('string');
    });
    it('should contain a rootElementId string',function(){
        expect(GlobalConfig.rootElementId).not.toBe(null);
        expect(typeof GlobalConfig.rootElementId).toBe('string');
    });
    it('should contain a javaScriptDependencies array of strings',function(){
        expect(GlobalConfig.javaScriptDependencies).not.toBe(null);
        expect(typeof GlobalConfig.javaScriptDependencies).toBe('object');
    });
});