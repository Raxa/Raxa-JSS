//Initialize doc classes and feature detections
(function() {
    var initViewport = function() {
        // find the body element
        var bd = Ext.getBody(),
            cls = [];
        if (!bd) {
            return false;
        }
        var Is = Ext.is;
        if (Is.Phone) {
            cls.push('x-phone');
        }
        else if (Is.Tablet) {
            cls.push('x-tablet');
        }
        else if (Is.Desktop) {
            cls.push('x-desktop');
        }
        if (Is.iPad) {
            cls.push('x-ipad');
        }
        if (Is.iOS) {
            cls.push('x-ios');
        }
        if (Is.Android) {
            cls.push('x-android');
        }
        if (Is.Blackberry) {
            cls.push('x-bb');
        }
        if (Is.Standalone) {
            cls.push('x-standalone');
        }
        if (cls.length) {
            bd.addCls(cls);
        }
        return true;
    };

    if (!initViewport()) {
        Ext.onReady(initViewport);
    }
})();
