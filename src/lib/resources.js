/*
 * @author jlongster
 * Source: https://github.com/jlongster/canvas-game-bootstrap/blob/master/js/resources.js
 *
*/

(function() {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    // Load an image url or an array of image urls
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        }
        else {
            _load(urlOrArr);
        }
    }

    function _load(url) {
        if(resourceCache[url]) {
            return resourceCache[url];
        }
        else {
            if (url.match(/png|gif|jpg/)) // yeah, very simple regex, I know
            {
                var img = new Image();
                img.onload = function() {
                    resourceCache[url] = img;
                    
                    if(isReady()) {
                        readyCallbacks.forEach(function(func) { func(); });
                    }
                };
                resourceCache[url] = false;
                img.src = url;
            }
            else // hope, that this is sound
            {
                resourceCache[url] = false;

                var sound = new Howl({
                    urls: [url],
                    onload: function() {
                      resourceCache[url] = this;

                      if(isReady()) {
                          readyCallbacks.forEach(function(func) { func(); });
                      }
                    }
                });
            }
        }
    }

    function get(url) {
        return resourceCache[url];
    }

    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }

    window.resources = { 
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();