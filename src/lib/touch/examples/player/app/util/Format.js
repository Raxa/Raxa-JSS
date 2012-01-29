Ext.define('Player.util.Format', {
    singleton : true,

    timeRenderer: function(time) {
        time = time / 60;

        var min = Math.floor(time),
            sec = Math.round((time - min) * 60);

        if (sec < 10) {
            sec = '0' + sec;
        }

        return min + ':' + sec;
    }
});