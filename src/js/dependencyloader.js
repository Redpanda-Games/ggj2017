var DependencyLoader = {
    insertScripts: function (srcStringArray, callback) {
        var scriptReadyCounter = 0;
        if (!srcStringArray || 0 == srcStringArray.length) {
            callback && callback();
            return;
        }
        for (var i in srcStringArray) {
            if (srcStringArray.hasOwnProperty(i)) {
                DependencyLoader.insertScript(srcStringArray[i], function () {
                    scriptReadyCounter++
                });
            }
        }
        var readyCheck = setInterval(function () {
            if (scriptReadyCounter == srcStringArray.length) {
                callback();
                clearInterval(readyCheck);
            }
        }, 200);
    },
    insertScript: function (srcString, callback) {
        if (!srcString) {
            callback && callback();
            return;
        }
        var header = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        if (callback) {
            script.onload = callback;
        }
        script.src = srcString;
        header.appendChild(script);
    }
};
