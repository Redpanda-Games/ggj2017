describe('DependencyLoader', function() {
    describe('insertScript', function() {
        var srcString = 'spec/testfiles/dependency1.js';
        it('insertScript should insert script tag with given src in header', function () {
            DependencyLoader.insertScript(srcString, function(){});
            var scripts = document.getElementsByTagName('script');
            var scriptFound = false;
            for (var i in scripts) {
                if (scripts[i].src && scripts[i].src.indexOf(srcString) > 0) {
                    scriptFound = true;
                    break;
                }
            }
            expect(scriptFound).not.toBe(false);
        });

        it('should call callback when scripts ready',  function() {
            runs(function() {
                spyOn(helper, 'testcallback');
                DependencyLoader.insertScript(srcString, helper.testcallback);
            });

            waitsFor(function() {
                return (helper.testcallback.calls.length > 0);
            }, 'callback should be called after script loaded', 500);

            runs(function() {
                expect(helper.testcallback).toHaveBeenCalled();
            });
        });

        it('should call callback when called with null', function() {
            runs(function() {
                spyOn(helper, 'testcallback');
                DependencyLoader.insertScript(null, helper.testcallback);
            });

            waitsFor(function() {
                return (helper.testcallback.calls.length > 0);
            }, 'callback should be called after script loaded', 500);

            runs(function() {
                expect(helper.testcallback).toHaveBeenCalled();
            });
        });
    });
    describe('insertScripts', function() {
        var srcStringArray = new Array('spec/testfiles/dependency2.js', 'spec/testfiles/dependency3.js');
        it('insertScripts should insert all given src as script tags in header', function () {
            DependencyLoader.insertScripts(srcStringArray, function(){});
            var scripts = document.getElementsByTagName('script');
            var dependency1Found = false;
            var dependency2Found = false;
            for (var i in scripts) {
                if (scripts[i].src && scripts[i].src.indexOf(srcStringArray[0]) > 0) {
                    dependency1Found = true;
                } else if (scripts[i].src && scripts[i].src.indexOf(srcStringArray[1]) > 0) {
                    dependency2Found = true;
                }
            }
            expect(dependency1Found).not.toBe(false);
            expect(dependency2Found).not.toBe(false);
        });

        it('should call callback when ready',  function() {
            runs(function() {
                spyOn(helper, 'testcallback');
                DependencyLoader.insertScripts(srcStringArray, helper.testcallback);
            });

            waitsFor(function() {
                return (helper.testcallback.calls.length > 0);
            }, 'callback should be called after script loaded', 500);

            runs(function() {
                expect(helper.testcallback).toHaveBeenCalled();
            });
        });

        it('should call callback when empty array or null', function() {
            runs(function() {
                spyOn(helper, 'testcallback');
                DependencyLoader.insertScripts(null, helper.testcallback);
            });

            waitsFor(function() {
                return (helper.testcallback.calls.length > 0);
            }, 'callback should be called after script loaded', 500);

            runs(function() {
                expect(helper.testcallback).toHaveBeenCalled();
            });
        });
    });
});